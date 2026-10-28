import { useState } from "react";
import Select from "react-select";

const IMAGE = "/assets/images/hero/contactus.jpg";
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
].map((city) => ({ value: city.toLowerCase(), label: city }));

const initial = {
  cfName: "",
  cfEmail: "",
  cfSubject: SUBJECTS[0],
  cfMode: MODES[1], // Offline by default
  cfLocation: null,
  message: "",
};

const ContactSection = ({ image = IMAGE }) => {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [locationError, setLocationError] = useState(false);

  const isOffline = form.cfMode.value === "offline";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (selectedOption) => {
    setForm((prev) => ({ ...prev, cfSubject: selectedOption }));
  };

  const handleModeChange = (selectedOption) => {
    setForm((prev) => ({
      ...prev,
      cfMode: selectedOption,
      // reset location when switching back to online
      cfLocation: selectedOption.value === "online" ? null : prev.cfLocation,
    }));
    setLocationError(false);
  };

  const handleLocationChange = (selectedOption) => {
    setForm((prev) => ({ ...prev, cfLocation: selectedOption }));
    setLocationError(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // react-select has no native "required", so validate manually
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

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setStatus("sent");
      setForm(initial);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="tj-contact-section section-gap-bottom">
      <div className="container">
        <div className="row g-0 align-items-stretch contact-card">
          <div className="col-lg-10 mx-auto">
            <div className="contact-form h-100 p-4 p-md-5 row">
              <div className="col-lg-8">
                <div className="form-title-wrap mb-4">
                  <h2 className="form-title">
                    Get the Right Guidance to choose the right Programme.
                  </h2>
                  <p className="desc">
                    Not sure which course is right for you? Fill out the form
                    and career advisors will connect with you shortly.
                  </p>
                </div>

                <form onSubmit={onSubmit}>
                  <div className="row">
                    {/* NAME */}
                    <div className="col-sm-6">
                      <div className="form-input mb-4">
                        <label className="cf-label">Full name</label>
                        <input
                          type="text"
                          name="cfName"
                          className="form-control"
                          placeholder="Enter name"
                          required
                          value={form.cfName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* MOBILE */}
                    <div className="col-sm-6">
                      <div className="form-input mb-4">
                        <label className="cf-label">Phone number</label>
                        <input
                          type="text"
                          name="cfEmail"
                          className="form-control"
                          placeholder="Enter Phone number"
                          required
                          value={form.cfEmail}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* SUBJECT */}
                    <div className="col-4">
                      <div className="form-input mb-4">
                        <label className="cf-label">Choose programme</label>
                        <Select
                          options={SUBJECTS}
                          value={form.cfSubject}
                          onChange={handleSubjectChange}
                          placeholder="Select programme:"
                          isSearchable={false}
                          classNamePrefix="contact-select"
                        />
                      </div>
                    </div>

                    {/* MODE */}
                    <div className={isOffline ? "col-sm-4" : "col-4"}>
                      <div className="form-input mb-4">
                        <label className="cf-label">Mode</label>
                        <Select
                        type='text'
                          options={MODES}
                          value={form.cfMode}
                          onChange={handleModeChange}
                          placeholder="Select mode"
                          isSearchable={false}
                          classNamePrefix="contact-select"
                        />
                      </div>
                    </div>

                    {/* LOCATION (only when offline) */}
                    {isOffline && (
                      <div className="col-sm-4">
                        <div className="form-input mb-4">
                          <label className="cf-label">Location</label>
                          <Select
                            options={LOCATIONS}
                            value={form.cfLocation}
                            onChange={handleLocationChange}
                            placeholder="Select location"
                            isSearchable={false}
                            classNamePrefix="contact-select"
                          />
                          {locationError && (
                            <small className="text-danger">
                              Please select a location.
                            </small>
                          )}
                        </div>
                      </div>
                    )}

                    {/* MESSAGE */}
                    <div className="col-12">
                      <div className="form-input mb-4">
                        <label className="cf-label">Note</label>
                        <textarea
                          name="message"
                          className="form-control"
                          rows="1"
                          placeholder="Tell us how we can help..."
                          value={form.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* BUTTON */}
                    <div className="col-12">
                      <div className="form-submit">
                        <button
                          type="submit"
                          className="tj-btn-primary style-2 flip-text-wrap"
                          disabled={status === "sending"}
                        >
                          <span className="btn-icon">
                            <i className="tji-arrow-right-2"></i>
                          </span>
                          <span className="btn-text">
                            {status === "sending" ? "Sending..." : "Send message"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {status === "sent" && (
                      <div className="col-12">
                        <p className="cf-status success">
                          Thanks! Our advisors will contact you shortly.
                        </p>
                      </div>
                    )}

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

              <div className="col-lg-4">
                <img
                  src={image}
                  alt="Career guidance"
                  className="w-100 h-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;