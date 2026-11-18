import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { notFoundContent as c } from "./notfounddata";
import "./notfound.css";

const Gear = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
    <path
      fill="currentColor"
      d="M44 4h12l2 10c3 1 6 2 9 4l9-5 8 8-5 9c2 3 3 6 4 9l10 2v12l-10 2c-1 3-2 6-4 9l5 9-8 8-9-5c-3 2-6 3-9 4l-2 10H44l-2-10c-3-1-6-2-9-4l-9 5-8-8 5-9c-2-3-3-6-4-9L7 56V44l10-2c1-3 2-6 4-9l-5-9 8-8 9 5c3-2 6-3 9-4zm6 28a18 18 0 1 0 0 36 18 18 0 0 0 0-36z"
    />
  </svg>
);

const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <main className="nf" role="main">
      <div className="nf__bg" aria-hidden="true" />

      <section className="nf__wrap">
        <p className="nf__company">{c.company}</p>

        <div className="nf__code" aria-label={`Error ${c.code}`}>
          <span>4</span>
          <span className="nf__gearbox">
            <Gear className="nf__gear nf__gear--lg" />
            <Gear className="nf__gear nf__gear--sm" />
          </span>
          <span>4</span>
        </div>

        <p className="nf__eyebrow">{c.eyebrow}</p>
        <h1 className="nf__title">{c.title}</h1>
        <p className="nf__desc">{c.description}</p>
        <p className="nf__path" title={pathname}>
          <code>{pathname}</code>
        </p>

        <div className="nf__actions">
          <Link to={c.primaryCta.to} className="nf__btn nf__btn--primary">
            {c.primaryCta.label}
          </Link>
          <button
            type="button"
            className="nf__btn nf__btn--ghost"
            onClick={() => navigate(-1)}
          >
            {c.secondaryCta.label}
          </button>
        </div>

        <div className="nf__links">
          <h2 className="nf__linksTitle">{c.quickLinksTitle}</h2>
          <ul>
            {c.quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="nf__card">
                  <strong>{l.label}</strong>
                  <span>{l.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default NotFound;