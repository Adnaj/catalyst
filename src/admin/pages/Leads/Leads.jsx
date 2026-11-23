import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LEAD_FORMS, leadsApi } from "../../api/contentApi";
import Icon from "../../components/Icons/Icons";
import Modal, { ConfirmDialog } from "../../components/ui/Modal";
import Field from "../../components/ui/Field";
import Pager from "../../components/ui/Pager";
import { useToast } from "../../components/ui/Toast";

const FORMS = {
  contact: { label: "Contact", extra: [["mode", "Mode", ["online", "offline"]], ["location", "Location"], ["programme", "Programme"]] },
  guidance: { label: "Guidance", extra: [["mode", "Mode", ["online", "offline"]], ["location", "Location"], ["programme", "Programme"]] },
  popup: { label: "Popup enquiry", extra: [["source", "Source"], ["course", "Course"], ["category", "Category"], ["studyMode", "Study mode", ["online", "offline"]]] },
  "online-course": { label: "Online callback", extra: [["courseTitle", "Course title"]] },
  "offline-course": { label: "Offline callback", extra: [["location", "Location"], ["courseTitle", "Course title"]] },
};
const STATUSES = ["new", "contacted", "converted", "closed"];
const pillClass = (s) => (s === "new" ? "ui-pill ui-pill--spark" : s === "converted" ? "ui-pill ui-pill--ok" : "ui-pill ui-pill--muted");
const when = (d) => (d ? new Date(d).toLocaleString() : "—");

// The contact/guidance forms use cfName / cfEmail (which holds a PHONE number) / cfSubject.
const norm = (l) => ({
  name: l.name ?? l.cfName,
  phone: l.phone ?? l.cfEmail,
  topic: l.course ?? l.courseTitle ?? l.cfSubject ?? l.meta?.courseTitle ?? l.formTitle,
  origin: l.cfMode ? [l.cfMode, l.cfLocation].filter(Boolean).join(" · ") : l.location || l.source || "",
});

const flatten = (o, prefix = "") =>
  Object.entries(o || {}).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v) ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, Array.isArray(v) ? v.join(", ") : String(v ?? "")]]
  );
const HIDDEN = new Set(["_id", "__v", "id", "meta"]);

