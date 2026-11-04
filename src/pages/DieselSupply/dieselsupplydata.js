// dieselsupplydata.js
// Services > Diesel Supply & Fuel Station. All content is taken from the company profile PDF.
//
// TO USE AN IMAGE:
//   import dieselImg from "./assets/diesel-supply.jpg";
//   then add `img: dieselImg` to that service (replaces the dark icon panel).
//   Serve / strengths / onsite items accept `img` too (replaces their icon).

export const pageHeader = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Diesel Supply & Fuel Station" },
  ],
  eyebrow: "Our Services",
  title: "Diesel Supply &",
  highlight: "Fuel Station",
  subtitle:
    "Reliable diesel supply and fully equipped fuel stations that keep your mining and industrial activities running without interruption.",
};

export const services = [
  {
    id: "diesel-supply",
    title: "Diesel Supply",
    icon: "fa-solid fa-gas-pump",
    img: "../diesel.webp",
    desc: "Samarveer ensures reliable diesel supply for all operational needs. With timely delivery, quality fuel and competitive rates, we keep your mining and industrial activities running without interruption.",
    points: [
      "Reliable supply for all operational needs",
      "Timely delivery",
      "Quality fuel",
      "Competitive rates",
    ],
  },
  {
    id: "petrol-pump",
    title: "Petrol Pump",
    icon: "fa-solid fa-oil-can",
    img: "../fuel.webp",
    desc: "We own and operate two fully equipped fuel stations in Singrauli, Madhya Pradesh, providing reliable retail and bulk fuel solutions for industries, mining projects, construction companies and commercial fleets. With dedicated fuel tankers and on-site refueling services, we ensure safe, timely and uninterrupted fuel delivery while helping clients minimize downtime and maintain efficient operations.",
    points: [
      "Two fully equipped fuel stations in Singrauli, M.P.",
      "Retail and bulk fuel solutions",
      "Dedicated fuel tankers",
      "On-site refueling services",
    ],
  },
];

export const serve = {
  title: "Who We Fuel",
  intro: "Retail and bulk fuel solutions for every kind of operation.",
  list: [
    { label: "Industries", icon: "fa-solid fa-industry" },
    { label: "Mining Projects", icon: "fa-solid fa-hill-rockslide" },
    { label: "Construction Companies", icon: "fa-solid fa-helmet-safety" },
    { label: "Commercial Fleets", icon: "fa-solid fa-truck-moving" },
  ],
};

export const strengths = {
  title: "Why Choose Samarveer",
  list: [
    { title: "Timely Delivery", desc: "Fuel delivered on time, every time.", icon: "fa-solid fa-clock", img: "../images/time.webp"},
    { title: "Quality Fuel", desc: "Dependable quality for demanding operations.", icon: "fa-solid fa-droplet", img: "../images/OIP.webp"},
    { title: "Competitive Rates", desc: "Value-driven pricing for retail and bulk needs.", icon: "fa-solid fa-indian-rupee-sign", img: "../images/rates.webp"},
    { title: "Minimal Downtime", desc: "Uninterrupted fuel supply keeps work moving.", icon: "fa-solid fa-gauge-high",img: "../images/minimal.webp"},
  ],
};

export const onsite = {
  title: "On-Site Refueling",
  subtitle:
    "Dedicated fuel tankers and on-site refueling services ensure safe, timely and uninterrupted fuel delivery, helping clients minimize downtime and maintain efficient operations.",
  items: [
    { name: "Dedicated Fuel Tankers", icon: "fa-solid fa-truck-droplet", img:"../images/dedicated.webp" },
    { name: "On-Site Refueling", icon: "fa-solid fa-location-crosshairs", img: "../images/onsitefuel.webp"},
    { name: "Safe & Timely Delivery", icon: "fa-solid fa-shield-halved", img: "../images/lubricant.webp" },
    { name: "Uninterrupted Supply", icon: "fa-solid fa-infinity", img: "../images/uninterrput.webp" },
  ],
};

export const bulk = {
  title: "Also Supplied in Bulk",
  list: ["Tata (Urea)", "D.E.F (Urea)", "Valvoline (Urea)"],
};

export const cta = {
  title: "Need diesel or on-site refueling?",
  text: "Talk to our team about diesel supply, bulk fuel or on-site refueling for your site or fleet.",
  phone: "+91 9353111111",
  email: "Info@samarveerautoandlube.com",
  buttonLabel: "Send Enquiry",
  buttonHref: "#contact",
};