import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./ReportIssuePage.css";

function ReportIssuePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const role = localStorage.getItem("roadSenseRole");
  const profile = JSON.parse(localStorage.getItem("roadSenseProfile") || "null");

  const [formData, setFormData] = useState({
    issueType: "Pothole",
    severity: "Medium",
    location: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [locationMessage, setLocationMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage(t.errImageOnly);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage(t.errImageSize);
      return;
    }

    setErrorMessage("");
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationMessage(t.errNoGeo);
      return;
    }

    setLocationMessage(t.gettingLocation);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);
        setFormData({ ...formData, latitude, longitude });
        setLocationMessage(`${t.locationCaptured}${latitude}, ${longitude}`);
      },
      () => {
        setLocationMessage(t.errGeoDenied);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!profile || role !== "citizen") {
      setErrorMessage(t.errLogin);
      return;
    }

    if (!formData.location.trim() || !formData.description.trim()) {
      setErrorMessage(t.errEmpty);
      return;
    }

    const existingReports = JSON.parse(
      localStorage.getItem("roadSenseReports") || "[]"
    );

    const currentDate = new Date();

    const newReport = {
      id: Date.now(),
      reporterId: profile.id,
      reporterName: profile.fullName,
      reporterEmail: profile.email || "",
      reporterPhone: profile.phone || "",
      issueType: formData.issueType,
      severity: formData.severity,
      location: formData.location,
      description: formData.description,
      latitude: formData.latitude || "Not captured",
      longitude: formData.longitude || "Not captured",
      imageUrl: imagePreview,
      status: "Submitted",
      date: currentDate.toLocaleDateString("en-IN"),
      createdAt: currentDate.toLocaleString("en-IN"),
      timeline: [
        {
          status: "Submitted",
          note: "Citizen report received by RoadSense.",
          time: currentDate.toLocaleString("en-IN"),
        },
      ],
    };

    try {
      localStorage.setItem(
        "roadSenseReports",
        JSON.stringify([newReport, ...existingReports])
      );
      navigate(`/issue/${newReport.id}`);
    } catch (error) {
      setErrorMessage(t.errSave);
    }
  }

  if (role !== "citizen" || !profile) {
    return (
      <div className="report-page">
        <div className="report-form-container">
          <h1>{t.loginRequired}</h1>
          <p>{t.loginRequiredText}</p>
          <Link to="/login" className="back-link">
            {t.goToLogin}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page">
      <div className="report-form-container">
        <Link to="/dashboard" className="back-link">
          {t.backToDashboard}
        </Link>

        <h1>{t.reportTitle}</h1>
        <p>{t.reportIntro}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="issueType">{t.issueType}</label>
              <select
                id="issueType"
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
              >
                <option>{t.pothole}</option>
                <option>{t.roadCrack}</option>
                <option>{t.flooding}</option>
                <option>{t.damagedSign}</option>
                <option>{t.brokenStreetlight}</option>
                <option>{t.other}</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="severity">{t.severity}</label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
              >
                <option>{t.low}</option>
                <option>{t.medium}</option>
                <option>{t.high}</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="location">{t.locationLabel}</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder={t.locationPlaceholder}
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="location-box">
            <div>
              <strong>{t.gpsCoordinates}</strong>
              <p>{t.gpsHelp}</p>
            </div>
            <button
              type="button"
              className="location-button"
              onClick={useCurrentLocation}
            >
              {t.useCurrentLocation}
            </button>
          </div>

          {locationMessage && (
            <p className="location-message">{locationMessage}</p>
          )}

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="latitude">{t.latitude}</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                placeholder={t.latitudePlaceholder}
                value={formData.latitude}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="longitude">{t.longitude}</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                placeholder={t.longitudePlaceholder}
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="description">{t.descriptionLabel}</label>
            <textarea
              id="description"
              name="description"
              rows="6"
              placeholder={t.descriptionPlaceholder}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="roadImage">{t.uploadPhoto}</label>
            <input
              id="roadImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <small className="image-help">{t.imageHelp}</small>
          </div>

          {imagePreview && (
            <div className="image-preview-box">
              <p>{t.imagePreview}</p>
              <img src={imagePreview} alt="Road issue preview" />
            </div>
          )}

          {errorMessage && <p className="form-error">{errorMessage}</p>}

          <button type="submit" className="submit-report-button">
            {t.submitReport}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssuePage;