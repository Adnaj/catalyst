// import { useCategories as useCourseCategories } from "../../../api/courses";

// // course chips -> GET /api/categories?active=true
// export default function useCategories() {
//   const { data } = useCourseCategories({ active: true });
//   return { categories: data || [] };
// }

import { useParams } from "react-router-dom";
import { getCampus } from "../../../data/campuses";
import { useCategories as useCourseCategories } from "../../../api/courses";

export default function useCampus() {
  const { campusSlug } = useParams();          // matches /campus/:campusSlug
  const campus = getCampus(campusSlug);

  const { data } = useCourseCategories({ active: true });

  return { campus, categories: data || [] };
}