import "./Career.css";

export default function Career() {
  return (
    <section className="admin-page career-page">
      <header className="admin-page__head">
        <h1 className="admin-page__title">Careers</h1>
        <p className="admin-page__desc">Job openings and the applications people send in.</p>
      </header>

      <div className="career-page__empty">
        <p className="career-page__empty-title">Nothing to manage yet</p>
        <p className="career-page__empty-text">This tab is set up and routed. Build the Careers tools here.</p>
      </div>
    </section>
  );
}
