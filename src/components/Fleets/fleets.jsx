import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fleetContent as c } from "./fleetsdata";
import "./fleets.css";

// Counts up once when the element scrolls into view.
const useCountUp = (target, duration = 1800) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setValue(target); return; }

    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]);

  return [ref, value];
};

const Fleet = () => {
  const [countRef, count] = useCountUp(c.count.value);

  return (
    <section className="fleet" id="fleet" aria-labelledby="fleet-title">
      <div className="fleet__inner">
        {/* Visuals */}
        <div className="fleet__visual">
          <figure className="fleet__img fleet__img--wide">
            <img src={c.images.wide.src} alt={c.images.wide.alt} loading="lazy" />
          </figure>
          <figure className="fleet__img fleet__img--tall">
            <img src={c.images.tall.src} alt={c.images.tall.alt} loading="lazy" />
          </figure>
          <div className="fleet__badge" ref={countRef}>
            <span className="fleet__badgeNum">{count}{c.count.suffix}</span>
            <span className="fleet__badgeLabel">{c.count.label}</span>
          </div>
        </div>

        {/* Content */}
        <div className="fleet__content">
          <p className="fleet__eyebrow">{c.eyebrow}</p>
          <h2 className="fleet__title" id="fleet-title">
            <span className="fleet__titleTop">{c.titleTop}</span>
            <span>{c.titleBottom}</span>
          </h2>
          <p className="fleet__desc">{c.description}</p>

          <ul className="fleet__list">
            {c.highlights.map((h) => (
              <li key={h.title} className="fleet__item">
                <span className="fleet__tick" aria-hidden="true">✓</span>
                <div>
                  <strong>{h.title}</strong>
                  <p>{h.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link to={c.cta.to} className="fleet__btn">
            {c.cta.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Fleet;