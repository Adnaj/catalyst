import { useCallback, useEffect, useRef, useState } from "react";
import { assetUrl, blogCategoriesApi, blogsApi, errorLines } from "../../api/contentApi";
import { slugify } from "../../utils/slugify";
import Icon from "../../components/Icons/Icons";
import Modal, { ConfirmDialog } from "../../components/ui/Modal";
import Field from "../../components/ui/Field";
import Pager from "../../components/ui/Pager";
import Switch from "../../components/ui/Switch";
import Thumb from "../../components/ui/Thumb";
import UploadField from "../../components/ui/UploadField";
import RichTextEditor from "../../components/ui/RichTextEditor";
import { useToast } from "../../components/ui/Toast";

const TYPES = { h3: "Heading", p: "Paragraph" };
const emptyBlock = (type) => ({ type, text: "" });
const escapeHtml = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Old posts may still contain list/quote blocks: convert them to paragraphs so nothing is lost on save.
const legacyToBlock = (x) => {
  if (x.type === "h3") return { type: "h3", text: x.text || "" };
  if (x.type === "list") return { type: "p", text: (x.items || []).map((i) => `<p>• ${escapeHtml(i)}</p>`).join("") };
  if (x.type === "quote") return { type: "p", text: `<p>${escapeHtml(x.text || "")}</p>` };
  const t = x.text || "";
  return { type: "p", text: /^\s*</.test(t) ? t : `<p>${escapeHtml(t)}</p>` }; // plain text -> html
};
const isEmptyHtml = (h = "") => !h.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
const today = () => new Date().toISOString().slice(0, 10);

const toForm = (b) => ({
  title: b?.title ?? "", slug: b?.slug ?? "", categorySlug: b?.categorySlug ?? "", image: b?.image ?? "", excerpt: b?.excerpt ?? "",
  tags: (b?.tags || []).join(", "), authorName: b?.author?.name ?? "", authorRole: b?.author?.role ?? "", authorImage: b?.author?.image ?? "",
  publishedAt: (b?.publishedAt || today()).slice(0, 10), isPublished: b?.isPublished ?? true,
  content: (b?.content || []).map((x, i) => ({ ...legacyToBlock(x), key: `b${i}` })),
});

