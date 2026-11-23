import { useRef, useState } from "react";
import { assetUrl, uploadsApi } from "../../api/contentApi";
import Icon from "../Icons/Icons";
import Field from "./Field";
import Thumb from "./Thumb";

// Keep these in step with the multer fileFilter / limits on the backend.
const RULES = {
  image: { accept: "image/jpeg,image/png,image/webp", types: ["image/jpeg", "image/png", "image/webp"], maxMB: 5, hint: "JPG, PNG or WebP, up to 5 MB" },
  pdf: { accept: "application/pdf", types: ["application/pdf"], maxMB: 10, hint: "PDF, up to 10 MB" },
};

export default function UploadField({ id, label, kind = "image", folder, value, onChange, placeholder, onBusyChange }) {
  const rule = RULES[kind];
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const [error, setError] = useState("");
  const current = value.trim();

  const upload = async (file) => {
    if (!file) return;
    setError("");
    if (!rule.types.includes(file.type)) return setError(`That file type isn’t allowed. Use ${rule.hint}.`);
    if (file.size > rule.maxMB * 1024 * 1024) return setError(`That file is too large. Max ${rule.maxMB} MB.`);

    setBusy(true);
    onBusyChange?.(true);
    try {
      onChange(await uploadsApi.upload(file, folder));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      onBusyChange?.(false);
    }
  };

  return (
    <Field id={id} label={label} hint={rule.hint} error={error}>
      <div
        className={`up${over ? " is-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); upload(e.dataTransfer.files?.[0]); }}
      >
        <div className="up__preview">
          {kind === "image" ? (
            <Thumb src={assetUrl(current)} size={56} />
          ) : current ? (
            <a className="up__pdf" href={assetUrl(current)} target="_blank" rel="noreferrer" aria-label="Open PDF" title="Open PDF"><Icon name="file" size={24} /></a>
          ) : (
            <span className="up__pdf up__pdf--empty"><Icon name="file" size={24} /></span>
          )}
        </div>

        <div className="up__main">
          <input id={id} className="ui-input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
          <div className="up__btns">
            <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={() => fileRef.current?.click()} disabled={busy}>
              <Icon name="upload" size={16} /> {busy ? "Uploading…" : current ? "Replace" : "Upload"}
            </button>
            {current && !busy && (
              <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={() => { setError(""); onChange(""); }}>
                <Icon name="close" size={16} /> Remove
              </button>
            )}
            <span className="up__drop">or drop a file here</span>
          </div>
          {busy && <div className="up__bar" role="progressbar" aria-label="Uploading"><span /></div>}
        </div>

        <input ref={fileRef} type="file" hidden accept={rule.accept} onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ""; }} />
      </div>
    </Field>
  );
}