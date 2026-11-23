// Form <-> API mapping for a course. Kept apart from the component so the PATCH/POST logic is easy to read.

const str = (v) => (v == null ? "" : String(v));
const arr = (v) => (Array.isArray(v) ? v : []);
const t = (v) => (typeof v === "string" ? v.trim() : v);

const optionCard = (o = {}) => ({
  label: str(o.label), title: str(o.title), detail: str(o.detail),
  description: str(o.description), button: str(o.button), image: str(o.image),
});

export const defaultLearningOptions = () => ({
  eyebrow: "Learning Path",
  title: ["Learn Your Way.", "Build Your Future."],
  online: optionCard({ label: "Learn Online", detail: "Join Online", button: "Enrol online", image: "/assets/images/course/mode1.jpg" }),
  offline: optionCard({ label: "Learn Offline", detail: "Learn From Campus", button: "Enrol offline", image: "/assets/images/course/mode2.jpg" }),
});

export const blankForm = () => ({
  courseKey: "", slug: "", categorySlug: "", label: "", duration: "", heading: "", summary: "",
  type: "Certification", featured: false, order: "",
  image: "", brochure: "", certificate: "",
  overviewTitle: "", overview: "",
  gain: [], learn: [], skills: [], tools: [], careers: [],
  eligibilityTitle: "", eligibility: [],
  certificateTitle: "", certificateText: "",
  learningOptions: defaultLearningOptions(),
  whyTitle: "", whySubtitle: "", why: [], faqs: [],
});

export const BLANK_ITEMS = {
  learn: { title: "", text: "" },
  eligibility: { label: "", text: "" },
  why: { icon: "", title: "", text: "" },
  faq: { question: "", answer: "" },
};

// API course -> editable form state (missing fields become "" / [] so every input stays controlled)
export function fromApi(c, categories = []) {
  let categorySlug = c.categorySlug || c.category?.slug || "";
  if (!categorySlug) {
    const name = typeof c.category === "string" ? c.category : c.category?.name;
    categorySlug = categories.find((x) => x.name === name)?.slug || "";
  }
  const o = c.learningOptions || {};
  const titleLines = Array.isArray(o.title) ? o.title.map(str) : o.title ? [str(o.title)] : [];
  while (titleLines.length < 2) titleLines.push("");

  return {
    courseKey: str(c.courseKey), slug: str(c.slug), categorySlug,
    label: str(c.label), duration: str(c.duration), heading: str(c.heading), summary: str(c.summary),
    type: str(c.type), featured: !!c.featured, order: c.order == null ? "" : String(c.order),
    image: str(c.image), brochure: str(c.brochure), certificate: str(c.certificate),
    overviewTitle: str(c.overviewTitle), overview: str(c.overview),
    gain: arr(c.gain).map(str), skills: arr(c.skills).map(str), tools: arr(c.tools).map(str), careers: arr(c.careers).map(str),
    learn: arr(c.learn).map((x) => ({ title: str(x.title), text: str(x.text) })),
    eligibilityTitle: str(c.eligibilityTitle),
    eligibility: arr(c.eligibility).map((x) => ({ label: str(x.label), text: str(x.text) })),
    certificateTitle: str(c.certificateTitle), certificateText: str(c.certificateText),
    learningOptions: { eyebrow: str(o.eyebrow), title: titleLines, online: optionCard(o.online), offline: optionCard(o.offline) },
    whyTitle: str(c.whyTitle), whySubtitle: str(c.whySubtitle),
    why: arr(c.why).map((x) => ({ icon: str(x.icon), title: str(x.title), text: str(x.text) })),
    faqs: arr(c.faqs).map((x) => ({ question: str(x.question), answer: str(x.answer) })),
  };
}

