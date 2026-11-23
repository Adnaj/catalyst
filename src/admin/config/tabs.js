// One list drives the sidebar, the Ctrl/⌘+K palette and the overview cards.
// When you build a real tab, set soon: false (or delete it) to remove its "Coming soon" chip.
export const TABS = [
  { to: "/admin", label: "Overview", icon: "grid", end: true, desc: "Your starting point" },
  { to: "/admin/courses", label: "Courses", icon: "book", desc: "Online and offline courses" },
  { to: "/admin/categories", label: "Categories", icon: "folder", desc: "Group courses on the website" },
  { to: "/admin/career", label: "Careers", icon: "briefcase", desc: "Job openings and applications", soon: true },
  { to: "/admin/leads", label: "Leads", icon: "target", desc: "Enquiries from the 5 website forms" },
  { to: "/admin/blog-categories", label: "Blog categories", icon: "folder", desc: "Group blog posts on the website" },
  { to: "/admin/blogs", label: "Blogs", icon: "book", desc: "Articles and drafts" },
  { to: "/admin/testimonials", label: "Testimonials", icon: "message", desc: "Learner stories shown on the site" },
];

export const MOD_KEY = typeof navigator !== "undefined" && /Mac/i.test(navigator.platform) ? "⌘" : "Ctrl";
