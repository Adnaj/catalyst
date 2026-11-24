import useApi from "../hooks/useApi";
import { apiGet, fileUrl, pickList, pickOne } from "./http";

// ---------------------------------------------------------------------------
// Course categories + online/offline courses  (guide section 5)
//   /courses/offline -> website route /courses/:slug
//   /courses/online  -> website route /courses-online/:slug
// ---------------------------------------------------------------------------

export const courseListPath = (mode = "online") =>
  mode === "offline" ? "/courses" : "/courses-online";
export const coursePath = (mode, slug) => `${courseListPath(mode)}/${slug}`;

const enc = encodeURIComponent;
const arr = (v) => (Array.isArray(v) ? v : []);
const DEFAULT_HIGHLIGHTS = ["Expert mentors", "Live projects", "Placement support"];

// ---- adapters: API shape -> the shape the page components already use ----

export const adaptCategory = (c) => ({
  ...c,
  match: c.name,
  title: c.title || `${c.name} Course`,
  subtitle: c.subtitle || c.name,
  headline: c.headline || `${c.name} Courses`,
  highlights: c.highlights?.length ? c.highlights : DEFAULT_HIGHLIGHTS,
  image: fileUrl(c.image),
});

// list item (card fields only)
// Tech courses live on catalysttech.in. Their `slug` already holds the full URL,
// so it is used as the link as it is (the card then opens it in a new tab).
const isUrl = (v) => /^https?:\/\//i.test(v || "");
const isTechCard = (c) => {
  const cat = c.category && typeof c.category === "object" ? c.category : { name: c.category };
  return [cat.slug, cat.name].some((v) => String(v ?? "").trim().toLowerCase() === "tech");
};
const cardPath = (c, mode, forceTech) =>
  isUrl(c.slug)
    ? c.slug
    : forceTech || isTechCard(c)
      ? `https://www.catalysttech.in/course/${c.slug}`
      : coursePath(mode, c.slug);

const adaptCard = (c, mode, forceTech = false) => ({
  ...c,
  mode,
  title: c.label,
  image: fileUrl(c.image),
  brochure: fileUrl(c.brochure),
  certificate: fileUrl(c.certificate),
  path: cardPath(c, mode, forceTech),
});

// full course page data
export const adaptCourse = (c, mode) => ({
  ...c,
  mode,
  image: fileUrl(c.image),
  brochure: fileUrl(c.brochure),
  certificate: fileUrl(c.certificate),
  gain: arr(c.gain),
  learn: arr(c.learn),
  skills: arr(c.skills),
  tools: arr(c.tools),
  careers: arr(c.careers),
  eligibility: arr(c.eligibility),
  why: arr(c.why),
  // FAQ accordion uses { q, a }
  faqList: arr(c.faqs).map((f) => ({ q: f.question, a: f.answer })),
  categoryRef:
    c.categoryRef && typeof c.categoryRef === "object"
      ? { ...c.categoryRef, image: fileUrl(c.categoryRef.image) }
      : c.categoryRef,
});

// ---- plain fetchers ----

export async function fetchCategories(params = { active: true }) {
  const d = await apiGet("/categories", params);
  return pickList(d, "categories").map(adaptCategory);
}

export async function fetchCategory(key) {
  const d = await apiGet(`/categories/${enc(key)}`);
  const c = pickOne(d, "category");
  return c ? adaptCategory(c) : null;
}

export async function fetchCategoryCourses(key, mode) {
  const d = await apiGet(`/categories/${enc(key)}/courses`, { mode });
  const forceTech = String(key).trim().toLowerCase() === "tech";
  return pickList(d, "courses").map((c) => adaptCard(c, mode, forceTech));
}

// params: { category, featured, search }
export async function fetchCourses(mode, params) {
  const d = await apiGet(`/courses/${mode}`, params);
  return pickList(d, "courses").map((c) => adaptCard(c, mode));
}

export async function fetchCourse(mode, key) {
  const d = await apiGet(`/courses/${mode}/${enc(key)}`);
  const c = pickOne(d, "course");
  return c ? adaptCourse(c, mode) : null;
}

// ---- hooks ----

export const useCategories = (params) =>
  useApi(["categories", params ?? null], () => fetchCategories(params));

export const useCourses = (mode, params, opts) =>
  useApi(["courses", mode, params ?? null], () => fetchCourses(mode, params), opts);

export const useCourse = (mode, slug) =>
  useApi(["course", mode, slug], () => fetchCourse(mode, slug), { enabled: !!slug });