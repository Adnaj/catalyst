export const slugify = (s = "") =>
  s.toLowerCase().trim().replace(/&/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
