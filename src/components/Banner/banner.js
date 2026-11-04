// banner.js
import React, { useEffect, useId, useRef, useState } from "react";
import { bannerContent, bannerConfig } from "./bannerdata";
import "./banner.css";

/* =========================================================
   Small pieces
   ========================================================= */

const ICONS = {
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

const StatIcon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"
       strokeLinecap="round" strokeLinejoin="round">
    {ICONS[name]}
  </svg>
);

/** Spinning wheel. The wrapper <g> positions it, the <use> spins in place. */
const Wheel = ({ href, x, y, scale }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <use className="bn-wheel" href={href} />
  </g>
);

/* =========================================================
   Vehicles (origin 0,0 = road centre line, facing right)
   ========================================================= */

const Jcb = ({ innerRef, wheel, gradient }) => (
  <g ref={innerRef}>
    <ellipse cx="-4" cy="17" rx="46" ry="4" fill="#14110d" opacity="0.18" />
    <rect x="-25" y="-12" width="50" height="18" rx="4" fill={`url(#${gradient})`} />
    <path d="M -10 -12 L -5 -26 L 12 -26 L 18 -12 Z" fill="#26211b" />
    <path d="M -2 -23 L 10 -23 L 14 -14 L -2 -14 Z" fill="#7cc6ea" opacity="0.85" />
    <rect x="-18" y="-8" width="18" height="7" rx="1" fill="#14110d" />
    <text x="-16" y="-3" fontSize="5" fontWeight="800" fill="#f5bd30">JCB</text>
    <path d="M -23 -6 L -38 -18 L -48 -4" stroke="#d4880a" strokeWidth="4.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M -48 -4 L -56 -1 L -50 8 Z" fill="#14110d" />
    <path d="M 15 -4 L 32 0 L 38 6" stroke="#d4880a" strokeWidth="4"
          strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 36 -2 L 46 -2 L 44 10 L 34 10 Z" fill="#14110d" />
    <Wheel href={wheel} x={-12} y={6} scale={1.1} />
    <Wheel href={wheel} x={22} y={8} scale={0.8} />
  </g>
);

const FlyAshTruck = ({ innerRef, wheel }) => (
  <g ref={innerRef}>
    <ellipse cx="-20" cy="17" rx="62" ry="4" fill="#14110d" opacity="0.18" />
    <rect x="-80" y="4" width="118" height="5" fill="#26211b" />
    <rect x="-78" y="-24" width="84" height="30" rx="13" fill="#ece6d8" stroke="#bfb49c" strokeWidth="2" />
    <text x="-62" y="-6" fontSize="8" fontWeight="800" fill="#c93a00">SAMARVEER</text>
    <text x="-56" y="3" fontSize="5.5" fontWeight="700" fill="#5f594f">FLY ASH BULKER</text>
    <path d="M 8 -22 L 28 -22 L 37 -6 L 37 9 L 8 9 Z" fill="#ff4d06" />
    <path d="M 17 -18 L 26 -18 L 32 -7 L 17 -7 Z" fill="#14110d" />
    <rect x="35" y="2" width="4" height="6" fill="#fde68a" />
    {[-58, -41, -24, 22].map((x) => (
      <Wheel key={x} href={wheel} x={x} y={9} scale={0.7} />
    ))}
  </g>
);

const CoalTipper = ({ innerRef, wheel }) => (
  <g ref={innerRef}>
    <ellipse cx="-20" cy="17" rx="62" ry="4" fill="#14110d" opacity="0.18" />
    <rect x="-76" y="4" width="114" height="5" fill="#26211b" />
    <path d="M -72 -16 L 4 -16 L 6 6 L -74 6 Z" fill="#3b362f" />
    <path d="M -68 -16 Q -34 -36 0 -16 Z" fill="#14110d" />
    <text x="-50" y="-2" fontSize="7" fontWeight="800" fill="#c9a45c">COAL</text>
    <path d="M 8 -22 L 28 -22 L 37 -6 L 37 9 L 8 9 Z" fill="#c9a45c" />
    <path d="M 17 -18 L 26 -18 L 32 -7 L 17 -7 Z" fill="#14110d" />
    <rect x="35" y="2" width="4" height="6" fill="#fde68a" />
    {[-52, -35, 22].map((x) => (
      <Wheel key={x} href={wheel} x={x} y={9} scale={0.7} />
    ))}
  </g>
);

