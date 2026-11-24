// One place for the server address + fetch helpers. Used by every file in /api.
//
// .env  ->  VITE_API_URL=http://localhost:5000/api      (server address; a trailing /api is also accepted)
const RAW = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CLEAN_URL = RAW.replace(/\/+$/, "");

export const API_URL = CLEAN_URL.endsWith("/api")
  ? CLEAN_URL
  : `${CLEAN_URL}/api`;

export const SERVER_URL = API_URL.replace(/\/api$/, "");

// "/uploads/blog-images/a.webp" -> "http://localhost:5000/uploads/blog-images/a.webp"
export const fileUrl = (path) =>
  path?.startsWith("/uploads") ? `${SERVER_URL}${path}` : path;

const toQuery = (params = {}) => {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") q.append(k, v);
  });
  const s = q.toString();
  return s ? `?${s}` : "";
};

async function request(method, path, { params, body, fallback } = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}${toQuery(params)}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. Please check your connection.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    const err = new Error(data.message || fallback || "Something went wrong");
    err.status = res.status;
    throw err;
  }
  return data;
}

export const apiGet = (path, params) => request("GET", path, { params });
export const apiPost = (path, body, fallback) =>
  request("POST", path, { body, fallback });

// The guide does not show every response key (e.g. `courses`, `course`), so these two
// helpers look for the named key first and then fall back to the first array / object.
export const pickList = (data, ...keys) => {
  if (Array.isArray(data)) return data;
  for (const k of keys) if (Array.isArray(data?.[k])) return data[k];
  return Object.values(data || {}).find(Array.isArray) || [];
};

export const pickOne = (data, ...keys) => {
  const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
  for (const k of keys) if (isObj(data?.[k])) return data[k];
  const hit = Object.entries(data || {}).find(([k, v]) => k !== "success" && isObj(v));
  return hit ? hit[1] : null;
};