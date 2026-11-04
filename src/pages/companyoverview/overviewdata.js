// companyoverviewdata.js
// All content for the Company Overview section lives here.
// Icons are Font Awesome 6 class names (e.g. "fa-solid fa-gear").
//
// TO USE AN IMAGE INSTEAD OF AN ICON:
//   1. Put the image in src/assets/ (PNG / SVG / WebP, transparent background is best)
//   2. import it:   import gearImg from "./assets/gear.png";
//   3. add `img: gearImg` to that item. If `img` is set it replaces the icon;
//      if it is missing, the Font Awesome icon is shown as before.
// Works on: companyInfo.logoImg, badges, stats, pillars, coreValues, branches.list

export const companyInfo = {
  name: "SAMARVEER GROUPS",
  suffix: "PVT. LTD.",
  logoImg: "./logo.png", // e.g. logoImg: companyLogo  (replaces the gear logo)
  tagline: "Your Trusted Partner in Commercial Vehicle & Mining Solutions",
  history:
    "Founded in 1998 as RJTP Company under Shri Sudama Mal Tirthwani • Reorganized into Samarveer Auto & Lubes Pvt. Ltd. (2022).",
  badges: [
    { icon: "fa-solid fa-calendar-check", text: "Legacy of 28+ Years", type: "dark" },
    { icon: "fa-solid fa-circle-check", text: "ISO Standard Operations", type: "green" },
  ],
};

export const stats = [
  {
    label: "Established",
    icon: "fa-solid fa-landmark",
    value: "28+",
    unit: "Yrs",
    note: "Industry Leadership since 1998",
  },
  {
    label: "Fleet Force",
    icon: "fa-solid fa-truck-moving",
    value: "250+",
    unit: "Units",
    note: "Dumpers, Excavators & Tankers",
  },
  {
    label: "Revenue (FY26)",
    icon: "fa-solid fa-chart-line",
    value: "₹197",
    unit: "Cr",
    note: "Proj. ₹300 Cr (2027)",
    noteIcon: "fa-solid fa-arrow-trend-up",
    positive: true,
  },
  {
    label: "Range",
    icon: "fa-solid fa-map-location-dot",
    value: "8+",
    unit: "Hubs",
    note: "Pan-India Strategic Presence",
  },
];

export const pillars = [
  {
    icon: "fa-solid fa-hill-rockslide",
    title: "Mining & OB Removal",
    desc: "Overburden removal (OBR), earthwork, site preparation & high-efficiency excavation services.",
    tag: "Volvo • Scania • Cat Equipment",
  },
  {
    icon: "fa-solid fa-route",
    title: "Coal & Fly Ash Logistics",
    desc: "End-to-end transport network via road, rail & multimodal supply chains from mines to industrial plants.",
    tag: "Multimodal Supply Chain",
  },
  {
    icon: "fa-solid fa-screwdriver-wrench",
    title: "HCV / LCV Spares & Lubes",
    desc: "Distribution of genuine commercial vehicle spare parts, tyres, batteries, and premium lubricants.",
    tag: "Gulf • Valvoline • Servo • BPCL",
  },
  {
    icon: "fa-solid fa-gas-pump",
    title: "Fuel Outlets & On-Site Supply",
    desc: "Owns 2 BPCL petrol stations in Singrauli, MP, plus mobile diesel tankers for zero-downtime client operations.",
    tag: "On-Site Dedicated Refueling",
  },
];

export const leaders = [
  {
    name: "Sanjay Tirthwani",
    role: "Mentor",
    desc: "15+ Yrs Exp. in Mining, Auto & Logistics strategic growth.",
  },
  {
    name: "Roshan Tirthwani",
    role: "Managing Director",
    desc: "8+ Yrs Exp. in Supply Chain, Logistics & Partnerships.",
  },
  {
    name: "Saumya Tirthwani",
    role: "Director",
    desc: "5+ Yrs Exp. in Strategic Planning & Profitability models.",
  },
];

export const coreValues = [
  { icon: "fa-solid fa-leaf", text: "Sustainability", color: "#34d399" },
  { icon: "fa-solid fa-lightbulb", text: "Innovation", color: "#fbbf24" },
  { icon: "fa-solid fa-handshake", text: "Customer-Centricity", color: "#60a5fa" },
  { icon: "fa-solid fa-users", text: "Empowerment", color: "#c084fc" },
];

export const branches = {
  hq: "Delhi",
  intro:
    "Strategic operational branches established across key industrial & mining corridors:",
  list: [
    { name: "Delhi (HQ)", hq: true },
    { name: "Singrauli (M.P.)" },
    { name: "Satna (M.P.)" },
    { name: "Anpara (U.P.)" },
    { name: "Barbil (Odisha)" },
    { name: "Visakhapatnam (A.P.)" },
    { name: "Hazaribagh (JH)" },
    { name: "Hyderabad (TS)" },
  ],
};

export const contact = {
  phone: "+91 9353111111",
  email: "Info@samarveerautoandlube.com",
  status: "Corporate Portal Active",
};