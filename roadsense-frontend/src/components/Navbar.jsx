import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Navbar.css";

function Navbar() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <header className="government-header">
      <div className="utility-bar">
        <div className="utility-left">
          <a href="#main-content" className="utility-link">{t.skip}</a>
          <span className="utility-divider">|</span>
          <a href="#main-content" className="utility-link">{t.screenReader}</a>
        </div>
        <div className="utility-right">
          <div className="language-controls" aria-label="Language controls">
            <button
              type="button"
              className={language === "en" ? "utility-button active-utility-button" : "utility-button"}
              onClick={() => changeLanguage("en")}
            >English</button>
            <button
              type="button"
              className={language === "hi" ? "utility-button active-utility-button" : "utility-button"}
              onClick={() => changeLanguage("hi")}
            >हिंदी</button>
          </div>
        </div>
      </div>

      <div className="government-band">
        <div className="government-brand">
          <img src="/emblem.webp" alt="National Emblem" className="emblem-logo" />
          <div className="government-title">
            <strong>{t.governmentHindi}</strong>
            <span>{t.governmentEnglish} <span className="india-flag">🇮🇳</span></span>
          </div>
          <div className="brand-divider"></div>
          <div className="roadsense-title">
            <strong>RoadSense</strong>
            <span>{t.platform}</span>
          </div>
        </div>

        <nav className="government-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? "gov-nav-link active-gov-link" : "gov-nav-link"}>{t.home}</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "gov-nav-link active-gov-link" : "gov-nav-link"}>{t.dashboard}</NavLink>
          <NavLink to="/report-issue" className={({ isActive }) => isActive ? "gov-nav-link active-gov-link" : "gov-nav-link"}>{t.reportIssue}</NavLink>
          <NavLink to="/my-reports" className={({ isActive }) => isActive ? "gov-nav-link active-gov-link" : "gov-nav-link"}>{t.myReports}</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "gov-nav-link active-gov-link" : "gov-nav-link"}>{t.about}</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "gov-nav-link active-gov-link" : "gov-nav-link"}>
  {t.contactUs}
</NavLink>
<NavLink to="/voice-upload" className={({ isActive }) => isActive ? "gov-nav-link active-gov-link" : "gov-nav-link"}>
  Voice Upload
</NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? "government-login-button active-government-login" : "government-login-button"}>{t.login}</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;