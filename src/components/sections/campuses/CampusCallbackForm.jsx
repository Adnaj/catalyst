import "./Campus.css";


import { useState } from "react";
import { sendLead } from "../../../api/leads";

const EMPTY_FORM = {
  name: "",
  phone: "",
  message: "",
};

const CampusCallbackForm = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const digits = form.phone.replace(/\D/g, "");

    if (form.name.trim().length < 2) {
      return setError("Please enter your name.");
    }

    if (digits.length < 10) {
      return setError("Please enter a valid phone number.");
    }

    setError("");
    setStatus("sending");

    try {
      // POST /api/leads/popup  (name + phone are required, the rest is saved with the lead)
      await sendLead("popup", {
        name: form.name,
        phone: form.phone,
        formTitle: "Request a Call Back",
        source: "campus-page-callback",
        meta: { source: "campus-page-callback", message: form.message },
        pageUrl: window.location.href,
        pagePath: window.location.pathname,
      });

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  return (
    <div className="tj-campus lead-sidebar">
      <div className="lead-form-box">
        <div className="lead-form-header">
          <h3 className="lead-form-title">Request a Call Back</h3>
          <p>
            Share your details and our counsellors will get in touch with you.
          </p>
        </div>

        <div className="lead-form-content">
          {status === "success" ? (
            <p className="lead-form-success" role="status">
              Thank you! Our team will call you back shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className="lead-field">
                <label htmlFor="campus-lead-name">Name</label>
                <input
                  id="campus-lead-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="lead-field">
                <label htmlFor="campus-lead-phone">Phone Number</label>

                <div className="lead-phone-input">
                  <span className="lead-country-code">
                    <span aria-hidden="true">🇮🇳</span> +91
                  </span>

                  <input
                    id="campus-lead-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter 10-digit number"
                    autoComplete="tel-national"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="lead-field">
                <label htmlFor="campus-lead-message">Message</label>
                <textarea
                  id="campus-lead-message"
                  name="message"
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={handleChange}
                  rows={2}
                />
              </div>

              {error && (
                <p className="lead-form-error" role="alert">
                  {error}
                </p>
              )}

              {status === "error" && (
                <p className="lead-form-error" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                className="tj-btn-primary tj-btn-primary-md tj-btn-full flip-text-wrap"
                disabled={status === "sending"}
              >
                <span className="btn-text">
                  {status === "sending"
                    ? "Sending..."
                    : "Request a Call Back"}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusCallbackForm;