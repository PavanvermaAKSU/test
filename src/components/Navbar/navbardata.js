
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
        href: "/mining-transportation/overburden-removal",
      },
      {
        label: "Coal Supply and Transportation",
        href: "/mining-transportation/coal-supply-&-Trading",
      },
      {
        label: "Diesel Supply & Fuel Station",
        href: "/mining-transportation/diesel-and-fuel-supply",
      },
      {
        label: "Auto Parts & Lubricants",
        href: "/autoparts-&-lubricants",
      },
    ],
  },

  {
    label: "Products",
    href: "/autoparts-&-lubricants"
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
  ctaHref: "/contact",
};
