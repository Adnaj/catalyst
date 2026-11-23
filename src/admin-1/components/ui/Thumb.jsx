import { useEffect, useState } from "react";

// Small image preview that quietly falls back to an empty tile if the path doesn't load.
export default function Thumb({ src, size = 40 }) {
  const [bad, setBad] = useState(false);
  useEffect(() => setBad(false), [src]);
  const style = { width: size, height: size };
  if (!src || bad) return <span className="ui-thumb ui-thumb--empty" style={style} aria-hidden="true" />;
  return <img className="ui-thumb" style={style} src={src} alt="" loading="lazy" onError={() => setBad(true)} />;
}
