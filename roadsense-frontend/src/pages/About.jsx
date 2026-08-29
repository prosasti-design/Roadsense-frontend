import { useLanguage } from "../context/LanguageContext";

function About() {
  const { t } = useLanguage();

  return (
    <div className="about-section">
      <h1>{t.aboutTitle}</h1>
      <p>{t.aboutIntro}</p>

      <h2>{t.missionTitle}</h2>
      <p>{t.missionText}</p>

      <h2>{t.teamTitle}</h2>
      <p>{t.teamText}</p>
    </div>
  );
}

export default About;