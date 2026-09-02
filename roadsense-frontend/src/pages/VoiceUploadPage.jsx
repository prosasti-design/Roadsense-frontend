import { useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./VoiceUploadPage.css";

function VoiceUploadPage() {
  const { t } = useLanguage();
  const [image, setImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    phone: "",
    description: "",
  });
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const fileInputRef = useRef(null);

  function handleFileSelect(event) {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    setError("Please select an image file.");
    return;
  }

  setError("");

  const reader = new FileReader();

  reader.onload = () => {
    setImage(reader.result);
    setScanComplete(false);
    setIssueType("");
    startScan();
  };

  reader.onerror = () => {
    setError("Could not read the selected image.");
  };

  reader.readAsDataURL(file);
}

  function startScan() {
    setScanning(true);
    setScanComplete(false);
    setIssueType("");

    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
      const types = ["Pothole", "Road Crack", "Flooding", "Broken Streetlight"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      setIssueType(randomType);
    }, 2500);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert("Complaint submitted! (Demo only)");
    setImage(null);
    setScanComplete(false);
    setIssueType("");
    setFormData({ name: "", area: "", phone: "", description: "" });
    setAudioBlob(null);
    setAudioUrl(null);
    setError("");
  }

  async function startRecording() {
  setError("");

  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Audio recording is not supported in this browser.");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    streamRef.current = stream;

    let options = {};

    if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
      options = { mimeType: "audio/webm;codecs=opus" };
    } else if (MediaRecorder.isTypeSupported("audio/webm")) {
      options = { mimeType: "audio/webm" };
    }

    const recorder = new MediaRecorder(stream, options);

    mediaRecorderRef.current = recorder;
    audioChunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const mimeType = recorder.mimeType || "audio/webm";

      const blob = new Blob(audioChunksRef.current, {
        type: mimeType,
      });

      setAudioBlob(blob);

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    };

    recorder.onerror = () => {
      setError("Recording failed. Please try again.");
    };

    recorder.start();
    setRecording(true);
  } catch (err) {
    console.error("Microphone error:", err);

    if (err.name === "NotAllowedError") {
      setError(
        "Microphone permission denied. Please allow microphone access and try again."
      );
    } else if (err.name === "NotFoundError") {
      setError("No microphone found on this device.");
    } else {
      setError("Could not access microphone. Please check browser permissions.");
    }
  }
}
  function stopRecording() {
  const recorder = mediaRecorderRef.current;

  if (recorder && recorder.state !== "inactive") {
    recorder.stop();
  }

  setRecording(false);

  if (streamRef.current) {
    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }
}
  function openCamera() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = handleFileSelect;
    input.click();
  }

  function openGallery() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleFileSelect;
    input.click();
  }

  return (
    <div className="voice-upload-page">
      <header className="voice-header">
        <h1>Upload Evidence & Voice Complaint</h1>
        <p>Capture the issue, let AI scan it, and add your details.</p>
      </header>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="upload-section">
        <h2>Upload Image</h2>

        <div className="upload-buttons">
          <button type="button" className="upload-btn" onClick={openCamera}>
            📷 Camera
          </button>
          <button type="button" className="upload-btn" onClick={openGallery}>
            🖼️ Gallery
          </button>
        </div>

        {image && (
          <div className="image-box">
            <div className="image-container">
              <img src={image} alt="Uploaded issue" className="uploaded-image" />
              {scanning && <div className="scan-line"></div>}
            </div>

            {scanComplete && (
              <div className="scan-result">
                <div className="issue-icon">⚠️</div>
                <div className="issue-text">
                  <strong>Detected Issue:</strong> {issueType}
                </div>
                <div className="issue-department">
                  Complaint will go to: <strong>Municipal Roads Department</strong>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="voice-section">
        <h2>Voice Complaint</h2>
        <p>Record a short voice note describing the issue.</p>

        <div className="voice-controls">
          {!recording ? (
            <button type="button" className="voice-btn" onClick={startRecording}>
              🎤 Start Recording
            </button>
          ) : (
            <button type="button" className="voice-btn stop" onClick={stopRecording}>
              ⏹️ Stop Recording
            </button>
          )}
        </div>

        {audioUrl && (
          <div className="audio-preview">
            <p>Recording ready</p>
            <audio controls src={audioUrl} className="audio-player"></audio>
            <div className="waveform">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      <form className="details-form" onSubmit={handleSubmit}>
        <h2>Your Details</h2>

        <div className="form-row">
          <div className="form-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Area / Locality</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default VoiceUploadPage;