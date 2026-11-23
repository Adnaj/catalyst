import { useCallback, useEffect, useState } from "react";
import { blogCategoriesApi, errorLines } from "../../api/contentApi";
import Icon from "../../components/Icons/Icons";
import Modal, { ConfirmDialog } from "../../components/ui/Modal";
import Field from "../../components/ui/Field";
import Switch from "../../components/ui/Switch";
import { useToast } from "../../components/ui/Toast";

function CategoryModal({ category, nextOrder, onClose, onSaved }) {
  const editing = !!category;
  const [form, setForm] = useState({ name: category?.name ?? "", description: category?.description ?? "", order: category?.order ?? nextOrder, isActive: category?.isActive ?? true });
  const [nameError, setNameError] = useState("");
  const [problem, setProblem] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setNameError("Name is required");
    setBusy(true); setProblem(null);
    const body = { name: form.name.trim(), description: form.description.trim(), isActive: form.isActive, ...(form.order !== "" && { order: Number(form.order) }) };
    try {
      if (editing) await blogCategoriesApi.update(category.slug || category.id, body);
      else await blogCategoriesApi.create(body);
      onSaved(`“${body.name}” ${editing ? "updated" : "created"}`);
    } catch (err) {
      setProblem({ message: err.message, lines: errorLines(err) });
      setBusy(false);
    }
  };

  return (
    <Modal title={editing ? "Edit blog category" : "New blog category"} onClose={onClose} busy={busy}
      footer={<>
        <button type="button" className="ui-btn ui-btn--ghost" onClick={onClose} disabled={busy}>Cancel</button>
        <button type="submit" form="bcat-form" className="ui-btn ui-btn--primary" disabled={busy}>{busy ? "Saving…" : editing ? "Save changes" : "Create category"}</button>
      </>}>
      <form id="bcat-form" onSubmit={submit} noValidate>
        {problem && <div className="ui-alert ui-alert--error" role="alert">{problem.message}{problem.lines.length > 0 && <ul>{problem.lines.map((l) => <li key={l}>{l}</li>)}</ul>}</div>}
        <Field id="bc-name" label="Name" required error={nameError} hint={editing ? "Renaming also updates every post in this category." : "The slug is generated from the name."}>
          <input id="bc-name" className="ui-input" value={form.name} onChange={(e) => { setNameError(""); set("name", e.target.value); }} placeholder="Career" data-autofocus />
        </Field>
        <Field id="bc-desc" label="Description"><textarea id="bc-desc" className="ui-textarea" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} /></Field>
        <div className="form-grid">
          <Field id="bc-order" label="Display order" hint="Lower numbers come first."><input id="bc-order" type="number" className="ui-input" value={form.order} onChange={(e) => set("order", e.target.value)} /></Field>
          <div className="ui-check"><Switch checked={form.isActive} onChange={(v) => set("isActive", v)} label="Active" /><span>Active<small>Inactive categories are hidden on the website.</small></span></div>
        </div>
      </form>
    </Modal>
  );
}

export default function BlogCategories() {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setError("");
    try { setItems(await blogCategoriesApi.list()); } catch (err) { setError(err.message); setItems((c) => c ?? []); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const sorted = [...(items || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const nextOrder = items?.length ? Math.max(...items.map((c) => Number(c.order) || 0)) + 1 : 1;

  const toggle = async (c) => {
    const next = !c.isActive;
    setItems((l) => l.map((x) => (x.id === c.id ? { ...x, isActive: next } : x)));
    try { await blogCategoriesApi.update(c.slug || c.id, { isActive: next }); toast.success(`“${c.name}” is now ${next ? "active" : "inactive"}`); }
    catch (err) { setItems((l) => l.map((x) => (x.id === c.id ? { ...x, isActive: !next } : x))); toast.error(err.message); }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try { await blogCategoriesApi.remove(toDelete.slug || toDelete.id); toast.success(`“${toDelete.name}” deleted`); }
    catch (err) { toast.error(err.message); } // 409 while posts still use it
    finally { setDeleting(false); setToDelete(null); load(); }
  };

  return (
    <section className="admin-page">
      <header className="admin-page__head" style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
        <div><h1 className="admin-page__title">Blog categories</h1><p className="admin-page__desc">Every blog post belongs to one category. A category can only be deleted once no post uses it.</p></div>
        <button type="button" className="ui-btn ui-btn--primary" onClick={() => setModal({ category: null })}><Icon name="plus" size={18} /> New category</button>
      </header>

      {error && <div className="ui-alert ui-alert--error" role="alert" style={{ marginBottom: 16 }}>Couldn’t load categories: {error}<div className="ui-alert__retry"><button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={load}>Try again</button></div></div>}

      {items === null ? (
        <div className="ui-tablewrap" aria-busy="true"><table className="ui-table"><tbody>{[0, 1, 2].map((i) => <tr key={i}><td><div className="ui-skel" style={{ width: `${60 - i * 8}%` }} /></td></tr>)}</tbody></table></div>
      ) : items.length === 0 && !error ? (
        <div className="ui-empty"><h2>No blog categories yet</h2><p>Create a category before writing your first post.</p><button type="button" className="ui-btn ui-btn--primary" onClick={() => setModal({ category: null })}><Icon name="plus" size={18} /> New category</button></div>
      ) : (
        <div className="ui-tablewrap">
          <table className="ui-table">
            <thead><tr><th>Category</th><th>Order</th><th>Published posts</th><th>Active</th><th className="is-right">Actions</th></tr></thead>
            <tbody>
              {sorted.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.name}</strong><small style={{ display: "block" }}>/{c.slug}</small></td>
                  <td className="ui-muted">{c.order ?? 0}</td>
                  <td><span className="ui-pill ui-pill--muted">{c.postCount ?? 0}</span></td>
                  <td><Switch checked={!!c.isActive} onChange={() => toggle(c)} label={`${c.name} active`} /></td>
                  <td className="is-right"><span className="ui-actions">
                    <button type="button" className="ui-iconbtn" onClick={() => setModal({ category: c })} aria-label={`Edit ${c.name}`} title="Edit"><Icon name="edit" size={18} /></button>
                    <button type="button" className="ui-iconbtn ui-iconbtn--danger" onClick={() => setToDelete(c)} aria-label={`Delete ${c.name}`} title="Delete"><Icon name="trash" size={18} /></button>
                  </span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && <CategoryModal category={modal.category} nextOrder={nextOrder} onClose={() => setModal(null)} onSaved={(m) => { setModal(null); toast.success(m); load(); }} />}
      {toDelete && <ConfirmDialog title="Delete blog category?" message={`“${toDelete.name}” will be permanently removed. If posts still use it, the server will refuse.`} busy={deleting} onConfirm={confirmDelete} onCancel={() => setToDelete(null)} />}
    </section>
  );
}
