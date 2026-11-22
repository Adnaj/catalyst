import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../Icons/Icons";
import "./CommandPalette.css";

export default function CommandPalette({ open, onClose, tabs }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);

  const results = tabs.filter((t) => `${t.label} ${t.desc}`.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => setIdx(0), [q]);

  if (!open) return null;

  const go = (tab) => {
    navigate(tab.to);
    onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && results[idx]) go(results[idx]);
  };

  return (
    <div className="palette" onMouseDown={onClose}>
      <div className="palette__box" role="dialog" aria-modal="true" aria-label="Jump to a page" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKeyDown}>
        <div className="palette__search">
          <Icon name="search" size={18} />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Jump to a page" aria-label="Search pages" />
          <span className="kbd">Esc</span>
        </div>

        <ul className="palette__list">
          {results.map((t, i) => (
            <li key={t.to}>
              <button type="button" className={i === idx ? "is-active" : ""} onMouseEnter={() => setIdx(i)} onClick={() => go(t)}>
                <Icon name={t.icon} size={18} />
                <span className="palette__text">
                  <strong>{t.label}</strong>
                  <small>{t.desc}</small>
                </span>
              </button>
            </li>
          ))}
          {!results.length && <li className="palette__empty">No page matches “{q}”. Try “leads” or “careers”.</li>}
        </ul>
      </div>
    </div>
  );
}