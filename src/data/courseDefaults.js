// Fallback text for the course page sections that the API only partly fills.
// (Replaces getLearningOptions / getWhyChoose from the old data/courseDetailContent.js.)

// "Learning Path" cards: the API sends title + description for online/offline,
// everything else (labels, buttons, images) comes from here.
export const getLearningOptions = (d = {}, name = "") => {
  const o = d.learningOptions || {};
  return {
    eyebrow: "Learning Path",
    title: ["Learn Your Way.", "Build Your Future."],
    online: {
      label: "Learn Online",
      title: `Learn ${name} Online`.replace("Learn  ", "Learn "),
      detail: "Join Online",
      description: `Build your ${name ? name + " " : ""}skills through flexible online learning. Attend sessions remotely, learn from experienced trainers, and access recorded classes for convenient learning and revision.`,
      button: "Enrol online",
      image: "/assets/images/course/mode1.jpg",
      ...o.online,
    },
    offline: {
      label: "Learn Offline",
      title: "Start your offline Learning Journey",
      detail: "Learn From Campus",
      description: `Prefer classroom learning? Join our offline ${name ? name + " " : ""}programme for direct interaction with mentors and a collaborative learning environment at Catalyst.`,
      button: "Enrol Offline",
      image: "/assets/images/course/mode2.jpg",
      ...o.offline,
    },
  };
};

const defaultWhy = [
  { icon: "BriefcaseBusiness", title: "Real world projects", text: "Go beyond theory with hands-on practice with real world projects." },
  { icon: "UsersRound", title: "Industry expert mentors", text: "Learn from the mentors who have 8+ years of industry experience." },
  { icon: "Wrench", title: "Master advanced tools", text: "Gain hands-on experience with advanced tools, technologies and applications." },
  { icon: "Sparkles", title: "AI powered learning", text: "Develop the skills that help you lead in an increasingly AI powered industry." },
  { icon: "Compass", title: "Personalised guidance", text: "Get the right guidance for your career and future." },
  { icon: "GraduationCap", title: "Internship opportunities", text: "Apply your skills in a professional environment and gain valuable work experience." },
  { icon: "ChartNoAxesCombined", title: "Career & placement guidance", text: "Get the guidance and support you need to prepare for and find the right job." },
  { icon: "UserRoundCheck", title: "Professional skill development", text: "Build communication, problem-solving and professional skills needed to grow in your career." },
];

// "Why choose Catalyst": course-specific list when the API has one, else the generic list.
export const getWhyChoose = (d = {}) => ({
  label: d.whyTitle || "Why choose Catalyst",
  heading: d.whySubtitle || "Upskill with the right guidance for your career.",
  items: d.why?.length ? d.why : defaultWhy,
});