import React from "react";
import { Link } from "react-router-dom";
import { mtContent as c } from "./data";
import "./miningandtransportation.css";
import SEO from "../../components/SEO/SEO";

const Icon = ({ cls }) => <i className={cls} aria-hidden="true" />;

const MiningTransportation = () => (
 <>
  <SEO
    title="Mining & Transportation Solutions | SamarveerGroups"
    description="India's Best Mining and Transportation Solution Provide, Delivering integrated mining, earthwork, coal supply and transportation solutions with a focus on operational efficiency, dependable execution and industrial requirements."
    path="/mining-transportation"
  />

  <main className="mt-section">
    {/* ---------- Hero ---------- */}
    <header className="mt-hero">
      {c.heroImage && (
        <img className="mt-hero-img" src={c.heroImage.src} alt="" aria-hidden="true" />
      )}
      <div className="mt-wrap mt-hero-grid">
        <div className="mt-hero-text">
          <nav className="mt-breadcrumb" aria-label="Breadcrumb">
            <Link to={c.breadcrumb.home.to}>{c.breadcrumb.home.label}</Link>
            <Icon cls="fa-solid fa-chevron-right" />
            <span>{c.breadcrumb.current}</span>
          </nav>

          <span className="mt-eyebrow">{c.eyebrow}</span>
          <h1 className="mt-title">
            {c.titleTop} <span>{c.titleAccent}</span>
          </h1>
          <p className="mt-subtitle">{c.subtitle}</p>

          <div className="mt-hero-ctas">
            {c.heroCtas.map((b) =>
              b.to ? (
                <Link key={b.label} to={b.to} className={`mt-btn mt-btn--${b.variant}`}>
                  {b.label} <Icon cls={b.icon} />
                </Link>
              ) : (
                <a key={b.label} href={b.href} className={`mt-btn mt-btn--${b.variant}`}>
                  {b.label} <Icon cls={b.icon} />
                </a>
              )
            )}
          </div>
        </div>

        <ul className="mt-hero-stats">
          {c.heroStats.map((s) => (
            <li key={s.label} className="mt-hero-stat">
              <span className="mt-hero-stat-icon"><Icon cls={s.icon} /></span>
              <div>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </header>

    <div className="mt-wrap mt-body">
      {/* ---------- Value chain ---------- */}
      <section aria-labelledby="mt-chain-title">
        <div className="mt-head">
          <h2 className="mt-heading" id="mt-chain-title">{c.chain.heading}</h2>
          <p className="mt-intro">{c.chain.intro}</p>
        </div>
        <ol className="mt-chain">
          {c.chain.steps.map((s, i) => (
            <li key={s.title} className="mt-step">
              <span className="mt-step-icon"><Icon cls={s.icon} /></span>
              <div>
                <span className="mt-step-tag">{`0${i + 1} · ${s.tag}`}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Service cards (links to the 3 landing pages) ---------- */}
      <section id="mt-services" className="mt-anchor" aria-labelledby="mt-services-title">
        <div className="mt-head">
          <h2 className="mt-heading" id="mt-services-title">{c.servicesHeading}</h2>
          <p className="mt-intro">{c.servicesIntro}</p>
        </div>

        <div className="mt-grid">
          {c.services.map((s) => (
            <Link key={s.to} to={s.to} className="mt-card">
              <div className={`mt-card-visual${s.image ? " has-img" : ""}`}>
                {s.image && <img src={s.image.src} alt={s.image.alt} loading="lazy" />}
                <span className="mt-card-num">{s.num}</span>
                <span className="mt-card-icon"><Icon cls={s.icon} /></span>
              </div>
              <div className="mt-card-body">
                <h3>{s.title}</h3>
                <p className="mt-card-tagline">{s.tagline}</p>
                <p className="mt-card-text">{s.text}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}><Icon cls="fa-solid fa-check" />{p}</li>
                  ))}
                </ul>
                <span className="mt-card-cta">
                  {s.cta} <Icon cls="fa-solid fa-arrow-right" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Industry insights ---------- */}
      <section className="mt-insights" aria-labelledby="mt-insights-title">
        <div className="mt-head mt-head--light">
          <h2 className="mt-heading" id="mt-insights-title">{c.insights.heading}</h2>
          <p className="mt-intro">{c.insights.intro}</p>
        </div>
        <div className="mt-insight-grid">
          {c.insights.items.map((it) => (
            <figure key={it.label} className="mt-insight">
              <Icon cls={it.icon} />
              <strong>{it.value}</strong>
              <figcaption>{it.label}</figcaption>
              <small>Source: {it.source}</small>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- Why us ---------- */}
      <section aria-labelledby="mt-why-title">
        <div className="mt-head">
          <h2 className="mt-heading" id="mt-why-title">{c.whyHeading}</h2>
        </div>
        <div className="mt-strengths">
          {c.strengths.map((s) => (
            <div key={s.title} className="mt-strength">
              <span className="mt-strength-icon"><Icon cls={s.icon} /> </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mt-cta">
        <div>
          <h2>{c.cta.title}</h2>
          <p>{c.cta.text}</p>
        </div>
        <Link to={c.cta.button.to} className="mt-btn mt-btn--dark">
          {c.cta.button.label} <Icon cls="fa-solid fa-arrow-right" />
        </Link>
      </section>
    </div>
  </main>
 </>
);

export default MiningTransportation;