export default function Field({ id, label, required, hint, error, children, className = "" }) {
  return (
    <div className={`ui-field ${className}`} data-invalid={error ? "" : undefined}>
      <label htmlFor={id}>
        {label}
        {required && <span className="ui-req" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error ? <p className="ui-field__error" role="alert">{error}</p> : hint ? <p className="ui-field__hint">{hint}</p> : null}
    </div>
  );
}
