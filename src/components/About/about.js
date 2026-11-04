
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { aboutData } from "./aboutdata";
import "./about.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-image-wrapper">
          <img
            src={aboutData.image}
            alt={aboutData.imageAlt}
            className="about-image"
            loading="lazy"
          />

          <div className="about-image-caption">
            <span className="about-caption-line" />
            <span>Industrial Solutions & Services</span>
          </div>
        </div>

        <div className="about-content">
          <div className="about-eyebrow">
            <span />
            {aboutData.eyebrow}
          </div>

          <h2 className="about-title">
            {aboutData.title}{" "}
            <span>{aboutData.highlightedTitle}</span>
          </h2>

          <p className="about-description">
            {aboutData.description}
          </p>

          <p className="about-secondary">
            {aboutData.secondaryDescription}
          </p>

          <div className="about-highlights">
            {aboutData.highlights.map((item) => (
              <div className="about-highlight" key={item.number}>
                <div className="about-highlight-icon">
                  <CheckCircle2 size={19} />
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={aboutData.buttonHref}
            className="about-button"
          >
            {aboutData.buttonLabel}
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
