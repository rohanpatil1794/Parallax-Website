// Central place for navigation + footer config so Header/Footer stay in sync.
// NOTE: This file is imported by client components (Header), so it must NOT
// import Node.js built-ins like `fs`. Dynamic contact data is in lib/serverData.js.

export const siteConfig = {
  name: "Travello",
  tagline: "Expeditions for the curious.",
  description:
    "Guided treks and Himalayan expeditions across the Sahyadris and beyond. Find your summit with Travello.",
  email: "hello@travello.com",
  phone: "+91 98765 43210",
  address: "412, Skyline Heights, FC Road, Pune, Maharashtra 411005",
  hours: "Mon – Sat · 9:00 AM – 7:00 PM IST",
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
    { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  ],
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Treks", href: "/treks" },
  { label: "Gallery", href: "/gallery" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

// Footer column groups
export const footerNav = [
  {
    title: "Customer Support",
    links: [
      { label: "Help Center", href: "/contact" },
      { label: "FAQs", href: "/contact#faqs" },
      { label: "Booking Help", href: "/book" },
      { label: "Cancellation Policy", href: "/terms#cancellation" },
      { label: "Safety Guidelines", href: "/about#safety" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Why Travello", href: "/about#why" },
      { label: "Trek Leaders", href: "/about#team" },
      { label: "Sustainability", href: "/about#sustainability" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
  {
    title: "Terms & Conditions",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/terms#privacy" },
      { label: "Refund Policy", href: "/terms#refund" },
      { label: "Cookie Policy", href: "/terms#cookies" },
    ],
  },
];
