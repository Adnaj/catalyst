import { useParams } from "react-router-dom";
import { getCampus } from "../../../data/campuses";
import { categories } from "../../../data/categories";

export default function useCampus() {
  const { campusSlug } = useParams();
  return { campus: getCampus(campusSlug), categories };
}