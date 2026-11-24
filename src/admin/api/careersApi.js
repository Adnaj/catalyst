// Job applications (backend: /api/careers, admin only). Re-uses request() so the Bearer token + refresh work.
import { request, requestBlob } from "./adminApi";

const enc = encodeURIComponent;
const qs = (params = {}) => {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") p.set(k, String(v));
  });
  const s = p.toString();
  return s ? `?${s}` : "";
};
const idOf = (x) => ({ ...x, id: x.id ?? x._id });

export const careersApi = {
  // params: { status, position, experience, search, page, limit }
  list: (params) =>
    request(`/careers${qs(params)}`, { auth: true }).then((d) => ({
      applications: (d.applications || []).map(idOf),
      total: d.total ?? 0,
      pages: d.pages ?? 1,
      newCount: d.newCount ?? 0,
    })),
  update: (id, body) => request(`/careers/${enc(id)}`, { method: "PATCH", body, auth: true }),
  remove: (id) => request(`/careers/${enc(id)}`, { method: "DELETE", auth: true }),

  // downloads the CV through the authenticated route and saves it in the browser
  downloadCv: async (application) => {
    const blob = await requestBlob(`/careers/${enc(application.id)}/cv`);
    const ext = (application.cvOriginalName || "").match(/\.[a-z0-9]+$/i)?.[0] || ".pdf";
    const safe = String(application.fullName || "applicant").replace(/[^\w.-]+/g, "_");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safe}_CV${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
};