import "./Leads.css";

export default function Leads() {
  return (
    <section className="admin-page leads-page">
      <header className="admin-page__head">
        <h1 className="admin-page__title">Lead forms</h1>
        <p className="admin-page__desc">People who asked to be contacted through your lead forms.</p>
      </header>

      <div className="leads-page__empty">
        <p className="leads-page__empty-title">Nothing to manage yet</p>
        <p className="leads-page__empty-text">This tab is set up and routed. Build the Lead forms tools here.</p>
      </div>
    </section>
  );
}
