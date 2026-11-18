

// Content for the Mining & Transportation landing page.
// Edit text / links here only. Icons are Font Awesome 6 classes.
// Route links MUST match your <Route path="..."> strings exactly.
// Images: any import or URL works. Set `image: null` on a card to show the icon instead.

export const mtContent = {
  breadcrumb: { home: { label: "Home", to: "/" }, current: "Mining & Transportation" },

  // Faded photo behind the hero (set to null for no photo)
  heroImage: { src: "./images/fleet-wide.jpeg", alt: "Samarveer fleet of tipper trucks at a mine site" },

  eyebrow: "Mining & Transportation",
  titleTop: "From Pit to Plant,",
  titleAccent: "We Keep It Moving",
  subtitle:
    "Overburden removal, coal supply and trading, and dependable diesel and fuel supply: three connected services, backed by a fleet of 250+ vehicles, to keep your mining operation productive from the first cut to the final delivery.",
  heroCtas: [
    { label: "Explore Services", href: "#mt-services", variant: "primary", icon: "fa-solid fa-arrow-down" },
    { label: "Get a Quote", to: "/contact", variant: "ghost", icon: "fa-solid fa-paper-plane" },
  ],
  heroStats: [
    { icon: "fa-solid fa-truck-moving", value: "250+", label: "Vehicles" },
    { icon: "fa-solid fa-layer-group", value: "3", label: "Core services" },
    { icon: "fa-solid fa-route", value: "Pit to Plant", label: "End-to-end support" },
  ],

  // ---- How the three services connect ----
  chain: {
    heading: "One partner across the mining value chain",
    intro:
      "In open-cast mining each stage depends on the one before it. We support all three, so there is one team to call and fewer gaps to manage.",
    steps: [
      { icon: "fa-solid fa-mountain", tag: "Clear", title: "Overburden Removal", text: "Soil and rock above the coal seam are stripped away to expose it for mining." },
      { icon: "fa-solid fa-truck-moving", tag: "Move", title: "Coal Supply & Trading", text: "Coal travels from the mine to the industries that depend on it." },
      { icon: "fa-solid fa-gas-pump", tag: "Power", title: "Diesel & Fuel Supply", text: "A steady fuel supply keeps every machine and truck on the job." },
    ],
  },

  // ---- The three landing pages ----
  servicesHeading: "Our Mining & Transportation Services",
  servicesIntro: "Choose a service to see what we offer, how it works and how to get started.",
  services: [
    {
      num: "01",
      icon: "fa-solid fa-mountain",
      title: "Overburden Removal",
      tagline: "Clearing the way to the coal",
      text:
        "Before coal can be mined, the layers of soil and rock sitting above the seam have to be removed. It is the first and often the biggest earth-moving job on an open-cast site, and everything downstream depends on it staying on schedule.",
      points: [
        "Excavation and loading of soil and rock",
        "Hauling to designated dump areas",
        "Planned, schedule-driven removal",
        "Heavy equipment backed by a large fleet",
      ],
      image: { src: "./ob-removel.webp", alt: "Tipper trucks with raised bodies at a mining yard" },
      to: "/mining-transportation/overburden-removal",
      cta: "Explore Overburden Removal",
    },
    {
      num: "02",
      icon: "fa-solid fa-boxes-stacked",
      title: "Coal Supply & Trading",
      tagline: "Reliable coal, delivered where it is needed",
      text:
        "Cement plants, sponge-iron units, captive power producers and other industries need coal on time and in the right grade. We connect the mine to the consumer with sourcing, transportation and dependable delivery.",
      points: [
        "Coal sourcing for industrial consumers",
        "Road transportation by our own fleet",
        "Timely, schedule-based dispatch",
        "Support for regular and bulk requirements",
      ],
      image: { src: "./images/fleet-wide.jpeg", alt: "Samarveer fleet lined up for coal transportation" },
      to: "/mining-transportation/coal-supply-&-Trading",
      cta: "Explore Coal Supply & Trading",
    },
    {
      num: "03",
      icon: "fa-solid fa-gas-pump",
      title: "Diesel & Fuel Supply",
      tagline: "Fuel that keeps operations running",
      text:
        "Mining equipment works around the clock, and a stalled machine costs production. Planned, safe delivery of diesel and fuel keeps haul trucks, excavators and other equipment running without interruption.",
      points: [
        "Bulk diesel and fuel supply",
        "Planned, on-schedule deliveries",
        "Safe handling, storage and transfer",
        "Support for mining and transport fleets",
      ],
      image: { src: "./diesel.webp", alt: "Samarveer fleet lined up for coal transportation" },// no fuel photo yet: the icon is shown instead
      to: "/mining-transportation/diesel-and-fuel-supply",
      cta: "Explore Diesel & Fuel Supply",
    },
  ],

  // ---- Industry insights (sourced; keep the source line when editing) ----
  insights: {
    heading: "Why this work matters",
    intro: "A few facts about the industry we serve.",
    items: [
      {
        icon: "fa-solid fa-truck-ramp-box",
        value: "56%",
        label: "of an opencast mine’s diesel goes into its dump trucks",
        source: "CSIR–Central Institute of Mining & Fuel Research study",
      },
      {
        icon: "fa-solid fa-road",
        value: "~30%",
        label: "of Coal India’s coal moved by road in 2025",
        source: "Ministry of Coal, Annual Report 2025-26",
      },
      {
        icon: "fa-solid fa-industry",
        value: "Cement, sponge iron & power",
        label: "plants buy coal through linkage and e-auctions, where timely delivery matters",
        source: "Ministry of Coal / Coal India",
      },
    ],
  },

  // ---- Why us ----
  whyHeading: "Why companies choose us",
  strengths: [
    { icon: "fa-solid fa-truck", title: "250+ Vehicles", text: "A large fleet gives you capacity and flexibility."},
    { icon: "fa-solid fa-link", title: "Connected Services", text: "Overburden, coal and fuel under one roof." },
    { icon: "fa-solid fa-helmet-safety", title: "Safety First", text: "Disciplined, safe operations on every site." },
    { icon: "fa-solid fa-clock", title: "On-Time Delivery", text: "Schedules we plan for and stick to." },
  ],

  cta: {
    title: "Let’s plan your next move",
    text: "Tell us about your site, volumes and timelines, and we will come back with a clear plan.",
    button: { label: "Send an Enquiry", to: "/contact" },
  },
};