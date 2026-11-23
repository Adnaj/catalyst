import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categoriesApi, coursesApi } from "../../api/contentApi";
import { useDebounce } from "../../hooks/useDebounce";
import Icon from "../../components/Icons/Icons";
import { ConfirmDialog } from "../../components/ui/Modal";
import { useToast } from "../../components/ui/Toast";
import "./Courses.css";

const enc = encodeURIComponent;

export default function Courses() {
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const mode = params.get("mode") === "offline" ? "offline" : "online";
  const other = mode === "online" ? "offline" : "online";
  const category = params.get("category") || "";
  const featured = params.get("featured") === "true";

  const [q, setQ] = useState(params.get("q") || "");
  const search = useDebounce(q.trim(), 300);

  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const latest = useRef(0);

  const setParam = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setParams(next, { replace: true });
  };

  useEffect(() => {
    categoriesApi.list().then(setCategories).catch(() => {});
  }, []);

  // keep ?q= in the URL so the filtered view survives a refresh
  useEffect(() => {
    if ((params.get("q") || "") !== search) setParam({ q: search });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const load = useCallback(async () => {
    const id = ++latest.current;
    setError("");
    setRows(null);
    try {
      const list = await coursesApi.list(mode, { category, featured: featured || undefined, search });
      if (id === latest.current) setRows(list);
    } catch (err) {
      if (id !== latest.current) return;
      setError(err.message);
      setRows([]);
    }
  }, [mode, category, featured, search]);

  useEffect(() => {
    load();
  }, [load]);

  const catName = (c) => {
    const slug = c.categorySlug || c.category?.slug;
    return categories.find((x) => x.slug === slug)?.name || c.category?.name || (typeof c.category === "string" ? c.category : slug) || "—";
  };

  const toggleFeatured = async (c) => {
    const next = !c.featured;
    const patch = (v) => setRows((l) => l.map((x) => (x.courseKey === c.courseKey ? { ...x, featured: v } : x)));
    patch(next);
    try {
      await coursesApi.update(mode, c.courseKey, { featured: next });
      toast.success(next ? `“${c.label}” is now featured` : `“${c.label}” removed from featured`);
    } catch (err) {
      patch(!next);
      toast.error(err.message);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await coursesApi.remove(mode, toDelete.courseKey);
      toast.success(`“${toDelete.label}” deleted from ${mode}`);
      setToDelete(null);
      load();
    } catch (err) {
      toast.error(err.message);
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = !!(category || featured || search);
  const clear = () => {
    setQ("");
    setParam({ category: "", featured: "", q: "" });
  };

  return (
    <section className="admin-page courses-page">
      <header className="admin-page__head courses-head">
        <div>
          <h1 className="admin-page__title">Courses</h1>
          <p className="admin-page__desc">Online and offline courses are stored separately — editing one never changes the other.</p>
        </div>
        <Link to={`/admin/courses/${mode}/new`} className="ui-btn ui-btn--primary">
          <Icon name="plus" size={18} /> New {mode} course
        </Link>
      </header>

      <div className="ui-toolbar">
        <div className="ui-seg" role="group" aria-label="Course mode">
          {["online", "offline"].map((m) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => setParam({ mode: m })}>{m}</button>
          ))}
        </div>

        <div className="ui-search ui-toolbar__grow">
          <Icon name="search" size={18} />
          <input className="ui-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search course names" aria-label="Search courses" />
        </div>

        <select className="ui-select courses-cat" value={category} onChange={(e) => setParam({ category: e.target.value })} aria-label="Filter by category">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>

        <button type="button" className={`ui-btn ui-btn--ghost${featured ? " is-active" : ""}`} aria-pressed={featured} onClick={() => setParam({ featured: featured ? "" : "true" })}>
          <Icon name="star" size={16} /> Featured
        </button>
      </div>

      {error && (
        <div className="ui-alert ui-alert--error" role="alert" style={{ marginBottom: 16 }}>
          Couldn’t load courses: {error}
          <div className="ui-alert__retry"><button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={load}>Try again</button></div>
        </div>
      )}

      {rows === null ? (
        <div className="ui-tablewrap" aria-busy="true">
          <table className="ui-table">
            <tbody>
              {[0, 1, 2, 3, 4].map((i) => <tr key={i}><td><div className="ui-skel" style={{ width: `${70 - i * 8}%` }} /></td></tr>)}
            </tbody>
          </table>
        </div>
      ) : rows.length === 0 ? (
        !error && (
          <div className="ui-empty">
            <h2>{filtered ? "No courses match these filters" : `No ${mode} courses yet`}</h2>
            <p>{filtered ? "Try a different search or clear the filters." : "Add your first course — you’ll need at least one category."}</p>
            {filtered ? (
              <button type="button" className="ui-btn ui-btn--ghost" onClick={clear}>Clear filters</button>
            ) : (
              <Link to={`/admin/courses/${mode}/new`} className="ui-btn ui-btn--primary"><Icon name="plus" size={18} /> New {mode} course</Link>
            )}
          </div>
        )
      ) : (
        <>
          <p className="ui-muted courses-count">{rows.length} {mode} course{rows.length === 1 ? "" : "s"}{filtered && " (filtered)"}</p>
          <div className="ui-tablewrap">
            <table className="ui-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Type</th>
                  <th>Featured</th>
                  <th className="is-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.courseKey}>
                    <td>
                      <Link to={`/admin/courses/${mode}/${enc(c.courseKey)}/edit`} className="courses-name">
                        <strong>{c.label}</strong>
                        <small>{c.courseKey}</small>
                      </Link>
                    </td>
                    <td><span className="ui-pill">{catName(c)}</span></td>
                    <td className="ui-muted">{c.duration || "—"}</td>
                    <td className="ui-muted">{c.type || "—"}</td>
                    <td>
                      <button type="button" className={`ui-iconbtn${c.featured ? " is-on" : ""}`} onClick={() => toggleFeatured(c)} aria-pressed={!!c.featured} aria-label={c.featured ? `Unfeature ${c.label}` : `Feature ${c.label}`} title={c.featured ? "Featured — click to remove" : "Click to feature"}>
                        <Icon name="star" size={18} />
                      </button>
                    </td>
                    <td className="is-right">
                      <span className="ui-actions">
                        <Link to={`/admin/courses/${mode}/${enc(c.courseKey)}/edit`} className="ui-iconbtn" aria-label={`Edit ${c.label}`} title="Edit"><Icon name="edit" size={18} /></Link>
                        <Link to={`/admin/courses/${other}/new?from=${mode}:${enc(c.courseKey)}`} className="ui-iconbtn" aria-label={`Copy ${c.label} to ${other}`} title={`Copy to ${other}`}><Icon name="copy" size={18} /></Link>
                        <button type="button" className="ui-iconbtn ui-iconbtn--danger" onClick={() => setToDelete(c)} aria-label={`Delete ${c.label}`} title="Delete"><Icon name="trash" size={18} /></button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {toDelete && (
        <ConfirmDialog
          title={`Delete ${mode} course?`}
          message={`“${toDelete.label}” will be permanently deleted from the ${mode} courses. The ${other} course with the same key is not affected. This can’t be undone.`}
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </section>
  );
}
