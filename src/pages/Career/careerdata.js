// careerdata.js
// Career page content. Vision, values, divisions, offices and contact come from the company profile PDF.
// Job openings are NOT in the PDF, so `openings` starts empty (see the example inside it).
//
// TO USE AN IMAGE INSTEAD OF AN ICON:
//   import teamImg from "./assets/team.jpg";
//   then add `img: teamImg` to a value / division / hero. If `img` is missing the icon is shown.

export const pageHeader = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Career" }],
  eyebrow: "Careers at Samarveer",
  title: "Build your career with",
  highlight: "Samarveer",
  subtitle:
    "Join a team that is transforming the landscape of mining, coal logistics, fuel and auto parts, where every team member thrives.",
  primaryButton: { label: "Apply Now", href: "#cr-apply" },
  secondaryButton: { label: "View Openings", href: "#cr-openings" },
  // heroImg: heroImage,   // optional background / side image
};

export const stats = [
  { icon: "fa-solid fa-landmark", value: "28+", label: "Years of Legacy", img: "./images/legacy.webp" },
  { icon: "fa-solid fa-truck-moving", value: "250+", label: "Strong Vehicles", img: "./images/strong.webp"  },
  { icon: "fa-solid fa-location-dot", value: "8", label: "Offices & Branches", img: "./images/range.webp"  },
  { icon: "fa-solid fa-layer-group", value: "4", label: "Business Divisions", img: "./images/universe.webp" },
];

export const vision = {
  label: "Our Vision",
  text: "To overcome sector challenges by swiftly reaching every small and large business across the country, ensuring our solutions are accessible and impactful for all.",
};

export const values = {
  title: "Why Work With Us",
  intro:
    "Our mission is guided by four core principles that define our ethos, and they shape how we work with each other every day.",
  list: [
    {
      title: "Team Empowerment",
      desc: "Fostering a culture where every team member thrives.",
      icon: "fa-solid fa-users",
      img: "./images/team.webp",
    },
    {
      title: "Innovation",
      desc: "Pioneering new solutions that set us apart.",
      icon: "fa-solid fa-lightbulb",
      img: "./images/inovat.webp",
    },
    {
      title: "Customer-Centricity",
      desc: "Putting our customers at the heart of everything we do.",
      icon: "fa-solid fa-handshake",
      img: "./images/certicity.webp",
    },
    {
      title: "Sustainability",
      desc: "Driving long-term growth while caring for the planet.",
      icon: "fa-solid fa-leaf",
      img: "./images/sustainability.webp",
    },
  ],
};

export const divisions = {
  title: "Where You Can Grow",
  intro: "Opportunities across our four business divisions.",
  list: [
    { title: "Mining & Earthwork", desc: "OB removal, mining equipment services, earthwork and excavation.", icon: "fa-solid fa-hill-rockslide", href: "/services/mining", img: "./images/mining.webp" },
    { title: "Coal Supply & Transportation", desc: "Coal and fly ash transport, coal trading and supply.", icon: "fa-solid fa-truck-moving", href: "/services/coal_supply_&_Trading", img: "./images/coal.webp" },
    { title: "Diesel Supply & Fuel Station", desc: "Diesel supply, fuel stations and on-site refueling.", icon: "fa-solid fa-gas-pump", href: "/services/diesel_and_fuel", img: "./images/fuel.webp" },
    { title: "Auto Parts & Lubricants", desc: "HCV / LCV spare parts, lubricants, tyres and batteries.", icon: "fa-solid fa-screwdriver-wrench", href: "/services/autopart" , img: "./images/autoparts.webp"},
  ],
};

// ---- Job openings ----
// Leave empty until you have roles to list. Example:
// {
//   id: "site-supervisor-singrauli",
//   title: "Site Supervisor",
//   department: "Mining & Earthwork",
//   location: "Singrauli (M.P.)",
//   type: "Full-time",
//   experience: "3+ years",
//   desc: "Short description of the role.",
// },
export const openings = {
  title: "Current Openings",
  emptyTitle: "No Current Openings? No Problem!",
  emptyText:
    "Even if you don't see a position that matches your skills and experience, we'd still love to hear from you. Submit your resume through our application form, and our HR team will review your profile. We'll keep your information on record and get in touch if a suitable opportunity arises in the future.",
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
  title: "Apply Now",
  intro: "Share your details and resume. Our team will review your application.",
  // Set this to your backend URL (e.g. "/api/careers") to POST the form data + resume.
  // If left empty, the form opens an email draft to the address below instead.
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