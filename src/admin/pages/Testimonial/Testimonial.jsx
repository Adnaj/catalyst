import { useCallback, useEffect, useState } from "react";
import { assetUrl, errorLines, testimonialsApi } from "../../api/contentApi";
import Icon from "../../components/Icons/Icons";
import Modal, { ConfirmDialog } from "../../components/ui/Modal";
import Field from "../../components/ui/Field";
import Switch from "../../components/ui/Switch";
import Thumb from "../../components/ui/Thumb";
import UploadField from "../../components/ui/UploadField";
import { useToast } from "../../components/ui/Toast";

const toForm = (t) => ({
  name: t?.name ?? "", text: t?.text ?? "", image: t?.image ?? "", designation: t?.designation ?? "Student",
  course: t?.course ?? "", rating: t?.rating ?? 5, order: t?.order ?? "", isActive: t?.isActive ?? true,
});

function TestimonialModal({ item, nextOrder, onClose, onSaved }) {
  const editing = !!item;
  const [form, setForm] = useState(() => ({ ...toForm(item), ...(item ? {} : { order: nextOrder }) }));
  const [errors, setErrors] = useState({});
  const [problem, setProblem] = useState(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const set = (k, v) => { setErrors((e) => ({ ...e, [k]: "" })); setForm((f) => ({ ...f, [k]: v })); };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Name is required";
    else if (form.name.length > 80) er.name = "Max 80 characters";
    if (!form.text.trim()) er.text = "Testimonial text is required";
    else if (form.text.length > 1500) er.text = "Max 1500 characters";
    if (Object.keys(er).length) return setErrors(er);
    setBusy(true); setProblem(null);
    const body = {
      name: form.name.trim(), text: form.text.trim(), image: form.image.trim(), designation: form.designation.trim(),
      course: form.course.trim(), rating: Math.min(5, Math.max(0, Number(form.rating) || 0)), isActive: form.isActive,
      ...(form.order !== "" && { order: Number(form.order) }),
    };
    try {
      if (editing) await testimonialsApi.update(item.id, body);
      else await testimonialsApi.create(body);
      onSaved(editing ? "Testimonial updated" : "Testimonial created");
    } catch (err) {
      setProblem({ message: err.message, lines: errorLines(err) });
      setBusy(false);
    }
  };

  return (
    <Modal size="lg" title={editing ? "Edit testimonial" : "New testimonial"} onClose={onClose} busy={busy}
      footer={<>
        <button type="button" className="ui-btn ui-btn--ghost" onClick={onClose} disabled={busy}>Cancel</button>
        <button type="submit" form="testi-form" className="ui-btn ui-btn--primary" disabled={busy || uploading}>{busy ? "Saving…" : editing ? "Save changes" : "Create testimonial"}</button>
      </>}>
      <form id="testi-form" onSubmit={submit} noValidate>
        {problem && <div className="ui-alert ui-alert--error" role="alert">{problem.message}{problem.lines.length > 0 && <ul>{problem.lines.map((l) => <li key={l}>{l}</li>)}</ul>}</div>}
        <div className="form-grid">
          <Field id="t-name" label="Name" required error={errors.name}>
            <input id="t-name" className="ui-input" value={form.name} onChange={(e) => set("name", e.target.value)} data-autofocus />
          </Field>
          <Field id="t-des" label="Designation" hint="Shown under the name.">
            <input id="t-des" className="ui-input" value={form.designation} onChange={(e) => set("designation", e.target.value)} />
          </Field>
          <Field id="t-text" label="Testimonial" required error={errors.text} hint={`${form.text.length}/1500`} className="wide">
            <textarea id="t-text" className="ui-textarea" rows={5} value={form.text} onChange={(e) => set("text", e.target.value)} />
          </Field>
          <Field id="t-course" label="Course"><input id="t-course" className="ui-input" value={form.course} onChange={(e) => set("course", e.target.value)} placeholder="Digital Marketing" /></Field>
          <Field id="t-rating" label="Rating (0–5)"><input id="t-rating" type="number" min="0" max="5" className="ui-input" value={form.rating} onChange={(e) => set("rating", e.target.value)} /></Field>
          <Field id="t-order" label="Display order" hint="Lower numbers come first."><input id="t-order" type="number" className="ui-input" value={form.order} onChange={(e) => set("order", e.target.value)} /></Field>
          <div className="ui-check"><Switch checked={form.isActive} onChange={(v) => set("isActive", v)} label="Active" /><span>Active<small>Inactive testimonials are hidden on the website.</small></span></div>
          <div className="wide">
            <UploadField id="t-image" label="Photo" folder="testimonial-images" maxMB={2} value={form.image} onChange={(v) => set("image", v)} onBusyChange={setUploading} placeholder="Leave empty to use the default avatar" />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default function Testimonial() {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setError("");
    try { setItems(await testimonialsApi.list()); } catch (err) { setError(err.message); setItems((c) => c ?? []); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const sorted = [...(items || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const nextOrder = items?.length ? Math.max(...items.map((t) => Number(t.order) || 0)) + 1 : 1;

  const toggle = async (t) => {
    const next = !t.isActive;
    setItems((l) => l.map((x) => (x.id === t.id ? { ...x, isActive: next } : x)));
    try { await testimonialsApi.update(t.id, { isActive: next }); toast.success(`${t.name} is now ${next ? "visible" : "hidden"}`); }
    catch (err) { setItems((l) => l.map((x) => (x.id === t.id ? { ...x, isActive: !next } : x))); toast.error(err.message); }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try { await testimonialsApi.remove(toDelete.id); toast.success("Testimonial deleted"); load(); }
    catch (err) { toast.error(err.message); }
    finally { setDeleting(false); setToDelete(null); }
  };

  return (
    <section className="admin-page">
      <header className="admin-page__head" style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
        <div><h1 className="admin-page__title">Testimonials</h1><p className="admin-page__desc">Learner stories shown on the website. Hidden ones stay here until you turn them back on.</p></div>
        <button type="button" className="ui-btn ui-btn--primary" onClick={() => setModal({ item: null })}><Icon name="plus" size={18} /> New testimonial</button>
      </header>

      {error && <div className="ui-alert ui-alert--error" role="alert" style={{ marginBottom: 16 }}>Couldn’t load testimonials: {error}<div className="ui-alert__retry"><button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={load}>Try again</button></div></div>}

      {items === null ? (
        <div className="ui-tablewrap" aria-busy="true"><table className="ui-table"><tbody>{[0, 1, 2].map((i) => <tr key={i}><td><div className="ui-skel" style={{ width: `${70 - i * 10}%` }} /></td></tr>)}</tbody></table></div>
      ) : items.length === 0 && !error ? (
        <div className="ui-empty"><h2>No testimonials yet</h2><p>Add a learner story to show it on the website.</p><button type="button" className="ui-btn ui-btn--primary" onClick={() => setModal({ item: null })}><Icon name="plus" size={18} /> New testimonial</button></div>
      ) : (
        <div className="ui-tablewrap">
          <table className="ui-table">
            <thead><tr><th>Person</th><th>Testimonial</th><th>Rating</th><th>Order</th><th>Active</th><th className="is-right">Actions</th></tr></thead>
            <tbody>
              {sorted.map((t) => (
                <tr key={t.id}>
                  <td><div className="ui-cell"><Thumb src={assetUrl(t.image)} /><div><strong>{t.name}</strong><small>{[t.designation, t.course].filter(Boolean).join(" · ")}</small></div></div></td>
                  <td className="ui-muted" style={{ maxWidth: 360 }}>{t.text?.length > 120 ? `${t.text.slice(0, 120)}…` : t.text}</td>
                  <td><span className="stars" aria-label={`${t.rating ?? 5} out of 5`}>{"★".repeat(Math.round(t.rating ?? 5))}</span></td>
                  <td className="ui-muted">{t.order ?? 0}</td>
                  <td><Switch checked={!!t.isActive} onChange={() => toggle(t)} label={`${t.name} active`} /></td>
                  <td className="is-right"><span className="ui-actions">
                    <button type="button" className="ui-iconbtn" onClick={() => setModal({ item: t })} aria-label={`Edit ${t.name}`} title="Edit"><Icon name="edit" size={18} /></button>
                    <button type="button" className="ui-iconbtn ui-iconbtn--danger" onClick={() => setToDelete(t)} aria-label={`Delete ${t.name}`} title="Delete"><Icon name="trash" size={18} /></button>
                  </span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && <TestimonialModal item={modal.item} nextOrder={nextOrder} onClose={() => setModal(null)} onSaved={(m) => { setModal(null); toast.success(m); load(); }} />}
      {toDelete && <ConfirmDialog title="Delete testimonial?" message={`“${toDelete.name}” will be permanently removed. This can’t be undone.`} busy={deleting} onConfirm={confirmDelete} onCancel={() => setToDelete(null)} />}
    </section>
  );
}
