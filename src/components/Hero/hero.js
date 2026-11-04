
import { ArrowRight, MoveDown } from "lucide-react";
import "./hero.css";

const heroFeatures = [
  {
    number: "01",
    title: "Mining & Earthwork",
    description: "Industrial operations",
  },
  {
    number: "02",
    title: "Coal Supply",
    description: "Supply & transportation",
  },
  {
    number: "03",
    title: "Auto & Lubricants",
    description: "Parts & products",
  },
];

function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background video */}
      {/* Background video */}
    <video
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src="/images/minebg.mp4" type="video/mp4" />
    </video>

{/* Dark overlay */}
    <div className="hero-overlay" />

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span>INDUSTRIAL SOLUTIONS & RESOURCE MANAGEMENT</span>
          </div>

          <h1 className="hero-title">
            Powering Progress
            <br />
            Through <span>Reliable Resources.</span>
          </h1>

          <p className="hero-description">
            From mining and earthwork to coal supply, transportation,
            diesel, automotive parts and lubricants — we deliver
            dependable solutions that keep businesses moving forward.
          </p>

          <div className="hero-actions">
            <a href="/services" className="hero-button hero-button-primary">
              Explore Our Services
              <ArrowRight size={18} />
            </a>

            <a href="#contact" className="hero-button hero-button-secondary">
              Contact Our Team
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="hero-trust">
            <span className="hero-trust-dot" />
            <span>Reliable Partnerships. Dependable Solutions.</span>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-features">
            {heroFeatures.map((feature) => (
              <div className="hero-feature" key={feature.number}>
                <span className="hero-feature-number">
                  {feature.number}
                </span>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#about" className="hero-scroll">
            <span>DISCOVER SAMARVEER</span>
            <MoveDown size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
