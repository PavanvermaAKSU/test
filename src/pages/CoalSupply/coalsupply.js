// coalsupply.js
import React from "react";
import "./coalsupply.css";
import {
  pageHeader,
  services,
  modes,
  strengths,
  fleet,
  trusted,
  cta,
} from "./coalsupplydata";

// Shows an image if `img` is given, otherwise the Font Awesome icon.
const Icon = ({ icon, img, alt = "" }) =>
  img ? (
    <img src={img} alt={alt} className="cs-icon-img" loading="lazy" />
  ) : (
    <i className={icon} aria-hidden="true" />
  );

const CoalSupply = () => {
  return (
    <section className="cs-section" id="coal-supply-transportation">
      {/* ===== Page header ===== */}
      <div className="cs-hero">
        <div className="cs-wrap">
          <nav className="cs-breadcrumb" aria-label="Breadcrumb">
            {pageHeader.breadcrumb.map((b, i) => (
              <React.Fragment key={b.label}>
                {i > 0 && <i className="fa-solid fa-chevron-right" aria-hidden="true" />}
                {b.href ? <a href={b.href}>{b.label}</a> : <span>{b.label}</span>}
              </React.Fragment>
            ))}
          </nav>
          <span className="cs-eyebrow">{pageHeader.eyebrow}</span>
          <h1 className="cs-title">
            {pageHeader.title} <span>{pageHeader.highlight}</span>
          </h1>
          <p className="cs-subtitle">{pageHeader.subtitle}</p>
        </div>
      </div>

      <div className="cs-wrap cs-body">
        {/* ===== Services (alternating rows on desktop) ===== */}
        <div className="cs-services">
          {services.map((s, i) => (
            <article className={`cs-service ${i % 2 ? "is-reverse" : ""}`} key={s.id}>
              <div className={`cs-visual ${s.img ? "has-img" : ""}`}>
                {s.img ? (
                  <img src={s.img} alt={s.title} loading="lazy" />
                ) : (
                  <Icon icon={s.icon} alt={s.title} />
                )}
                <span className="cs-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="cs-service-body">
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

        {/* ===== Transport network ===== */}
        <div className="cs-modes">
          <div className="cs-modes-text">
            <h3>{modes.title}</h3>
            <p>{modes.intro}</p>
          </div>
          <div className="cs-mode-list">
            {modes.list.map((m, i) => (
              <React.Fragment key={m.label}>
                {i > 0 && <i className="fa-solid fa-plus cs-plus" aria-hidden="true" />}
                <div className="cs-mode">
                  <Icon icon={m.icon} img={m.img} alt={m.label} />
                  <span>{m.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ===== Strengths ===== */}
        <div>
          <h3 className="cs-heading">
            <i className="fa-solid fa-star" aria-hidden="true" /> {strengths.title}
          </h3>
          <div className="cs-strengths">
            {strengths.list.map((s) => (
              <div className="cs-strength" key={s.title}>
                <div className="cs-strength-icon">
                  <Icon icon={s.icon} img={s.img} alt={s.title} />
                </div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Fleet ===== */}
        <div className="cs-fleet">
          <div className="cs-fleet-head">
            <h3>
              <i className="fa-solid fa-truck-monster" aria-hidden="true" /> {fleet.title}
            </h3>
            <p>{fleet.subtitle}</p>
          </div>
          <div className="cs-fleet-list">
            {fleet.items.map((f) => (
              <div className="cs-fleet-item" key={f.name}>
                <Icon icon={f.icon} img={f.img} alt={f.name} />
                <span>{f.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Trusted by ===== */}
        <div className="cs-trusted">
          <h3 className="cs-heading cs-heading--dark">
            <i className="fa-solid fa-building-user" aria-hidden="true" /> {trusted.title}
          </h3>
          <div className="cs-trusted-list">
            {trusted.list.map((c) => (
              <span className="cs-client" key={c}>
                <i className="fa-solid fa-industry" aria-hidden="true" />
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="cs-cta">
          <div>
            <h3>{cta.title}</h3>
            <p>{cta.text}</p>
            <div className="cs-cta-contact">
              <span>
                <i className="fa-solid fa-phone" aria-hidden="true" /> {cta.phone}
              </span>
              <span>
                <i className="fa-solid fa-envelope" aria-hidden="true" /> {cta.email}
              </span>
            </div>
          </div>
          <a className="cs-btn" href={cta.buttonHref}>
            {cta.buttonLabel} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CoalSupply;