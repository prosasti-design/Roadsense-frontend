import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="government-footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h4>RoadSense</h4>
          <p>{t.footerAbout}</p>
        </div>
        <div className="footer-column">
          <h4>{t.quickLinksTitle}</h4>
          <ul>
            <li><a href="/">{t.home}</a></li>
            <li><a href="/dashboard">{t.dashboard}</a></li>
            <li><a href="/report-issue">{t.reportIssue}</a></li>
            <li><a href="/about">{t.about}</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>{t.supportTitle}</h4>
          <ul>
            <li><a href="#">{t.helpFaq}</a></li>
            <li><a href="#">{t.feedback}</a></li>
            <li><a href="#">{t.contactUs}</a></li>
            <li><a href="#">{t.accessibility}</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>{t.policiesTitle}</h4>
          <ul>
            <li><a href="#">{t.privacy}</a></li>
            <li><a href="#">{t.terms}</a></li>
            <li><a href="#">{t.dataNotice}</a></li>
            <li><a href="#">{t.sitemap}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t.lastUpdated}: 28 August 2026</span>
        <span>{t.version}</span>
        <span>© 2026 RoadSense. {t.allRights}</span>
      </div>
    </footer>
  );
}

export default Footer;