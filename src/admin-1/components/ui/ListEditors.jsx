import { useRef } from "react";
import Icon from "../Icons/Icons";

const swap = (list, i, d) => {
  const j = i + d;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

function RowTools({ i, count, onMove, onRemove }) {
  return (
    <div className="le__tools">
      <button type="button" className="ui-iconbtn ui-iconbtn--sm" onClick={() => onMove(i, -1)} disabled={i === 0} aria-label="Move up"><Icon name="up" size={16} /></button>
      <button type="button" className="ui-iconbtn ui-iconbtn--sm" onClick={() => onMove(i, 1)} disabled={i === count - 1} aria-label="Move down"><Icon name="down" size={16} /></button>
      <button type="button" className="ui-iconbtn ui-iconbtn--sm ui-iconbtn--danger" onClick={() => onRemove(i)} aria-label="Remove"><Icon name="trash" size={16} /></button>
    </div>
  );
}

// A list of single-line strings (gain, skills, tools, careers).
export function StringList({ label, hint, value, onChange, placeholder, addLabel = "Add item" }) {
  const refs = useRef([]);
  const set = (i, v) => onChange(value.map((x, idx) => (idx === i ? v : x)));
  const add = () => {
    onChange([...value, ""]);
    setTimeout(() => refs.current[value.length]?.focus(), 0);
  };
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  const onEnter = (e, i) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (i === value.length - 1) add();
    else refs.current[i + 1]?.focus();
  };

  return (
    <div className="le">
      <div className="le__head">
        <span className="le__label">{label}</span>
        {hint && <span className="le__hint">{hint}</span>}
      </div>
      {value.length === 0 && <p className="le__empty">Nothing added yet.</p>}
      <ul className="le__list">
        {value.map((v, i) => (
          <li key={i} className="le__row">
            <input
              ref={(el) => (refs.current[i] = el)}
              className="ui-input"
              value={v}
              placeholder={placeholder}
              aria-label={`${label} ${i + 1}`}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => onEnter(e, i)}
            />
            <RowTools i={i} count={value.length} onMove={(idx, d) => onChange(swap(value, idx, d))} onRemove={remove} />
          </li>
        ))}
      </ul>
      <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={add}>
        <Icon name="plus" size={16} /> {addLabel}
      </button>
    </div>
  );
}

// A list of small records, e.g. learn: [{ title, text }]. `fields` = [{ key, label, placeholder, multiline }]
export function ObjectList({ label, hint, value, onChange, fields, blank, itemName = "Item", addLabel = "Add item", error }) {
  const set = (i, key, v) => onChange(value.map((x, idx) => (idx === i ? { ...x, [key]: v } : x)));
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="le" data-invalid={error ? "" : undefined}>
      <div className="le__head">
        <span className="le__label">{label}</span>
        {hint && <span className="le__hint">{hint}</span>}
      </div>
      {value.length === 0 && <p className="le__empty">Nothing added yet.</p>}
      <ul className="le__list">
        {value.map((item, i) => (
          <li key={i} className="le__card">
            <div className="le__cardhead">
              <strong>{itemName} {i + 1}</strong>
              <RowTools i={i} count={value.length} onMove={(idx, d) => onChange(swap(value, idx, d))} onRemove={remove} />
            </div>
            <div className="le__fields">
              {fields.map((f) => (
                <label key={f.key} className={`le__field cf-wide${f.multiline ? " le__field--wide" : ""}`}>
                  <span>{f.label}</span>
                  {f.multiline ? (
                    <textarea className="ui-textarea" rows={3} value={item[f.key] ?? ""} placeholder={f.placeholder} onChange={(e) => set(i, f.key, e.target.value)} />
                  ) : (
                    <input className="ui-input" value={item[f.key] ?? ""} placeholder={f.placeholder} onChange={(e) => set(i, f.key, e.target.value)} />
                  )}
                </label>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {error && <p className="ui-field__error" role="alert">{error}</p>}
      <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={() => onChange([...value, { ...blank }])}>
        <Icon name="plus" size={16} /> {addLabel}
      </button>
    </div>
  );
}
