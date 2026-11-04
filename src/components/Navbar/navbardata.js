
export const navbarData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    children: [
      {
        label: "Company Overview",
        description: "",
        href: "/about",
      },
      {
        label: "Our Journey",
        description: "",
        href: "/journey",
      },
    ],
  },
  {
    label: "Services",
    children: [
      {
        label: "Mining & Earthwork",
        href: "/services/mining",
      },
      {
        label: "Coal Supply and Transportation",
        href: "/services/coal_supply_&_Trading",
      },
      {
        label: "Diesel Supply & Fuel Station",
        href: "/services/diesel_and_fuel",
      },
      {
        label: "Auto Parts & Lubricants",
        href: "/services/autopart",
      },
    ],
  },

  {
    label: "Products",
    href: "/services/autopart"
  },
  
  {
    label: "Career",
    href: "/career",
  },
];

export const navbarConfig = {
  logo: "/logo.png",
  companyName: "SAMARVEER",
  companySubtitle: "AUTO & LUBES PVT. LTD.",
  topbarMessage: "Trusted partnerships. Reliable solutions.",
  enquiryLabel: "Business Enquiries",
  ctaLabel: "Get in Touch",
  ctaHref: "#contact",
};
