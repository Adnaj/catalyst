import { useState } from "react";
import { Link } from "react-router-dom";
import useNavigation, { isExternal } from "../../hooks/useNavigation";

// React replacement for the jQuery meanmenu plugin (same classes, same CSS).
const Item = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <li>
      {item.to && item.to !== "#" ? (
        item.external || isExternal(item.to) ? (
          <a href={item.to} target="_blank" rel="noopener noreferrer">
            {item.label}
          </a>
        ) : (
          <Link to={item.to}>{item.label}</Link>
        )
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

const MobileMenu = () => {
  const { navigation } = useNavigation();
  return (
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
};
export default MobileMenu;