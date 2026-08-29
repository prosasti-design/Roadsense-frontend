import { useLanguage } from "../context/LanguageContext";


function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroSubtitle}</p>
        <div className="hero-actions">
          <a href="/report-issue" className="hero-primary-button">{t.heroPrimary}</a>
          <a href="/dashboard" className="hero-secondary-button">{t.heroSecondary}</a>
        </div>
      </section>

      <section className="problem-section">
        <h2>{t.problemTitle}</h2>
        <p>{t.problemText}</p>
      </section>

      <section className="how-section">
        <h2>{t.howTitle}</h2>
        <div className="how-steps">
          <div className="how-step">
            <span className="step-number">1</span>
            <h3>{t.howStep1Title}</h3>
            <p>{t.howStep1Text}</p>
          </div>
          <div className="how-step">
            <span className="step-number">2</span>
            <h3>{t.howStep2Title}</h3>
            <p>{t.howStep2Text}</p>
          </div>
          <div className="how-step">
            <span className="step-number">3</span>
            <h3>{t.howStep3Title}</h3>
            <p>{t.howStep3Text}</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2>{t.statsTitle}</h2>
        <div className="stats-grid">
          <div className="stat-card"><span className="stat-value">248</span><span>{t.totalReports}</span></div>
          <div className="stat-card"><span className="stat-value">156</span><span>{t.resolved}</span></div>
          <div className="stat-card"><span className="stat-value">62</span><span>{t.inProgress}</span></div>
          <div className="stat-card"><span className="stat-value">30</span><span>{t.pending}</span></div>
        </div>
      </section>
    </div>
  );
}

export default Home;