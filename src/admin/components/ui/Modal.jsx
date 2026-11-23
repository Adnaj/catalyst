import { useEffect, useId, useRef } from "react";
import Icon from "../Icons/Icons";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

// Rendered inline (not in a portal) so it inherits the .admin-root theme variables.
export default function Modal({ title, onClose, children, footer, size = "md", busy = false }) {
  const boxRef = useRef(null);
  const titleId = useId();
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const box = boxRef.current;
    const previous = document.activeElement;
    (box.querySelector("[data-autofocus]") || box).focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape" && !busy) {
        e.stopPropagation();
        closeRef.current();
      } else if (e.key === "Tab") {
        const items = [...box.querySelectorAll(FOCUSABLE)];
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === box)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [busy]);

  return (
    <div className="ui-modal" onMouseDown={(e) => e.target === e.currentTarget && !busy && onClose()}>
      <div ref={boxRef} className={`ui-modal__box ui-modal__box--${size}`} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <header className="ui-modal__head">
          <h2 id={titleId} className="ui-modal__title">{title}</h2>
          <button type="button" className="ui-iconbtn" onClick={onClose} disabled={busy} aria-label="Close">
            <Icon name="close" size={18} />
          </button>
        </header>
        <div className="ui-modal__body">{children}</div>
        {footer && <footer className="ui-modal__foot">{footer}</footer>}
      </div>
    </div>
  );
}

export function ConfirmDialog({ title, message, confirmLabel = "Delete", busy, onConfirm, onCancel }) {
  return (
    <Modal
      size="sm"
      title={title}
      onClose={onCancel}
      busy={busy}
      footer={
        <>
          <button type="button" className="ui-btn ui-btn--ghost" onClick={onCancel} disabled={busy}>Cancel</button>
          <button type="button" className="ui-btn ui-btn--danger" onClick={onConfirm} disabled={busy} data-autofocus>
            {busy ? "Working…" : confirmLabel}
          </button>
        </>
      }
    >
      <p className="ui-modal__text">{message}</p>
    </Modal>
  );
}
