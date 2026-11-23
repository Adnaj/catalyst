import "./ContactForm.css";

export default function ContactForm() {
  return (
    <section className="admin-page contact-page">
      <header className="admin-page__head">
        <h1 className="admin-page__title">Contact forms</h1>
        <p className="admin-page__desc">Messages sent from the contact page.</p>
      </header>

      <div className="contact-page__empty">
        <p className="contact-page__empty-title">Nothing to manage yet</p>
        <p className="contact-page__empty-text">This tab is set up and routed. Build the Contact forms tools here.</p>
      </div>
    </section>
  );
}
