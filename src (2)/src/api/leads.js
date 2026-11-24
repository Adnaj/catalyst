import { apiPost } from "./http";

// form = contact | guidance | popup | online-course | offline-course
// Returns the success message from the server. Throws Error(message) on failure.
export async function sendLead(form, body) {
  const data = await apiPost(`/leads/${form}`, body, "Unable to submit enquiry");
  return data.message;
}