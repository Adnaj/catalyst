import { useParams } from "react-router-dom";
import { getCampus } from "../../../data/campuses";
import { useCategories } from "../../../api/courses";

// campus  -> still from data/campuses.js (there is no campus API)
// categories (course chips) -> GET /api/categories?active=true
export default function useCampus() {
  const { campusSlug } = useParams();
  const { data } = useCategories({ active: true });
  return { campus: getCampus(campusSlug), categories: data || [] };
}