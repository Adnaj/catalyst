import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MOD_KEY, TABS } from "../../config/tabs";
import Icon from "../../components/Icons/Icons";
import CommandPalette from "../../components/CommandPalette/CommandPalette";
import "./AdminLayout.css";

export default function AdminLayout({ theme, onToggleTheme }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState(() => localStorage.getItem("admin-sidebar") === "1");
  const [drawer, setDrawer] = useState(false);
  const [palette, setPalette] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);

  const current = TABS.find((t) => (t.end ? pathname.replace(/\/$/, "") === t.to : pathname.startsWith(t.to)));

  useEffect(() => localStorage.setItem("admin-sidebar", collapsed ? "1" : "0"), [collapsed]);
  useEffect(() => setDrawer(false), [pathname]);

  // Ctrl/⌘ + K opens the palette
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // close the avatar menu on outside click / Esc
  useEffect(() => {
    if (!menu) return;
    const onDown = (e) => !menuRef.current?.contains(e.target) && setMenu(false);
    const onKey = (e) => e.key === "Escape" && setMenu(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <div className={`shell${collapsed ? " is-collapsed" : ""}${drawer ? " is-open" : ""}`}>
      <aside className="shell__side">
        <div className="shell__brand">
          {/* <span className="shell__mark">C</span> */}
          <span className="shell__brandname">Catalyst SkillHub</span>
        </div>

        <nav className="shell__nav" aria-label="Dashboard">
          {TABS.map((tab) => (
            <NavLink key={tab.to} to={tab.to} end={tab.end} data-label={tab.label} className={({ isActive }) => `shell__link${isActive ? " is-active" : ""}`}>
              <span className="shell__icon"><Icon name={tab.icon} /></span>
              <span className="shell__label">{tab.label}</span>
            </NavLink>
          ))}
        </nav>

        <button type="button" className="shell__collapse" onClick={() => setCollapsed((c) => !c)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <Icon name="collapse" />
          <span className="shell__label">Collapse</span>
        </button>
      </aside>

      <div className="shell__scrim" onClick={() => setDrawer(false)} />

      <div className="shell__body">
        <header className="shell__top">
          <div className="shell__left">
            <button type="button" className="iconbtn shell__burger" onClick={() => setDrawer(true)} aria-label="Open menu">
              <Icon name="menu" />
            </button>
            <p className="shell__crumb">{current?.label || "Dashboard"}</p>
          </div>

          <div className="shell__tools">
            <button type="button" className="shell__search" onClick={() => setPalette(true)} aria-label="Jump to a page">
              <Icon name="search" size={18} />
              <span>Jump to a page</span>
              <span className="kbd">{MOD_KEY} K</span>
            </button>

            <button type="button" className="iconbtn" onClick={onToggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>

            <div className="menu" ref={menuRef}>
              <button type="button" className="shell__avatar" onClick={() => setMenu((m) => !m)} aria-haspopup="menu" aria-expanded={menu} aria-label="Account menu">
                {user.name.trim().charAt(0).toUpperCase()}
              </button>
              {menu && (
                <div className="menu__panel" role="menu">
                  <div className="menu__who">
                    <span className="menu__name">{user.name}</span>
                    <span className="menu__email">{user.email}</span>
                  </div>
                  <button type="button" role="menuitem" className="menu__item" onClick={logout}>
                    <Icon name="logout" size={18} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="shell__main">
          <Outlet />
        </main>
      </div>

      <CommandPalette open={palette} onClose={() => setPalette(false)} tabs={TABS} />
    </div>
  );
}