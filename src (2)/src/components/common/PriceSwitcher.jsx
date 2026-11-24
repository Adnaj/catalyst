import { useLayoutEffect, useRef } from "react";

// React version of the jQuery "price-switcher" + "tj-active-bg" logic (same classes/CSS).
const PriceSwitcher = ({ yearly, onChange }) => {
  const box = useRef(null);
  const monthly = useRef(null);
  const year = useRef(null);

  useLayoutEffect(() => {
    const el = yearly ? year.current : monthly.current;
    const bg = box.current.querySelector(".tj-active-bg");
    const c = box.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    Object.assign(bg.style, {
      left: `${r.left - c.left - 1}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
    });
  }, [yearly]);

  return (
    <div className="tj-fade-anim" data-delay=".5" data-duration="0.6">
      <div
        ref={box}
        className="price-switcher price-switcher-lg tj-active-bg-container"
      >
        <button
          ref={monthly}
          className={`price-toggle-btn monthly tj-active-bg-item${yearly ? "" : " active"}`}
          onClick={() => onChange(false)}
        >
          Monthly
        </button>{" "}
        <button
          ref={year}
          className={`price-toggle-btn yearly tj-active-bg-item${yearly ? " active" : ""}`}
          onClick={() => onChange(true)}
        >
          Yearly
        </button>
        <div className="tj-active-bg" />
      </div>
    </div>
  );
};
export default PriceSwitcher;
