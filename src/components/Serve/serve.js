// serve.js
// "Where we serve" section: dotted India map with animated routes from the Delhi
// head office, plus a synced list of locations.
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SERVE_CONTENT, CITIES, INDIA_OUTLINE, project } from "./servedata";
import "./serve.css";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canTilt = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(hover: hover)").matches &&
  !prefersReducedMotion();

// Becomes true once, the first time the element scrolls into view.
function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

function tilt(e) {
  if (!canTilt()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(600px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.02)`;
}
const untilt = (e) => {
  e.currentTarget.style.transform = "";
};

export default function Serve() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const [active, setActive] = useState(null); // id of the highlighted map pin

  const pins = useMemo(() => CITIES.filter((c) => !c.pin), []);
  const hq = useMemo(() => CITIES.find((c) => c.isHq), []);

  const outline = useMemo(
    () =>
      "M" +
      INDIA_OUTLINE.map(([lon, lat]) => {
        const { x, y } = project(lon, lat);
        return `${x},${y}`;
      }).join("L") +
      "Z",
    []
  );

  const arcs = useMemo(() => {
    const from = project(hq.lon, hq.lat);
    return pins
      .filter((c) => !c.isHq)
      .map((c, i) => {
        const to = project(c.lon, c.lat);
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2 - Math.hypot(to.x - from.x, to.y - from.y) * 0.22;
        return {
          id: c.id,
          delay: 0.3 + i * 0.18,
          d: `M${from.x},${from.y}Q${mx},${my} ${to.x},${to.y}`,
        };
      });
  }, [pins, hq]);

  const pinOf = (city) => city.pin || city.id;

  return (
    <section
      id="serve"
      ref={sectionRef}
      className={"serve" + (inView ? " serve--in" : "")}
      aria-labelledby="serve-title"
    >
      <div className="serve__wrap">
        <h2 id="serve-title" className="serve__title serve__reveal">
          {SERVE_CONTENT.title}
        </h2>
        <p className="serve__lead serve__reveal" style={{ "--d": "0.1s" }}>
          {SERVE_CONTENT.lead}
        </p>

        <div className="serve__grid">
          <div className="serve__mapbox serve__reveal">
            <svg
              className="serve__map"
              viewBox="0 0 600 600"
              role="img"
              aria-label={SERVE_CONTENT.mapLabel}
            >
              <defs>
                <pattern id="serve-dots" width="9" height="9" patternUnits="userSpaceOnUse">
                  <circle cx="4.5" cy="4.5" r="1.5" fill="#ffffff40" />
                </pattern>
              </defs>

              <path className="serve__land" d={outline} />

              {arcs.map((a) => (
                <path
                  key={a.id}
                  className="serve__arc"
                  pathLength="1"
                  d={a.d}
                  style={{ "--d": `${a.delay}s` }}
                />
              ))}

              {pins.map((c, i) => {
                const { x, y } = project(c.lon, c.lat);
                const l = c.label;
                return (
                  <g
                    key={c.id}
                    className={
                      "serve__pin" +
                      (c.isHq ? " serve__pin--hq" : "") +
                      (active === c.id ? " is-active" : "")
                    }
                    onMouseEnter={() => setActive(c.id)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <circle
                      className="serve__pulse"
                      cx={x}
                      cy={y}
                      r="5"
                      style={{ animationDelay: `${i * 0.35}s` }}
                    />
                    <circle className="serve__dot" cx={x} cy={y} r={c.isHq ? 7 : 5} />
                    <text x={x + l.dx} y={y + l.dy} textAnchor={l.anchor}>
                      {c.mapLabel || c.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <ul className="serve__list serve__reveal" style={{ "--d": "0.15s" }}>
            {CITIES.map((c) => (
              <li
                key={c.id}
                className={"serve__item" + (active === pinOf(c) ? " is-active" : "")}
                tabIndex={0}
                onMouseEnter={() => setActive(pinOf(c))}
                onMouseLeave={(e) => {
                  setActive(null);
                  untilt(e);
                }}
                onMouseMove={tilt}
                onFocus={() => setActive(pinOf(c))}
                onBlur={() => setActive(null)}
              >
                <div>
                  <b className="serve__city">{c.name}</b>
                  <span className="serve__state">{c.state}</span>
                </div>
                <em className={"serve__badge" + (c.isHq ? " serve__badge--hq" : "")}>{c.role}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}