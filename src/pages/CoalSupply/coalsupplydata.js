// coalsupplydata.js
// Services > Coal Supply & Transportation. All content is taken from the company profile PDF.
//
// TO USE AN IMAGE:
//   import transportImg from "./assets/coal-transport.jpg";
//   then add `img: transportImg` to that service (replaces the dark icon panel).
//   Modes, strengths and fleet items accept `img` too (replaces their icon).

export const pageHeader = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Coal Supply & Transportation" },
  ],
  eyebrow: "Our Services",
  title: "Coal Supply &",
  highlight: "Transportation",
  subtitle:
    "Reliable coal supply and transport solutions built on decades of experience in mining, coal supply and logistics, delivered with professionalism, efficiency and consistent excellence.",
};

export const services = [
  {
    id: "coal-fly-ash-transport",
    title: "Coal Transportation & Bulk Logistic",
    icon: "fa-solid fa-truck-moving",
    img: "../coal-fly-ash-transport.webp",
    desc: "We provide dependable coal transportation services for mining operations, industrial facilities, power plants, and bulk consumers. Our focus is on safe material handling, efficient logistics planning, timely delivery, and seamless coordination from loading points to final destinations.",
    points: [
      "Bulk Coal Transportation",
      "Timely Delivery & Fleet Management",
      "Safety & Regulatory Compliance",
      "Industrial Supply Chain Support",
    ],
  },

  {
    id: "coal-fly-ash-transport",
    title: "Fly Ash Transportation & Logistics Solutions",
    icon: "fa-solid fa-truck-moving",
    img: "../fly-ash.webp",
    desc: "We provide efficient and dependable fly ash transportation services for thermal power plants, cement manufacturers, construction companies, and other industrial consumers. Our services focus on the safe handling, secure transportation, and timely delivery of fly ash from generation facilities to authorized utilization destinations.",
    points: [
      "Transforming Industrial By-products into Valuable Resources.",
      "Reliable Fly Ash Logistics for a Sustainable Future.",
      "Connecting Power Plants with Construction Industries.",
      "Safe Material Movement. Smarter Resource Utilization.",
    ],
  },

  
  {
    id: "coal-trading-supplier",
    title: "Coal Trading & Supplier",
    icon: "fa-solid fa-cubes-stacked",
    img: "../coal-trading-supplier.webp",
    desc: "We provide reliable and efficient coal trading and supply solutions. With strong partnerships across mines, transporters and end-users, we ensure a steady and timely supply of quality coal for varied industrial needs.",
    points: [
      "Strong partnerships across mines, transporters and end-users",
      "Steady and timely supply of quality coal",
      "Transparent sourcing and competitive pricing",
      "Long-term relationships founded on trust and performance",
    ],
  },
];

export const modes = {
  title: "Our Transport Network",
  intro:
    "An extensive logistics network that moves coal and fly ash from source to customer.",
  list: [
    { label: "Road", icon: "fa-solid fa-road" },
    { label: "Rail", icon: "fa-solid fa-train" },
    { label: "Multimodal", icon: "fa-solid fa-route" },
  ],
};

export const strengths = {
  title: "Why Choose Samarveer",
  list: [
    { title: "Timely Deliveries", desc: "Well-planned operations that keep supply on schedule.", icon: "fa-solid fa-clock", img:"../images/time.webp" },
    { title: "Cargo Safety", desc: "Experienced team and modern fleet for safe handling.", icon: "fa-solid fa-shield-halved",  img:"../images/safety.webp" },
    { title: "Transparent Sourcing", desc: "Clear, dependable sourcing of quality coal.", icon: "fa-solid fa-eye",  img:"../images/transparent.webp" },
    { title: "Competitive Pricing", desc: "Value-driven rates for varied industrial needs.", icon: "fa-solid fa-indian-rupee-sign", img:"../images/competitive.webp" },
  ],
};

export const fleet = {
  title: "Our Fleet Force",
  subtitle:
    "250+ strong vehicles leading the way in coal transport services, OB removal, mining equipment services, earthwork solutions and excavation.",
  items: [
    { name: "BharatBenz", icon: "fa-solid fa-truck-moving" },
    { name: "Scania", icon: "fa-solid fa-truck-moving" },
    { name: "Volvo", icon: "fa-solid fa-truck-moving" },
    { name: "Tata", icon: "fa-solid fa-truck-moving" },
    { name: "Eicher", icon: "fa-solid fa-truck-moving" },
    { name: "Mahindra Pick-up", icon: "fa-solid fa-truck-pickup" },
  ],
};

export const trusted = {
  title: "Trusted by Industry Leaders",
  list: [
    "Coal India (CIL)",
    "NCL",
    "Hindalco",
    "Dilip Buildcon Ltd.",
    "KJS Cement",
    "PNC",
    "DRA",
    "BGR",
    "Prism Cement",
  ],
};

export const cta = {
  title: "Need coal supply or transport?",
  text: "Talk to our team about coal and fly ash transportation or reliable coal supply for your plant or project.",
  phone: "+91 9353111111",
  email: "Info@samarveerautoandlube.com",
  buttonLabel: "Send Enquiry",
  buttonHref: "/contact",
};