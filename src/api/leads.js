const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function sendLead(form, body) {
  const response = await fetch(`${API}/leads/${form}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to submit enquiry");
  }
  return data.message;
}