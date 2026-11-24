import useApi from "./useApi";
import { fetchCategories, fetchCourses, coursePath } from "../api/courses";
import { navigation as staticNavigation } from "../data/navigation";
import { campuses, campusPath } from "../data/campuses";

// ---------------------------------------------------------------------------
// Builds the navbar + footer links from the API.
//   Tech category  -> external catalysttech.in site (opens in a new tab)
//   Other category -> normal in-app routes
// While the API is loading (or if it fails) the static data/navigation.js is used.
// ---------------------------------------------------------------------------

export const TECH_SITE = "https://www.catalysttech.in";
export const TECH_COURSES_URL = `${TECH_SITE}/courses`;
// Tech course slug from the API already holds the full URL -> use it as is
// (falls back to the catalysttech.in prefix only if a plain slug ever comes back)
export const techCoursePath = (slug) =>
  /^https?:\/\//i.test(slug || "") ? slug : `${TECH_SITE}/course/${slug}`;

export const isExternal = (to) => /^https?:\/\//i.test(to || "");

const low = (v) => String(v ?? "").trim().toLowerCase();

// category can come back as a string (name), or an object ({ slug, name })
const courseCategoryKeys = (c) => {
  const cat = c.categoryRef && typeof c.categoryRef === "object" ? c.categoryRef : c.category;
  if (cat && typeof cat === "object") return [low(cat.slug), low(cat.name)];
  return [low(cat)];
};

export const isTechCategory = (cat) => low(cat?.slug) === "tech" || low(cat?.name) === "tech";

const buildGroups = (categories, courses, mode) =>
  categories.map((cat) => {
    const tech = isTechCategory(cat);
    const keys = [low(cat.slug), low(cat.name)];
    const items = courses
      .filter((c) => courseCategoryKeys(c).some((k) => k && keys.includes(k)))
      .map((c) => ({
        label: c.label || c.title,
        slug: c.slug,
        to: tech ? techCoursePath(c.slug) : coursePath(mode, c.slug),
        external: tech,
      }));
    const base = `/category/${cat.slug}`;
    return {
      label: `${cat.name} Courses`,
      slug: cat.slug,
      to: tech ? TECH_COURSES_URL : mode === "offline" ? `${base}?mode=offline` : base,
      external: tech,
      children: items,
    };
  });

const loadNavData = async () => {
  const [categories, online, offline] = await Promise.all([
    fetchCategories(),
    fetchCourses("online"),
    fetchCourses("offline"),
  ]);
  return {
    online: buildGroups(categories, online, "online"),
    offline: buildGroups(categories, offline, "offline"),
  };
};

// shared + cached (useApi), so Header / StickyHeader / Footer cause only one request
export default function useNavigation() {
  const { data } = useApi(["nav-courses"], loadNavData);

  if (!data) return { navigation: staticNavigation, groups: null };

  const mega = (label, to, groups) => ({
    label,
    to,
    mega: true,
    children: groups.filter((g) => g.children.length),
  });

  const navigation = [
    { label: "Home", to: "/" },
    {
      label: "Courses",
      to: "#",
      children: [
        mega("Online", "/courses-online", data.online),
        mega("Offline", "/courses", data.offline),
      ],
    },
    {
      label: "Learn Offline",
      to: "/campus",
      children: campuses.map((c) => ({ label: c.name, to: campusPath(c.slug) })),
    },
    { label: "Success Stories", to: "/success-stories" },
    { label: "Blogs", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ];

  return { navigation, groups: data };
}