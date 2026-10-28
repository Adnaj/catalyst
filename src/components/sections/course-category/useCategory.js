import { useParams } from "react-router-dom";
import { getCategory } from "../../../data/categories";
import { coursesByCategory } from "../../../data/courses";

export default function useCategory() {
  const { categorySlug } = useParams();
  const category = getCategory(categorySlug);
  const list = category ? coursesByCategory(category.match) : [];
  return { category, courses: list };
}