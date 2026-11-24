import useApi from "../hooks/useApi";
import { apiGet, fileUrl, pickList } from "./http";

// Active testimonials, lowest `order` first (guide section 7)
export async function fetchTestimonials() {
  const d = await apiGet("/testimonials");
  return pickList(d, "testimonials").map((t) => ({ ...t, image: fileUrl(t.image) }));
}

export const useTestimonials = () => useApi(["testimonials"], fetchTestimonials);