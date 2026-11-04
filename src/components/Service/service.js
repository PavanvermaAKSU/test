
import React, { useState } from "react";
import servicesData from "./servicedata";
import "./service.css";
/* ---------- small inline icon set (no extra dependency) ---------- */
const ICON_PATHS = {
  excavator: "M4 20 14 10M14 10l-3-3 4-4 6 6-4 4zM3 21h6",
  truck: "M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.5 1.5 0 1 0 0-.01M17 19a1.5 1.5 0 1 0 0-.01",
  wrench: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z",
  layers: "M12 3 3 8l9 5 9-5zM3 13l9 5 9-5",
  earth: "M3 20h18M5 20l5-9 3 5 2-3 4 7",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
  fuel: "M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M6 8h6M14 9h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V9l-3-3",
  flame: "M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z",
};

const Icon = ({ name, className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d={ICON_PATHS[name]} />
  </svg>
);

const CheckIcon = () => (
  <svg className="svc__check" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 3 3 5-6" />
  </svg>
);

/* ---------- one card ---------- */
const ServiceCard = ({ item, readMore, basePath, onOpen }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const href = `${basePath}/${item.id}`;

  const handleClick = (event) => {
    if (onOpen) {
      event.preventDefault();
      onOpen(item.id);
    }
  };

  return (
    <article className="svc__card">
      <div className="svc__media">
        {!imageFailed && (
          <img
            src={item.image}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        )}

        <span className="svc__badge">
          <Icon name={item.icon} className="svc__badge-icon" />
          {item.badge}
        </span>

        <header className="svc__heading">
          <h3 className="svc__title">{item.title}</h3>
          <p className="svc__subtitle">{item.subtitle}</p>
        </header>
      </div>

      <div className="svc__body">
        <p className="svc__desc">{item.description}</p>

        <ul className="svc__points">
          {item.points.map((point) => (
            <li key={point}>
              <CheckIcon />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <a className="svc__btn" href={href} onClick={handleClick}>
          {readMore}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
               strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </a>
      </div>
    </article>
  );
};

/* ---------- section ---------- */
// content = { ui: { sectionTitle, readMore }, items: { [id]: { badge, title, subtitle, description, points } } }

const Services = ({ lang = "en", basePath = "/services", onOpen }) => {
  const { section, services } = servicesData;

  return (
    <section className="svc" lang={lang} aria-labelledby="svc-heading">
      <div className="svc__intro">
        <p className="svc__eyebrow">{section.eyebrow}</p>

        <h2 id="svc-heading" className="svc__section-title">
          {section.title}
        </h2>

        <p className="svc__section-description">
          {section.description}
        </p>
      </div>

      <div className="svc__grid">
        {services.map((item) => (
          <ServiceCard
            key={item.id}
            item={item}
            readMore={item.buttonText}
            basePath={basePath}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