function LeadModal({ form, lead, onClose, onSaved, onDelete }) {
  const toast = useToast();
  const [status, setStatus] = useState(lead.status || "new");
  const [note, setNote] = useState(lead.adminNote || "");
  const [busy, setBusy] = useState(false);
  const rows = flatten(Object.fromEntries(Object.entries(lead).filter(([k]) => !HIDDEN.has(k) && k !== "adminNote" && k !== "status")));
  const metaRows = flatten(lead.meta, "meta.");

  const save = async () => {
    setBusy(true);
    try {
      await leadsApi.update(form, lead.id, { status, adminNote: note });
      toast.success("Lead updated");
      onSaved();
    } catch (err) {
      toast.error(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal
      size="lg"
      title={norm(lead).name || "Lead"}
      onClose={onClose}
      busy={busy}
      footer={
        <>
          <button type="button" className="ui-btn ui-btn--danger" onClick={onDelete} disabled={busy} style={{ marginRight: "auto" }}>Delete</button>
          <button type="button" className="ui-btn ui-btn--ghost" onClick={onClose} disabled={busy}>Cancel</button>
          <button type="button" className="ui-btn ui-btn--primary" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save changes"}</button>
        </>
      }
    >
      {lead.emailSent === false && (
        <div className="ui-alert ui-alert--error" role="alert" style={{ marginBottom: 12 }}>
          The sales email wasn’t sent{lead.emailError ? `: ${lead.emailError}` : "."} The lead is saved, so follow it up here.
        </div>
      )}
      <dl className="kv">
        {[...rows, ...metaRows].map(([k, v]) => (v ? <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div> : null))}
      </dl>
      <div className="form-grid">
        <Field id="lead-status" label="Status">
          <select id="lead-status" className="ui-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field id="lead-note" label="Admin note" className="wide">
          <textarea id="lead-note" className="ui-textarea" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Called, will join in Dec" />
        </Field>
      </div>
    </Modal>
  );
}

export default function Leads() {
  const toast = useToast();
  const [sp, setSp] = useSearchParams();
  const form = LEAD_FORMS.includes(sp.get("form")) ? sp.get("form") : "contact";
  const cfg = FORMS[form];

  const [draft, setDraft] = useState({});
  const [applied, setApplied] = useState({});
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState({});
  const [open, setOpen] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadSummary = useCallback(() => leadsApi.summary().then((d) => setSummary(d.summary || {})).catch(() => {}), []);
  const load = useCallback(async () => {
    setError("");
    try {
      setData(await leadsApi.list(form, { ...applied, page, limit: 20 }));
    } catch (err) {
      setError(err.message);
      setData((c) => c ?? { leads: [], total: 0, pages: 1 });
    }
  }, [form, applied, page]);

  useEffect(() => { loadSummary(); }, [loadSummary]);
  useEffect(() => { load(); }, [load]);

  const switchForm = (f) => { setSp({ form: f }); setDraft({}); setApplied({}); setPage(1); setData(null); };
  const apply = (e) => { e.preventDefault(); setApplied(draft); setPage(1); };
  const clear = () => { setDraft({}); setApplied({}); setPage(1); };
  const setD = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  const refresh = () => { load(); loadSummary(); };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await leadsApi.remove(form, toDelete.id);
      toast.success("Lead deleted");
      setToDelete(null); setOpen(null); refresh();
    } catch (err) {
      toast.error(err.message);
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="admin-page">
      <header className="admin-page__head">
        <h1 className="admin-page__title">Leads</h1>
        <p className="admin-page__desc">Enquiries from the five website forms. Open a lead to change its status or add a note.</p>
      </header>

      <div className="lead-tabs" role="tablist">
        {LEAD_FORMS.map((f) => (
          <button key={f} type="button" role="tab" aria-selected={f === form} className={`lead-tab${f === form ? " is-active" : ""}`} onClick={() => switchForm(f)}>
            {FORMS[f].label}
            {summary[f] > 0 && <span className="ui-pill ui-pill--spark" title="New leads">{summary[f]}</span>}
          </button>
        ))}
      </div>

      <form className="lead-filters" onSubmit={apply}>
        <div className="ui-search" style={{ minWidth: 220 }}>
          <Icon name="search" size={18} />
          <input className="ui-input" value={draft.search || ""} onChange={(e) => setD("search", e.target.value)} placeholder="Name, phone, course or message" aria-label="Search leads" />
        </div>
        <select className="ui-select" value={draft.status || ""} onChange={(e) => setD("status", e.target.value)} aria-label="Status">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input type="date" className="ui-input" value={draft.from || ""} onChange={(e) => setD("from", e.target.value)} aria-label="From date" />
        <input type="date" className="ui-input" value={draft.to || ""} onChange={(e) => setD("to", e.target.value)} aria-label="To date" />
        {cfg.extra.map(([k, label, opts]) =>
          opts ? (
            <select key={k} className="ui-select" value={draft[k] || ""} onChange={(e) => setD(k, e.target.value)} aria-label={label}>
              <option value="">{label}: any</option>
              {opts.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input key={k} className="ui-input" value={draft[k] || ""} onChange={(e) => setD(k, e.target.value)} placeholder={label} aria-label={label} />
          )
        )}
        <button type="submit" className="ui-btn ui-btn--primary ui-btn--sm">Apply</button>
        <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={clear}>Clear</button>
      </form>

      {error && (
        <div className="ui-alert ui-alert--error" role="alert" style={{ marginBottom: 16 }}>
          Couldn’t load leads: {error}
          <div className="ui-alert__retry"><button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={load}>Try again</button></div>
        </div>
      )}

      {!data ? (
        <div className="ui-tablewrap" aria-busy="true"><table className="ui-table"><tbody>{[0, 1, 2, 3].map((i) => <tr key={i}><td><div className="ui-skel" style={{ width: `${70 - i * 10}%` }} /></td></tr>)}</tbody></table></div>
      ) : data.leads.length === 0 && !error ? (
        <div className="ui-empty"><h2>No leads found</h2><p>{Object.values(applied).some(Boolean) ? "Try clearing the filters." : "New enquiries from this form will appear here."}</p></div>
      ) : (
        <>
          <div className="ui-tablewrap">
            <table className="ui-table">
              <thead><tr><th>Name</th><th>Phone</th><th>Course / programme</th><th>Mode / source</th><th>Status</th><th>Received</th><th className="is-right">Actions</th></tr></thead>
              <tbody>
                {data.leads.map((l) => {
                  const n = norm(l);
                  return (
                    <tr key={l.id}>
                      <td><strong>{n.name}</strong>{l.emailSent === false && <small title={l.emailError || "Email not sent"}> ⚠ email failed</small>}</td>
                      <td>{n.phone}</td>
                      <td>{n.topic || "—"}</td>
                      <td className="ui-muted" style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis" }}>{n.origin || "—"}</td>
                      <td><span className={pillClass(l.status || "new")}>{l.status || "new"}</span></td>
                      <td className="ui-muted">{when(l.createdAt)}</td>
                      <td className="is-right">
                        <span className="ui-actions">
                          <button type="button" className="ui-iconbtn" onClick={() => setOpen(l)} aria-label={`Open ${n.name}`} title="Open"><Icon name="eye" size={18} /></button>
                          <button type="button" className="ui-iconbtn ui-iconbtn--danger" onClick={() => setToDelete(l)} aria-label={`Delete ${n.name}`} title="Delete"><Icon name="trash" size={18} /></button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pager page={page} pages={data.pages} total={data.total} onPage={setPage} />
        </>
      )}

      {open && <LeadModal form={form} lead={open} onClose={() => setOpen(null)} onSaved={() => { setOpen(null); refresh(); }} onDelete={() => setToDelete(open)} />}
      {toDelete && <ConfirmDialog title="Delete lead?" message={`The lead from “${norm(toDelete).name}” will be permanently removed.`} busy={deleting} onConfirm={confirmDelete} onCancel={() => setToDelete(null)} />}
    </section>
  );
}
