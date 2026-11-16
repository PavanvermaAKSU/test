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
    desc: "In 1998, with a vision in his heart and determination in his mind, our founder, Shri Sudama Mal Tirthwani laid the foundation of RJTP Company — the beginning of what would grow into the Samarveer Group. The journey was far from easy. Starting with no established customer base, no big name in the market, and countless challenges ahead, he began from the ground up. Every customer was a new opportunity. Every order was a step forward. And every challenge became a lesson in building something stronger. Through hard work, dedication, honest business practices, and a commitment to customer satisfaction, he gradually earned the trust of people in the automobile industry. What started as a small beginning became the foundation of a growing business and a lasting legacy. From starting with nothing to building relationships that matter — this is where our journey began.",
    icon: "fa-solid fa-flag-checkered",
    img: "./images/rjtp.webp",
  },
  {
    year: "2011",
    title: "Expansion into Transportation & Mining",
    desc: "By 2011, the trust we had built and the experience we had gained in the automobile industry inspired us to take a bigger step forward. With the same determination and vision, our founder, Shri Sudama Mal Tirthwani, expanded the journey into the Transportation and Mining sectors. It was another challenging beginning — entering new industries, building new relationships, understanding new challenges, and earning the confidence of business partners. Step by step, through dedication, reliable services, and a commitment to delivering on our promises, we began working with reputed listed and unlisted companies across various industries. What started as a journey in the automobile industry was now growing into something bigger — a diversified business built on trust, hard work, and long-term relationships. Because growth is not just about expanding business; it is about having the courage to explore new horizons.",
    icon: "fa-solid fa-truck-moving",
    img: "./images/rjtp.webp",
  },
  {
    year: "2022",
    title: "Samarveer Auto & Lubes Pvt. Ltd.",
    desc: "Years of hard work, experience, and business relationships had taken us a long way. What began as a small step in the automobile industry had gradually grown into a diversified business spanning multiple sectors. In 2022, taking another significant step forward, Shri Sudama Mal Tirthwani established Samarveer Auto & Lubes Pvt. Ltd. with a vision to bring the growing business operations together under one unified identity. It was more than just the establishment of a company, it was a step towards stronger management, better coordination, and a shared vision for the future. Bringing together trading, transportation, mining, and related services, Samarveer marked a new chapter in our journey — combining years of experience with the ambition to grow further. From humble beginnings to a unified business identity — the journey continues, stronger than ever.",
    icon: "fa-solid fa-building",
    img: "./logo.png",
  },
  {
    year: "Today",
    title: "A Legacy of 28 Years",
    desc: "What started in 1998 with a small beginning, a handful of dreams, and the determination of our founder, Shri Sudama Mal Tirthwani, has today grown into a business built on trust, experience, and strong relationships. Over 28 years, every challenge has shaped us, every opportunity has strengthened us, and every partnership has taken us one step further. Today, the Samarveer Group has established a strong presence across Delhi, Odisha, Jharkhand, Uttar Pradesh, Madhya Pradesh, and Andhra Pradesh, supported by a fleet of 250+ vehicles and an expanding network of business operations. From our roots in the automobile industry to our presence across transportation, mining, trading, and related services, our journey reflects years of dedication, perseverance, and continuous growth. But for us, this is not the destination. It is another milestone in a journey that continues with the same vision, commitment, and determination with which it all began. 28 Years of Trust. Countless Milestones. One Vision for the Future.",
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