/* =========================================================
   Train (moved along the rail by the animation hook)
   ========================================================= */

const Wagon = ({ x, children }) => (
  <g transform={`translate(${x} 228)`}>
    {children}
    <circle cx="15" cy="30" r="4" fill="#26211b" />
    <circle cx="65" cy="30" r="4" fill="#26211b" />
  </g>
);

const CoalWagonBody = () => (
  <>
    <rect x="0" y="8" width="80" height="20" rx="2" fill="#6b6357" />
    <path d="M 5 8 Q 40 -4 75 8 Z" fill="#14110d" />
  </>
);

const Train = ({ innerRef }) => (
  <g ref={innerRef}>
    <Wagon x={40}>
      <rect x="0" y="6" width="80" height="22" rx="10" fill="#e9e3d4" stroke="#b9ae97" strokeWidth="1.5" />
      <text x="18" y="21" fontSize="8" fontWeight="700" fill="#5f594f" letterSpacing="1">FLY ASH</text>
    </Wagon>
    <Wagon x={130}><CoalWagonBody /></Wagon>
    <Wagon x={-50}><CoalWagonBody /></Wagon>

    <g transform="translate(0 223)">
      <rect x="220" y="8" width="70" height="26" rx="4" fill="#ff4d06" />
      <rect x="270" y="2" width="20" height="32" rx="3" fill="#14110d" />
      <rect x="273" y="6" width="12" height="10" fill="#cfe9f7" />
      {[235, 255, 278].map((cx) => (
        <circle key={cx} cx={cx} cy="36" r="5" fill="#26211b" />
      ))}
      <circle className="bn-smoke" cx="240" cy="2" r="6" fill="#cfc6b2" />
      <circle className="bn-smoke bn-smoke--2" cx="240" cy="2" r="5" fill="#e4ddcd" />
    </g>
  </g>
);

/* =========================================================
   Scene (decorative SVG, 1610 x 400 design space)
   ========================================================= */

