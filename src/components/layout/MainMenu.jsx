import { Link, useLocation } from "react-router-dom";
import useNavigation, { isExternal } from "../../hooks/useNavigation";
import "./mega-menu.css";

const isActive = (item, path) =>
  item.to === path || item.children?.some((c) => isActive(c, path));

const NavLink = ({ item }) => {
  const isPlaceholder = !item.to || item.to === "#";

  // Force a full page reload only when navigating Home.
  if (item.label === "Home" && item.to === "/") {
    return <a href="/">{item.label}</a>;
  }

  if (isPlaceholder) {
    return <a href="#">{item.label}</a>;
  }

  // external link (e.g. Tech courses on catalysttech.in) -> new tab
  if (item.external || isExternal(item.to)) {
    return (
      <a href={item.to} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    );
  }

  return <Link to={item.to}>{item.label}</Link>;
};

// Desktop mega panel: own markup + own class names, so theme dropdown CSS can't interfere.
const MegaPanel = ({ item }) => (
  <div className="mega-panel">
    <div className="mega-panel__head">{item.label} Courses</div>
    <div className="mega-panel__grid">
      {item.children.map((cat) => {
        const hasLink = cat.to && cat.to !== "#";
        return (
          <div className="mega-col" key={cat.label}>
            <h4 className="mega-col__title">
              {hasLink ? <NavLink item={cat} /> : cat.label}
            </h4>
            <ul className="mega-col__list">
              {cat.children?.map((course) => (
                <li key={course.label}>
                  <NavLink item={course} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  </div>
);

const Items = ({ items, sub, path }) => (
  <ul className={sub ? "sub-menu" : undefined}>
    {items.map((it) => {
      const cls = [
        it.children && "has-dropdown",
        it.mega && "has-mega",
        it.to !== "#" && it.to === path && "current-menu-item",
        it.children && isActive(it, path) && "current-menu-ancestor",
      ]
        .filter(Boolean)
        .join(" ");
      return (
        <li key={it.label} className={cls || undefined}>
          <NavLink item={it} />
          {/* normal nested list: used by the mobile menu */}
          {it.children && <Items items={it.children} sub path={path} />}
          {/* mega panel: desktop only (CSS hides it on mobile) */}
          {it.mega && <MegaPanel item={it} />}
        </li>
      );
    })}
  </ul>
);

const MainMenu = ({ id }) => {
  const { pathname } = useLocation();
  const { navigation } = useNavigation();
  return (
    <nav id={id} className="mainmenu">
      <Items items={navigation} path={pathname} />
    </nav>
  );
};

export default MainMenu;