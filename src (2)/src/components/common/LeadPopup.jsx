import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  GraduationCap,
  UserRound,
  Phone,
  MapPin,
  MessageSquare,
  BookOpen,
  BriefcaseBusiness,
  ArrowRight,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";
import { campuses } from "../../data/campuses";
import "./LeadPopup.css";

const DEFAULT_TITLE = "Request a Call Back";
const DEFAULT_DESCRIPTION =
  "Tell us a little about yourself and our academic counsellors will help you get started.";

const emptyForm = {
  name: "",
  phone: "",
};

// one group per campus, each listing its locations, then "Other"
const LOCATION_GROUPS = campuses.map((c) => ({
  label: c.name,
  options: c.locations.map((l) => l.name),
}));

const ALL_LOCATIONS = LOCATION_GROUPS.flatMap((g) => g.options);

/**
 * Props
 *  isOpen, onClose, onSubmitLead(payload)   (onSubmitLead is optional;
 *                                            without it the form POSTs to /api/enquiry)
 *  title           – form heading (default "Request a Call Back")
 *  description     – text under the heading (optional)
 *  submitLabel     – submit button text (default = title)
 *  defaultLocation – pre-selects a location, e.g. "Kannur"
 *  meta            – unique data for the button that opened the form, e.g.
 *                    { source: "home-about-enquire", course: "digital-marketing" }
 */

import { sendLead } from "../../api/leads"; // adjust path to where leads.js lives
export default function LeadPopup({
  isOpen,
  onClose,
  onSubmitLead,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  submitLabel,
  defaultLocation = "",
  meta = {},
  downloadUrl = "",
}) {
  const headingId = useId();
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // reset the form every time it is opened (fresh title / meta / location)
  useEffect(() => {
    if (!isOpen) return;

    setForm(emptyForm);
    setSuccess(false);
    setError("");
    setSubmitting(false);

    if (import.meta.env?.DEV && !meta.source) {
      console.warn(
        "LeadPopup: pass meta.source so every Enquire Now button is identifiable."
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        formTitle: title,
        source: meta.source || "unknown",
        meta,
        pageUrl: window.location.href,
        pagePath: window.location.pathname,
        submittedAt: new Date().toISOString(),
      };

      if (onSubmitLead) {
        await onSubmitLead(payload);
      } else {
        await sendLead("popup", payload);
      }

      // Download brochure only after successful enquiry submission
      if (downloadUrl) {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setSuccess(true);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="clp-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="clp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
      >
        <button
          type="button"
          className="clp-close"
          onClick={onClose}
          aria-label="Close enquiry form"
        >
          <X size={23} />
        </button>

        <aside className="clp-promo">


          {/* <p className="clp-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p> */}

          <h2>
            Get Expert Guidance for Your <span>Career Goals</span>
          </h2>

          <p className="clp-description">
            Discover the right course, develop industry-ready skills, and take
            the next step in your career with Catalyst SkillHub.
          </p>

          <div className="clp-student-image">
            <img
              src="/assets/images/hero/thozhil.png"
              alt="Students learning together"
            />
          </div>

          {/* <div className="clp-benefits">
            <div className="clp-benefit">
              <span><GraduationCap size={21} /></span>
              <div>
                <strong>Expert Mentors</strong>
                <small>Learn from experienced trainers</small>
              </div>
            </div>

            <div className="clp-benefit">
              <span><BookOpen size={21} /></span>
              <div>
                <strong>Industry-Relevant Courses</strong>
                <small>Build practical, job-ready skills</small>
              </div>
            </div>

            <div className="clp-benefit">
              <span><BriefcaseBusiness size={21} /></span>
              <div>
                <strong>Placement Support</strong>
                <small>Get guidance for your next career move</small>
              </div>
            </div>
          </div> */}


        </aside>

        <div className="clp-form-panel">
          {success ? (
            <div className="clp-success">
              <span className="clp-success-icon">
                <CheckCircle2 size={42} />
              </span>
              <h2>Thank you!</h2>
              <p>
                Your enquiry has been submitted successfully. Our team will get
                in touch with you soon.
              </p>
              <button className="clp-submit" onClick={onClose} type="button">
                Continue exploring <ArrowRight size={19} />
              </button>
            </div>
          ) : (
            <>
              <div className="clp-form-heading">
                <span className="clp-form-eyebrow">LET'S GET STARTED</span>
                <h2 id={headingId}>{title}</h2>
                <p>{description}</p>
              </div>

              <form className="clp-form" onSubmit={handleSubmit}>
                <label className="clp-field">
                  <UserRound size={20} aria-hidden="true" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name *"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="clp-field">
                  <Phone size={20} aria-hidden="true" />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number *"
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9+() -]{7,15}"
                    title="Enter a valid phone number."
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </label>



                {error && (
                  <p className="clp-error" role="alert">
                    {error}
                  </p>
                )}

                <button
                  className="clp-submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : submitLabel || title}
                  {!submitting && <ArrowRight size={21} />}
                </button>

                {/* <p className="clp-privacy">
                  <LockKeyhole size={17} />
                  <span>
                    Your information is safe and confidential.
                  </span>
                </p> */}
              </form>
            </>
          )}
        </div>
      </section>
    </div>,
    document.body
  );
}