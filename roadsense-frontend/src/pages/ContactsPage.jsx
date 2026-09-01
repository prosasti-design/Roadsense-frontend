import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./ContactsPage.css";

function ContactsPage() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="contacts-page">
      <header className="contacts-header">
        <h1>{t.contactTitle}</h1>
        <p>{t.contactIntro}</p>
      </header>

      <div className="contacts-grid">
        <div className="contact-info">
          <h2>{t.contactInfoTitle}</h2>

          <div className="contact-item">
            <strong>{t.email}</strong>
            <p>roadsense.team@example.com</p>
          </div>

          <div className="contact-item">
            <strong>{t.phone}</strong>
            <p>+91 90000 00000</p>
          </div>

          <div className="contact-item">
            <strong>{t.address}</strong>
            <p>RoadSense Team, Kolkata, West Bengal, India</p>
          </div>

          <div className="contact-item">
            <strong>{t.helpline}</strong>
            <p>1800 000 0000 ({t.tollFree})</p>
          </div>
        </div>

        <div className="contact-form-box">
          <h2>{t.feedbackTitle}</h2>

          {sent ? (
            <p className="contact-success">{t.feedbackSent}</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="contact-field">
                <label>{t.fullName}</label>
                <input type="text" required />
              </div>

              <div className="contact-field">
                <label>{t.email}</label>
                <input type="email" required />
              </div>

              <div className="contact-field">
                <label>{t.subject}</label>
                <input type="text" required />
              </div>

              <div className="contact-field">
                <label>{t.message}</label>
                <textarea rows="5" required />
              </div>

              <button type="submit" className="contact-submit">
                {t.sendMessage}
              </button>
            </form>
          )}
        </div>
      </div>

      <section className="faq-section">
        <h2>{t.faqTitle}</h2>

        <div className="faq-item">
          <h3>{t.faq1q}</h3>
          <p>{t.faq1a}</p>
        </div>

        <div className="faq-item">
          <h3>{t.faq2q}</h3>
          <p>{t.faq2a}</p>
        </div>

        <div className="faq-item">
          <h3>{t.faq3q}</h3>
          <p>{t.faq3a}</p>
        </div>
      </section>
    </div>
  );
}

export default ContactsPage;