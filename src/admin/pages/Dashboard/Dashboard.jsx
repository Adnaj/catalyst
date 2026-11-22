import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MOD_KEY, TABS } from "../../config/tabs";
import Icon from "../../components/Icons/Icons";
import "./Dashboard.css";

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

export default function Dashboard() {
  const { user } = useAuth();
  const hero = useRef(null);

  // the spark glow follows the cursor
  const onMove = (e) => {
    const r = hero.current.getBoundingClientRect();
    hero.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    hero.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const sections = TABS.filter((t) => !t.end);

  return (
    <section className="dash">
      <div className="dash__hero" ref={hero} onMouseMove={onMove}>
        <p className="dash__hello">{greeting()}, {user.name.split(" ")[0]}</p>
        <h1 className="dash__title">Everything people send to Catalyst SkillHub, in one place.</h1>

        <p className="dash__tip">
          Jump to any page with <span className="kbd">{MOD_KEY}</span> <span className="kbd">K</span>
        </p>
      </div>

      <div className="dash__grid">
        {sections.map((s, i) => (
          <Link key={s.to} to={s.to} className="dash__card" style={{ "--i": i }}>
            <span className="dash__ico"><Icon name={s.icon} size={22} /></span>
            <span className="dash__go"><Icon name="arrow" size={18} /></span>
            <span className="dash__card-title">{s.label}</span>
            <span className="dash__card-desc">{s.desc}</span>
            {s.soon && <span className="dash__chip">Coming soon</span>}
          </Link>
        ))}
      </div>
    </section>
  );
}