import { API_URL } from "./http";

// POST /api/careers  (multipart/form-data: text fields + the CV under the field name "cv")
// Returns the server's success message. Throws Error(message) on failure.
// NOTE: don't set Content-Type yourself - the browser adds the multipart boundary.
export async function sendCareerApplication(values, cv) {
  const body = new FormData();
  Object.entries(values).forEach(([k, v]) => body.append(k, v ?? ""));
  body.append("cv", cv);

  let res;
  try {
    res = await fetch(`${API_URL}/careers`, { method: "POST", body });
  } catch {
    throw new Error("Cannot reach the server. Please check your connection.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "We couldn't send your application. Please try again.");
  }
  return data.message;
}