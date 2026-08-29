import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import ReportIssuePage from "./pages/ReportIssuePage";
import MyReportsPage from "./pages/MyReportsPage";
import IssueDetailPage from "./pages/IssueDetailPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminDashboard from "./pages/AdminDashboard";
import CitizenPortal from "./pages/CitizenPortal";
import LiveMapPage from "./pages/LiveMapPage";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Navbar />

        <main
          id="main-content"
          className="main-content"
          tabIndex="-1"
        >
          <Routes>
            {/* LANDING PAGE */}
            <Route path="/" element={<LandingPage />} />

            {/* OLD HOME PAGE */}
            <Route path="/home" element={<Home />} />

            {/* LANDING PAGE */}
            <Route path="/landing" element={<LandingPage />} />

            {/* DASHBOARD */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* CITIZEN */}
            <Route
              path="/report-issue"
              element={<ReportIssuePage />}
            />

            <Route
              path="/my-reports"
              element={<MyReportsPage />}
            />

            <Route
              path="/issue/:id"
              element={<IssueDetailPage />}
            />

            {/* GENERAL */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* AUTHORITY */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/citizen" element={<CitizenPortal />} />
            <Route path="/live-map" element={<LiveMapPage />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </LanguageProvider>
  );
}

export default App;