import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./MyReportsPage.css";

function MyReportsPage() {
  const role = localStorage.getItem("roadSenseRole");

  const profile = JSON.parse(
    localStorage.getItem("roadSenseProfile") || "null"
  );

  const allReports = JSON.parse(
    localStorage.getItem("roadSenseReports") || "[]"
  );

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");

  function normalisePhone(phone) {
    return String(phone || "").replace(/\D/g, "");
  }

  function isMyReport(report) {
    if (report.reporterId === profile?.id) {
      return true;
    }

    if (
      profile?.email &&
      report.reporterEmail &&
      report.reporterEmail.toLowerCase() === profile.email.toLowerCase()
    ) {
      return true;
    }

    if (
      profile?.phone &&
      report.reporterPhone &&
      normalisePhone(report.reporterPhone) === normalisePhone(profile.phone)
    ) {
      return true;
    }

    return false;
  }

  function getStatusClass(status) {
    return status.toLowerCase().replace(/\s+/g, "-");
  }

  const myReports = useMemo(() => {
    return allReports
      .filter(isMyReport)
      .sort((firstReport, secondReport) => {
        return Number(secondReport.id) - Number(firstReport.id);
      });
  }, [allReports, profile]);

  const filteredReports = myReports.filter((report) => {
    const searchValue = searchText.toLowerCase();

    const matchesSearch =
      report.issueType?.toLowerCase().includes(searchValue) ||
      report.location?.toLowerCase().includes(searchValue) ||
      report.description?.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;

    const matchesSeverity =
      severityFilter === "All" || report.severity === severityFilter;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const submittedCount = myReports.filter(
    (report) => report.status === "Submitted"
  ).length;

  const activeCount = myReports.filter((report) => {
    return (
      report.status === "In Review" ||
      report.status === "In Progress"
    );
  }).length;

  const resolvedCount = myReports.filter(
    (report) => report.status === "Resolved"
  ).length;

  if (role !== "citizen" || !profile) {
    return (
      <div className="my-reports-access">
        <h1>Citizen Login Required</h1>
        <p>Please login as a citizen to access your report history.</p>

        <Link to="/login" className="my-reports-login-button">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="my-reports-page">
      <section className="my-reports-hero">
        <div>
          <p className="my-reports-eyebrow">CITIZEN REPORT TRACKER</p>
          <h1>My Road Issue Reports</h1>
          <p>
            Track your submitted reports, review authority updates, and follow
            the resolution timeline for each road issue.
          </p>
        </div>

        <Link to="/report-issue" className="my-reports-create-button">
          + Report New Issue
        </Link>
      </section>

      <section className="my-report-stat-grid">
        <div className="my-report-stat-card">
          <span>Total Reports</span>
          <strong>{myReports.length}</strong>
          <small>Submitted by you</small>
        </div>

        <div className="my-report-stat-card submitted-stat">
          <span>Submitted</span>
          <strong>{submittedCount}</strong>
          <small>Waiting for review</small>
        </div>

        <div className="my-report-stat-card active-stat">
          <span>Under Process</span>
          <strong>{activeCount}</strong>
          <small>In review or in progress</small>
        </div>

        <div className="my-report-stat-card resolved-stat">
          <span>Resolved</span>
          <strong>{resolvedCount}</strong>
          <small>Completed road issues</small>
        </div>
      </section>

      <section className="my-reports-panel">
        <div className="my-reports-panel-heading">
          <div>
            <p className="my-reports-eyebrow">REPORT HISTORY</p>
            <h2>Track Your Submissions</h2>
          </div>

          <span className="visible-count">
            Showing {filteredReports.length} report
            {filteredReports.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="my-reports-filters">
          <input
            type="text"
            placeholder="Search by issue type, location, or description..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

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
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Submitted">Submitted</option>
            <option value="In Review">In Review</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {filteredReports.length === 0 ? (
          <div className="my-reports-empty">
            <h3>No matching reports found</h3>

            <p>
              {myReports.length === 0
                ? "You have not submitted any road issue reports yet."
                : "Try changing the search text or selected filters."}
            </p>

            {myReports.length === 0 && (
              <Link to="/report-issue" className="my-reports-empty-button">
                Submit Your First Report
              </Link>
            )}
          </div>
        ) : (
          <div className="my-report-list">
            {filteredReports.map((report) => (
              <article className="my-report-card" key={report.id}>
                {report.imageUrl ? (
                  <img
                    src={report.imageUrl}
                    alt={`${report.issueType} evidence`}
                    className="my-report-image"
                  />
                ) : (
                  <div className="my-report-image-placeholder">
                    <span>RS</span>
                    <small>No photo submitted</small>
                  </div>
                )}

                <div className="my-report-content">
                  <div className="my-report-card-top">
                    <div>
                      <span
                        className={`my-severity-badge ${report.severity.toLowerCase()}`}
                      >
                        {report.severity} Severity
                      </span>

                      <h3>{report.issueType}</h3>
                    </div>

                    <span
                      className={`my-status-badge ${getStatusClass(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </div>

                  <p className="my-report-description">
                    {report.description}
                  </p>

                  <div className="my-report-meta">
                    <span>📍 {report.location}</span>
                    <span>🗓 {report.createdAt || report.date}</span>
                  </div>

                  <div className="my-report-bottom">
                    <span className="report-id">Report ID: #{report.id}</span>

                    <Link
                      to={`/issue/${report.id}`}
                      className="view-report-button"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MyReportsPage;