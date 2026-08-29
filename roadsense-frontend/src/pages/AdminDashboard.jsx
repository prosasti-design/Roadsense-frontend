import { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const role = localStorage.getItem("roadSenseRole");

  const [reports, setReports] = useState(() => {
    return JSON.parse(localStorage.getItem("roadSenseReports") || "[]");
  });

  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  if (role !== "admin") {
    return (
      <div className="admin-access-message">
        <h1>Government Access Required</h1>
        <p>Please select Government Official from the login page.</p>

        <Link to="/login" className="admin-primary-link">
          Go to Login
        </Link>
      </div>
    );
  }

  function updateReportStatus(reportId, newStatus) {
    const updatedReports = reports.map((report) => {
      if (report.id !== reportId) {
        return report;
      }

      if (report.status === newStatus) {
        return report;
      }

      const currentTime = new Date().toLocaleString("en-IN");

      const existingTimeline =
        report.timeline || [
          {
            status: report.status,
            note: "Existing issue status imported into RoadSense.",
            time: report.createdAt || report.date,
          },
        ];

      return {
        ...report,
        status: newStatus,
        timeline: [
          ...existingTimeline,
          {
            status: newStatus,
            note: "Status updated by a government official.",
            time: currentTime,
          },
        ],
      };
    });

    setReports(updatedReports);

    localStorage.setItem(
      "roadSenseReports",
      JSON.stringify(updatedReports)
    );
  }

  const filteredReports = reports.filter((report) => {
    const matchesSeverity =
      severityFilter === "All" || report.severity === severityFilter;

    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;

    return matchesSeverity && matchesStatus;
  });

  function exportReportsAsCsv() {
    if (filteredReports.length === 0) {
      alert("There are no reports matching the current filters.");
      return;
    }

    function makeCsvSafe(value) {
      const text = String(value || "");

      // Helps prevent spreadsheet formulas from being executed in CSV files.
      const protectedText = /^[=+\-@]/.test(text) ? `'${text}` : text;

      return `"${protectedText.replace(/"/g, '""')}"`;
    }

    const headers = [
      "Report ID",
      "Issue Type",
      "Severity",
      "Status",
      "Location",
      "Latitude",
      "Longitude",
      "Description",
      "Reported Date",
    ];

    const csvRows = filteredReports.map((report) => {
      return [
        report.id,
        report.issueType,
        report.severity,
        report.status,
        report.location,
        report.latitude || "",
        report.longitude || "",
        report.description,
        report.createdAt || report.date,
      ]
        .map(makeCsvSafe)
        .join(",");
    });

    const csvContent = [headers.join(","), ...csvRows].join("\n");

    const csvBlob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const downloadUrl = URL.createObjectURL(csvBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = `roadsense-reports-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(downloadUrl);
  }

  const totalReports = reports.length;

  const highPriorityReports = reports.filter(
    (report) =>
      report.severity === "High" &&
      report.status !== "Resolved" &&
      report.status !== "Rejected"
  ).length;

  const inProgressReports = reports.filter(
    (report) => report.status === "In Progress"
  ).length;

  const resolvedReports = reports.filter(
    (report) => report.status === "Resolved"
  ).length;

  const lowSeverityCount = reports.filter(
    (report) => report.severity === "Low"
  ).length;

  const mediumSeverityCount = reports.filter(
    (report) => report.severity === "Medium"
  ).length;

  const highSeverityCount = reports.filter(
    (report) => report.severity === "High"
  ).length;

  const highestSeverityCount = Math.max(
    lowSeverityCount,
    mediumSeverityCount,
    highSeverityCount,
    1
  );

  return (
    <div className="admin-dashboard">
      <section className="admin-header">
        <div>
          <p className="admin-label">GOVERNMENT CONTROL PANEL</p>
          <h1>RoadSense Operations Dashboard</h1>
          <p>
            Monitor reported road issues, prioritize critical cases, and update
            repair progress from one centralized panel.
          </p>
        </div>

        <Link to="/login" className="view-citizen-button">
          Switch Role
        </Link>
      </section>

      <section className="dashboard-stats">
        <div className="dashboard-stat-card">
          <span>Total Reports</span>
          <strong>{totalReports}</strong>
          <small>All road issue submissions</small>
        </div>

        <div className="dashboard-stat-card critical-stat">
          <span>Critical Cases</span>
          <strong>{highPriorityReports}</strong>
          <small>High severity and unresolved</small>
        </div>

        <div className="dashboard-stat-card progress-stat">
          <span>In Progress</span>
          <strong>{inProgressReports}</strong>
          <small>Currently being handled</small>
        </div>

        <div className="dashboard-stat-card resolved-stat">
          <span>Resolved</span>
          <strong>{resolvedReports}</strong>
          <small>Issues closed successfully</small>
        </div>
      </section>

      <section className="priority-section">
        <div className="priority-heading">
          <div>
            <p className="admin-label">PRIORITY INSIGHT</p>
            <h2>Severity Distribution</h2>
          </div>
        </div>

        <div className="severity-summary">
          <div className="severity-summary-card low-summary">
            <span>Low Severity</span>
            <strong>{lowSeverityCount}</strong>
          </div>

          <div className="severity-summary-card medium-summary">
            <span>Medium Severity</span>
            <strong>{mediumSeverityCount}</strong>
          </div>

          <div className="severity-summary-card high-summary">
            <span>High Severity</span>
            <strong>{highSeverityCount}</strong>
          </div>
        </div>
      </section>

      <section className="analytics-section">
        <div>
          <p className="admin-label">ANALYTICS OVERVIEW</p>
          <h2>Issue Severity Analysis</h2>
          <p className="analytics-description">
            This visual summary helps authorities identify how many
            safety-critical issues require immediate action.
          </p>
        </div>

        <div className="bar-chart">
          <div className="bar-chart-row">
            <div className="bar-chart-label">
              <span>Low</span>
              <strong>{lowSeverityCount}</strong>
            </div>

            <div className="bar-track">
              <div
                className="bar-fill low-bar"
                style={{
                  width: `${(lowSeverityCount / highestSeverityCount) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="bar-chart-row">
            <div className="bar-chart-label">
              <span>Medium</span>
              <strong>{mediumSeverityCount}</strong>
            </div>

            <div className="bar-track">
              <div
                className="bar-fill medium-bar"
                style={{
                  width: `${
                    (mediumSeverityCount / highestSeverityCount) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="bar-chart-row">
            <div className="bar-chart-label">
              <span>High</span>
              <strong>{highSeverityCount}</strong>
            </div>

            <div className="bar-track">
              <div
                className="bar-fill high-bar"
                style={{
                  width: `${(highSeverityCount / highestSeverityCount) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className="reports-management">
        <div className="management-header">
          <div>
            <p className="admin-label">ISSUE MANAGEMENT</p>
            <h2>Reported Road Issues</h2>
          </div>

          <div className="management-actions">
            <div className="filters">
              <select
                value={severityFilter}
                onChange={(event) => setSeverityFilter(event.target.value)}
              >
                <option value="All">All Severity Levels</option>
                <option value="Low">Low Severity</option>
                <option value="Medium">Medium Severity</option>
                <option value="High">High Severity</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="In Review">In Review</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <button className="export-csv-button" onClick={exportReportsAsCsv}>
              Export Filtered CSV
            </button>
          </div>
        </div>

        {filteredReports.length === 0 ? (
          <div className="admin-empty-state">
            <h3>No reports found</h3>
            <p>
              Try changing the selected filters, or create reports from the
              Citizen Portal.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Location</th>
                  <th>Severity</th>
                  <th>Reported Date</th>
                  <th>Current Status</th>
                  <th>Update Status</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <strong>{report.issueType}</strong>
                      <span className="table-description">
                        {report.description}
                      </span>
                    </td>

                    <td>{report.location}</td>

                    <td>
                      <span
                        className={`admin-severity-badge ${report.severity.toLowerCase()}`}
                      >
                        {report.severity}
                      </span>
                    </td>

                    <td>{report.createdAt || report.date}</td>

                    <td>
                      <span className="admin-status-badge">
                        {report.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className="status-select"
                        value={report.status}
                        onChange={(event) =>
                          updateReportStatus(report.id, event.target.value)
                        }
                      >
                        <option>Submitted</option>
                        <option>In Review</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Rejected</option>
                      </select>
                    </td>

                    <td>
                      <Link
                        to={`/issue/${report.id}`}
                        className="view-details-button"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;