const Scene = ({ uid, roadPath, refs }) => {
  const id = (name) => `${uid}-${name}`;
  const ref = (name) => `url(#${id(name)})`;

  return (
    <svg className="bn__scene" ref={refs.scene} viewBox="0 108 1610 292"
         preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#faf5ea" />
        </linearGradient>
        <linearGradient id={id("ground")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe8d6" />
          <stop offset="1" stopColor="#e2d9c1" />
        </linearGradient>
        <linearGradient id={id("coal")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a4338" />
          <stop offset="0.5" stopColor="#26211b" />
          <stop offset="1" stopColor="#14110d" />
        </linearGradient>
        <linearGradient id={id("asphalt")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b362f" />
          <stop offset="1" stopColor="#25211c" />
        </linearGradient>
        <linearGradient id={id("jcb")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5bd30" />
          <stop offset="1" stopColor="#d4880a" />
        </linearGradient>
        <filter id={id("shadow")} filterUnits="userSpaceOnUse" x="-200" y="0" width="2100" height="480">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#14110d" floodOpacity="0.16" />
        </filter>
        <g id={id("wheel")}>
          <circle r="10" fill="#14110d" />
          <circle r="4.5" fill="#c9a45c" />
          <path d="M-10 0H10M0 -10V10" stroke="#4a4338" strokeWidth="2" />
        </g>
      </defs>

      {/* Layer 1: sky and ground */}
      <rect x="-100" y="0" width="1810" height="262" fill={ref("sky")} />
      <rect x="-100" y="262" width="1810" height="150" fill={ref("ground")} />

      {/* Layer 2: power plant */}
      <g opacity="0.6">
        <polygon points="840,262 840,226 880,208 930,262" fill="#d6cebd" />
        <rect x="890" y="232" width="50" height="30" fill="#c5bba6" />
        <path d="M 960 262 Q 972 215 966 168 L 1000 168 Q 994 215 1006 262 Z" fill="#cfc6b2" />
        <path d="M 1030 262 Q 1041 222 1036 186 L 1062 186 Q 1057 222 1068 262 Z" fill="#cfc6b2" />
        <rect x="1092" y="135" width="12" height="127" fill="#b9ae97" />
        <rect x="1092" y="135" width="12" height="9" fill="#ff4d06" />
        <rect x="1114" y="118" width="14" height="144" fill="#b9ae97" />
        <rect x="1114" y="118" width="14" height="9" fill="#ff4d06" />
        <circle className="bn-steam" cx="983" cy="168" r="9" fill="#ffffff" />
        <circle className="bn-steam bn-steam--2" cx="983" cy="168" r="8" fill="#ffffff" />
        <circle className="bn-steam bn-steam--3" cx="983" cy="168" r="7" fill="#ffffff" />
        <circle className="bn-steam bn-steam--2" cx="1049" cy="186" r="8" fill="#ffffff" />
        <circle className="bn-steam bn-steam--3" cx="1049" cy="186" r="7" fill="#ffffff" />
      </g>

      {/* Layer 3: rail line + train (behind the coal piles) */}
      <rect x="-100" y="262" width="1810" height="7" fill="#cfc6b2" />
      <path d="M -100 266 H 1710" stroke="#a59b86" strokeWidth="6" strokeDasharray="3 9" />
      <path d="M -100 262.5 H 1710" stroke="#6f675a" strokeWidth="2" />
      <Train innerRef={refs.train} />

      {/* Layer 4: coal piles + working excavator */}
      <path d="M 40 292 Q 175 188 310 292 Z" fill={ref("coal")} />
      <path d="M 250 292 Q 370 208 490 292 Z" fill={ref("coal")} opacity="0.92" />
      <path d="M 1290 300 Q 1415 200 1550 300 Z" fill={ref("coal")} />
      <g transform="translate(150 211) scale(0.6)">
        <rect x="0" y="30" width="60" height="18" rx="8" fill="#14110d" />
        <path d="M 15 30 L 15 10 L 38 10 L 45 30 Z" fill="#d4880a" />
        <g className="bn-arm">
          <path d="M 35 18 L 65 -10 L 85 15" stroke="#d4880a" strokeWidth="6"
                strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 85 15 L 98 25 L 82 32 Z" fill="#14110d" />
        </g>
      </g>

      {/* Layer 5: road (kerb, asphalt, centre line) */}
      <path d={roadPath} fill="none" stroke="#ff4d06" strokeWidth="82"
            strokeLinecap="round" filter={ref("shadow")} />
      <path ref={refs.road} d={roadPath} fill="none" stroke={ref("asphalt")}
            strokeWidth="70" strokeLinecap="round" />
      <path d={roadPath} fill="none" stroke="#e9d9a8" strokeWidth="3" strokeDasharray="18 18" />

      {/* Layer 6: vehicles (placed along the road by useBannerAnimation) */}
      <Jcb innerRef={refs.vehicle("jcb")} wheel={`#${id("wheel")}`} gradient={id("jcb")} />
      <FlyAshTruck innerRef={refs.vehicle("flyAshTruck")} wheel={`#${id("wheel")}`} />
      <CoalTipper innerRef={refs.vehicle("coalTipper")} wheel={`#${id("wheel")}`} />
    </svg>
  );
};

/* =========================================================
   Animation + responsive crop
   ========================================================= */

const wrap01 = (n) => ((n % 1) + 1) % 1;

function useBannerAnimation({ rootRef, sceneRef, roadRef, trainRef, vehicleEls, config, playing, speed }) {
  const live = useRef({ playing, speed, inView: true });

  useEffect(() => {
    live.current.playing = playing;
    live.current.speed = speed;
  }, [playing, speed]);

  // Pick the SVG crop for the current layout (CSS decides the layout via --bn-view)
  useEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    if (!root || !scene) return undefined;

    const applyView = () => {
      const name = getComputedStyle(root).getPropertyValue("--bn-view").replace(/["'\s]/g, "");
      scene.setAttribute("viewBox", config.views[name] || config.views.narrow);
    };

    applyView();
    const observer = new ResizeObserver(applyView);
    observer.observe(root);
    return () => observer.disconnect();
  }, [config, rootRef, sceneRef]);

  // Move vehicles along the road and the train along the rail
  useEffect(() => {
    const root = rootRef.current;
    const road = roadRef.current;
    const train = trainRef.current;
    if (!root || !road || !train) return undefined;

    const roadLength = road.getTotalLength();
    const items = config.vehicles
      .map((v) => ({ el: vehicleEls.current[v.id], progress: v.progress }))
      .filter((v) => v.el);

    let trainX = config.trainStart;
    let last = 0;
    let rafId = 0;

    const placeOnRoad = (el, progress) => {
      const length = wrap01(progress) * roadLength;
      const here = road.getPointAtLength(length);
      const ahead = road.getPointAtLength(Math.min(length + 4, roadLength));
      const angle = Math.atan2(ahead.y - here.y, ahead.x - here.x);
      const x = here.x + Math.sin(angle) * config.laneOffset;
      const y = here.y - Math.cos(angle) * config.laneOffset;
      el.setAttribute(
        "transform",
        `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${((angle * 180) / Math.PI).toFixed(2)}) scale(${config.vehicleScale})`
      );
    };

    const render = () => {
      items.forEach((v) => placeOnRoad(v.el, v.progress));
      train.setAttribute("transform", `translate(${trainX.toFixed(2)} 0)`);
    };

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, config.maxFrameTime);
      last = now;
      const { playing: isPlaying, speed: s, inView } = live.current;

      if (isPlaying && inView) {
        items.forEach((v) => {
          v.progress += (config.vehicleSpeed * s * dt) / roadLength;
        });
        trainX += config.trainSpeed * s * dt;
        if (trainX > config.trainEnd) trainX = config.trainStart;
        render();
      }
      rafId = requestAnimationFrame(frame);
    };

    // Pause work while the banner is off screen
    const visibility = new IntersectionObserver(([entry]) => {
      live.current.inView = entry.isIntersecting;
    });
    visibility.observe(root);

    render();
    rafId = requestAnimationFrame((t) => {
      last = t;
      rafId = requestAnimationFrame(frame);
    });

    return () => {
      cancelAnimationFrame(rafId);
      visibility.disconnect();
    };
  }, [config, rootRef, roadRef, trainRef, vehicleEls]);
}

/* =========================================================
   Banner
   ========================================================= */

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Banner = ({ content = bannerContent, config = bannerConfig }) => {
  const uid = useId().replace(/:/g, "");
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [speedIndex, setSpeedIndex] = useState(0);
  const speed = config.speeds[speedIndex];

  const rootRef = useRef(null);
  const sceneRef = useRef(null);
  const roadRef = useRef(null);
  const trainRef = useRef(null);
  const vehicleEls = useRef({});

  useBannerAnimation({ rootRef, sceneRef, roadRef, trainRef, vehicleEls, config, playing, speed });

  const refs = {
    scene: sceneRef,
    road: roadRef,
    train: trainRef,
    vehicle: (name) => (el) => {
      vehicleEls.current[name] = el;
    },
  };

  const { labels } = content;

  return (
    <section
      ref={rootRef}
      className={`bn${playing ? "" : " is-paused"}`}
      style={{ "--bn-speed": speed }}
      aria-labelledby={`${uid}-title`}
    >
      <header className="bn__intro">
        <span className="bn__tag">{content.tag}</span>
        <h2 className="bn__title" id={`${uid}-title`}>{content.title}</h2>
        <p className="bn__text">
          {content.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </header>

      <div className="bn__stage">
        <Scene uid={uid} roadPath={config.roadPath} refs={refs} />
      </div>

      <aside className="bn__stats" aria-label={labels.stats}>
        <ul className="bn__list">
          {content.stats.map((stat) => (
            <li className="bn__stat" key={stat.id}>
              <span className={`bn__icon bn__icon--${stat.tone}`} aria-hidden="true">
                <StatIcon name={stat.icon} />
              </span>
              <span className="bn__stat-text">
                <strong>{stat.title}</strong>
                <span>{stat.text}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="bn__controls" role="group" aria-label={labels.controls}>
          <button
            type="button"
            className="bn__btn bn__btn--play"
            aria-label={playing ? labels.pause : labels.play}
            onClick={() => setPlaying((p) => !p)}
          >
            <svg className="bn__icon-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
            <svg className="bn__icon-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </button>

          <button
            type="button"
            className="bn__btn bn__btn--speed"
            aria-label={labels.speed}
            onClick={() => setSpeedIndex((i) => (i + 1) % config.speeds.length)}
          >
            {speed.toFixed(1)}×
          </button>
        </div>
      </aside>
    </section>
  );
};

export default Banner;