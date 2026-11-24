import { useEffect, useState } from "react";

const Preloader = () => {
  const [state, setState] = useState("is-loading");
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const done = () => {
      setState("is-loaded");
      setTimeout(() => setGone(true), 400);
    };
    if (document.readyState === "complete") done();
    else {
      window.addEventListener("load", done);
      return () => window.removeEventListener("load", done);
    }
  }, []);
  if (gone) return null;
  return (
    <div className={`preloader ${state}`}>
      <div className="loading-container">
        <div className="loading" />
        <div id="loading-icon">
          <img src="/assets/images/hero/logo.png" alt="Loading" />
        </div>
      </div>
    </div>
  );
};
export default Preloader;
