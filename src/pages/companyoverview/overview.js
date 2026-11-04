// companyoverview.js
import React from "react";
import "./overview.css";
import {
  companyInfo,
  stats,
  pillars,
  leaders,
  coreValues,
  branches,
  contact,
} from "./overviewdata";
import Clients from "../../components/Products/product";

// Shows an image if `img` is given, otherwise the Font Awesome icon.
const Icon = ({ icon, img, alt = "", className = "", style }) =>
  img ? (
    <img src={img} alt={alt} className={`co-icon-img ${className}`} loading="lazy" />
  ) : (
    <i className={`${icon} ${className}`} style={style} aria-hidden="true" />
  );

const CompanyOverview = () => {
  return (
    <section className="co-section" id="company-overview">
      <div className="co-card">
        <div className="co-body">
          {/* ===== Header / Identity ===== */}
          <div className="co-header">
            <div className="co-identity">
              <div className="co-logo">
                {companyInfo.logoImg ? (
                  <img src={companyInfo.logoImg} alt={companyInfo.name} className="co-logo-img" />
                ) : (
                  <>
                    <i className="fa-solid fa-gear co-logo-gear" />
                    <i className="fa-solid fa-truck-monster co-logo-truck" />
                  </>
                )}
              </div>
              <div>
                <h1 className="co-title">
                  {companyInfo.name} <span>{companyInfo.suffix}</span>
                </h1>
                <p className="co-tagline">
                  <i className="fa-solid fa-shield-halved" /> {companyInfo.tagline}
                </p>
                <p className="co-history">{companyInfo.history}</p>
              </div>
            </div>

            <div className="co-badges">
              {companyInfo.badges.map((b) => (
                <span key={b.text} className={`co-badge co-badge--${b.type}`}>
                  <Icon icon={b.icon} img={b.img} alt="" /> {b.text}
                </span>
              ))}
            </div>
          </div>

          {/* ===== Key Metrics ===== */}
          <div className="co-stats">
            {stats.map((s) => (
              <div className="co-stat" key={s.label}>
                <div className="co-stat-top">
                  <span>{s.label}</span>
                  <Icon icon={s.icon} img={s.img} alt={s.label} />
                </div>
                <div className="co-stat-value">
                  {s.value} <small>{s.unit}</small>
                </div>
                <p className={`co-stat-note ${s.positive ? "is-positive" : ""}`}>
                  {s.noteIcon && <Icon icon={s.noteIcon} />}
                  {s.note}
                </p>
              </div>
            ))}
          </div>

          {/* ===== Core Pillars ===== */}
          <div>
            <h2 className="co-heading">
              <i className="fa-solid fa-cubes-stacked" /> Core Business Pillars &amp; Capabilities
            </h2>
            <div className="co-pillars">
              {pillars.map((p) => (
                <div className="co-pillar" key={p.title}>
                  <div>
                    <div className="co-pillar-icon">
                      <Icon icon={p.icon} img={p.img} alt={p.title} />
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                  <span className="co-pillar-tag">{p.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Leadership + Branches ===== */}
          <div className="co-duo">
            <div className="co-panel co-leadership">
              <div>
                <div className="co-panel-head">
                  <h2>
                    <i className="fa-solid fa-user-tie" /> Executive Leadership
                  </h2>
                  <span>Governance &amp; Vision</span>
                </div>
                <div className="co-leaders">
                  {leaders.map((l) => (
                    <div className="co-leader" key={l.name}>
                      <div className="co-leader-name">{l.name}</div>
                      <div className="co-leader-role">{l.role}</div>
                      <div className="co-leader-desc">{l.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="co-values">
                {coreValues.map((v) => (
                  <span key={v.text}>
                    <Icon icon={v.icon} img={v.img} alt="" style={{ color: v.color }} /> {v.text}
                  </span>
                ))}
              </div>
            </div>

            <div className="co-panel co-branches">
              <div className="co-panel-head">
                <h2>
                  <i className="fa-solid fa-location-dot" /> Key Branch Network
                </h2>
                <span className="co-hq-pill">HQ: {branches.hq}</span>
              </div>
              <p className="co-branches-intro">{branches.intro}</p>
              <div className="co-chips">
                {branches.list.map((b) => (
                  <span className="co-chip" key={b.name}>
                    <Icon icon={b.hq ? "fa-solid fa-building is-accent" : "fa-solid fa-city"} img={b.img} alt="" />
                    {b.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ===== Clients (sliding rows) ===== */}
          <Clients />

          {/* ===== Footer ===== */}
          <div className="co-footer">
            <div className="co-contact">
              <span>
                <i className="fa-solid fa-phone" /> {contact.phone}
              </span>
              <span>
                <i className="fa-solid fa-envelope" /> {contact.email}
              </span>
            </div>
            <div className="co-status">
              <span className="co-dot" />
              <span>{contact.status}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;