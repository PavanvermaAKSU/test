// autoparts.js
import React from "react";
import "./autoparts.css";
import { pageHeader, categories, cta } from "./autopartsdata";

// Shows an image if `img` is given, otherwise the Font Awesome icon.
const Icon = ({ icon, img, alt = "" }) =>
  img ? (
    <img src={img} alt={alt} className="ap-icon-img" loading="lazy" />
  ) : (
    <i className={icon} aria-hidden="true" />
  );

const AutoParts = () => {
  return (
    <section className="ap-section" id="auto-parts-lubricants">
      {/* ===== Page header ===== */}
      <div className="ap-hero">
        <div className="ap-wrap">
          <nav className="ap-breadcrumb" aria-label="Breadcrumb">
            {pageHeader.breadcrumb.map((b, i) => (
              <React.Fragment key={b.label}>
                {i > 0 && <i className="fa-solid fa-chevron-right" aria-hidden="true" />}
                {b.href ? <a href={b.href}>{b.label}</a> : <span>{b.label}</span>}
              </React.Fragment>
            ))}
          </nav>
          <span className="ap-eyebrow">{pageHeader.eyebrow}</span>
          <h1 className="ap-title">
            {pageHeader.title} <span>{pageHeader.highlight}</span>
          </h1>
          <p className="ap-subtitle">{pageHeader.subtitle}</p>
        </div>
      </div>

      <div className="ap-wrap ap-body">
        {/* ===== Quick jump chips ===== */}
        <nav className="ap-jump" aria-label="Categories">
          {categories.map((c) => (
            <a href={`#ap-${c.id}`} key={c.id}>
              <Icon icon={c.icon} img={c.img} alt="" />
              {c.title.replace(" Supplier", "")}
            </a>
          ))}
        </nav>

        {/* ===== Categories ===== */}
        <div className="ap-grid">
          {categories.map((c) => (
            <article
              className={`ap-cat ${c.wide ? "is-wide" : ""}`}
              id={`ap-${c.id}`}
              key={c.id}
            >
              <header className="ap-cat-head">
                <div className="ap-cat-icon">
                  <Icon icon={c.icon} img={c.img} alt={c.title} />
                </div>
                <h2>{c.title}</h2>
                <span className="ap-count">{c.items.length}</span>
              </header>

              <div className="ap-items">
                {c.items.map((it) => (
                  <div className="ap-item" key={it.name}>
                    <div className="ap-thumb">
                      {it.img ? (
                        <img src={it.img} alt={it.name} loading="lazy" />
                      ) : (
                        <i className={c.icon} aria-hidden="true" />
                      )}
                    </div>
                    <span className="ap-name">{it.name}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* ===== CTA ===== */}
        <div className="ap-cta">
          <div>
            <h3>{cta.title}</h3>
            <p>{cta.text}</p>
            <div className="ap-cta-contact">
              <span>
                <i className="fa-solid fa-phone" aria-hidden="true" /> {cta.phone}
              </span>
              <span>
                <i className="fa-solid fa-envelope" aria-hidden="true" /> {cta.email}
              </span>
            </div>
          </div>
          <a className="ap-btn" href={cta.buttonHref}>
            {cta.buttonLabel} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AutoParts;