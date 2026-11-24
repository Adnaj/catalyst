import { useCallback, useEffect, useState } from "react";
import { careersApi } from "../../api/careersApi";
import Icon from "../../components/Icons/Icons";
import Modal, { ConfirmDialog } from "../../components/ui/Modal";
import Field from "../../components/ui/Field";
import Pager from "../../components/ui/Pager";
import { useToast } from "../../components/ui/Toast";
import "./Career.css";

const STATUSES = ["new", "contacted", "converted", "closed"];
const EXPERIENCE = ["Fresher", "Less than 1 year", "1–3 years", "3–5 years", "5+ years"];
const pillClass = (s) => (s === "new" ? "ui-pill ui-pill--spark" : s === "converted" ? "ui-pill ui-pill--ok" : "ui-pill ui-pill--muted");
const when = (d) => (d ? new Date(d).toLocaleString() : "—");
const kb = (n) => (n ? `${Math.max(1, Math.round(n / 1024))} KB` : "");

function ApplicationModal({ app, onClose, onSaved, onDelete }) {
  const toast = useToast();
  const [status, setStatus] = useState(app.status || "new");
  const [note, setNote] = useState(app.adminNote || "");
  const [busy, setBusy] = useState(false);
  const [dl, setDl] = useState(false);

  const save = async () => {
    setBusy(true);
    try {
      await careersApi.update(app.id, { status, adminNote: note });
      toast.success("Application updated");
      onSaved();
    } catch (err) {
      toast.error(err.message);
      setBusy(false);
    }
  };

  const download = async () => {
    setDl(true);
    try {
      await careersApi.downloadCv(app);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDl(false);
    }
  };

  const rows = [
    ["Role", app.position],
    ["Email", app.email && <a href={`mailto:${app.email}`}>{app.email}</a>],
    ["Phone", app.phone && <a href={`tel:${app.phone}`}>{app.phone}</a>],
    ["Current city", app.location],
    ["Experience", app.experience],
    ["Message", app.message && <span className="career-msg">{app.message}</span>],
    ["Received", when(app.createdAt)],
  ];

  return (
    <Modal
      size="lg"
      title={app.fullName || "Application"}
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
      {app.emailSent === false && (
        <div className="ui-alert ui-alert--error" role="alert" style={{ marginBottom: 12 }}>
          The notification email wasn’t sent{app.emailError ? `: ${app.emailError}` : "."} The application and CV are saved here.
        </div>
      )}
      <dl className="kv">
        {rows.map(([k, v]) => (v ? <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div> : null))}
        <dt>CV</dt>
        <dd>
          <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm career-cv" onClick={download} disabled={dl}>
            <Icon name="file" size={16} /> {dl ? "Downloading…" : "Download CV"}
          </button>{" "}
          <span className="ui-muted">{[app.cvOriginalName, kb(app.cvSize)].filter(Boolean).join(" · ")}</span>
        </dd>
      </dl>
      <div className="form-grid">
        <Field id="app-status" label="Status">
          <select id="app-status" className="ui-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field id="app-note" label="Admin note" className="wide">
          <textarea id="app-note" className="ui-textarea" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Shortlisted, interview on Monday" />
        </Field>
      </div>
    </Modal>
  );
}

