import { useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { fetchCategory, fetchCategoryCourses, fetchCourse } from "../../../api/courses";

// Category page data (route /category/:categorySlug)
//   category -> GET /api/categories/:slug
//   courses  -> GET /api/categories/:slug/courses, then each course's full data so the
//               cards can show tools + job roles (the list only has card fields).
const MODE = "offline"; // course links go to /courses/:slug. Use "online" for /courses-online/:slug

export default function useCategory() {
  const { categorySlug } = useParams();

  const cat = useApi(["category", categorySlug], () => fetchCategory(categorySlug), {
    enabled: !!categorySlug,
  });

  const list = useApi(
    ["category-courses", categorySlug, MODE],
    async () => {
      const cards = await fetchCategoryCourses(categorySlug, MODE);
      return Promise.all(
        cards.map((c) =>
          fetchCourse(MODE, c.slug)
            .then((full) => (full ? { ...c, ...full, title: full.label, path: c.path } : c))
            .catch(() => c)
        )
      );
    },
    { enabled: !!categorySlug }
  );

  return {
    category: cat.data,
    courses: list.data || [],
    loading: cat.loading || list.loading,
  };
}