function BlogModal({ blog, categories, onClose, onSaved }) {
  const editing = !!blog;
  const [form, setForm] = useState(() => toForm(blog));
  const [errors, setErrors] = useState({});
  const [problem, setProblem] = useState(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const set = (k, v) => { setErrors((e) => ({ ...e, [k]: "" })); setForm((f) => ({ ...f, [k]: v })); };
  // The slug always follows the title (on create and on every edit).
  const setTitle = (v) => { setErrors((e) => ({ ...e, title: "" })); setForm((f) => ({ ...f, title: v, slug: slugify(v) })); };
  const keySeq = useRef(1000);
  const newBlock = (type) => ({ ...emptyBlock(type), key: `n${keySeq.current++}` });
  const setBlock = (i, patch) => set("content", form.content.map((b, j) => (j === i ? { ...b, ...patch } : b)));
  const moveBlock = (i, d) => {
    const c = [...form.content]; const j = i + d;
    if (j < 0 || j >= c.length) return;
    [c[i], c[j]] = [c[j], c[i]]; set("content", c);
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    const t = form.title.trim();
    if (t.length < 3 || t.length > 200) er.title = "Title must be 3 to 200 characters";
    if (!form.categorySlug) er.categorySlug = "Choose a category";
    if (Object.keys(er).length) return setErrors(er);

    const content = form.content
      .map((b) => ({ type: b.type, text: b.text.trim() }))
      .filter((b) => (b.type === "p" ? !isEmptyHtml(b.text) : b.text));
    const author = { name: form.authorName.trim(), role: form.authorRole.trim(), image: form.authorImage.trim() };
    const body = {
      title: t, slug: slugify(t) || undefined, categorySlug: form.categorySlug, image: form.image.trim(), excerpt: form.excerpt.trim(),
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean), publishedAt: form.publishedAt, isPublished: form.isPublished, content,
      ...(Object.values(author).some(Boolean) && { author }),
    };
    setBusy(true); setProblem(null);
    try {
      if (editing) await blogsApi.update(blog.slug || blog.id, body);
      else await blogsApi.create(body);
      onSaved(editing ? "Post updated" : form.isPublished ? "Post published" : "Draft saved");
    } catch (err) {
      setProblem({ message: err.message, lines: errorLines(err) });
      setBusy(false);
    }
  };

  return (
    <Modal size="lg" title={editing ? "Edit post" : "New post"} onClose={onClose} busy={busy}
      footer={<>
        <button type="button" className="ui-btn ui-btn--ghost" onClick={onClose} disabled={busy}>Cancel</button>
        <button type="submit" form="blog-form" className="ui-btn ui-btn--primary" disabled={busy || uploading}>{busy ? "Saving…" : editing ? "Save changes" : form.isPublished ? "Publish post" : "Save draft"}</button>
      </>}>
      <form id="blog-form" onSubmit={submit} noValidate>
        {problem && <div className="ui-alert ui-alert--error" role="alert">{problem.message}{problem.lines.length > 0 && <ul>{problem.lines.map((l) => <li key={l}>{l}</li>)}</ul>}</div>}
        <div className="form-grid">
          <Field id="b-title" label="Title" required error={errors.title} className="wide"><input id="b-title" className="ui-input" value={form.title} onChange={(e) => setTitle(e.target.value)} data-autofocus /></Field>
          <Field id="b-cat" label="Category" required error={errors.categorySlug}>
            <select id="b-cat" className="ui-select" value={form.categorySlug} onChange={(e) => set("categorySlug", e.target.value)}>
              <option value="">Select a category</option>
              {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}{c.isActive ? "" : " (inactive)"}</option>)}
            </select>
          </Field>
          <Field id="b-slug" label="Slug" hint="Generated automatically from the title and updated whenever the title changes.">
            <input id="b-slug" className="ui-input" value={form.slug} readOnly />
          </Field>
          <div className="wide"><UploadField id="b-image" label="Cover image" folder="blog-images" value={form.image} onChange={(v) => set("image", v)} onBusyChange={setUploading} placeholder="/uploads/blog-images/…" /></div>
          <Field id="b-excerpt" label="Excerpt" hint="Short text shown on the cards." className="wide"><textarea id="b-excerpt" className="ui-textarea" rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} /></Field>
          <Field id="b-tags" label="Tags" hint="Separate with commas."><input id="b-tags" className="ui-input" value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Growth, Success" /></Field>
          <Field id="b-date" label="Publish date"><input id="b-date" type="date" className="ui-input" value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} /></Field>
          <Field id="b-an" label="Author name"><input id="b-an" className="ui-input" value={form.authorName} onChange={(e) => set("authorName", e.target.value)} /></Field>
          <Field id="b-ar" label="Author role"><input id="b-ar" className="ui-input" value={form.authorRole} onChange={(e) => set("authorRole", e.target.value)} placeholder="Co founder" /></Field>
          <div className="wide"><UploadField id="b-ai" label="Author photo" folder="blog-images" value={form.authorImage} onChange={(v) => set("authorImage", v)} onBusyChange={setUploading} /></div>
          <div className="ui-check wide"><Switch checked={form.isPublished} onChange={(v) => set("isPublished", v)} label="Published" /><span>Published<small>Turn off to keep this post as a draft.</small></span></div>
        </div>

        <h3 style={{ margin: "18px 0 8px" }}>Content</h3>
        {editing && <p className="ui-muted" style={{ marginBottom: 8 }}>Saving replaces the whole content body with the blocks below.</p>}
        <div className="blocks">
          {form.content.map((b, i) => (
            <div className="block" key={b.key}>
              <div className="block__bar">
                <strong>{TYPES[b.type]}</strong>
                <span className="grow" />
                <button type="button" className="ui-iconbtn ui-iconbtn--sm" onClick={() => moveBlock(i, -1)} disabled={i === 0} aria-label="Move up"><Icon name="up" size={16} /></button>
                <button type="button" className="ui-iconbtn ui-iconbtn--sm" onClick={() => moveBlock(i, 1)} disabled={i === form.content.length - 1} aria-label="Move down"><Icon name="down" size={16} /></button>
                <button type="button" className="ui-iconbtn ui-iconbtn--sm ui-iconbtn--danger" onClick={() => set("content", form.content.filter((_, j) => j !== i))} aria-label="Remove block"><Icon name="trash" size={16} /></button>
              </div>
              {b.type === "p"
                ? <RichTextEditor value={b.text} onChange={(html) => setBlock(i, { text: html })} />
                : <input className="ui-input" value={b.text} onChange={(e) => setBlock(i, { text: e.target.value })} placeholder="Heading" aria-label="Heading" />}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
          {Object.entries(TYPES).map(([k, v]) => (
            <button key={k} type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={() => set("content", [...form.content, newBlock(k)])}><Icon name="plus" size={16} /> {v}</button>
          ))}
        </div>
      </form>
    </Modal>
  );
}

export default function Blogs() {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ search: "", category: "" });
  const [applied, setApplied] = useState({});
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [opening, setOpening] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { blogCategoriesApi.list().then(setCategories).catch(() => {}); }, []);
  const load = useCallback(async () => {
    setError("");
    try { setData(await blogsApi.list({ ...applied, page, limit: 20 })); } catch (err) { setError(err.message); setData((c) => c ?? { blogs: [], total: 0, pages: 1 }); }
  }, [applied, page]);
  useEffect(() => { load(); }, [load]);

  const openEditor = async (b) => {
    if (!b) return setModal({ blog: null });
    setOpening(true);
    try { setModal({ blog: await blogsApi.get(b.slug || b.id) }); } // the list omits content, so fetch the full post
    catch (err) { toast.error(err.message); }
    finally { setOpening(false); }
  };

  const togglePublish = async (b) => {
    try { await blogsApi.update(b.slug || b.id, { isPublished: !b.isPublished }); toast.success(b.isPublished ? "Moved to drafts" : "Published"); load(); }
    catch (err) { toast.error(err.message); }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try { await blogsApi.remove(toDelete.slug || toDelete.id); toast.success("Post deleted"); load(); }
    catch (err) { toast.error(err.message); }
    finally { setDeleting(false); setToDelete(null); }
  };

  return (
    <section className="admin-page">
      <header className="admin-page__head" style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
        <div><h1 className="admin-page__title">Blogs</h1><p className="admin-page__desc">Write, publish and manage articles. Drafts are only visible here.</p></div>
        <button type="button" className="ui-btn ui-btn--primary" onClick={() => openEditor(null)}><Icon name="plus" size={18} /> New post</button>
      </header>

      <form className="lead-filters" onSubmit={(e) => { e.preventDefault(); setApplied(Object.fromEntries(Object.entries(filters).filter(([, v]) => v))); setPage(1); }}>
        <div className="ui-search" style={{ minWidth: 240 }}><Icon name="search" size={18} /><input className="ui-input" value={filters.search} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))} placeholder="Search titles" aria-label="Search titles" /></div>
        <select className="ui-select" value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))} aria-label="Category">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
        <button type="submit" className="ui-btn ui-btn--primary ui-btn--sm">Apply</button>
      </form>

      {error && <div className="ui-alert ui-alert--error" role="alert" style={{ marginBottom: 16 }}>Couldn’t load posts: {error}<div className="ui-alert__retry"><button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={load}>Try again</button></div></div>}

      {!data ? (
        <div className="ui-tablewrap" aria-busy="true"><table className="ui-table"><tbody>{[0, 1, 2, 3].map((i) => <tr key={i}><td><div className="ui-skel" style={{ width: `${70 - i * 10}%` }} /></td></tr>)}</tbody></table></div>
      ) : data.blogs.length === 0 && !error ? (
        <div className="ui-empty"><h2>No posts found</h2><p>{Object.keys(applied).length ? "Try different filters." : "Write your first post to see it here."}</p>{!Object.keys(applied).length && <button type="button" className="ui-btn ui-btn--primary" onClick={() => openEditor(null)}><Icon name="plus" size={18} /> New post</button>}</div>
      ) : (
        <>
          <div className="ui-tablewrap">
            <table className="ui-table">
              <thead><tr><th>Post</th><th>Category</th><th>Date</th><th>Status</th><th className="is-right">Actions</th></tr></thead>
              <tbody>
                {data.blogs.map((b) => (
                  <tr key={b.id}>
                    <td><div className="ui-cell"><Thumb src={assetUrl(b.image)} size={44} /><div><strong>{b.title}</strong><small>/{b.slug}</small></div></div></td>
                    <td>{b.category}</td>
                    <td className="ui-muted">{b.date || (b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : "—")}</td>
                    <td><span className={`ui-pill ${b.isPublished ? "ui-pill--ok" : "ui-pill--muted"}`}>{b.isPublished ? "Published" : "Draft"}</span></td>
                    <td className="is-right"><span className="ui-actions">
                      <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={() => togglePublish(b)}>{b.isPublished ? "Unpublish" : "Publish"}</button>
                      <button type="button" className="ui-iconbtn" onClick={() => openEditor(b)} disabled={opening} aria-label={`Edit ${b.title}`} title="Edit"><Icon name="edit" size={18} /></button>
                      <button type="button" className="ui-iconbtn ui-iconbtn--danger" onClick={() => setToDelete(b)} aria-label={`Delete ${b.title}`} title="Delete"><Icon name="trash" size={18} /></button>
                    </span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pager page={page} pages={data.pages} total={data.total} onPage={setPage} />
        </>
      )}

      {modal && <BlogModal blog={modal.blog} categories={categories} onClose={() => setModal(null)} onSaved={(m) => { setModal(null); toast.success(m); load(); }} />}
      {toDelete && <ConfirmDialog title="Delete post?" message={`“${toDelete.title}” will be permanently removed. This can’t be undone.`} busy={deleting} onConfirm={confirmDelete} onCancel={() => setToDelete(null)} />}
    </section>
  );
}