export default function Career() {
  const toast = useToast();
  const [draft, setDraft] = useState({});
  const [applied, setApplied] = useState({});
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [dlId, setDlId] = useState(null);

  const load = useCallback(async () => {
    setError("");
    try {
      setData(await careersApi.list({ ...applied, page, limit: 20 }));
    } catch (err) {
      setError(err.message);
      setData((c) => c ?? { applications: [], total: 0, pages: 1, newCount: 0 });
    }
  }, [applied, page]);

  useEffect(() => { load(); }, [load]);

  const setD = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  const apply = (e) => { e.preventDefault(); setApplied(draft); setPage(1); };
  const clear = () => { setDraft({}); setApplied({}); setPage(1); };

  const quickDownload = async (a) => {
    setDlId(a.id);
    try {
      await careersApi.downloadCv(a);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDlId(null);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await careersApi.remove(toDelete.id);
      toast.success("Application deleted");
      setToDelete(null); setOpen(null); load();
    } catch (err) {
      toast.error(err.message);
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="admin-page career-page">
      <header className="admin-page__head">
        <div className="career-head">
          <h1 className="admin-page__title">Careers</h1>
          {data?.newCount > 0 && <span className="ui-pill ui-pill--spark" title="New applications">{data.newCount} new</span>}
        </div>
        <p className="admin-page__desc">Applications sent from the website Careers page.</p>
      </header>

      <form className="lead-filters" onSubmit={apply}>
        <div className="ui-search" style={{ minWidth: 220 }}>
          <Icon name="search" size={18} />
          <input className="ui-input" value={draft.search || ""} onChange={(e) => setD("search", e.target.value)} placeholder="Name, email, phone or role" aria-label="Search applications" />
        </div>
        <select className="ui-select" value={draft.status || ""} onChange={(e) => setD("status", e.target.value)} aria-label="Status">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="ui-select" value={draft.experience || ""} onChange={(e) => setD("experience", e.target.value)} aria-label="Experience">
          <option value="">Experience: any</option>
          {EXPERIENCE.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input className="ui-input" value={draft.position || ""} onChange={(e) => setD("position", e.target.value)} placeholder="Exact role" aria-label="Role" />
        <button type="submit" className="ui-btn ui-btn--primary ui-btn--sm">Apply</button>
        <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={clear}>Clear</button>
      </form>

      {error && (
        <div className="ui-alert ui-alert--error" role="alert" style={{ marginBottom: 16 }}>
          Couldn’t load applications: {error}
          <div className="ui-alert__retry"><button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={load}>Try again</button></div>
        </div>
      )}

      {!data ? (
        <div className="ui-tablewrap" aria-busy="true"><table className="ui-table"><tbody>{[0, 1, 2, 3].map((i) => <tr key={i}><td><div className="ui-skel" style={{ width: `${70 - i * 10}%` }} /></td></tr>)}</tbody></table></div>
      ) : data.applications.length === 0 && !error ? (
        <div className="ui-empty"><h2>No applications found</h2><p>{Object.values(applied).some(Boolean) ? "Try clearing the filters." : "Applications from the website Careers page will appear here."}</p></div>
      ) : (
        <>
          <div className="ui-tablewrap">
            <table className="ui-table">
              <thead><tr><th>Applicant</th><th>Role</th><th>Experience</th><th>Status</th><th>Received</th><th className="is-right">Actions</th></tr></thead>
              <tbody>
                {data.applications.map((a) => (
                  <tr key={a.id}>
                    <td className="career-meta">
                      <strong>{a.fullName}</strong>
                      {a.emailSent === false && <small title={a.emailError || "Email not sent"}> ⚠ email failed</small>}
                      <small>{a.phone}{a.email ? ` · ${a.email}` : ""}</small>
                    </td>
                    <td>{a.position}</td>
                    <td>{a.experience || "—"}</td>
                    <td><span className={pillClass(a.status || "new")}>{a.status || "new"}</span></td>
                    <td className="ui-muted">{when(a.createdAt)}</td>
                    <td className="is-right">
                      <span className="ui-actions">
                        <button type="button" className="ui-iconbtn" onClick={() => setOpen(a)} aria-label={`Open ${a.fullName}`} title="Open"><Icon name="eye" size={18} /></button>
                        <button type="button" className="ui-iconbtn" onClick={() => quickDownload(a)} disabled={dlId === a.id} aria-label={`Download CV of ${a.fullName}`} title="Download CV"><Icon name="file" size={18} /></button>
                        <button type="button" className="ui-iconbtn ui-iconbtn--danger" onClick={() => setToDelete(a)} aria-label={`Delete ${a.fullName}`} title="Delete"><Icon name="trash" size={18} /></button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pager page={page} pages={data.pages} total={data.total} onPage={setPage} />
        </>
      )}

      {open && <ApplicationModal app={open} onClose={() => setOpen(null)} onSaved={() => { setOpen(null); load(); }} onDelete={() => setToDelete(open)} />}
      {toDelete && <ConfirmDialog title="Delete application?" message={`The application from “${toDelete.fullName}” and their CV file will be permanently removed.`} busy={deleting} onConfirm={confirmDelete} onCancel={() => setToDelete(null)} />}
    </section>
  );
}