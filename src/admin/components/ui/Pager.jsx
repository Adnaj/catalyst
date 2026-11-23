export default function Pager({ page, pages, total, onPage }) {
  if (!total) return null;
  return (
    <div className="ui-toolbar" style={{ marginTop: 12 }}>
      <span className="ui-muted ui-toolbar__grow">{total} total · page {page} of {pages}</span>
      <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>Previous</button>
      <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next</button>
    </div>
  );
}
