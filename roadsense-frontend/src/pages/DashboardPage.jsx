import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import "./DashboardPage.css";

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const issueData = [
    { name: "Potholes", value: 32 },
    { name: "Road Damage", value: 24 },
    { name: "Waterlogging", value: 16 },
    { name: "Streetlights", value: 12 },
    { name: "Road Signs", value: 9 },
    { name: "Other", value: 7 },
  ];

  const monthlyData = [
    { month: "Jan", reported: 42, resolved: 28 },
    { month: "Feb", reported: 55, resolved: 34 },
    { month: "Mar", reported: 48, resolved: 31 },
    { month: "Apr", reported: 65, resolved: 42 },
    { month: "May", reported: 58, resolved: 46 },
    { month: "Jun", reported: 72, resolved: 51 },
  ];

  const budgetData = [
    { department: "Road Repair", budget: 45, spent: 32 },
    { department: "Streetlight", budget: 25, spent: 18 },
    { department: "Drainage", budget: 30, spent: 21 },
    { department: "Road Signs", budget: 18, spent: 12 },
  ];

  const COLORS = [
    "#e45756",
    "#f0a202",
    "#3185fc",
    "#52b788",
    "#9b5de5",
    "#64748b",
  ];

  return (
    <div className={darkMode ? "dashboard-page dark-dashboard" : "dashboard-page"}>

      {/* ================= SIDEBAR BUTTON ================= */}

      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        title="Open dashboard menu"
      >
        ⋮
      </button>


      {/* ================= SIDEBAR ================= */}

      <aside className={sidebarOpen ? "dashboard-sidebar sidebar-open" : "dashboard-sidebar"}>

        <div className="sidebar-header">
          <div>
            <h2>RoadSense</h2>
            <p>Citizen Services</p>
          </div>

          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>


        <div className="sidebar-menu">

          <Link to="/dashboard" onClick={() => setSidebarOpen(false)}>
            <span className="menu-icon">▦</span>
            Dashboard
          </Link>

          <Link to="/report-issue" onClick={() => setSidebarOpen(false)}>
            <span className="menu-icon">＋</span>
            Report Road Issue
          </Link>

          <Link to="/my-reports" onClick={() => setSidebarOpen(false)}>
            <span className="menu-icon">☷</span>
            My Complaints
          </Link>

          <Link to="/live-map" onClick={() => setSidebarOpen(false)}>
            <span className="menu-icon">⌖</span>
            Live Road Map
          </Link>

          <div className="sidebar-divider"></div>

          <button
            className="sidebar-action"
            onClick={() => alert("Select an image to upload your road complaint.")}
          >
            <span className="menu-icon">▧</span>
            Upload Image
          </button>

          <button
            className="sidebar-action"
            onClick={() => alert("Voice complaint option opened.")}
          >
            <span className="menu-icon">◉</span>
            Voice Complaint
          </button>

          <button
            className="sidebar-action"
            onClick={() => alert("Settings option opened.")}
          >
            <span className="menu-icon">⚙</span>
            Settings
          </button>

        </div>


        <div className="sidebar-bottom">

          <p>Appearance</p>

          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light Mode" : "☾ Dark Mode"}
          </button>

        </div>

      </aside>


      {/* ================= HEADER ================= */}

      <header className="dashboard-header">

        <div>

          <span className="dashboard-eyebrow">
            PUBLIC ROAD INFRASTRUCTURE DASHBOARD
          </span>

          <h1>Road Infrastructure Dashboard</h1>

          <p>
            Monitor reported road issues, service performance, budget
            utilisation and complaint resolution progress.
          </p>

        </div>

        <div className="dashboard-date">

          <span>Dashboard Status</span>

          <strong>● System Active</strong>

        </div>

      </header>


      {/* ================= FILTER ================= */}

      <div className="filter-bar">

        {["Today", "This Week", "This Month"].map((filter) => (

          <button
            key={filter}
            className={
              selectedFilter === filter
                ? "filter-button active-filter"
                : "filter-button"
            }
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>

        ))}

      </div>


      {/* ================= SUMMARY CARDS ================= */}

      <section className="dashboard-kpi-grid">

        <div className="kpi-card kpi-blue">

          <div className="kpi-icon">▦</div>

          <div>
            <span>Total Reports</span>
            <strong>248</strong>
            <small>Road issues reported</small>
          </div>

        </div>


        <div className="kpi-card kpi-orange">

          <div className="kpi-icon">!</div>

          <div>
            <span>Pending Issues</span>
            <strong>64</strong>
            <small>Awaiting action</small>
          </div>

        </div>


        <div className="kpi-card kpi-green">

          <div className="kpi-icon">✓</div>

          <div>
            <span>Resolved Issues</span>
            <strong>156</strong>
            <small>Successfully completed</small>
          </div>

        </div>


        <div className="kpi-card kpi-red">

          <div className="kpi-icon">₹</div>

          <div>
            <span>Estimated Cost</span>
            <strong>12.45L</strong>
            <small>Current repair estimate</small>
          </div>

        </div>

      </section>


      {/* ================= CHART ROW 1 ================= */}

      <section className="dashboard-chart-grid">

        {/* PIE CHART */}

        <div className="chart-card">

          <div className="chart-heading">

            <div>
              <span className="chart-label">ISSUE DISTRIBUTION</span>
              <h2>Road Issue Categories</h2>
            </div>

            <span className="chart-badge">248 Reports</span>

          </div>

          <div className="chart-container">

            <ResponsiveContainer width="100%" height={320}>

              <PieChart>

                <Pie
                  data={issueData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="48%"
                  outerRadius={105}
                  innerRadius={48}
                  paddingAngle={3}
                  label
                >

                  {issueData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  height={45}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* LINE CHART */}

        <div className="chart-card">

          <div className="chart-heading">

            <div>
              <span className="chart-label">SERVICE TREND</span>
              <h2>Reports vs Resolutions</h2>
            </div>

          </div>

          <div className="chart-container">

            <ResponsiveContainer width="100%" height={320}>

              <LineChart data={monthlyData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="reported"
                  stroke="#3185fc"
                  strokeWidth={3}
                  name="Reported"
                />

                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#52b788"
                  strokeWidth={3}
                  name="Resolved"
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </section>


      {/* ================= BAR GRAPH ================= */}

      <section className="dashboard-chart-grid">

        <div className="chart-card large-chart">

          <div className="chart-heading">

            <div>
              <span className="chart-label">BUDGET MANAGEMENT</span>
              <h2>Department Budget Planning</h2>
            </div>

            <span className="chart-badge">₹118 Lakh</span>

          </div>

          <div className="chart-container">

            <ResponsiveContainer width="100%" height={330}>

              <BarChart data={budgetData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="department" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="budget"
                  fill="#3185fc"
                  name="Allocated Budget"
                  radius={[5, 5, 0, 0]}
                />

                <Bar
                  dataKey="spent"
                  fill="#f0a202"
                  name="Amount Spent"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* BUDGET SUMMARY */}

        <div className="chart-card budget-summary">

          <span className="chart-label">BUDGET OVERVIEW</span>

          <h2>Current Financial Position</h2>

          <div className="budget-number">
            ₹86 Lakh
          </div>

          <p>Amount utilised from current allocation</p>

          <div className="budget-progress">

            <div className="budget-progress-top">
              <span>Budget Utilisation</span>
              <strong>73%</strong>
            </div>

            <div className="budget-progress-bar">
              <span></span>
            </div>

          </div>

          <div className="budget-list">

            <div>
              <span>Total Allocation</span>
              <strong>₹118 L</strong>
            </div>

            <div>
              <span>Amount Spent</span>
              <strong>₹86 L</strong>
            </div>

            <div>
              <span>Remaining</span>
              <strong>₹32 L</strong>
            </div>

          </div>

        </div>

      </section>


      {/* ================= DEPARTMENT TABLE ================= */}

      <section className="department-section">

        <div className="section-heading">

          <div>
            <span className="chart-label">FIELD OPERATIONS</span>
            <h2>Department Performance</h2>
          </div>

          <span className="status-indicator">
            ● Monitoring Active
          </span>

        </div>


        <div className="department-table-wrapper">

          <table className="department-table">

            <thead>

              <tr>
                <th>Department</th>
                <th>Assigned</th>
                <th>Pending</th>
                <th>Completed</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td><strong>Road Maintenance</strong></td>

                <td>82</td>

                <td className="pending-number">21</td>

                <td>61</td>

                <td>

                  <div className="progress-wrapper">

                    <div className="progress-bar">
                      <span style={{ width: "74%" }}></span>
                    </div>

                    <strong>74%</strong>

                  </div>

                </td>

                <td>
                  <span className="department-status">Active</span>
                </td>

              </tr>


              <tr>

                <td><strong>Streetlight Division</strong></td>

                <td>46</td>

                <td className="pending-number">12</td>

                <td>34</td>

                <td>

                  <div className="progress-wrapper">

                    <div className="progress-bar">
                      <span style={{ width: "78%" }}></span>
                    </div>

                    <strong>78%</strong>

                  </div>

                </td>

                <td>
                  <span className="department-status">Active</span>
                </td>

              </tr>


              <tr>

                <td><strong>Drainage Department</strong></td>

                <td>55</td>

                <td className="pending-number">18</td>

                <td>37</td>

                <td>

                  <div className="progress-wrapper">

                    <div className="progress-bar">
                      <span style={{ width: "67%" }}></span>
                    </div>

                    <strong>67%</strong>

                  </div>

                </td>

                <td>
                  <span className="department-status">Active</span>
                </td>

              </tr>


              <tr>

                <td><strong>Traffic & Signage</strong></td>

                <td>38</td>

                <td className="pending-number">8</td>

                <td>30</td>

                <td>

                  <div className="progress-wrapper">

                    <div className="progress-bar">
                      <span style={{ width: "82%" }}></span>
                    </div>

                    <strong>82%</strong>

                  </div>

                </td>

                <td>
                  <span className="department-status">Active</span>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>


      {/* ================= BOTTOM INFORMATION ================= */}

      <section className="dashboard-bottom-grid">


        <div className="info-panel">

          <span className="panel-label">
            PRIORITY ACTION
          </span>

          <h3>
            Issues Requiring Immediate Attention
          </h3>


          <div className="priority-item">

            <span className="priority-dot high"></span>

            <div>
              <strong>High Severity</strong>

              <p>
                14 road issues require urgent field inspection.
              </p>
            </div>

          </div>


          <div className="priority-item">

            <span className="priority-dot medium"></span>

            <div>
              <strong>Medium Severity</strong>

              <p>
                28 issues are currently scheduled for action.
              </p>
            </div>

          </div>


          <div className="priority-item">

            <span className="priority-dot low"></span>

            <div>
              <strong>Low Severity</strong>

              <p>
                22 issues are currently in the normal service queue.
              </p>
            </div>

          </div>

        </div>


        <div className="info-panel">

          <span className="panel-label">
            SERVICE PERFORMANCE
          </span>

          <h3>
            Current Service Indicators
          </h3>


          <div className="indicator-row">

            <span>Average Response Time</span>

            <strong>2.4 Days</strong>

          </div>


          <div className="indicator-row">

            <span>Resolution Rate</span>

            <strong>63%</strong>

          </div>


          <div className="indicator-row">

            <span>Citizen Reports This Month</span>

            <strong>55</strong>

          </div>


          <div className="indicator-row">

            <span>Issues Under Review</span>

            <strong>31</strong>

          </div>

        </div>

      </section>


      <div className="dashboard-note">

        <strong>Public information:</strong>{" "}
        Figures shown on this dashboard represent the current
        status of road-related complaints and service activities.

      </div>

    </div>
  );
}

export default DashboardPage;