import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import Icon from "../Icons/Icons";

const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => setItems((l) => l.filter((t) => t.id !== id)), []);
  const push = useCallback(
    (type, message) => {
      const id = ++idRef.current;
      setItems((l) => [...l, { id, type, message }]);
      setTimeout(() => dismiss(id), type === "error" ? 6500 : 3500);
    },
    [dismiss]
  );
  const api = useMemo(() => ({ success: (m) => push("ok", m), error: (m) => push("error", m) }), [push]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="ui-toasts" role="status" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={`ui-toast ui-toast--${t.type}`}>
            <Icon name={t.type === "ok" ? "check" : "alert"} size={18} />
            <span>{t.message}</span>
            <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss"><Icon name="close" size={16} /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
