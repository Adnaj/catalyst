import "./Testimonial.css";

export default function Testimonial() {
  return (
    <section className="admin-page testimonial-page">
      <header className="admin-page__head">
        <h1 className="admin-page__title">Testimonials</h1>
        <p className="admin-page__desc">What learners say about Catalyst SkillHub, and which quotes appear on the site.</p>
      </header>

      <div className="testimonial-page__empty">
        <p className="testimonial-page__empty-title">Nothing to manage yet</p>
        <p className="testimonial-page__empty-text">This tab is set up and routed. Build the Testimonials tools here.</p>
      </div>
    </section>
  );
}
