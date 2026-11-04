// journeydata.js
// All content for the Company Journey section. Source: company profile PDF.
//
// TO USE AN IMAGE INSTEAD OF AN ICON:
//   import foundedImg from "./assets/founded.png";
//   then add `img: foundedImg` to that milestone. If `img` is missing,
//   the Font Awesome icon is shown.

export const journeyHeader = {
  eyebrow: "Our Company Journey",
  title: "Nearly three decades of",
  highlight: "driving growth",
  subtitle:
    "From a single automobile business in 1998 to a unified group in trading, transportation and mining.",
};

export const milestones = [
  {
    year: "1998",
    title: "RJTP Company Founded",
    desc: "Founded as RJTP Company, the umbrella company of the Samarveer Group, under our founder Shri Sudama Mal Tirthwani. We began our journey in the automobile industry.",
    icon: "fa-solid fa-flag-checkered",
    img: "./images/rjtp.webp",
  },
  {
    year: "2011",
    title: "Expansion into Transportation & Mining",
    desc: "We expanded into Transportation and Mining, serving reputed listed and unlisted companies across various industries.",
    icon: "fa-solid fa-truck-moving",
    img: "./images/rjtp.webp",
  },
  {
    year: "2022",
    title: "Samarveer Auto & Lubes Pvt. Ltd.",
    desc: "Established to bring our businesses in trading, transportation, mining and related services together under one company.",
    icon: "fa-solid fa-building",
    img: "./logo.png",
  },
  {
    year: "Today",
    title: "A Legacy of 28 Years",
    desc: "A strong presence across Delhi, Odisha, Jharkhand, Uttar Pradesh, Madhya Pradesh and Andhra Pradesh, with a fleet of 250+ vehicles and a growing footprint across India.",
    icon: "fa-solid fa-award",
    img: "./logo.png",
  },
];

export const growth = {
  title: "Turnover Growth",
  unit: "₹ In Cr",
  note: "As on 31st March",
  max: 300, // the tallest bar (used to scale the others)
  bars: [
    { label: "March 2024", value: 83 },
    { label: "March 2025", value: 144 },
    { label: "March 2026", value: 197 },
    { label: "March 2027", value: 300, projected: true },
  ],
};

export const journeyHighlights = [
  { icon: "fa-solid fa-landmark", value: "1998", label: "Year Founded", img: "./images/founded.webp" },
  { icon: "fa-solid fa-truck-moving", value: "250+", label: "Strong Vehicles",  img: "./images/strong.webp" },
  { icon: "fa-solid fa-location-dot", value: "8", label: "Offices & Branches",  img: "./images/range.webp" },
  { icon: "fa-solid fa-chart-line", value: "₹197 Cr", label: "Turnover FY26",  img: "./images/turnover.webp" },
];