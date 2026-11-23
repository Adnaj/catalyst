import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthShell from "../../components/AuthShell/AuthShell";
import "./Login.css";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(form.email, form.password);
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Sign in"
      subtitle="Use your admin account."
      footer={
        <>
          Don't have an account? <Link to="/admin/signup">Create one</Link>
        </>
      }
    >
      <form className="auth-form login-form" onSubmit={onSubmit} noValidate>
        {error && <div className="auth-alert auth-alert--error" role="alert">{error}</div>}

        <div className="auth-field">
          <label htmlFor="login-email">Email</label>
          <input id="login-email" name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} required />
        </div>

        <div className="auth-field">
          <label htmlFor="login-password">Password</label>
         <PasswordInput id="login-password" name="password" autoComplete="current-password" value={form.password} onChange={onChange} required />
        </div>
        

        <button className="auth-btn" type="submit" disabled={busy || !form.email || !form.password}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
    
  );
}
