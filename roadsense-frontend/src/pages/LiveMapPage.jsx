import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./LiveMapPage.css";

function LiveMapPage() {
  const reports = JSON.parse(
    localStorage.getItem("roadSenseReports") || "[]"
  );
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  function isValidLatitude(value) {
    const latitude = Number(value);
    return (
      Number.isFinite(latitude) &&
      latitude >= -90 &&
      latitude <= 90
    );
  }
  function isValidLongitude(value) {
    const longitude = Number(value);

    return (
      Number.isFinite(longitude) &&
      longitude >= -180 &&
      longitude <= 180
    );
  }

  function getMarkerColor(report) {
    if (report.status === "Resolved") {
      return "#16a34a";
    }
    if (report.status === "Rejected") {
      return "#204c89";
    }
    if (report.severity === "High") {
      return "#dc2626";
    }
    if (report.severity === "Medium") {
      return "#d97706";
    }
    return "#0f7d89";
  }
  const gpsReports = reports.filter((report) => {
    return (
      isValidLatitude(report.latitude) &&
      isValidLongitude(report.longitude)
    );
  });

  const filteredReports = gpsReports.filter((report) => {
    const matchesSeverity =
      severityFilter === "All" || report.severity === severityFilter;

    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;

    return matchesSeverity && matchesStatus;
  });

  const unresolvedCount = reports.filter((report) => {
    return (
      report.status !== "Resolved" &&
      report.status !== "Rejected"
    );
  }).length;

  const highPriorityCount = reports.filter((report) => {
    return (
      report.severity === "High" &&
      report.status !== "Resolved" &&
      report.status !== "Rejected"
    );
  }).length;

  const mapCenter =
    gpsReports.length > 0
      ? [
          Number(gpsReports[0].latitude),
          Number(gpsReports[0].longitude),
        ]
      : [22.5726, 88.3639];

  return (
    <div className="live-map-page">
      <section className="map-page-hero">
        <div>
          <p className="map-eyebrow">LIVE ROAD INTELLIGENCE</p>
          <h1>Road Issue Status Map</h1>
          <p>
            View GPS-tagged road issues and identify locations requiring
            attention. Marker colors indicate severity and resolution status.
          </p>
        </div>

        <Link to="/report-issue" className="map-report-button">
          + Report an Issue
        </Link>
      </section>

      <section className="map-stat-grid">
        <div className="map-stat-card">
          <span>Total Reports</span>
          <strong>{reports.length}</strong>
          <small>All submitted reports</small>
        </div>

        <div className="map-stat-card blue-map-stat">
          <span>GPS Tagged</span>
          <strong>{gpsReports.length}</strong>
          <small>Visible on the map</small>
        </div>

        <div className="map-stat-card warning-map-stat">
          <span>Unresolved</span>
          <strong>{unresolvedCount}</strong>
          <small>Needs review or action</small>
        </div>

        <div className="map-stat-card danger-map-stat">
          <span>High Priority</span>
          <strong>{highPriorityCount}</strong>
          <small>Critical road safety cases</small>
        </div>
      </section>

      <section className="map-panel">
        <div className="map-toolbar">
          <div>
            <p className="map-eyebrow">INTERACTIVE MAP</p>
            <h2>Reported Road Conditions</h2>
          </div>

          <div className="map-filters">
            <select
              value={severityFilter}
              onChange={(event) =>
                setSeverityFilter(event.target.value)
              }
            >
              <option value="All">All Severity</option>
              <option value="Low">Low Severity</option>
              <option value="Medium">Medium Severity</option>
              <option value="High">High Severity</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Submitted">Submitted</option>
              <option value="In Review">In Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="map-legend">
          <span>
            <i className="legend-dot high-legend"></i>
            High Priority
          </span>

          <span>
            <i className="legend-dot medium-legend"></i>
            Medium Priority
          </span>

          <span>
            <i className="legend-dot low-legend"></i>
            Low Priority
          </span>

          <span>
            <i className="legend-dot resolved-legend"></i>
            Resolved
          </span>
        </div>

        {filteredReports.length === 0 ? (
          <div className="map-empty-state">
            <h3>No GPS-tagged reports found</h3>
            <p>
              Submit a road issue and allow GPS access, or enter latitude and
              longitude manually, to view it on the map.
            </p>

            <Link to="/report-issue" className="map-empty-button">
              Report Road Issue
            </Link>
          </div>
        ) : (
          <div className="leaflet-map-wrapper">
            <MapContainer
              center={mapCenter}
              zoom={11}
              scrollWheelZoom={true}
              className="roadsense-leaflet-map"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filteredReports.map((report) => (
                <CircleMarker
                  key={report.id}
                  center={[
                    Number(report.latitude),
                    Number(report.longitude),
                  ]}
                  radius={10}
                  pathOptions={{
                    color: "#ffffff",
                    weight: 2,
                    fillColor: getMarkerColor(report),
                    fillOpacity: 0.9,
                  }}
                >
                  <Popup>
                    <div className="map-popup">
                      <div className="popup-heading">
                        <strong>{report.issueType}</strong>

                        <span
                          className={`popup-severity ${report.severity.toLowerCase()}`}
                        >
                          {report.severity}
                        </span>
                      </div>

                      <p>{report.description}</p>

                      <div className="popup-details">
                        <span>
                          <strong>Location:</strong> {report.location}
                        </span>

                        <span>
                          <strong>Status:</strong> {report.status}
                        </span>

                        <span>
                          <strong>Reported:</strong>{" "}
                          {report.createdAt || report.date}
                        </span>
                      </div>

                      <Link to={`/issue/${report.id}`}>
                        View Full Issue Details →
                      </Link>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        )}

        <p className="map-note">
          Demo note: map data currently comes from reports stored in this
          browser. In production, authorized users will receive live data from
          secure backend and GIS APIs.
        </p>
      </section>
    </div>
  );
}
export default LiveMapPage;