
import { useState } from "react";
import Select from "react-select";

const API_URL = `${import.meta.env.VITE_API_URL || ""}/api/contact`;

const SUBJECTS = [
  { value: "1", label: "General question" },
  { value: "2", label: "Course Information" },
  { value: "3", label: "Pricing & Subscription" },
  { value: "4", label: "Request a Refund" },
  { value: "5", label: "Account & Login" },
  { value: "6", label: "Billing & Payments" },
];

const MODES = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];

const LOCATIONS = [
  "Kannur",
  "Vadakara",
  "Calicut",
  "Manjeri",
  "Perinthalmanna",
  "Kottakkal",
  "Edappal",
  "Thrissur",
  "Kochi",
].map((city) => ({
  value: city.toLowerCase(),
  label: city,
}));

const initial = {
  cfName: "",
  cfEmail: "",
  cfSubject: SUBJECTS[0],
  cfMode: MODES[1],
  cfLocation: null,
  message: "",
};

const ContactSection = () => {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [locationError, setLocationError] = useState(false);

  const isOffline = form.cfMode.value === "offline";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectChange = (selectedOption) => {
    setForm((prev) => ({
      ...prev,
      cfSubject: selectedOption,
    }));
  };

  const handleModeChange = (selectedOption) => {
    setForm((prev) => ({
      ...prev,
      cfMode: selectedOption,
      cfLocation:
        selectedOption.value === "online" ? null : prev.cfLocation,
    }));

    setLocationError(false);
  };

  const handleLocationChange = (selectedOption) => {
    setForm((prev) => ({
      ...prev,
      cfLocation: selectedOption,
    }));

    setLocationError(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isOffline && !form.cfLocation) {
      setLocationError(true);
      return;
    }

    setStatus("sending");

    try {
      const payload = {
        cfName: form.cfName,
        cfEmail: form.cfEmail,
        cfSubject: form.cfSubject.value,
        cfMode: form.cfMode.value,
        cfLocation: isOffline ? form.cfLocation.value : null,
        message: form.message,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      setStatus("sent");
      setForm({ ...initial });
      setLocationError(false);
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <main id="primary" className="site-main">
      <div className="space-for-header"></div>

      {/* Page Header - Original Design */}
      <section className="tj-page-header tj-page-header-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tj-page-header-content">
                <h1 className="tj-page-title">Contact us</h1>

                <div className="tj-page-link">
                  <span>
                    <i className="tji-home"></i>
                  </span>

                  <span>
                    <a href="/">Home</a>
                  </span>

                  <span>
                    <i className="tji-arrow-right-4"></i>
                  </span>

                  <span>
                    <span>Contact us</span>
                  </span>
                </div>

                <div className="shape">
                  <img
                    src="/assets/images/shapes/stars.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Original Layout and Classes */}
      <section className="tj-contact-section section-gap-bottom">
        <div className="container">
          <div className="row rg-30 flex-lg-row flex-column-reverse">

            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="contact-form tj-fade-anim">
                <div className="form-title-wrap">
                  <h3 className="form-title">
                    Send us a message.
                  </h3>

                  <p className="desc">
                    Start learning free — no credit card required.
                  </p>
                </div>

                <form id="contact-form" onSubmit={onSubmit}>
                  <div className="row">

                    {/* Full Name */}
                    <div className="col-sm-6">
                      <div className="form-input">
                        <label className="cf-label" htmlFor="cfName">
                          Full name
                        </label>

                        <input
                          type="text"
                          id="cfName"
                          name="cfName"
                          placeholder="Enter name"
                          value={form.cfName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="col-sm-6">
                      <div className="form-input">
                        <label className="cf-label" htmlFor="cfEmail">
                          Phone number
                        </label>

                        <input
                          type="tel"
                          id="cfEmail"
                          name="cfEmail"
                          placeholder="Enter Phone number"
                          value={form.cfEmail}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Choose Programme */}
                    <div className="col-sm-6">
                      <div className="form-input">
                        <label className="cf-label">
                          Choose programme
                        </label>

                        <div className="tj-select">
                          <Select
                            options={SUBJECTS}
                            value={form.cfSubject}
                            onChange={handleSubjectChange}
                            placeholder="General question"
                            isSearchable={false}
                            classNamePrefix="contact-select"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mode */}
                    <div className="col-sm-6">
                      <div className="form-input">
                        <label className="cf-label">
                          Mode
                        </label>

                        <div className="tj-select">
                          <Select
                            options={MODES}
                            value={form.cfMode}
                            onChange={handleModeChange}
                            isSearchable={false}
                            classNamePrefix="contact-select"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location - Only for Offline */}
                    {isOffline && (
                      <div className="col-12">
                        <div className="form-input">
                          <label className="cf-label">
                            Location
                          </label>

                          <div className="tj-select">
                            <Select
                              options={LOCATIONS}
                              value={form.cfLocation}
                              onChange={handleLocationChange}
                              placeholder="Select location"
                              isSearchable={false}
                              classNamePrefix="contact-select"
                            />
                          </div>

                          {locationError && (
                            <small className="text-danger">
                              Please select a location.
                            </small>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Note */}
                    <div className="col-12">
                      <div className="form-input message-input">
                        <label className="cf-label" htmlFor="message">
                          Note
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          placeholder="Tell us how we can help..."
                          value={form.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button - Original Classes */}
                    <div className="col-12">
                      <div className="form-submit">
                        <button
                          type="submit"
                          className="tj-btn-primary flip-text-wrap"
                          disabled={status === "sending"}
                        >
                          <span className="btn-text">
                            {status === "sending"
                              ? "Sending..."
                              : "Send message"}
                          </span>

                          <span className="btn-icon">
                            <i className="tji-arrow-right-2"></i>
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Success Message */}
                    {status === "sent" && (
                      <div className="col-12">
                        <p className="cf-status success">
                          Thanks! Our advisors will contact you shortly.
                        </p>
                      </div>
                    )}

                    {/* Error Message */}
                    {status === "error" && (
                      <div className="col-12">
                        <p className="cf-status error">
                          Something went wrong. Please try again.
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Details - Original Content and Classes */}
            <div className="col-lg-5">
              <div className="tj-contact-area">
                <div className="sec-heading">
                  <span
                  className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                  data-direction="top"
                >
                  <i className="tji-subtitle-2"></i>
                  {" Get in Touch"}
                </span>{" "}

                  <h2 className="sec-title tj-fade-anim">
                    Get in Touch.
                  </h2>

                  <p className="desc tj-fade-anim" data-delay=".3">
                    Pick whichever channel suits you — we're quick on all of
                    them. Master modern digital and tech skills through.
                  </p>
                </div>

                <div className="contact-item-wrap">

                  {/* Email */}
                  <div
                    className="contact-item style-2 tj-fade-anim"
                    data-delay="0.3"
                  >
                    <div className="contact-icon">
                      <i className="tji-envelope"></i>
                    </div>

                    <div className="contact-content">
                      <h3 className="contact-title">
                        Email us
                      </h3>

                      <p>For anything, anytime</p>

                      <a
                        className="contact-link"
                        href="mailto:hello@email.com"
                      >
                        hello@email.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div
                    className="contact-item style-2 tj-fade-anim"
                    data-delay="0.5"
                  >
                    <div className="contact-icon">
                      <i className="tji-phone-call"></i>
                    </div>

                    <div className="contact-content">
                      <h3 className="contact-title">
                        Call us
                      </h3>

                      <p>Mon-Fri, 9am-6pm CT.</p>

                      <a
                        className="contact-link"
                        href="tel:14155550132"
                      >
                        +1 (415) 555-0132
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div
                    className="contact-item style-2 tj-fade-anim"
                    data-delay="0.1"
                  >
                    <div className="contact-icon">
                      <i className="tji-location"></i>
                    </div>

                    <div className="contact-content">
                      <h3 className="contact-title">
                        Visit us
                      </h3>

                      <p>
                        189 Congress, Suite 300 TX 78701, USA
                      </p>

                      <a
                        className="tj-text-btn flip-text-wrap"
                        target="_blank"
                        rel="noreferrer"
                        href="https://maps.app.goo.gl/atM8DyLTPi25AwLDA"
                      >
                        <span className="btn-text">
                          Get directions
                        </span>

                        <span className="btn-icon">
                          <i className="tji-arrow-right-2"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map - Original Layout */}
          <div className="row">
            <div className="col">
              <div className="map-area">
                <div className="map">
                  <iframe
    src="https://maps.google.com/maps?q=6RP3%2BMW%2C%20Kozhikode%2C%20Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed"
    width="100%"
    height="450"
    style={{ border: 0, borderRadius: "12px" }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Location - Kozhikode, Kerala"
  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactSection;
