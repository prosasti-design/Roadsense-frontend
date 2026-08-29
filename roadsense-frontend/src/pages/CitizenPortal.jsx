import { Link } from "react-router-dom";
import "./CitizenPortal.css";

function CitizenPortal() {
  const role = localStorage.getItem("roadSenseRole");
  const reports = JSON.parse(localStorage.getItem("roadSenseReports") || "[]");

  if (role !== "citizen") {
    return (
      <div className="access-message">
        <h1>Citizen Access Required</h1>
        <p>Please select the Citizen role from the login page.</p>
        <Link to="/login" className="primary-link">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="citizen-portal">
      <section className="portal-header">
        <div>
          <p className="portal-label">CITIZEN SERVICES</p>
          <h1>Report and Track Road Issues</h1>
          <p>
            Help improve road safety by reporting potholes, cracks, flooding,
            damaged signs, and other infrastructure problems.
          </p>
        </div>

        <Link to="/report-issue" className="report-button">
          + Report New Issue
        </Link>
      </section>

      <section className="citizen-stats">
        <div className="citizen-stat-card">
          <span>Total Reports</span>
          <strong>{reports.length}</strong>
        </div>

        <div className="citizen-stat-card">
          <span>Submitted</span>
          <strong>
            {reports.filter((report) => report.status === "Submitted").length}
          </strong>
        </div>

        <div className="citizen-stat-card">
          <span>Resolved</span>
          <strong>
            {reports.filter((report) => report.status === "Resolved").length}
          </strong>
        </div>
      </section>

      <section className="reports-section">
        <div className="section-heading">
          <div>
            <p className="portal-label">RECENT ACTIVITY</p>
            <h2>Your Road Issue Reports</h2>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="empty-state">
            <h3>No reports submitted yet</h3>
            <p>
              If you find a road issue, submit it with a clear description and
              location details.
            </p>
            <Link to="/report-issue" className="primary-link">
              Report Your First Issue
            </Link>
          </div>
        ) : (
          <div className="reports-grid">
            {reports.map((report) => (
              <Link to={`/issue/${report.id}`} className="report-card-link" key={report.id}>
  <article className="report-card">
                <div className="report-card-top">
                  <span className={`severity ${report.severity.toLowerCase()}`}>
                    {report.severity}
                  </span>

                  <span className="status-badge">{report.status}</span>
                </div>

                <h3>{report.issueType}</h3>
                <p>{report.description}</p>

                <div className="report-details">
                  <span>📍 {report.location}</span>
                  <span>🗓 {report.date}</span>
                </div>
              </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default CitizenPortal;