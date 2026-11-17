import { useParams } from "react-router-dom";
import { getCampus } from "../../../data/campuses";
import { categories } from "../../../data/categories";


export default function useCategories() {
  return { categories };
}