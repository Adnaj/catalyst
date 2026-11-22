import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authApi } from "../../api/adminApi";
import { useAuth } from "../../context/AuthContext";
import AuthShell from "../../components/AuthShell/AuthShell";
import "./Signup.css";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

const RESEND_SECONDS = 60;

export default function Signup() {
  const { user, verifySignup } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("details"); // "details" -> "otp"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  if (user) return <Navigate to="/admin" replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Step 1: send the OTP email (also used for "Send a new code")
  const sendCode = async (e) => {
    e?.preventDefault();
    setError("");
    setInfo("");
    setBusy(true);
    try {
      await authApi.signup(form);
      setStep("otp");
      setOtp("");
      setCooldown(RESEND_SECONDS);
      setInfo(`We sent a 6-digit code to ${form.email}. It expires in 10 minutes.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  // Step 2: verify the OTP, which creates the account and signs you in
  const verify = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await verifySignup(form.email, otp);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const backToDetails = () => {
    setStep("details");
    setError("");
    setInfo("");
  };

  const footer = (
    <>
      Already have an account? <Link to="/admin/login">Sign in</Link>
    </>
  );

  if (step === "otp") {
    return (
      <AuthShell title="Check your email" subtitle="Enter the code to finish creating your account." footer={footer}>
        <form className="auth-form" onSubmit={verify} noValidate>
          {info && <div className="auth-alert auth-alert--ok">{info}</div>}
          {error && <div className="auth-alert auth-alert--error" role="alert">{error}</div>}

          <div className="auth-field">
            <label htmlFor="signup-otp">6-digit code</label>
            <input
              id="signup-otp"
              className="signup-otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              autoFocus
            />
          </div>

          <button className="auth-btn" type="submit" disabled={busy || otp.length !== 6}>
            {busy ? "Creating account…" : "Create account"}
          </button>

          <div className="signup-actions">
            <button type="button" className="auth__link" onClick={sendCode} disabled={busy || cooldown > 0}>
              {cooldown > 0 ? `Send a new code in ${cooldown}s` : "Send a new code"}
            </button>
            <button type="button" className="auth__link" onClick={backToDetails}>
              Change email
            </button>
          </div>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Create your account" subtitle="We'll email you a 6-digit code to confirm it's you." footer={footer}>
      <form className="auth-form" onSubmit={sendCode} noValidate>
        {error && <div className="auth-alert auth-alert--error" role="alert">{error}</div>}

        <div className="auth-field">
          <label htmlFor="signup-name">Full name</label>
          <input id="signup-name" name="name" autoComplete="name" value={form.name} onChange={onChange} required />
        </div>

        <div className="auth-field">
          <label htmlFor="signup-email">Email</label>
          <input id="signup-email" name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} required />
        </div>

        <div className="auth-field">
          <label htmlFor="signup-password">Password</label>
          <PasswordInput id="signup-password" name="password" autoComplete="new-password" value={form.password} onChange={onChange} required />
          <ul className="signup-rules">
            {[["8+ characters", form.password.length >= 8], ["A letter", /[A-Za-z]/.test(form.password)], ["A number", /[0-9]/.test(form.password)]].map(([label, ok]) => (
              <li key={label} className={ok ? "is-ok" : ""}>{label}</li>
            ))}
          </ul>
        </div>

        <button className="auth-btn" type="submit" disabled={busy || !form.name || !form.email || !form.password}>
          {busy ? "Sending code…" : "Send code"}
        </button>

        <p className="signup-note">
          New accounts can't open the dashboard until an existing admin gives them the admin role.
        </p>
      </form>
    </AuthShell>
  );
}
