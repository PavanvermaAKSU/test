// miningearthwork.js
import React from "react";
import "./earthwork.css";
import { pageHeader, services, stages, fleet, cta } from "./earthworkdata";

// Shows an image if `img` is given, otherwise the Font Awesome icon.
const Icon = ({ icon, img, alt = "" }) =>
  img ? (
    <img src={img} alt={alt} className="me-icon-img" loading="lazy" />
  ) : (
    <i className={icon} aria-hidden="true" />
  );

const MiningEarthwork = () => {
  return (
    <section className="me-section" id="mining-earthwork">
      {/* ===== Page header ===== */}
      <div className="me-hero">
        <div className="me-wrap">
          <nav className="me-breadcrumb" aria-label="Breadcrumb">
            {pageHeader.breadcrumb.map((b, i) => (
              <React.Fragment key={b.label}>
                {i > 0 && <i className="fa-solid fa-chevron-right" aria-hidden="true" />}
                {b.href ? <a href={b.href}>{b.label}</a> : <span>{b.label}</span>}
              </React.Fragment>
            ))}
          </nav>
          <span className="me-eyebrow">{pageHeader.eyebrow}</span>
          <h1 className="me-title">
            {pageHeader.title} <span>{pageHeader.highlight}</span>
          </h1>
          <p className="me-subtitle">{pageHeader.subtitle}</p>
        </div>
      </div>

      <div className="me-wrap me-body">
        {/* ===== Service cards ===== */}
        <div className="me-grid">
          {services.map((s, i) => (
            <article className="me-card" key={s.id}>
              <div className={`me-visual ${s.img ? "has-img" : ""}`}>
                {s.img ? (
                  <img src={s.img} alt={s.title} loading="lazy" />
                ) : (
                  <Icon icon={s.icon} alt={s.title} />
                )}
                <span className="me-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="me-card-body">
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>
                      <i className="fa-solid fa-circle-check" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* ===== Mining stages ===== */}
        <div className="me-stages">
          <div className="me-stages-text">
            <h3>{stages.title}</h3>
            <p>{stages.intro}</p>
          </div>
          <div className="me-stage-list">
            {stages.list.map((st, i) => (
              <React.Fragment key={st.label}>
                {i > 0 && <i className="fa-solid fa-arrow-right me-arrow" aria-hidden="true" />}
                <div className="me-stage">
                  <i className={st.icon} aria-hidden="true" />
                  <span>{st.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ===== Fleet ===== */}
        <div className="me-fleet">
          <div className="me-fleet-head">
            <h3>
              <i className="fa-solid fa-truck-monster" aria-hidden="true" /> {fleet.title}
            </h3>
            <p>{fleet.subtitle}</p>
          </div>
          <div className="me-fleet-list">
            {fleet.items.map((f) => (
              <div className="me-fleet-item" key={f.name}>
                <Icon icon={f.icon} img={f.img} alt={f.name} />
                <span>{f.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="me-cta">
          <div>
            <h3>{cta.title}</h3>
            <p>{cta.text}</p>
            <div className="me-cta-contact">
              <span>
                <i className="fa-solid fa-phone" aria-hidden="true" /> {cta.phone}
              </span>
              <span>
                <i className="fa-solid fa-envelope" aria-hidden="true" /> {cta.email}
              </span>
            </div>
          </div>
          <a className="me-btn" href={cta.buttonHref}>
            {cta.buttonLabel} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MiningEarthwork;