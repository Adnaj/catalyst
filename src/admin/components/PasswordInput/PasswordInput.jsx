import { useState } from "react";
import Icon from "../Icons/Icons";
import "./PasswordInput.css";

// Drop-in replacement for <input type="password">: pass the same props (id, name, value, onChange...)
export default function PasswordInput(props) {
  const [show, setShow] = useState(false);
  return (
    <div className="pw">
      <input {...props} type={show ? "text" : "password"} />
      <button type="button" className="pw__toggle" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}>
        <Icon name={show ? "eyeoff" : "eye"} size={18} />
      </button>
    </div>
  );
}