import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { sendCareerApplication } from "../../../api/careers";
import "./careers.css";
const MAX_CV_MB = 5;

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const initial = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  position: "",
  experience: "",
  message: "",
};

// Careers Header
const CareersHeader = () => (
  <>
    <div className="space-for-header" />

    <section className="tj-page-header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tj-page-header-content">
              <h1 className="tj-page-title">Careers</h1>

              <div className="tj-page-link">
                <span>
                  <i className="tji-home"></i>
                </span>
                <span>
                  <Link to="/">Home</Link>
                </span>
                <span>
                  <i className="tji-arrow-right-4"></i>
                </span>
                <span>Careers</span>
              </div>

              <div className="shape">
                <img src="/assets/images/shapes/stars.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const CareerPage = () => {
  const [values, setValues] = useState(initial);
  const [cv, setCv] = useState(null);
  const [errors, setErrors] = useState({});
  const [drag, setDrag] = useState(false);

  const [status, setStatus] = useState({
    state: "idle",
    message: "",
  });

  const fileRef = useRef(null);

  // Handle input changes
  const onChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle CV upload
  const pickFile = (file) => {
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        cv: "Please upload a PDF, DOC or DOCX file.",
      }));
      setCv(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    if (file.size > MAX_CV_MB * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        cv: `File size must not exceed ${MAX_CV_MB} MB.`,
      }));
      setCv(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setCv(file);

    setErrors((prev) => ({
      ...prev,
      cv: "",
    }));
  };

  // Form validation
  const validate = () => {
    const newErrors = {};

    if (!values.fullName.trim()) {
      newErrors.fullName = "Enter your full name.";
    }

    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!/^[+\d][\d\s-]{8,14}$/.test(values.phone.trim())) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!values.position.trim()) {
      newErrors.position = "Please select your interested role.";
    }



    if (!cv) {
      newErrors.cv = "Please attach your CV.";
    }

    return newErrors;
  };

  // Submit application
  const onSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus({
      state: "loading",
      message: "",
    });

    try {
      const message = await sendCareerApplication(values, cv);

      setStatus({ state: "success", message });

      setValues(initial);
      setCv(null);
      setErrors({});

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    } catch (error) {
      setStatus({ state: "error", message: error.message });
    }
  };

  // Reusable form field
  const field = (name, label, props = {}) => (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <input
        id={name}
        name={name}
        value={values[name]}
        onChange={onChange}
        className={`form-control${errors[name] ? " is-invalid" : ""}`}
        aria-invalid={!!errors[name]}
        {...props}
      />

      {errors[name] && (
        <div className="invalid-feedback">
          {errors[name]}
        </div>
      )}
    </div>
  );

  return (
    <>
      <CareersHeader />

      <section className="tj-careers-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 col-xl-8">
              <div className="careers-form-wrap">

                <h2 className="careers-title text-center mb-3">Apply now</h2>

                <p className="careers-desc text-center">
                  Share your details and CV. We keep every profile on file
                  and reach out when a role fits your skills. Fields marked *
                  are required.
                </p>

                {status.state === "success" && (
                  <div className="alert alert-success" role="alert">
                    {status.message}
                  </div>
                )}

                {status.state === "error" && (
                  <div className="alert alert-danger" role="alert">
                    {status.message}
                  </div>
                )}

                <form noValidate onSubmit={onSubmit}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      {field("fullName", "Full name *", {
                        autoComplete: "name",
                        required: true,
                      })}
                    </div>

                    <div className="col-md-6">
                      {field("email", "Email *", {
                        type: "email",
                        autoComplete: "email",
                        required: true,
                      })}
                    </div>

                    <div className="col-md-6">
                      {field("phone", "Phone *", {
                        type: "tel",
                        autoComplete: "tel",
                        placeholder: "",
                        required: true,
                      })}
                    </div>

                    <div className="col-md-6">
                      {field("location", "Current city")}
                    </div>

                    <div className="col-md-6">
                      {field("position", "Role you're applying for *", {
                        placeholder: "",
                        required: true,
                      })}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="experience" className="form-label">
                          Experience
                        </label>

                        <select
                          id="experience"
                          name="experience"
                          value={values.experience}
                          onChange={onChange}
                          className="form-select form-control"
                        >
                          <option value="">Select</option>
                          <option value="Fresher">Fresher</option>
                          <option value="Less than 1 year">
                            Less than 1 year
                          </option>
                          <option value="1–3 years">1–3 years</option>
                          <option value="3–5 years">3–5 years</option>
                          <option value="5+ years">5+ years</option>
                        </select>
                      </div>
                    </div>



                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="message" className="form-label">
                          Anything else we should know?
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={values.message}
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* CV Upload */}
                    <div className="col-12">
                      <span className="form-label d-block">
                        Upload CV *
                      </span>

                      <div
                        role="button"
                        tabIndex={0}
                        aria-label="Upload your CV"
                        className={`careers-upload ${
                          drag ? "is-drag" : ""
                        } ${errors.cv ? "is-invalid" : ""}`}
                        onClick={() => fileRef.current?.click()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            fileRef.current?.click();
                          }
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDrag(true);
                        }}
                        onDragLeave={() => setDrag(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDrag(false);
                          pickFile(e.dataTransfer.files[0]);
                        }}
                      >
                        {cv ? (
                          <>
                            <strong>{cv.name}</strong>
                            <small>
                              {(cv.size / 1024).toFixed(0)} KB · Click to replace
                            </small>
                          </>
                        ) : (
                          <>
                            <strong>
                              Drop your CV here or click to browse
                            </strong>
                            <small>
                              PDF, DOC or DOCX, up to {MAX_CV_MB} MB
                            </small>
                          </>
                        )}
                      </div>

                      <input
                        ref={fileRef}
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => pickFile(e.target.files[0])}
                      />

                      {errors.cv && (
                        <div className="text-danger small mt-2">
                          {errors.cv}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <button
                        type="submit"
                        className="tj-btn-primary"
                        disabled={status.state === "loading"}
                      >
                        <span className="btn-text">
                          <span>
                            {status.state === "loading"
                              ? "Sending..."
                              : "Submit application"}
                          </span>
                        </span>
                      </button>
                    </div>

                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerPage;