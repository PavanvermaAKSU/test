// careerdata.js
// Same exports as before + new: process, perks, faqs. Add `img` to any item to use an image instead of an icon.

export const pageHeader = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Career" }],
  eyebrow: "Careers at Samarveer",
  title: "Build your career in mining, coal, fuel and auto parts.",
  subtitle:
    "Join a team of 250+ vehicles and 8 branches where site engineers, drivers, accountants and developers all grow together.",
  primaryButton: { label: "Apply now", href: "#cr-apply" },
  secondaryButton: { label: "See open roles", href: "#cr-openings" },
  // heroImg: heroImage,
};

export const stats = [
  { icon: "fa-solid fa-landmark", value: 28, suffix: "+", label: "Years of legacy", img: "./images/legacy.webp" },
  { icon: "fa-solid fa-truck-moving", value: 250, suffix: "+", label: "Vehicles on road", img: "./images/strong.webp" },
  { icon: "fa-solid fa-location-dot", value: 8, suffix: "", label: "Offices & branches", img: "./images/range.webp" },
  { icon: "fa-solid fa-layer-group", value: 4, suffix: "", label: "Business divisions", img: "./images/universe.webp" },
];

export const vision = {
  label: "Our vision",
  text: "To overcome sector challenges by swiftly reaching every small and large business across the country, ensuring our solutions are accessible and impactful for all.",
};

export const values = {
  title: "Why work with us",
  intro: "Four principles shape how we work with each other every day.",
  list: [
    { title: "Team empowerment", desc: "A culture where every team member can grow and take ownership.", icon: "fa-solid fa-users", img: "./images/team.webp" },
    { title: "Innovation", desc: "New solutions that set us apart in a traditional industry.", icon: "fa-solid fa-lightbulb", img: "./images/inovat.webp" },
    { title: "Customer-centricity", desc: "Our customers sit at the centre of every decision.", icon: "fa-solid fa-handshake", img: "./images/certicity.webp" },
    { title: "Sustainability", desc: "Long-term growth while caring for the planet.", icon: "fa-solid fa-leaf", img: "./images/sustainability.webp" },
  ],
};

export const divisions = {
  title: "Where you can grow",
  intro: "Pick the division that matches your skills. Each one hires for site, office and tech roles.",
  list: [
    { title: "Mining & Earthwork", desc: "OB removal, mining equipment services, earthwork and excavation.", icon: "fa-solid fa-hill-rockslide", href: "/services/mining", img: "./images/mining.webp" },
    { title: "Coal Supply & Transportation", desc: "Coal and fly ash transport, coal trading and supply.", icon: "fa-solid fa-truck-moving", href: "/services/coal_supply_&_Trading", img: "./images/coal.webp" },
    { title: "Diesel Supply & Fuel Station", desc: "Diesel supply, fuel stations and on-site refueling.", icon: "fa-solid fa-gas-pump", href: "/services/diesel_and_fuel", img: "./images/fuel.webp" },
    { title: "Auto Parts & Lubricants", desc: "HCV / LCV spare parts, lubricants, tyres and batteries.", icon: "fa-solid fa-screwdriver-wrench", href: "/services/autopart", img: "./images/autoparts.webp" },
  ],
};

// A real sequence, so numbering is meaningful here.
export const hiring = {
  title: "How hiring works",
  intro: "Four steps, and you hear from us at every one.",
  steps: [
    { title: "Apply online", desc: "Fill the form below and attach your resume." },
    { title: "Profile review", desc: "Our HR team checks your profile against open roles." },
    { title: "Interview", desc: "A call or visit with the hiring manager." },
    { title: "Offer & joining", desc: "Offer letter, documents and your joining date." },
  ],
};

export const perks = [
  { icon: "fa-solid fa-chart-line", text: "Clear growth path across 4 divisions" },
  { icon: "fa-solid fa-shield-halved", text: "Safety-first sites and training" },
  { icon: "fa-solid fa-map-location-dot", text: "Roles in 8 locations across India" },
];

export const faqs = [
  { q: "Can I apply if no role matches my skills?", a: "Yes. Submit the form without choosing a position. HR keeps your profile on record and contacts you when a suitable role opens." },
  { q: "Which resume formats are accepted?", a: "PDF, DOC and DOCX, up to 5 MB." },
  { q: "How long does the review take?", a: "Shortlisted candidates are usually contacted by phone or email after HR reviews the profile." },
];

export const openings = {
  title: "Current openings",
  emptyTitle: "No openings right now? Apply anyway.",
  emptyText:
    "Submit your resume through the form below. Our HR team will review your profile, keep it on record and get in touch when a suitable role opens.",
  list: [],
};

export const locations = [
  "Delhi (HQ)",
  "Singrauli (M.P.)",
  "Satna (M.P.)",
  "Anpara (U.P.)",
  "Barbil (Odisha)",
  "Visakhapatnam (A.P.)",
  "Hazaribagh (JH)",
  "Hyderabad (TS)",
];

export const applyForm = {
  title: "Apply now",
  intro: "Share your details and resume. Fields marked * are required.",
  endpoint: "",
  maxFileMB: 5,
  acceptedFiles: ".pdf,.doc,.docx",
  departments: [
    "Mining & Earthwork",
    "Coal Supply & Transportation",
    "Diesel Supply & Fuel Station",
    "Auto Parts & Lubricants",
    "Other",
  ],
};

export const contact = {
  phone: "",
  email: "Info@samarveerautoandlube.com",
  hqLabel: "Corporate Office: Delhi",
};