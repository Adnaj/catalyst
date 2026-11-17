// Single source of truth for the enquiry / contact forms
// (used by the Contact page AND the home page "Get the Right Guidance" form).
// Keep the `value`s stable – the backend (/api/contact) depends on them.

export const SUBJECTS = [
  { value: "1", label: "Accounting Courses" },
  { value: "2", label: "GCC Accounting" },
  { value: "3", label: "Business Accounting" },
  { value: "4", label: "SAP Accounting" },
  { value: "5", label: "Certified Indian & Foreign Accounting (CIFA)" },
  { value: "6", label: "Digital Marketing" },
  { value: "7", label: "HR Management" },
  { value: "8", label: "Office Administration" },
  { value: "9", label: "Python Full-Stack Development with DevOps" },
  { value: "10", label: "Data Analytics with Generative AI" },
  { value: "11", label: "Cyber Security" },
];

export const MODES = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];

export const LOCATIONS = [
  "Kannur",
  "Vadakara",
  "Calicut",
  "Manjeri",
  "Perinthalmanna",
  "Kottakkal",
  "Edappal",
  "Thrissur",
  "Kochi",
].map((city) => ({ value: city.toLowerCase(), label: city }));