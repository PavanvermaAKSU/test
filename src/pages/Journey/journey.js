// journey.js
import React, { useEffect, useRef } from "react";
import "./journey.css";
import {
  journeyHeader,
  milestones,
  growth,
  journeyHighlights,
} from "./journeydata";

// Shows an image if `img` is given, otherwise the Font Awesome icon.
const Icon = ({ icon, img, alt = "" }) =>
  img ? (
    <img src={img} alt={alt} className="jr-icon-img" loading="lazy" />
  ) : (
    <i className={icon} aria-hidden="true" />
  );

const Journey = () => {
  const rootRef = useRef(null);

  // Reveal items as they scroll into view (falls back to visible if unsupported)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const items = root.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="jr-section" id="company-journey" ref={rootRef}>
      <div className="jr-wrap">
        {/* ===== Header ===== */}
        <div className="jr-head">
          <span className="jr-eyebrow">{journeyHeader.eyebrow}</span>
          <h2 className="jr-title">
            {journeyHeader.title} <span>{journeyHeader.highlight}</span>
          </h2>
          <p className="jr-subtitle">{journeyHeader.subtitle}</p>
        </div>

        {/* ===== Highlights ===== */}
        <div className="jr-highlights">
          {journeyHighlights.map((h) => (
            <div className="jr-highlight" key={h.label}>
              <Icon className={h.icon} img={h.img}  />
              <div>
                <strong>{h.value}</strong>
                <span>{h.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Timeline ===== */}
        <ol className="jr-timeline">
          {milestones.map((m, i) => (
            <li
              className={`jr-item ${i % 2 === 0 ? "is-left" : "is-right"}`}
              key={m.year}
              data-reveal
            >
              <div className="jr-node">
                <Icon icon={m.icon} img={m.img} alt={m.title} />
              </div>
              <div className="jr-card">
                <span className="jr-year">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* ===== Turnover growth ===== */}
        <div className="jr-growth" data-reveal>
          <div className="jr-growth-head">
            <h3>
              <i className="fa-solid fa-chart-column" aria-hidden="true" /> {growth.title}
            </h3>
            <span>
              {growth.unit} • {growth.note}
            </span>
          </div>

          <div className="jr-bars">
            {growth.bars.map((b) => (
              <div className={`jr-bar-col ${b.projected ? "is-projected" : ""}`} key={b.label}>
                <div className="jr-bar-value">
                  ₹{b.value}
                  {b.projected && <small>Projected</small>}
                </div>
                <div className="jr-bar-track">
                  <div
                    className="jr-bar"
                    style={{ "--jr-h": `${(b.value / growth.max) * 100}%` }}
                  />
                </div>
                <div className="jr-bar-label">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;