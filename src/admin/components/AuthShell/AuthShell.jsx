import "./AuthShell.css";

const MANAGES = ["Career openings and applications", "Testimonials", "Lead form submissions", "Contact messages"];

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="auth">
      <aside className="auth__brand">
        <p className="auth__wordmark">Catalyst SkillHub</p>
        <div>
          <h2 className="auth__headline">Run Catalyst SkillHub from one place.</h2>
          <ul className="auth__list">
            {MANAGES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="auth__main">
        <div className="auth__panel">
          <h1 className="auth__title">{title}</h1>
          {subtitle && <p className="auth__subtitle">{subtitle}</p>}
          {children}
          {footer && <p className="auth__footer">{footer}</p>}
        </div>
      </main>
    </div>
  );
}
