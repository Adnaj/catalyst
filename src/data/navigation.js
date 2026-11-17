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
                label: "GCC Accounting",
                to: "/courses-online/gcc-accounting",
              },
              {
                label: "Business Accounting",
                to: "/courses-online/business-accounting",
              },
              {
                label: "SAP Accounting",
                to: "/courses-online/sap-accounting",
              },
              {
                label: "Certified Indian & Foreign Accounting",
                to: "/courses-online/certified-indian-foreign-accounting",
              },
            ],
          },
          {
            label: "Tech Courses",
            to: "/category/tech",
            children: [
              {
                label: "Python Full-Stack with DevOps",
                to: "/courses-online/python-full-stack-devops",
              },
              {
                label: "Data Analytics with Gen AI",
                to: "/courses-online/data-analytics-gen-ai",
              },
              {
                label: "Cyber Security",
                to: "/courses-online/cyber-security",
              },
            ],
          },
          {
            label: "Marketing & Management Courses",
            to: "/category/marketing-management",
            children: [
              {
                label: "Digital Marketing",
                to: "/courses-online/digital-marketing",
              },
              {
                label: "Human Resource Management",
                to: "/courses-online/human-resource-management",
              },
              {
                label: "Office Administration",
                to: "/courses-online/office-administration",
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
                label: "GCC Accounting",
                to: "/courses/gcc-accounting",
              },
              {
                label: "Business Accounting",
                to: "/courses/business-accounting",
              },
              {
                label: "SAP Accounting",
                to: "/courses/sap-accounting",
              },
              {
                label: "Certified Indian & Foreign Accounting",
                to: "/courses/certified-indian-foreign-accounting",
              },
            ],
          },
          {
            label: "Tech Courses",
            to: "/category/tech?mode=offline",
            children: [
              {
                label: "Python Full-Stack with DevOps",
                to: "/courses/python-full-stack-devops",
              },
              {
                label: "Data Analytics with Gen AI",
                to: "/courses/data-analytics-gen-ai",
              },
              {
                label: "Cyber Security",
                to: "/courses/cyber-security",
              },
            ],
          },
          {
            label: "Marketing & Management Courses",
            to: "/category/marketing-management?mode=offline",
            children: [
              {
                label: "Digital Marketing",
                to: "/courses/digital-marketing",
              },
              {
                label: "Human Resource Management",
                to: "/courses/human-resource-management",
              },
              {
                label: "Office Administration",
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
    label: "Contact",
    to: "/contact",
  },
];