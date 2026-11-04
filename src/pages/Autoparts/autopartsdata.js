// autopartsdata.js
// Services > Auto Parts & Lubricants. All content is taken from the company profile PDF.
//
// TO ADD AN IMAGE TO A TILE (image on top, heading below):
//   import servoImg from "./assets/brands/servo.png";
//   then add `img: servoImg` to that item, e.g.  { name: "Servo", img: servoImg }
//   If `img` is missing, the tile shows the category icon as a placeholder, so the grid
//   looks the same either way. The `name` is the heading shown under the image.
//   Category icons can be replaced the same way with an `img` on the category.

export const pageHeader = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Auto Parts & Lubricants" },
  ],
  eyebrow: "Our Offerings",
  title: "Auto Parts &",
  highlight: "Lubricants",
  subtitle:
    "High-quality spare parts for Heavy and Light Commercial Vehicles (HCVs & LCVs), along with premium lubricants, tyres, batteries and specialised mining materials.",
};

export const categories = [
  {
    id: "lubricants",
    title: "Lubricants Supplier",
    icon: "fa-solid fa-oil-can",
    img: "../images/lubricant.webp",
    wide: true,
    items: [
      { name: "Motul", img: "../images/motul.webp" },
      { name: "Total", img: "../images/total.webp" },
      { name: "Servo", img: "../images/servo.webp" },
      { name: "HP", img: "../images/hp.webp" },
      { name: "Gulf", img: "../images/gulf.webp" },
      { name: "Valvoline", img: "../images/valvoline.webp" },
      { name: "Castrol", img: "../images/castrol.webp" },
      { name: "Bharat Petroleum (MAK)", img: "../images/bharatpetrolium.webp" },
      
      
    ],
  },
  {
    id: "batteries",
    title: "Batteries Supplier",

    icon: "fa-solid fa-car-battery",
    img: "../images/battery.webp",
    items: [{ name: "Exide", img: "../images/exide.webp" }, { name: "Tuscor", img: "../images/tuscor.webp" }, { name: "Turbiner", img: "../images/turbiner.webp" }],
  },

  {
    id: "tyres",
    title: "Tyres Supplier",
    icon: "fa-solid fa-circle-notch",
    img: "../images/tyre.webp",
    items: [{ name: "CEAT", img: "../images/ceat.webp" }, { name: "MRF", img: "../images/mrf.webp" }],
  },
  {
    id: "leaf-spring",
    title: "Leaf Spring",
    icon: "fa-solid fa-grip-lines",
    img : "../images/leaf.webp",
    items: [{ name: "Jai Kamani and Nirman Kamani", img: "../images/kamani.webp"}],
  },
  {
    id: "bearings",
    title: "Industrial Bearings",
    icon: "fa-solid fa-gear",
    img: "../images/bearing.webp",
    items: [{ name: "SKF",img: "../images/skf.webp" }, { name: "NTN", img: "../images/ntn.webp" }],
  },
  {
    id: "spare-parts",
    title: "Spare Parts from Renowned Brands",
    icon: "fa-solid fa-screwdriver-wrench",
    img: "../images/spareparts.webp",
    wide: true,
    items: [
      { name: "Mahindra", img: "../images/mahindra..webp" },
      { name: "Tata", img: "../images/tata.webp" },
      { name: "Ashok Leyland", img: "../images/al.webp" },
      { name: "Eicher", img: "../images/eicher.webp"},
      { name: "Volvo", img: "../images/volvo.webp" },
      { name: "BharatBenz" , img: "../images/bharatbenz.webp"},
    ],
  },
  {
    id: "trading",
    title: "We Are Also Trading In",
    icon: "fa-solid fa-toolbox",
    img: "../images/trading.webp",
    items: [
      { name: "Tie Lever Rod / Jack Rod", img: "../images/tielever.webp" },
      { name: "Hydraulic Jack",img: "../images/wheel.webp" },
      { name: "Leaf Spring", img: "../images/leaf.webp"},
    ],
  },
  {
    id: "bulk",
    title: "We Are Also Bulk Suppliers Of",
    icon: "fa-solid fa-boxes-stacked",
    img: "../images/bulk.webp",
    items: [
      { name: "Tata (Urea)", img: "../images/tataurea.webp" },
      { name: "D.E.F (Urea)", img: "../images/def.webp" },
      { name: "Valvoline (Urea)", img: "../images/valvolineurea.webp" },
      { name: "NDB",img: "../images/ndburea.webp" },
      { name: "Yoke Teeth", img: "../images/yoketeeth.webp" },
      { name: "Spare Parts of HCV / LCV", img: "../images/spare.webp" },
    ],
  },
];

export const cta = {
  title: "Looking for genuine parts or lubricants?",
  text: "Tell us what your fleet or site needs and our team will get back to you.",
  phone: "+91 9353111111",
  email: "Info@samarveerautoandlube.com",
  buttonLabel: "Send Enquiry",
  buttonHref: "/contact",
};