// Trim everything and drop blank list rows. Used for change detection and for building payloads.
export function normalize(f) {
  const strs = (a) => a.map(t).filter(Boolean);
  const records = (a, keys) =>
    a.map((x) => Object.fromEntries(keys.map((k) => [k, t(x[k])]))).filter((x) => keys.some((k) => x[k]));
  const trimAll = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, t(v)]));
  const order = f.order === "" || Number.isNaN(Number(f.order)) ? "" : Number(f.order);

  return {
    courseKey: t(f.courseKey), slug: t(f.slug), categorySlug: f.categorySlug,
    label: t(f.label), duration: t(f.duration), heading: t(f.heading), summary: t(f.summary),
    type: t(f.type), featured: !!f.featured, order,
    image: t(f.image), brochure: t(f.brochure), certificate: t(f.certificate),
    overviewTitle: t(f.overviewTitle), overview: t(f.overview),
    gain: strs(f.gain), learn: records(f.learn, ["title", "text"]),
    skills: strs(f.skills), tools: strs(f.tools), careers: strs(f.careers),
    eligibilityTitle: t(f.eligibilityTitle), eligibility: records(f.eligibility, ["label", "text"]),
    certificateTitle: t(f.certificateTitle), certificateText: t(f.certificateText),
    learningOptions: {
      eyebrow: t(f.learningOptions.eyebrow),
      title: strs(f.learningOptions.title),
      online: trimAll(f.learningOptions.online),
      offline: trimAll(f.learningOptions.offline),
    },
    whyTitle: t(f.whyTitle), whySubtitle: t(f.whySubtitle), why: records(f.why, ["icon", "title", "text"]),
    faqs: records(f.faqs, ["question", "answer"]),
  };
}

// POST body: send what was filled in, leave blank optional fields out.
export function createPayload(form) {
  const n = normalize(form);
  const body = {};
  Object.entries(n).forEach(([k, v]) => {
    if (v === "" || (Array.isArray(v) && v.length === 0)) return;
    body[k] = v;
  });
  body.featured = n.featured;
  body.learningOptions = n.learningOptions;
  return body;
}

// PATCH body: ONLY fields that changed. Arrays go as complete replacements (the API replaces the whole array).
export function patchPayload(form, initial) {
  const now = normalize(form);
  const was = normalize(initial);
  const patch = {};
  Object.keys(now).forEach((k) => {
    if (k === "courseKey") return; // identifies the course in the URL; not editable
    if (k === "order" && now.order === "") return; // can't be cleared, only changed
    if (JSON.stringify(now[k]) !== JSON.stringify(was[k])) patch[k] = now[k];
  });
  return patch;
}

const KEY_RE = /^[A-Za-z0-9_-]+$/;

// Returns { fieldName: message }. List-level problems use the list's field name.
// Returns { fieldName: message }. List-level problems use the list's field name.
export function validate(f, { creating, hadFaqs = false }) {
  const e = {};
  const need = (k, msg) => !t(f[k]) && (e[k] = msg);

  if (creating) {
    if (!t(f.courseKey)) e.courseKey = "Course key is required";
    else if (!KEY_RE.test(t(f.courseKey))) e.courseKey = "Use letters, numbers, - and _ only (no spaces or slashes)";
    need("slug", "Slug is required");
  }
  need("label", "Course name is required");
  if (!f.categorySlug) e.categorySlug = "Choose a category";
  need("duration", "Duration is required");
  need("heading", "Heading is required");
  need("summary", "Summary is required");
  if (f.order !== "" && Number.isNaN(Number(f.order))) e.order = "Order must be a number";

  const half = (list, keys, name, msg) => {
    if (list.some((x) => keys.some((k) => t(x[k])) && keys.some((k) => !t(x[k])))) e[name] = msg;
  };
  half(f.learn, ["title", "text"], "learn", "Each item needs both a title and text (or remove the empty one).");
  half(f.eligibility, ["label", "text"], "eligibility", "Each item needs both a label and text.");
  half(f.why, ["icon", "title", "text"], "why", "Each item needs an icon, title and text.");
  half(f.faqs, ["question", "answer"], "faqs", "Each FAQ needs both a question and an answer (or remove the empty one).");

  // the API needs at least one FAQ. Old courses that never had any can still be saved without one.
  if (!e.faqs && (creating || hadFaqs) && !f.faqs.some((x) => t(x.question) && t(x.answer))) {
    e.faqs = "Add at least one FAQ.";
  }
  return e;
}
