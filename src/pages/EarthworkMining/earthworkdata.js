// miningearthworkdata.js
// Services > Mining & Earthwork. All content is taken from the company profile PDF.
//
// TO USE AN IMAGE:
//   import obImg from "./assets/ob-removal.jpg";
//   then add `img: obImg` to that service. The image replaces the dark icon banner.
//   (Fleet items accept `img` too and replace their icon.)

export const pageHeader = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Mining & Earthwork" },
  ],
  eyebrow: "Our Services",
  title: "Mining &",
  highlight: "Earthwork",
  subtitle:
    "With decades of experience, we deliver reliable mining and earth-moving solutions, executing challenging projects with professionalism, efficiency and consistent excellence.",
};

export const services = [
  {
    id: "ob-removal",
    title: "OB Removal",
    icon: "fa-solid fa-hill-rockslide",
   img: "../obremoval.webp",
    desc: "Samarveer has been a trusted name in Overburden Removal (OBR) for years, delivering efficient and reliable services that ensure quick access to coal seams.",
    points: [
      "Quick access to coal seams",
      "Cost-effective stripping ratio",
      "Optimised mining operations",
      "Supports sustainable production and long-term growth",
    ],
  },
  {
    id: "mining-equipment",
    title: "Mining Equipment Services",
    icon: "fa-solid fa-gears",
    img: "../mining-equipment-services.webp",
    desc: "A wide range of mining services, from physical mining operations to support services, tailored to every stage of the mining process.",
    points: [
      "Staffing services",
      "Technical consulting",
      "Field crew support",
      "Geographical analysis",
    ],
  },
  {
    id: "earthwork",
    title: "Earth Work & Maintenance",
    icon: "fa-solid fa-mountain",
    img: "../earth-work-maintenance.webp",
    desc: "Earthwork and maintenance services that support your mining projects, with an experienced team ensuring efficient earth moving and upkeep.",
    points: [
      "Excavation and grading",
      "Site preparation",
      "Ongoing site maintenance",
      "Maximised operational safety and productivity",
    ],
  },
  {
    id: "excavation",
    title: "Excavation Charges",
    icon: "fa-solid fa-trowel-bricks",
    img: "../excavation-services.webp",
    desc: "Expert excavation services to handle all your earth-moving needs efficiently and affordably, supporting your projects from start to finish.",
    points: [
      "Precise excavation solutions",
      "Reliable, dependable execution",
      "Efficient and affordable",
      "Support from start to finish",
    ],
  },
];

// Mining stages covered by our services (exploration, operation, reclamation)
export const stages = {
  title: "Support at Every Stage of Mining",
  intro:
    "Whether you're in exploration, operation, or reclamation, our services ensure efficient, effective and reliable mining operations.",
  list: [
    { label: "Exploration", icon: "fa-solid fa-magnifying-glass-location" },
    { label: "Operation", icon: "fa-solid fa-industry" },
    { label: "Reclamation", icon: "fa-solid fa-seedling" },
  ],
};

export const fleet = {
  title: "Our Fleet Force",
  subtitle:
    "250+ strong vehicles leading the way in OB removal, mining equipment services, earthwork solutions and excavation.",
  items: [
    { name: "Excavator", icon: "fa-solid fa-trowel" },
    { name: "Dozer", icon: "fa-solid fa-snowplow" },
    { name: "Grader", icon: "fa-solid fa-road" },
    { name: "Drill", icon: "fa-solid fa-screwdriver" },
    { name: "Volvo", icon: "fa-solid fa-truck-moving" },
    { name: "Scania", icon: "fa-solid fa-truck-moving" },
    { name: "BharatBenz", icon: "fa-solid fa-truck-moving" },
    { name: "Tata", icon: "fa-solid fa-truck-moving" },
  ],
};

export const cta = {
  title: "Need mining or earthwork support?",
  text: "Talk to our team about OB removal, mining equipment services, earthwork or excavation for your project.",
  phone: "+91 9353111111",
  email: "Info@samarveerautoandlube.com",
  buttonLabel: "Send Enquiry",
  buttonHref: "/contact",
};