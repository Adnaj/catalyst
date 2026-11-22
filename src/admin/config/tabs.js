// One list drives the sidebar, the Ctrl/⌘+K palette and the overview cards.
// When you build a real tab, set soon: false (or delete it) to remove its "Coming soon" chip.
export const TABS = [
  { to: "/admin", label: "Overview", icon: "grid", end: true, desc: "Your starting point" },
  { to: "/admin/career", label: "Careers", icon: "briefcase", desc: "Job openings and applications", soon: true },
  { to: "/admin/testimonials", label: "Testimonials", icon: "message", desc: "Learner stories shown on the site", soon: true },
  { to: "/admin/leads", label: "Lead forms", icon: "target", desc: "People who asked to be contacted", soon: true },
  { to: "/admin/contact", label: "Contact forms", icon: "mail", desc: "Messages from the contact page", soon: true },
];

export const MOD_KEY = typeof navigator !== "undefined" && /Mac/i.test(navigator.platform) ? "⌘" : "Ctrl";