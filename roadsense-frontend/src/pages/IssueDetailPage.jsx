import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./IssueDetailPage.css";

function IssueDetailPage() {
  const { id } = useParams();

  const role = localStorage.getItem("roadSenseRole");

  const allReports = JSON.parse(
    localStorage.getItem("roadSenseReports") || "[]"
  );

  const selectedReport = allReports.find(
    (report) => String(report.id) === String(id)
  );

  const [report, setReport] = useState(selectedReport);

  const [assignmentData, setAssignmentData] = useState({
    assignedDepartment: selectedReport?.assignedDepartment || "",
    assignedOfficer: selectedReport?.assignedOfficer || "",
    targetDate: selectedReport?.targetDate || "",
    publicUpdate: "",
    internalNote: selectedReport?.internalNote || "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function getStatusClass(status) {
    return status.toLowerCase().replace(/\s+/g, "-");
  }

  function getSeverityClass(severity) {
    return severity.toLowerCase();
  }

  function saveUpdatedReport(updatedReport) {
    const currentReports = JSON.parse(
      localStorage.getItem("roadSenseReports") || "[]"
    );

    const updatedReports = currentReports.map((item) => {
      if (String(item.id) === String(updatedReport.id)) {
        return updatedReport;
      }

      return item;
    });

    localStorage.setItem(
      "roadSenseReports",
      JSON.stringify(updatedReports)
    );

    setReport(updatedReport);
  }

  function handleStatusChange(event) {
    const newStatus = event.target.value;

    if (newStatus === report.status) {
      return;
    }

    const currentTime = new Date().toLocaleString("en-IN");

    const previousTimeline =
      report.timeline || [
        {
          status: report.status,
          note: "Current issue status recorded in RoadSense.",
          time: report.createdAt || report.date,
        },
      ];

    const updatedReport = {
      ...report,
      status: newStatus,
      timeline: [
        ...previousTimeline,
        {
          status: newStatus,
          note: "Status updated by the assigned government authority.",
          time: currentTime,
        },
      ],
    };

    saveUpdatedReport(updatedReport);

    setSuccessMessage(`Status changed to ${newStatus}.`);
    setErrorMessage("");
  }

  function handleAssignmentChange(event) {
    const { name, value } = event.target;

    setAssignmentData({
      ...assignmentData,
      [name]: value,
    });
  }

  function saveAssignment(event) {
    event.preventDefault();

    if (!assignmentData.assignedDepartment.trim()) {
      setErrorMessage("Please select or enter the responsible department.");
      setSuccessMessage("");
      return;
    }

    const currentTime = new Date().toLocaleString("en-IN");

    const previousTimeline =
      report.timeline || [
        {
          status: report.status,
          note: "Current issue status recorded in RoadSense.",
          time: report.createdAt || report.date,
        },
      ];

    const updatedTimeline = [...previousTimeline];

    if (assignmentData.publicUpdate.trim()) {
      updatedTimeline.push({
        status: report.status,
        note: assignmentData.publicUpdate.trim(),
        time: currentTime,
      });
    }

    const updatedReport = {
      ...report,
      assignedDepartment: assignmentData.assignedDepartment,
      assignedOfficer: assignmentData.assignedOfficer,
      targetDate: assignmentData.targetDate,
      internalNote: assignmentData.internalNote,
      timeline: updatedTimeline,
    };

    saveUpdatedReport(updatedReport);

    setAssignmentData({
      ...assignmentData,
      publicUpdate: "",
    });

    setSuccessMessage(
      "Assignment details and public progress update saved successfully."
    );

    setErrorMessage("");
  }

  if (!report) {
    return (
      <div className="issue-not-found">
        <h1>Issue Not Found</h1>

        <p>The requested report does not exist or may have been removed.</p>

        <Link to="/live-map" className="issue-primary-link">
          View Live Road Map
        </Link>
      </div>
    );
  }

  const timeline =
    report.timeline || [
      {
        status: report.status,
        note: "Current issue status.",
        time: report.createdAt || report.date,
      },
    ];

  const isAdmin = role === "admin";

  return (
    <div className="issue-detail-page">
      <Link
        to={isAdmin ? "/admin" : "/my-reports"}
        className="detail-back-link"
      >
        ← Back to {isAdmin ? "Admin Dashboard" : "My Reports"}
      </Link>

      <section className="issue-detail-header">
        <div>
          <p className="detail-label">ROAD ISSUE REPORT #{report.id}</p>
          <h1>{report.issueType}</h1>
          <p>📍 {report.location}</p>
        </div>

        <div className="detail-header-badges">
          <span
            className={`detail-severity ${getSeverityClass(report.severity)}`}
          >
            {report.severity} Severity
          </span>

          <span className={`detail-status ${getStatusClass(report.status)}`}>
            {report.status}
          </span>
        </div>
      </section>

      <section className="issue-detail-grid">
        <article className="detail-card">
          <h2>Issue Information</h2>

          <div className="detail-row">
            <span>Reported On</span>
            <strong>{report.createdAt || report.date}</strong>
          </div>

          <div className="detail-row">
            <span>Latitude</span>
            <strong>{report.latitude || "Not captured"}</strong>
          </div>

          <div className="detail-row">
            <span>Longitude</span>
            <strong>{report.longitude || "Not captured"}</strong>
          </div>

          <div className="detail-row">
            <span>Responsible Department</span>
            <strong>
              {report.assignedDepartment || "Awaiting assignment"}
            </strong>
          </div>

          <div className="detail-row">
            <span>Expected Completion</span>
            <strong>{report.targetDate || "Not assigned"}</strong>
          </div>

          <div className="description-block">
            <span>Citizen Description</span>
            <p>{report.description}</p>
          </div>
        </article>

        <article className="detail-card">
          <h2>Status Timeline</h2>

          <div className="timeline">
            {timeline.map((event, index) => (
              <div className="timeline-item" key={`${event.time}-${index}`}>
                <div className="timeline-dot"></div>

                <div>
                  <h3>{event.status}</h3>
                  <p>{event.note}</p>
                  <small>{event.time}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {report.imageUrl && (
        <section className="detail-card evidence-card">
          <h2>Submitted Evidence</h2>

          <img
            src={report.imageUrl}
            alt="Submitted road issue evidence"
          />
        </section>
      )}

      {isAdmin && (
        <section className="admin-management-panel">
          <div className="admin-management-heading">
            <div>
              <p>GOVERNMENT OPERATIONS CONTROL</p>
              <h2>Manage This Road Issue</h2>
            </div>

            <span>Admin Access</span>
          </div>

          <div className="admin-status-control">
            <label htmlFor="issueStatus">Update Current Status</label>

            <select
              id="issueStatus"
              value={report.status}
              onChange={handleStatusChange}
            >
              <option>Submitted</option>
              <option>In Review</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>
          </div>

          <form onSubmit={saveAssignment} className="assignment-form">
            <div className="assignment-grid">
              <div className="assignment-input-group">
                <label htmlFor="assignedDepartment">
                  Responsible Department
                </label>

                <select
                  id="assignedDepartment"
                  name="assignedDepartment"
                  value={assignmentData.assignedDepartment}
                  onChange={handleAssignmentChange}
                >
                  <option value="">Select Department</option>
                  <option>Public Works Department</option>
                  <option>Municipal Road Maintenance Unit</option>
                  <option>Drainage and Flood Control Unit</option>
                  <option>Traffic and Road Safety Department</option>
                  <option>Streetlight Maintenance Department</option>
                </select>
              </div>

              <div className="assignment-input-group">
                <label htmlFor="assignedOfficer">
                  Assigned Officer / Contractor
                </label>

                <input
                  id="assignedOfficer"
                  name="assignedOfficer"
                  type="text"
                  placeholder="Example: Ward 12 Road Maintenance Team"
                  value={assignmentData.assignedOfficer}
                  onChange={handleAssignmentChange}
                />
              </div>

              <div className="assignment-input-group">
                <label htmlFor="targetDate">
                  Target Completion Date
                </label>

                <input
                  id="targetDate"
                  name="targetDate"
                  type="date"
                  value={assignmentData.targetDate}
                  onChange={handleAssignmentChange}
                />
              </div>

              <div className="assignment-input-group full-width-input">
                <label htmlFor="publicUpdate">
                  Public Progress Update
                </label>

                <textarea
                  id="publicUpdate"
                  name="publicUpdate"
                  rows="3"
                  placeholder="Example: Inspection team assigned. Repair work will begin after site assessment."
                  value={assignmentData.publicUpdate}
                  onChange={handleAssignmentChange}
                />
              </div>

              <div className="assignment-input-group full-width-input">
                <label htmlFor="internalNote">
                  Internal Note (Visible Only to Admin)
                </label>

                <textarea
                  id="internalNote"
                  name="internalNote"
                  rows="3"
                  placeholder="Add internal planning or contractor-related notes."
                  value={assignmentData.internalNote}
                  onChange={handleAssignmentChange}
                />
              </div>
            </div>

            {errorMessage && (
              <p className="admin-management-error">{errorMessage}</p>
            )}

            {successMessage && (
              <p className="admin-management-success">{successMessage}</p>
            )}

            <button type="submit" className="save-management-button">
              Save Assignment and Update
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default IssueDetailPage;