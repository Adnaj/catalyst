import { campuses, campusPath } from "./campuses";

export const navigation = [
  {
    label: "Home",
    to: "/",
  },

  {
    label: "Courses",
    to: "#",
    children: [
      // =========================
      // ONLINE COURSES
      // =========================
      {
        label: "Online",
        to: "/courses-online",
        mega: true,
        children: [
          {
            label: "Accounting Courses",
            to: "/category/accounting",
            children: [
              {
                label: "GCC Accounting + AI",
                to: "/courses-online/gcc-accounting-online",
              },
              {
                label: "Business Accounting + AI",
                to: "/courses-online/business-accounting-online",
              },
              {
                label: "SAP Accounting + AI",
                to: "/courses-online/sap-accounting-online",
              },
              {
                label: "Certified Indian & Foreign Accounting + AI",
                to: "/courses-online/certified-indian-foreign-accounting-online",
              },
            ],
          },
          {
            label: "Tech Courses",
            to: "https://www.catalysttech.in/courses",
            children: [
              {
                label: "Python Full-Stack with DevOps + AI",
                to: "https://www.catalysttech.in/course/python-full-stack-development-with-devops",
              },
              {
                label: "Data Analytics with Gen AI",
                to: "https://www.catalysttech.in/course/data-analytics-with-generative-ai",
              },
              {
                label: "Cyber Security + AI",
                to: "https://www.catalysttech.in/course/cyber-security",
              },
            ],
          },
          {
            label: "Marketing & Management Courses",
            to: "/category/marketing-management",
            children: [
              {
                label: "Digital Marketing + AI",
                to: "/courses-online/digital-marketing-online",
              },
              {
                label: "Human Resource Management + AI",
                to: "/courses-online/human-resource-management-online",
              },
              {
                label: "Office Administration + AI",
                to: "/courses-online/office-administration-online",
              },
            ],
          },
        ],
      },

      // =========================
      // OFFLINE COURSES  (links go to /offline-courses/... and ?mode=offline category pages)
      // =========================
      {
        label: "Offline",
        to: "/courses",
        mega: true,
        children: [
          {
            label: "Accounting Courses",
            to: "/category/accounting?mode=offline",
            children: [
              {
                label: "GCC Accounting + AI",
                to: "/courses/gcc-accounting",
              },
              {
                label: "Business Accounting + AI",
                to: "/courses/business-accounting",
              },
              {
                label: "SAP Accounting + AI",
                to: "/courses/sap-accounting",
              },
              {
                label: "Certified Indian & Foreign Accounting + AI",
                to: "/courses/certified-indian-foreign-accounting",
              },
            ],
          },
          {
            label: "Tech Courses",
            to: "https://www.catalysttech.in/courses",
            children: [
              {
                label: "Python Full-Stack with DevOps + AI",
                to: "https://www.catalysttech.in/course/python-full-stack-development-with-devops",
              },
              {
                label: "Data Analytics with Gen AI",
                to: "https://www.catalysttech.in/course/data-analytics-with-generative-ai",
              },
              {
                label: "Cyber Security + AI",
                to: "https://www.catalysttech.in/course/cyber-security",
              },
            ],
          },
          {
            label: "Marketing & Management Courses",
            to: "/category/marketing-management?mode=offline",
            children: [
              {
                label: "Digital Marketing + AI",
                to: "/courses/digital-marketing",
              },
              {
                label: "Human Resource Management + AI",
                to: "/courses/human-resource-management",
              },
              {
                label: "Office Administration + AI",
                to: "/courses/office-administration",
              },
            ],
          },
        ],
      },
    ],
  },

  // =========================
  // OFFLINE CAMPUS
  // =========================
  {
    label: "Learn Offline",
    to: "/campus",
    // One item per district, taken from data/campuses.js (add a district there and it appears here).
    children: campuses.map((c) => ({
      label: c.name,
      to: campusPath(c.slug),
    })),
  },

  {
    label: "Success Stories",
    to: "/success-stories",
  },
  {
    label: "Blogs",
    to: "/blog",
  },

  {
    label: "Contact",
    to: "/contact",
  },
];