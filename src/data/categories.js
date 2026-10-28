export const categories = [
  {
    slug: "marketing-management",
    match: "Marketing & Management", // must equal `category` in courses.js
    title: "Marketing & Management Course",
    subtitle: "Marketing & Management",
    headline: "Marketing & Management Courses",
    description:
      "Learn digital marketing, human resource management and office administration from experienced mentors, work with industry tools and prepare for job-ready roles.",
    image: "/assets/images/course/digital.png",
    highlights: ["Expert mentors", "Live projects", "Placement support"],
  },
  {
    slug: "accounting",
    match: "Accounting",
    title: "Accounting Course",
    subtitle: "Accounting",
    headline: "Accounting Courses",
    description:
      "Build expertise in accounting and finance and gain the financial qualifications needed for a career in finance. Learn CIFA, GCC Accounting, Business Accounting, SAP Accounting and more.",
    image: "/assets/images/course/accounting-1.png",
    highlights: ["Tally & SAP training", "Industry certification", "Placement support"],
  },
  {
    slug: "tech",
    match: "Tech",
    title: "Tech Course",
    subtitle: "Tech",
    headline: "Tech Courses",
    description:
      "Get job-ready in full-stack development, data analytics with Gen AI and cyber security through project-first training.",
    image: "/assets/images/course/tech-2.png",
    highlights: ["Project-first learning", "Industry mentors", "Placement support"],
  },
];

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const categoryPath = (slug) => `/category/${slug}`;