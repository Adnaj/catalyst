import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categoriesApi, errorLines } from "../../api/contentApi";
import { slugify } from "../../utils/slugify";
import Icon from "../../components/Icons/Icons";
import Modal, { ConfirmDialog } from "../../components/ui/Modal";
import Field from "../../components/ui/Field";
import Switch from "../../components/ui/Switch";
import Thumb from "../../components/ui/Thumb";
import { useToast } from "../../components/ui/Toast";
import "./Categories.css";

const toForm = (c) => ({
  name: c?.name ?? "",
  slug: c?.slug ?? "",
  description: c?.description ?? "",
  image: c?.image ?? "",
  order: c?.order ?? "",
  isActive: c?.isActive ?? true,
});

/* ------------------------------------------------------------------ create / edit modal */
function CategoryModal({ category, nextOrder, onClose, onSaved }) {
  const editing = !!category;
  const [form, setForm] = useState(() => ({ ...toForm(category), order: category ? toForm(category).order : nextOrder }));
  const [slugTouched, setSlugTouched] = useState(editing);
  const [problem, setProblem] = useState(null);
  const [nameError, setNameError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onName = (v) => {
    setNameError("");
    setForm((f) => ({ ...f, name: v, slug: slugTouched ? f.slug : slugify(v) }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setNameError("Name is required");
    setProblem(null);
    setBusy(true);
    try {
      const clean = {
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
        order: form.order === "" ? "" : Number(form.order),
        isActive: form.isActive,
      };

      if (editing) {
        const before = toForm(category);
        const patch = {};
        Object.keys(clean).forEach((k) => {
          if (k === "order" && clean.order === "") return;
          if (String(clean[k]) !== String(before[k])) patch[k] = clean[k];
        });
        if (!Object.keys(patch).length) return onClose();
        await categoriesApi.update(category.slug || category.id, patch);
        onSaved(`“${clean.name}” updated`);
      } else {
        const body = { name: clean.name, isActive: clean.isActive };
        if (clean.slug) body.slug = clean.slug; // blank = let the API generate it
        if (clean.description) body.description = clean.description;
        if (clean.image) body.image = clean.image;
        if (clean.order !== "") body.order = clean.order;
        await categoriesApi.create(body);
        onSaved(`“${clean.name}” created`);
      }
    } catch (err) {
      setProblem({ message: err.message, lines: errorLines(err) });
      setBusy(false);
    }
  };

  return (
    <Modal
      title={editing ? "Edit category" : "New category"}
      onClose={onClose}
      busy={busy}
      footer={
        <>
          <button type="button" className="ui-btn ui-btn--ghost" onClick={onClose} disabled={busy}>Cancel</button>
          <button type="submit" form="category-form" className="ui-btn ui-btn--primary" disabled={busy}>
            {busy ? "Saving…" : editing ? "Save changes" : "Create category"}
          </button>
        </>
      }
    >
      <form id="category-form" className="cat-form" onSubmit={submit} noValidate>
        {problem && (
          <div className="ui-alert ui-alert--error" role="alert">
            {problem.message}
            {problem.lines.length > 0 && <ul>{problem.lines.map((l) => <li key={l}>{l}</li>)}</ul>}
          </div>
        )}

        <Field id="cat-name" label="Name" required error={nameError} hint={editing ? "Renaming also updates the course records linked to this category." : undefined}>
          <input id="cat-name" className="ui-input" value={form.name} onChange={(e) => onName(e.target.value)} placeholder="Design" data-autofocus />
        </Field>

        <Field id="cat-slug" label="Slug" hint={editing ? "Changing the slug changes this category's public URL." : "Leave blank to generate it from the name."}>
          <input id="cat-slug" className="ui-input" value={form.slug} onChange={(e) => { setSlugTouched(true); set("slug", e.target.value); }} placeholder="design" />
        </Field>

        <Field id="cat-desc" label="Description">
          <textarea id="cat-desc" className="ui-textarea" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="UI/UX and graphic design courses" />
        </Field>

        <Field id="cat-image" label="Image path" hint="Path or URL, e.g. /assets/images/categories/design.webp">
          <div className="cat-form__image">
            <input id="cat-image" className="ui-input" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="/assets/images/categories/design.webp" />
            <Thumb src={form.image.trim()} size={44} />
          </div>
        </Field>

        <div className="cat-form__row">
          <Field id="cat-order" label="Display order" hint="Lower numbers come first.">
            <input id="cat-order" type="number" className="ui-input" value={form.order} onChange={(e) => set("order", e.target.value)} />
          </Field>
          <div className="ui-check">
            <Switch checked={form.isActive} onChange={(v) => set("isActive", v)} label="Active" />
            <span>Active<small>Inactive categories are hidden on the website.</small></span>
          </div>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ page */
export default function Categories() {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [modal, setModal] = useState(null); // null | { category } (category null = create)
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(() => new Set());

  const load = useCallback(async () => {
    setError("");
    try {
      setItems(await categoriesApi.list());
    } catch (err) {
      setError(err.message);
      setItems((cur) => cur ?? []);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const sorted = useMemo(
    () => [...(items || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name)),
    [items]
  );
  const visible = sorted.filter((c) => `${c.name} ${c.slug}`.toLowerCase().includes(filter.trim().toLowerCase()));
  const nextOrder = items?.length ? Math.max(...items.map((c) => Number(c.order) || 0)) + 1 : 0;

  const toggleActive = async (c) => {
    const next = !c.isActive;
    setToggling((s) => new Set(s).add(c.id));
    setItems((l) => l.map((x) => (x.id === c.id ? { ...x, isActive: next } : x)));
    try {
      await categoriesApi.update(c.slug || c.id, { isActive: next });
      toast.success(`“${c.name}” is now ${next ? "active" : "inactive"}`);
    } catch (err) {
      setItems((l) => l.map((x) => (x.id === c.id ? { ...x, isActive: !next } : x)));
      toast.error(err.message);
    } finally {
      setToggling((s) => {
        const n = new Set(s);
        n.delete(c.id);
        return n;
      });
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await categoriesApi.remove(toDelete.slug || toDelete.id);
      toast.success(`“${toDelete.name}” deleted`);
      setToDelete(null);
      load();
    } catch (err) {
      toast.error(err.message); // a 409 here carries the online/offline course counts
      setToDelete(null);
      load();
    } finally {
      setDeleting(false);
    }
  };

  const loading = items === null;

  return (
    <section className="admin-page cat-page">
      <header className="admin-page__head cat-head">
        <div>
          <h1 className="admin-page__title">Categories</h1>
          <p className="admin-page__desc">Shared by online and offline courses. A category can only be deleted once no course uses it.</p>
        </div>
        <button type="button" className="ui-btn ui-btn--primary" onClick={() => setModal({ category: null })}>
          <Icon name="plus" size={18} /> New category
        </button>
      </header>

      {error && (
        <div className="ui-alert ui-alert--error" role="alert" style={{ marginBottom: 16 }}>
          Couldn’t load categories: {error}
          <div className="ui-alert__retry"><button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={load}>Try again</button></div>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="ui-toolbar">
          <div className="ui-search ui-toolbar__grow" style={{ maxWidth: 360 }}>
            <Icon name="search" size={18} />
            <input className="ui-input" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search categories" aria-label="Search categories" />
          </div>
          <span className="ui-muted">{visible.length} of {items.length}</span>
        </div>
      )}

      {loading ? (
        <div className="ui-tablewrap" aria-busy="true">
          <table className="ui-table">
            <tbody>
              {[0, 1, 2, 3].map((i) => (
                <tr key={i}><td><div className="ui-skel" style={{ width: `${60 - i * 8}%` }} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : items.length === 0 && !error ? (
        <div className="ui-empty">
          <h2>No categories yet</h2>
          <p>Create a category first — every course has to belong to one.</p>
          <button type="button" className="ui-btn ui-btn--primary" onClick={() => setModal({ category: null })}><Icon name="plus" size={18} /> New category</button>
        </div>
      ) : (
        items.length > 0 && (
          <div className="ui-tablewrap">
            <table className="ui-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Order</th>
                  <th>Courses</th>
                  <th>Active</th>
                  <th className="is-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((c) => {
                  const total = c.courseCount.total;
                  return (
                    <tr key={c.id}>
                      <td>
                        <div className="ui-cell">
                          <Thumb src={c.image} />
                          <div>
                            <strong>{c.name}</strong>
                            <small>/{c.slug}</small>
                          </div>
                        </div>
                      </td>
                      <td className="ui-muted">{c.order ?? 0}</td>
                      <td>
                        <div className="cat-counts">
                          <Link to={`/admin/courses?mode=online&category=${encodeURIComponent(c.slug)}`} className="ui-pill" title="View online courses">{c.courseCount.online} online</Link>
                          <Link to={`/admin/courses?mode=offline&category=${encodeURIComponent(c.slug)}`} className="ui-pill ui-pill--muted" title="View offline courses">{c.courseCount.offline} offline</Link>
                        </div>
                      </td>
                      <td>
                        <Switch checked={!!c.isActive} onChange={() => toggleActive(c)} label={`${c.name} active`} disabled={toggling.has(c.id)} />
                      </td>
                      <td className="is-right">
                        <span className="ui-actions">
                          <button type="button" className="ui-iconbtn" onClick={() => setModal({ category: c })} aria-label={`Edit ${c.name}`} title="Edit"><Icon name="edit" size={18} /></button>
                          <button
                            type="button"
                            className="ui-iconbtn ui-iconbtn--danger"
                            onClick={() => setToDelete(c)}
                            disabled={total > 0}
                            aria-label={`Delete ${c.name}`}
                            title={total > 0 ? `In use by ${total} course${total === 1 ? "" : "s"} — move or delete them first` : "Delete"}
                          >
                            <Icon name="trash" size={18} />
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {!visible.length && (
                  <tr><td colSpan={5} className="ui-muted" style={{ textAlign: "center", padding: 32 }}>No category matches “{filter}”.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )
      )}

      {modal && (
        <CategoryModal
          category={modal.category}
          nextOrder={nextOrder}
          onClose={() => setModal(null)}
          onSaved={(msg) => {
            setModal(null);
            toast.success(msg);
            load();
          }}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete category?"
          message={`“${toDelete.name}” will be permanently removed. This can’t be undone.`}
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </section>
  );
}
