import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { categoriesApi, coursesApi, errorLines, MODES } from "../../api/contentApi";
import { slugify } from "../../utils/slugify";
import Icon from "../../components/Icons/Icons";
import Field from "../../components/ui/Field";
import Switch from "../../components/ui/Switch";
import Thumb from "../../components/ui/Thumb";
import UploadField from "../../components/ui/UploadField";
import { ObjectList, StringList } from "../../components/ui/ListEditors";
import { useToast } from "../../components/ui/Toast";
import { BLANK_ITEMS, blankForm, createPayload, fromApi, normalize, patchPayload, validate } from "./courseModel";
import "./CourseForm.css";

const TYPES = ["Certification", "Diploma", "Certificate"];

function Card({ title, desc, children }) {
  return (
    <section className="cf-card">
      <header className="cf-card__head">
        <h2>{title}</h2>
        {desc && <p>{desc}</p>}
      </header>
      <div className="cf-card__body">{children}</div>
    </section>
  );
}

export default function CourseForm() {
  const { mode, key: editKey } = useParams();
  const [search] = useSearchParams();
  const from = search.get("from"); // "online:gcc-accounting" -> prefill from the other mode
  const navigate = useNavigate();
  const toast = useToast();
  const creating = !editKey;

  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [loadError, setLoadError] = useState("");
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [initial, setInitial] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [server, setServer] = useState(null);
  const [busy, setBusy] = useState(false);
  const [copiedFrom, setCopiedFrom] = useState("");
  const touched = useRef({ courseKey: false, slug: false });
  const leaving = useRef(false);
  const topRef = useRef(null);
  const [uploads, setUploads] = useState(0); // files currently uploading
  const trackUpload = (busy) => setUploads((n) => n + (busy ? 1 : -1));

  /* ---------------- load categories (+ the course being edited / copied) ---------------- */
  useEffect(() => {
    if (!MODES.includes(mode)) return;
    let alive = true;
    setStatus("loading");
    setServer(null);
    setErrors({});
    setCopiedFrom("");
    touched.current = { courseKey: false, slug: false };

    (async () => {
      try {
        const cats = await categoriesApi.list();
        let source = null;
        let sourceMode = "";
        if (editKey) {
          source = await coursesApi.get(mode, editKey);
        } else if (from) {
          const i = from.indexOf(":");
          sourceMode = from.slice(0, i);
          const k = from.slice(i + 1);
          if (MODES.includes(sourceMode) && k) source = await coursesApi.get(sourceMode, k);
        }
        if (!alive) return;

        setCategories(cats);
        if (editKey) {
          const f = fromApi(source, cats);
          setForm(f);
          setInitial(f);
        } else if (source) {
          const f = fromApi(source, cats);
          // the two modes use the same courseKey; the slug convention is "<key>-<mode>"
          f.slug = f.slug.replace(/-(online|offline)$/, "") + `-${mode}`;
          touched.current = { courseKey: true, slug: true };
          setForm(f);
          setInitial(blankForm());
          setCopiedFrom(`${sourceMode}|${source.label}`);
        } else {
          setForm(blankForm());
          setInitial(blankForm());
        }
        setStatus("ready");
      } catch (err) {
        if (!alive) return;
        setLoadError(err.message);
        setStatus("error");
      }
    })();
    return () => {
      alive = false;
    };
  }, [mode, editKey, from]);

  /* ---------------- unsaved-changes guard ---------------- */
  const patch = useMemo(() => (creating ? null : patchPayload(form, initial)), [creating, form, initial]);
  const dirty = useMemo(
    () => (creating ? JSON.stringify(normalize(form)) !== JSON.stringify(normalize(initial)) : Object.keys(patch).length > 0),
    [creating, form, initial, patch]
  );

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => {
      if (leaving.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (!MODES.includes(mode)) return <Navigate to="/admin/courses" replace />;

  /* ---------------- field helpers ---------------- */
  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };
  const setLO = (patchObj) => setForm((f) => ({ ...f, learningOptions: { ...f.learningOptions, ...patchObj } }));
  const setCard = (which, k, v) => setLO({ [which]: { ...form.learningOptions[which], [k]: v } });
  const setTitleLine = (i, v) => setLO({ title: form.learningOptions.title.map((x, idx) => (idx === i ? v : x)) });

  const onLabel = (v) => {
    setForm((f) => {
      const next = { ...f, label: v };
      if (creating && !touched.current.courseKey) next.courseKey = slugify(v);
      if (creating && !touched.current.slug) next.slug = next.courseKey ? `${next.courseKey}-${mode}` : "";
      return next;
    });
    setErrors((e) => ({ ...e, label: undefined, courseKey: touched.current.courseKey ? e.courseKey : undefined, slug: touched.current.slug ? e.slug : undefined }));
  };
  const onKey = (v) => {
    touched.current.courseKey = true;
    setForm((f) => {
      const next = { ...f, courseKey: v };
      if (!touched.current.slug) next.slug = v ? `${v}-${mode}` : "";
      return next;
    });
    setErrors((e) => ({ ...e, courseKey: undefined, slug: touched.current.slug ? e.slug : undefined }));
  };

  /* ---------------- submit ---------------- */
  const submit = async (e) => {
    e.preventDefault();
    if (uploads > 0) return;
    const found = validate(form, { creating, hadFaqs: normalize(initial).faqs.length > 0 });
    setErrors(found);
    if (Object.keys(found).length) {
      setTimeout(() => {
        const first = document.querySelector(".cf [data-invalid]");
        first?.scrollIntoView({ block: "center", behavior: "smooth" });
        first?.querySelector("input,select,textarea")?.focus({ preventScroll: true });
      }, 0);
      return;
    }

    setBusy(true);
    setServer(null);
    try {
      if (creating) {
        await coursesApi.create(mode, createPayload(form));
        toast.success(`“${form.label.trim()}” created in ${mode} courses`);
      } else {
        await coursesApi.update(mode, editKey, patch);
        toast.success("Changes saved");
      }
      leaving.current = true;
      navigate(`/admin/courses?mode=${mode}`);
    } catch (err) {
      setServer({ message: err.message, lines: errorLines(err) });
      setBusy(false);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const lo = form.learningOptions;

  /* ---------------- render ---------------- */
  const back = (
    <Link to={`/admin/courses?mode=${mode}`} className="cf-back">
      <Icon name="back" size={16} /> Courses
    </Link>
  );

  if (status === "loading") {
    return (
      <section className="admin-page cf" aria-busy="true">
        {back}
        <div className="ui-skel" style={{ width: 260, height: 30, margin: "14px 0 24px" }} />
        <div className="cf-card"><div className="cf-card__body">{[0, 1, 2].map((i) => <div key={i} className="ui-skel" style={{ height: 44 }} />)}</div></div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="admin-page cf">
        {back}
        <div className="ui-alert ui-alert--error" role="alert" style={{ marginTop: 16 }}>
          {editKey ? `Couldn’t load this ${mode} course` : "Couldn’t load the form"}: {loadError}
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page cf">
      <div ref={topRef} />
      {back}
      <header className="admin-page__head cf-head">
        <h1 className="admin-page__title">{creating ? `New ${mode} course` : form.label || "Edit course"}</h1>
        <span className={`ui-pill ${mode === "online" ? "" : "ui-pill--spark"}`}>{mode}</span>
      </header>

      {copiedFrom && (
        <div className="ui-alert ui-alert--info" style={{ marginBottom: 16 }}>
          Prefilled from the {copiedFrom.split("|")[0]} version of “{copiedFrom.split("|")[1]}”. Review it, then create — this makes an independent {mode} copy.
        </div>
      )}

      {server && (
        <div className="ui-alert ui-alert--error" role="alert" style={{ marginBottom: 16 }}>
          {server.message}
          {server.lines.length > 0 && <ul>{server.lines.map((l) => <li key={l}>{l}</li>)}</ul>}
        </div>
      )}

      <form onSubmit={submit} noValidate>
        <Card title="Basics" desc="What appears on course cards and at the top of the course page.">
          <div className="cf-grid">
            <Field id="cf-label" label="Course name" required error={errors.label} hint="Shown on course cards.">
              <input id="cf-label" className="ui-input" value={form.label} onChange={(e) => onLabel(e.target.value)} placeholder="Design Basics" />
            </Field>

            <Field id="cf-key" label="Course key" required={creating} error={errors.courseKey} hint={creating ? "Unique ID used in API URLs. Can’t be changed later." : "The course key can’t be changed."}>
              <input id="cf-key" className="ui-input" value={form.courseKey} onChange={(e) => onKey(e.target.value)} disabled={!creating} placeholder="design-basics" />
            </Field>

            <Field id="cf-cat" label="Category" required error={errors.categorySlug}
              hint={!categories.length ? undefined : creating ? undefined : "Choose another category to move this course."}>
              <select id="cf-cat" className="ui-select" value={form.categorySlug} onChange={(e) => set("categorySlug", e.target.value)}>
                <option value="">Select a category…</option>
                {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}{c.isActive ? "" : " (inactive)"}</option>)}
              </select>
              {!categories.length && <p className="ui-field__hint">No categories yet. <Link to="/admin/categories">Create one first.</Link></p>}
            </Field>

            <Field id="cf-slug" label="Slug" required={creating} error={errors.slug} hint="Course page slug; can be a path or a full URL.">
              <input id="cf-slug" className="ui-input" value={form.slug} onChange={(e) => { touched.current.slug = true; set("slug", e.target.value); }} placeholder="design-basics-online" />
            </Field>

            <Field id="cf-duration" label="Duration" required error={errors.duration}>
              <input id="cf-duration" className="ui-input" value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="3 Months" />
            </Field>

            <Field id="cf-type" label="Type">
              <input id="cf-type" className="ui-input" list="cf-types" value={form.type} onChange={(e) => set("type", e.target.value)} placeholder="Certification" />
              <datalist id="cf-types">{TYPES.map((x) => <option key={x} value={x} />)}</datalist>
            </Field>

            <Field id="cf-heading" label="Page heading" required error={errors.heading} className="cf-wide">
              <input id="cf-heading" className="ui-input" value={form.heading} onChange={(e) => set("heading", e.target.value)} placeholder="Design Basics Course" />
            </Field>

            <Field id="cf-summary" label="Short summary" required error={errors.summary} className="cf-wide">
              <textarea id="cf-summary" className="ui-textarea" rows={3} value={form.summary} onChange={(e) => set("summary", e.target.value)} placeholder="Learn the fundamentals of design." />
            </Field>

            <Field id="cf-order" label="Display order" error={errors.order} hint="Lower numbers come first.">
              <input id="cf-order" type="number" className="ui-input" value={form.order} onChange={(e) => set("order", e.target.value)} />
            </Field>

            <div className="ui-check cf-switch">
              <Switch checked={form.featured} onChange={(v) => set("featured", v)} label="Featured" />
              <span>Featured<small>Highlighted in featured course lists.</small></span>
            </div>
          </div>
        </Card>

        <Card title="Media & files" desc="Upload a file, or paste a path / URL.">
          <div className="cf-grid">
            <UploadField id="cf-image" label="Course image" kind="image" folder="course-images" value={form.image} onChange={(v) => set("image", v)} onBusyChange={trackUpload} placeholder="/uploads/course-images/design.webp" />
            <UploadField id="cf-brochure" label="Brochure (PDF)" kind="pdf" folder="brochures" value={form.brochure} onChange={(v) => set("brochure", v)} onBusyChange={trackUpload} placeholder="/uploads/brochures/design.pdf" />
          </div>
        </Card>

        <Card title="Overview" desc="The introduction on the course page.">
          <div className="cf-stack">
            <Field id="cf-ovt" label="Overview title">
              <input id="cf-ovt" className="ui-input" value={form.overviewTitle} onChange={(e) => set("overviewTitle", e.target.value)} placeholder="Course Overview" />
            </Field>
            <Field id="cf-ov" label="Overview">
              <textarea id="cf-ov" className="ui-textarea" rows={5} value={form.overview} onChange={(e) => set("overview", e.target.value)} />
            </Field>
          </div>
        </Card>

        <Card title="Course content" desc="Optional sections. Reordering or removing saves the complete list.">
          <div className="cf-stack">
            <StringList label="What you’ll gain" value={form.gain} onChange={(v) => set("gain", v)} placeholder="e.g. Practical Accounting & Financial Reporting" addLabel="Add benefit" />
            <ObjectList label="What you’ll learn" itemName="Topic" value={form.learn} onChange={(v) => set("learn", v)} blank={BLANK_ITEMS.learn} error={errors.learn} addLabel="Add topic"
              fields={[{ key: "title", label: "Title", placeholder: "Accounting Fundamentals" }, { key: "text", label: "Text", multiline: true }]} />
            <StringList label="Skills" value={form.skills} onChange={(v) => set("skills", v)} placeholder="e.g. Financial accounting and reporting" addLabel="Add skill" />
            <StringList label="Tools" value={form.tools} onChange={(v) => set("tools", v)} placeholder="e.g. Tally Prime" addLabel="Add tool" />
            <StringList label="Career roles" value={form.careers} onChange={(v) => set("careers", v)} placeholder="e.g. Accounts Executive" addLabel="Add role" />
          </div>
        </Card>

        <Card title="Eligibility" desc="Optional.">
          <div className="cf-stack">
            <Field id="cf-elt" label="Eligibility title">
              <input id="cf-elt" className="ui-input" value={form.eligibilityTitle} onChange={(e) => set("eligibilityTitle", e.target.value)} placeholder="Course Eligibility" />
            </Field>
            <ObjectList label="Eligibility items" itemName="Item" value={form.eligibility} onChange={(v) => set("eligibility", v)} blank={BLANK_ITEMS.eligibility} error={errors.eligibility} addLabel="Add item"
              fields={[{ key: "label", label: "Label", placeholder: "Educational Qualification" }, { key: "text", label: "Text", multiline: true }]} />
          </div>
        </Card>

        <Card title="Certificate">
          <div className="cf-grid">
            <Field id="cf-ct" label="Certificate title">
              <input id="cf-ct" className="ui-input" value={form.certificateTitle} onChange={(e) => set("certificateTitle", e.target.value)} placeholder="Course Certificate" />
            </Field>
            <UploadField id="cf-cimg" label="Certificate image" kind="image" folder="certificates" value={form.certificate} onChange={(v) => set("certificate", v)} onBusyChange={trackUpload} placeholder="/uploads/certificates/design.webp" />
            <Field id="cf-ctext" label="Certificate text" className="cf-wide">
              <input id="cf-ctext" className="ui-input" value={form.certificateText} onChange={(e) => set("certificateText", e.target.value)} placeholder="Earn a certificate after completion." />
            </Field>
          </div>
        </Card>

        <Card title="Learning options" desc="The “Learn Online / Learn Offline” cards. Prefilled with your standard wording.">
          <div className="cf-stack">

            <div className="cf-cols">
              {["online", "offline"].map((which) => (
                <fieldset key={which} className="cf-fieldset">
                  <legend>
                    {which === "online" ? "Online card" : "Offline card"}
                  </legend>

                  <Field
                    id={`cf-${which}-title`}
                    label="Title"
                  >
                    <input
                      id={`cf-${which}-title`}
                      className="ui-input"
                      value={lo[which].title}
                      onChange={(e) => setCard(which, "title", e.target.value)}
                    />
                  </Field>

                  <Field
                    id={`cf-${which}-description`}
                    label="Description"
                  >
                    <textarea
                      id={`cf-${which}-description`}
                      className="ui-textarea"
                      rows={3}
                      value={lo[which].description}
                      onChange={(e) =>
                        setCard(which, "description", e.target.value)
                      }
                    />
                  </Field>
                </fieldset>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Why choose this course">
          <div className="cf-stack">
            <div className="cf-grid">
              <Field id="cf-wt" label="Small label">
                <input id="cf-wt" className="ui-input" value={form.whyTitle} onChange={(e) => set("whyTitle", e.target.value)} placeholder="Why choose Catalyst" />
              </Field>
              <Field id="cf-ws" label="Heading" >
                <input id="cf-ws" className="ui-input" value={form.whySubtitle} onChange={(e) => set("whySubtitle", e.target.value)} placeholder="Choose the Right Guidance" />
              </Field>
            </div>
            <ObjectList
              label="Reasons"
              itemName="Reason"
              value={form.why}
              onChange={(v) => set("why", v)}
              blank={BLANK_ITEMS.why}
              error={errors.why}
              addLabel="Add reason"
              fields={[
                { key: "title", label: "Title" },
                { key: "text", label: "Text", multiline: true }
              ]}
            />
          </div>
        </Card>
        <Card title="FAQs" desc={creating ? "Questions and answers shown on the course page. Add at least one." : "Questions and answers shown on the course page."}>
          <ObjectList
            label="Questions"
            itemName="FAQ"
            value={form.faqs}
            onChange={(v) => set("faqs", v)}
            blank={BLANK_ITEMS.faq}
            error={errors.faqs}
            addLabel="Add FAQ"
            fields={[
              { key: "question", label: "Question", placeholder: "Who can join this course?" },
              { key: "answer", label: "Answer", multiline: true, placeholder: "Commerce students, graduates and working professionals." },
            ]}
          />
        </Card>

        <div className="cf-bar">
          <span className={`cf-bar__state${dirty ? " is-dirty" : ""}`}>
            {dirty ? "Unsaved changes" : creating ? "Fill in the form to create the course" : "No changes yet"}
          </span>
          <div className="cf-bar__btns">
            <Link to={`/admin/courses?mode=${mode}`} className="ui-btn ui-btn--ghost">Cancel</Link>
            <button type="submit" className="ui-btn ui-btn--primary" disabled={busy || uploads > 0 || (!creating && !dirty)}>
              {uploads > 0 ? "Uploading…" : busy ? "Saving…" : creating ? "Create course" : "Save changes"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
