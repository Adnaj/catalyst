// Single place to talk to a backend later. Set VITE_API_URL in .env
const BASE = import.meta.env.VITE_API_URL || "";

export async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}
