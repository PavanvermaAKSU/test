// bannerdata.js
// All banner text and settings live here. banner.js contains no copy or magic numbers.
// For another language, pass your own `content` object (same shape) to <Banner content={...} />.

export const bannerContent = {
  tag: "HEAVY LOGISTICS SERVICES",
  title: "Our Summary",
  lines: [
    "Reliable road, rail & multimodal mining supply chain solutions.",
    "Equipped with modern JCB fleets, dumpers & heavy bulkers.",
  ],
  stats: [
    { id: "operations", icon: "check", tone: "orange", title: "24/7 Mining Operations", text: "Real-time GPS Monitored" },
    { id: "fleet",      icon: "plus",  tone: "gold",   title: "Modern JCB & Bulker Fleet", text: "Safety & Zero Delay Assured" },
  ],
  labels: {
    stats: "Service highlights",
    controls: "Animation controls",
    pause: "Pause animation",
    play: "Play animation",
    speed: "Animation speed",
  },
};

export const bannerConfig = {
  // Road centre line (SVG units, 1610 x 400 scene). Vehicles follow this path.
  roadPath:
    "M -100 372 C 400 372, 500 302, 850 322 C 1150 342, 1350 382, 1710 362",

  vehicleSpeed: 85,       // px/s along the road (shared, so vehicles never overtake)
  trainSpeed: 55,         // px/s along the rail
  trainStart: -450,
  trainEnd: 1700,
  vehicleScale: 1.25,
  laneOffset: 0,          // px, positive = right of travel
  speeds: [1, 1.8, 0.5],  // speed button cycle
  maxFrameTime: 0.05,     // seconds, avoids jumps after a hidden tab

  // Start position (0 to 1 along the road), evenly spaced
  vehicles: [
    { id: "jcb",         progress: 0.12 },
    { id: "flyAshTruck", progress: 0.32 },
    { id: "coalTipper",  progress: 0.52 },
  ],

  // SVG crop per layout. Layout names come from the CSS variable --bn-view.
  views: {
    wide: "0 0 1610 400",
    mid: "0 108 1610 292",
    narrow: "120 150 640 250",
  },
};