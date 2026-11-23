// Categories + Courses endpoints (see "Catalyst SkillHub – Courses & Categories API Guide").
// Re-uses request() from adminApi.js, so the Bearer token + silent refresh-on-401 work automatically.
import { request } from "./adminApi";

const enc = encodeURIComponent;

const qs = (params = {}) => {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "" && v !== false) p.set(k, String(v));
  });
  const s = p.toString();
  return s ? `?${s}` : "";
};

// The guide doesn't spell out the list/detail envelope for courses, so these helpers accept
// the common shapes ({ courses: [] } / { data: [] } / []). If your backend differs, fix it here only.
const toList = (d, ...keys) => {
  for (const k of keys) if (Array.isArray(d?.[k])) return d[k];
  return Array.isArray(d) ? d : [];
};
const toOne = (d, ...keys) => {
  for (const k of keys) if (d?.[k] && typeof d[k] === "object") return d[k];
  return d;
};

const normCategory = (c) => ({
  ...c,
  id: c.id ?? c._id,
  courseCount: { online: 0, offline: 0, total: 0, ...(c.courseCount || {}) },
});

export const categoriesApi = {
  list: () =>
    request("/categories", { auth: true }).then((d) => toList(d, "categories", "data").map(normCategory)),
  create: (body) => request("/categories", { method: "POST", body, auth: true }),
  update: (key, body) => request(`/categories/${enc(key)}`, { method: "PATCH", body, auth: true }),
  remove: (key) => request(`/categories/${enc(key)}`, { method: "DELETE", auth: true }),
};

export const MODES = ["online", "offline"];

export const coursesApi = {
  // filters: { category, featured, search }
  list: (mode, filters = {}) =>
    request(`/courses/${mode}${qs(filters)}`, { auth: true }).then((d) => toList(d, "courses", "data", "items")),
  get: (mode, key) =>
    request(`/courses/${mode}/${enc(key)}`, { auth: true }).then((d) => toOne(d, "course", "data")),
  create: (mode, body) => request(`/courses/${mode}`, { method: "POST", body, auth: true }),
  update: (mode, key, body) => request(`/courses/${mode}/${enc(key)}`, { method: "PATCH", body, auth: true }),
  remove: (mode, key) => request(`/courses/${mode}/${enc(key)}`, { method: "DELETE", auth: true }),
};

// Turn an ApiError into a list of readable lines (validation `errors` can be strings or objects).
export const errorLines = (err) => {
  const list = Array.isArray(err?.errors) ? err.errors : [];
  return list
    .map((e) => (typeof e === "string" ? e : [e.field || e.path, e.message || e.msg].filter(Boolean).join(": ")))
    .filter(Boolean);
};


/* ---------------------------------------------------------------- file uploads */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// Uploaded files are served by the backend, so "/uploads/..." paths need the API origin to preview.
// Set VITE_ASSET_URL if your files live somewhere else (e.g. a CDN).
const ASSET_BASE = import.meta.env.VITE_ASSET_URL || API_URL.replace(/\/api\/?$/, "");
export const assetUrl = (p = "") => (/^\/uploads\//.test(p) ? `${ASSET_BASE}${p}` : p);

export const uploadsApi = {
  // folder: "course-images" | "brochures" | "certificates"  ->  resolves to the stored file's URL/path
  upload: async (file, folder) => {
    const body = new FormData();
    body.append("folder", folder); // text fields BEFORE the file so multer already has them in req.body
    body.append("file", file);
    const d = await request("/uploads", { method: "POST", body, auth: true });
    const url = d.url ?? d.path ?? d.file?.url ?? d.file?.path;
    if (!url) throw new Error("Upload finished but the server did not return a file URL");
    return url;
  },
};