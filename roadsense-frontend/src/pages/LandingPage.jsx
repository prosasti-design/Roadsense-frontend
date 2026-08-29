import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">

      {/* HERO SECTION */}
      <section className="landing-hero">

        <div className="hero-content">

          <div className="hero-left">

            <span className="hero-badge">
              SMARTER ROADS, SAFER COMMUNITIES
            </span>

            <h1>
              Detect. Report.
              <br />
              Track. <span>Fixed.</span>
            </h1>

            <p>
              RoadSense helps citizens report road problems and helps
              authorities monitor, prioritize and resolve them efficiently.
            </p>

            <div className="hero-buttons">
              <Link to="/report-issue" className="primary-button">
                Report an Issue →
              </Link>

              <Link to="/dashboard" className="secondary-button">
                View Dashboard
              </Link>
            </div>

            <div className="hero-trust">

              <div className="trust-item">
                <span className="trust-icon secure-icon">✓</span>
                <span>Secure</span>
              </div>

              <div className="trust-item">
                <span className="trust-icon realtime-icon">⚡</span>
                <span>Real-time</span>
              </div>

              <div className="trust-item">
                <span className="trust-icon citizen-icon">♙</span>
                <span>Citizen Driven</span>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="hero-image-container">

            <div className="image-background-circle"></div>

            <img
              src="/road.jpeg"
              alt="RoadSense road infrastructure platform"
              className="landing-road-image"
            />

          </div>

        </div>

      </section>


      {/* KEY FEATURES */}
      <section className="features-section">

        <div className="section-heading">

          <span className="section-badge">
            KEY FEATURES
          </span>

          <h2>
            Everything You Need in One Platform
          </h2>

          <p>
            RoadSense brings together citizens, authorities and road
            information to support better road management.
          </p>

        </div>


        <div className="feature-cards">

          <div className="feature-card">

            <div className="feature-icon blue-feature">
              ☷
            </div>

            <div>
              <h3>10K+</h3>
              <h4>Issues Reported</h4>
              <p>
                Road problems reported by citizens across multiple locations.
              </p>
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon green-feature">
              ✓
            </div>

            <div>
              <h3>8K+</h3>
              <h4>Issues Resolved</h4>
              <p>
                Reported issues successfully handled through authority action.
              </p>
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon yellow-feature">
              ♟
            </div>

            <div>
              <h3>500+</h3>
              <h4>Active Users</h4>
              <p>
                Citizens, government officials and field workers.
              </p>
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon purple-feature">
              ↗
            </div>

            <div>
              <h3>95%</h3>
              <h4>Satisfaction Rate</h4>
              <p>
                Better communication between citizens and authorities.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* SERVICE FEATURES */}
      <section className="service-section">

        <div className="section-heading">

          <span className="section-badge">
            CITIZEN SERVICES
          </span>

          <h2>
            Simple. Transparent. Accessible.
          </h2>

          <p>
            Citizens can access important road services from one place.
          </p>

        </div>


        <div className="service-grid">

          <div className="service-card">

            <div className="service-number">01</div>

            <div className="service-icon">📷</div>

            <h3>Report Road Issue</h3>

            <p>
              Report potholes, damaged roads, waterlogging and other
              infrastructure problems.
            </p>

            <Link to="/report-issue">
              Report Issue →
            </Link>

          </div>


          <div className="service-card">

            <div className="service-number">02</div>

            <div className="service-icon">🔎</div>

            <h3>Track Complaint</h3>

            <p>
              Check the current status and progress of complaints submitted
              by you.
            </p>

            <Link to="/my-reports">
              Track Complaint →
            </Link>

          </div>


          <div className="service-card">

            <div className="service-number">03</div>

            <div className="service-icon">🗺</div>

            <h3>Live Road Map</h3>

            <p>
              View reported road issues and their status across the road
              network.
            </p>

            <Link to="/live-map">
              View Live Map →
            </Link>

          </div>


          <div className="service-card">

            <div className="service-number">04</div>

            <div className="service-icon">📊</div>

            <h3>Public Dashboard</h3>

            <p>
              View public information about reported issues and resolution
              progress.
            </p>

            <Link to="/dashboard">
              Open Dashboard →
            </Link>

          </div>

        </div>

      </section>


      {/* WORKFLOW */}
      <section className="workflow-section">

        <div className="workflow-text">

          <span className="section-badge">
            HOW IT WORKS
          </span>

          <h2>
            From Complaint to Resolution
          </h2>

          <p>
            RoadSense provides a clear process so citizens can understand
            what happens after they report a road problem.
          </p>

        </div>


        <div className="workflow-cards">

          <div className="workflow-card">
            <span>01</span>
            <h3>Submit</h3>
            <p>
              Citizen submits the road issue with location and details.
            </p>
          </div>

          <div className="workflow-card">
            <span>02</span>
            <h3>Verify</h3>
            <p>
              The concerned authority reviews and verifies the complaint.
            </p>
          </div>

          <div className="workflow-card">
            <span>03</span>
            <h3>Action</h3>
            <p>
              The issue is assigned to the appropriate department or team.
            </p>
          </div>

          <div className="workflow-card">
            <span>04</span>
            <h3>Resolve</h3>
            <p>
              Progress is updated until the issue is successfully resolved.
            </p>
          </div>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="landing-cta">

        <div className="cta-icon">
          🛡
        </div>

        <div className="cta-text">
          <h2>
            Together, let's build better roads for a better tomorrow.
          </h2>

          <p>
            Report issues, track progress and help make your city safer.
          </p>
        </div>

        <Link to="/report-issue" className="cta-button">
          Get Started →
        </Link>

      </section>

    </div>
  );
}

export default LandingPage;