/* =========================================================
   HeMinexTechnology
   Services Data
   ========================================================= */

import mernIcon from "../assets/icons/icon-mern.svg";
import seoIcon from "../assets/icons/icon-seo.svg";
import leadsIcon from "../assets/icons/icon-leads.svg";
import brandingIcon from "../assets/icons/icon-branding.svg";

const services = [
  {
    id: "mern",
    number: "01",
    code: "HM-SYS-01",

    title: "MERN",
    name: "Full-Stack Development",

    shortTitle: "MERN Development",

    description:
      "High-performance web applications engineered with MongoDB, Express, React and Node.js — built for speed, scalability and real-world business growth.",

    icon: mernIcon,

    tags: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
    ],

    accent: "blue",

    metrics: [
      {
        value: "FULL",
        label: "STACK",
      },
      {
        value: "API",
        label: "READY",
      },
      {
        value: "SCALE",
        label: "BUILT",
      },
    ],
  },

  {
    id: "seo",
    number: "02",
    code: "HM-SYS-02",

    title: "SEO",
    name: "Search Growth",

    shortTitle: "SEO & Backlinks",

    description:
      "Technical SEO, content-focused optimization and strategic backlink building designed to increase visibility, authority and qualified organic traffic.",

    icon: seoIcon,

    tags: [
      "Technical SEO",
      "On-Page",
      "Backlinks",
      "Authority",
    ],

    accent: "cyan",

    metrics: [
      {
        value: "SEO",
        label: "READY",
      },
      {
        value: "LINK",
        label: "BUILDING",
      },
      {
        value: "GROW",
        label: "FOCUSED",
      },
    ],
  },

  {
    id: "leads",
    number: "03",
    code: "HM-SYS-03",

    title: "LEADS",
    name: "Lead Generation",

    shortTitle: "Lead Generation",

    description:
      "Conversion-focused lead generation systems that connect your business with the right audience and turn digital attention into actionable opportunities.",

    icon: leadsIcon,

    tags: [
      "Lead Funnels",
      "Targeting",
      "Conversion",
      "Growth",
    ],

    accent: "gold",

    metrics: [
      {
        value: "TARGET",
        label: "AUDIENCE",
      },
      {
        value: "CONVERT",
        label: "FOCUSED",
      },
      {
        value: "GROW",
        label: "SYSTEM",
      },
    ],
  },

  {
    id: "branding",
    number: "04",
    code: "HM-SYS-04",

    title: "BRAND",
    name: "Logo & Brand Identity",

    shortTitle: "Logo & Branding",

    description:
      "Distinctive visual identities crafted to make businesses recognizable, credible and memorable across digital platforms.",

    icon: brandingIcon,

    tags: [
      "Logo Design",
      "Identity",
      "Visual System",
      "Branding",
    ],

    accent: "blue",

    metrics: [
      {
        value: "VISUAL",
        label: "IDENTITY",
      },
      {
        value: "BRAND",
        label: "SYSTEM",
      },
      {
        value: "MEMORY",
        label: "BUILT",
      },
    ],
  },
];

export default services;