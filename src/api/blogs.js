import useApi from "../hooks/useApi";
import { apiGet, fileUrl, pickList, pickOne } from "./http";

// ---------------------------------------------------------------------------
// Blog categories + blogs  (guide section 6)
// ---------------------------------------------------------------------------

export const blogPath = (slug) => `/blog/${slug}`;
export const categoryPath = (key) => `/blog?category=${key}`;

const enc = encodeURIComponent;

const adaptPost = (p) => ({
  ...p,
  image: fileUrl(p.image),
  author: p.author
    ? { ...p.author, image: fileUrl(p.author.image), avatar: fileUrl(p.author.avatar) }
    : undefined,
});

// params: { category, tag, search, page, limit }
export async function fetchBlogs(params) {
  const d = await apiGet("/blogs", params);
  const posts = pickList(d, "blogs").map(adaptPost);
  return {
    posts,
    total: d.total ?? posts.length,
    page: d.page ?? 1,
    pages: d.pages ?? 1,
  };
}

export async function fetchBlog(key) {
  const d = await apiGet(`/blogs/${enc(key)}`);
  const p = pickOne(d, "blog");
  return p ? adaptPost(p) : null;
}

export async function fetchRelatedBlogs(key, limit = 3) {
  const d = await apiGet(`/blogs/${enc(key)}/related`, { limit });
  return pickList(d, "blogs", "related").map(adaptPost);
}

// [{ id, name, slug, key, label, postCount }]
export async function fetchBlogCategories() {
  const d = await apiGet("/blog-categories", { active: true });
  return pickList(d, "categories", "blogCategories");
}

// ---- hooks ----

export const useBlogs = (params, opts) =>
  useApi(["blogs", params ?? null], () => fetchBlogs(params), opts);

export const useBlog = (slug) =>
  useApi(["blog", slug], () => fetchBlog(slug), { enabled: !!slug });

export const useRelatedBlogs = (slug, limit = 3) =>
  useApi(["blog-related", slug, limit], () => fetchRelatedBlogs(slug, limit), {
    enabled: !!slug,
  });

export const useBlogCategories = () =>
  useApi(["blog-categories"], fetchBlogCategories);