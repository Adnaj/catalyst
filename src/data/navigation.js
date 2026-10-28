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
        to: "#",
        mega: true,
        children: [
          {
            label: "Accounting Courses",
            to: "/category/accounting",
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
            to: "/category/tech",
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
            to: "/category/marketing-management",
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

      // =========================
      // OFFLINE COURSES
      // =========================
      // =========================
      // OFFLINE COURSES
      // =========================
      {
        label: "Offline",
        to: "#",
        mega: true,
        children: [
          {
            label: "Accounting Courses",
            to: "/category/accounting",
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
            to: "/category/tech",
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
            to: "/category/marketing-management",
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
    label: "Offline Campus",
    to: "#",
    children: [
      {
        label: "Kannur",
        to: "/campus/kannur",
      },
      {
        label: "Calicut",
        to: "/campus/kozhikode",
      },
      {
        label: "Vadakara",
        to: "/campus/kozhikode",
      },
      {
        label: "Manjeri",
        to: "/campus/malappuram",
      },
      {
        label: "Edappal",
        to: "/campus/malappuram",
      },
      {
        label: "Perinthalmanna",
        to: "/campus/malappuram",
      },
      {
        label: "Kottakkal",
        to: "/campus/malappuram",
      },
      {
        label: "Thrissur",
        to: "/campus/thrissur",
      },
      {
        label: "Kochi",
        to: "/campus/ernakulam",
      },
    ],
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