import { Link } from "react-router-dom";

function DashboardSidebar({ isOpen, closeSidebar }) {
  return (
    <div className={isOpen ? "sidebar open" : "sidebar"}>

      <div className="sidebar-header">
        <h2>RoadSense</h2>

        <button onClick={closeSidebar} className="close-button">
          ×
        </button>
      </div>

      <div className="sidebar-menu">

        <Link to="/report-issue" onClick={closeSidebar}>
          📷 Upload Image
        </Link>

        <Link to="/report-issue" onClick={closeSidebar}>
          🎙 Voice Complaint
        </Link>

        <Link to="/report-issue" onClick={closeSidebar}>
          📍 Report Issue
        </Link>

        <Link to="/live-map" onClick={closeSidebar}>
          🗺 Live Road Map
        </Link>

        <Link to="/my-reports" onClick={closeSidebar}>
          📄 My Complaints
        </Link>

        <Link to="/about" onClick={closeSidebar}>
          ⚙ Settings
        </Link>

      </div>

      <div className="sidebar-bottom">

        <button className="theme-button">
          ☀ Light Mode
        </button>

        <Link to="/about" onClick={closeSidebar}>
          ❓ Help & Support
        </Link>

      </div>

    </div>
  );
}

export default DashboardSidebar;