// dieselsupply.js
import React from "react";
import "./dieselsupply.css";
import {
  pageHeader,
  services,
  serve,
  strengths,
  onsite,
  bulk,
  cta,
} from "./dieselsupplydata";

// Shows an image if `img` is given, otherwise the Font Awesome icon.
const Icon = ({ icon, img, alt = "" }) =>
  img ? (
    <img src={img} alt={alt} className="ds-icon-img" loading="lazy" />
  ) : (
    <i className={icon} aria-hidden="true" />
  );

const DieselSupply = () => {
  return (
    <section className="ds-section" id="diesel-supply-fuel-station">
      {/* ===== Page header ===== */}
      <div className="ds-hero">
        <div className="ds-wrap">
          <nav className="ds-breadcrumb" aria-label="Breadcrumb">
            {pageHeader.breadcrumb.map((b, i) => (
              <React.Fragment key={b.label}>
                {i > 0 && <i className="fa-solid fa-chevron-right" aria-hidden="true" />}
                {b.href ? <a href={b.href}>{b.label}</a> : <span>{b.label}</span>}
              </React.Fragment>
            ))}
          </nav>
          <span className="ds-eyebrow">{pageHeader.eyebrow}</span>
          <h1 className="ds-title">
            {pageHeader.title} <span>{pageHeader.highlight}</span>
          </h1>
          <p className="ds-subtitle">{pageHeader.subtitle}</p>
        </div>
      </div>

      <div className="ds-wrap ds-body">
        {/* ===== Services ===== */}
        <div className="ds-services">
          {services.map((s, i) => (
            <article className={`ds-service ${i % 2 ? "is-reverse" : ""}`} key={s.id}>
              <div className={`ds-visual ${s.img ? "has-img" : ""}`}>
                {s.img ? (
                  <img src={s.img} alt={s.title} loading="lazy" />
                ) : (
                  <Icon icon={s.icon} alt={s.title} />
                )}
                <span className="ds-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="ds-service-body">
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

        {/* ===== Who we fuel ===== */}
        <div className="ds-modes">
          <div className="ds-modes-text">
            <h3>{serve.title}</h3>
            <p>{serve.intro}</p>
          </div>
          <div className="ds-mode-list">
            {serve.list.map((m) => (
              <div className="ds-mode" key={m.label}>
                <Icon icon={m.icon} img={m.img} alt={m.label} />
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Strengths ===== */}
        <div>
          <h3 className="ds-heading">
            <i className="fa-solid fa-star" aria-hidden="true" /> {strengths.title}
          </h3>
          <div className="ds-strengths">
            {strengths.list.map((s) => (
              <div className="ds-strength" key={s.title}>
                <div className="ds-strength-icon">
                  <Icon icon={s.icon} img={s.img} alt={s.title} />
                </div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== On-site refueling ===== */}
        <div className="ds-fleet">
          <div className="ds-fleet-head">
            <h3>
              <i className="fa-solid fa-truck-droplet" aria-hidden="true" /> {onsite.title}
            </h3>
            <p>{onsite.subtitle}</p>
          </div>
          <div className="ds-fleet-list">
            {onsite.items.map((f) => (
              <div className="ds-fleet-item" key={f.name}>
                <Icon icon={f.icon} img={f.img} alt={f.name} />
                <span>{f.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Bulk ===== */}
        <div className="ds-trusted">
          <h3 className="ds-heading ds-heading--dark">
            <i className="fa-solid fa-boxes-stacked" aria-hidden="true" /> {bulk.title}
          </h3>
          <div className="ds-trusted-list">
            {bulk.list.map((c) => (
              <span className="ds-client" key={c}>
                <i className="fa-solid fa-flask" aria-hidden="true" />
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="ds-cta">
          <div>
            <h3>{cta.title}</h3>
            <p>{cta.text}</p>
            <div className="ds-cta-contact">
              <span>
                <i className="fa-solid fa-phone" aria-hidden="true" /> {cta.phone}
              </span>
              <span>
                <i className="fa-solid fa-envelope" aria-hidden="true" /> {cta.email}
              </span>
            </div>
          </div>
          <a className="ds-btn" href={cta.buttonHref}>
            {cta.buttonLabel} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DieselSupply;