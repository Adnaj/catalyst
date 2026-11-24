import { useState } from "react";
import { Link } from "react-router-dom";
import { navigation } from "../../data/navigation";

// React replacement for the jQuery meanmenu plugin (same classes, same CSS).
const Item = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <li>
      {item.to && item.to !== "#" ? (
        <Link to={item.to}>{item.label}</Link>
      ) : (
        <a href="#">{item.label}</a>
      )}
      {item.children && (
        <>
          <a
            href="#"
            className={`mean-expand${open ? " mean-clicked" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
          >
            <i className="tji-arrow-down" />
          </a>
          <ul style={{ display: open ? "block" : "none" }}>
            {item.children.map((c) => (
              <Item key={c.label} item={c} />
            ))}
          </ul>
        </>
      )}
    </li>
  );
};

const MobileMenu = () => (
  <div className="mean-container">
    <div className="mean-bar">
      <nav className="mean-nav">
        <ul>
          {navigation.map((i) => (
            <Item key={i.label} item={i} />
          ))}
        </ul>
      </nav>
    </div>
  </div>
);
export default MobileMenu;
