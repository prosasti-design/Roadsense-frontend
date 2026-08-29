import { Link } from "react-router-dom";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <p className="about-eyebrow">ABOUT ROADSENSE</p>

        <h1>
          Building safer roads through
          <span> visible, actionable data.</span>
        </h1>

        <p>
          RoadSense is a digital road-monitoring platform designed to connect
          citizens and authorities through structured issue reporting,
          transparent status updates, and data-driven road maintenance.
        </p>
      </section>

      <section className="about-grid">
        <article className="about-card mission-card">
          <span className="about-card-number">01</span>
          <h2>Our Mission</h2>
          <p>
            Make road infrastructure problems easier to report, prioritize,
            track, and resolve using one connected digital platform.
          </p>
        </article>

        <article className="about-card">
          <span className="about-card-number">02</span>
          <h2>The Problem</h2>
          <p>
            Potholes, flooding, road cracks, damaged signs, and streetlight
            failures are often reported through disconnected channels. This
            makes tracking and prioritization difficult.
          </p>
        </article>

        <article className="about-card">
          <span className="about-card-number">03</span>
          <h2>Our Solution</h2>
          <p>
            RoadSense converts every complaint into a structured digital issue
            record with location, severity, evidence, and a transparent
            progress timeline.
          </p>
        </article>
      </section>

      <section className="about-workflow">
        <div className="about-workflow-text">
          <p className="about-eyebrow">HOW ROADSENSE WORKS</p>

          <h2>A connected citizen-to-authority workflow.</h2>

          <p>
            The platform gives citizens an easy way to report road issues while
            giving government teams a control panel to analyze, update, and
            prioritize the reports.
          </p>

          <Link to="/signup" className="about-main-button">
            Join RoadSense
            <span>→</span>
          </Link>
        </div>

        <div className="about-flow-list">
          <div className="about-flow-item">
            <span>01</span>
            <div>
              <h3>Citizen Reports</h3>
              <p>
                Road issues are submitted with type, severity, location, GPS
                details, and optional image evidence.
              </p>
            </div>
          </div>

          <div className="about-flow-item">
            <span>02</span>
            <div>
              <h3>Authority Reviews</h3>
              <p>
                Government officials assess issue severity, update workflow
                status, and focus resources on critical locations.
              </p>
            </div>
          </div>

          <div className="about-flow-item">
            <span>03</span>
            <div>
              <h3>Transparent Resolution</h3>
              <p>
                Citizens can view report progress and officials maintain a
                digital operational record for accountability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;