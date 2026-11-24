// OFFLINE course detail page  (route: /courses/:slug)
// Content comes from GET /api/courses/offline/:slug (see src/api/courses.js)
// The online page has its own copy: Onlinecoursedetailscontent.jsx
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Laptop,
  MapPin,
  BriefcaseBusiness,
  UsersRound,
  Wrench,
  Sparkles,
  Compass,
  GraduationCap,
  ChartNoAxesCombined,
  UserRoundCheck,
  Calculator,
  Globe,
  Network,
  Layers,
  CircleCheck
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useCourse, courseListPath } from "../../../api/courses";
import { getLearningOptions, getWhyChoose } from "../../../data/courseDefaults";
import "./LearningOptions.css";
import Students from "../home3/Students";

import AboutCounter from "../about/Aboutcounter";
import Review from "../home2/Testimonials";
import Testimonials from "../home3/Testimonials";
import Blog from "../home2/Blog";
import Clients from "../home3/Clients";
import CareerPaths from "../home3/CareerPaths";
import MoreCourses from "../home3/MoreCourse";
import ContactForm from "../home2/ContactForm";
import Centers from "../home3/Centers";
import LeadPopup from "../../common/LeadPopup";
import { sendLead } from "../../../api/leads";

// Every id here must exist on a section in the page below.
const TABS = [
  ["overview", "Overview"],
  ["what-youll-learn", "What you'll learn"],
  ["tools-youll-learn", "Tools"],
  ["skills-youll-learn", "Skills"],
  ["career-pathways", "Career opportunities"],
  // ["eligibility", "Eligibility"],
  // ["certificate", "Certificate"],
  ["learning-options", "Learning options"],
  ["benefits", "Why Catalyst"],
  ["career-tracks", "Career tracks"],
  ["stats", "Our impact"],
  ["clients", "Hiring partners"],
  ["students", "Students"],
  ["reviews", "Reviews"],
  ["testimonials", "Testimonials"],
  ["more-courses", "More courses"],
  ["faq", "FAQ"],
];

const HIDE_HEADER_AFTER = 100; // px scrolled before the main navbar hides
const SHOW_TABS_AFTER = 2;    // show the tab nav after this many sections have been passed

// Districts for the "Campus Location" dropdown: [name, comingSoon]
const DISTRICTS = [
  ["Kasaragod", false],
  ["Kannur", false],
  ["Kozhikode", false],
  ["Malappuram", false],
  ["Palakkad", false],
  ["Thrissur", false],
  ["Ernakulam", false],
];

const EMPTY_LEAD = { name: "", phone: "", location: "", message: "" };

const OPTION_ICONS = { online: Laptop, offline: MapPin };

// Icons for the "Why choose Catalyst" cards (data files refer to them by name)
const WHY_ICONS = {
  BriefcaseBusiness, UsersRound, Wrench, Sparkles, Compass, GraduationCap,
  ChartNoAxesCombined, UserRoundCheck, Calculator, Globe, Network, Layers,
};

const Check = ({ children }) => (
  <li>
    <span className="icon"><i className="tji-check" /></span>
    <span className="text">{children}</span>
  </li>
);

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Small card used for "What you'll learn", "Why choose Catalyst" and the online/offline blocks
const InfoCard = ({ title, children }) => (
  <div
    style={{
      height: "100%",
      padding: "18px 20px",
      border: "1px solid rgba(0,0,0,.1)",
      borderRadius: 12,
    }}
  >
    <h4 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h4>
    <p style={{ margin: 0 }}>{children}</p>
  </div>
);

const mode = "offline"; // this file = the offline page

const PageLoading = () => (
  <>
    <div className="space-for-header" />
    <section className="section-gap">
      <div className="container text-center">
        <p>Loading course...</p>
      </div>
    </section>
  </>
);

const NotFound = ({ mode }) => (
  <>
    <div className="space-for-header" />
    <section className="section-gap">
      <div className="container text-center">
        <h2 className="sec-title">Course not found</h2>
        <p className="mb-4">The course you are looking for does not exist.</p>
        <Link className="tj-btn-primary style-2 flip-text-wrap" to={courseListPath(mode)}>
          <span className="btn-icon"><i className="tji-arrow-right-2" /></span>
          <span className="btn-text">View all courses</span>
        </Link>
      </div>
    </section>
  </>
);

const CourseDetailsContent = () => {
  const isOffline = mode === "offline";
  const { slug } = useParams();
  const { data: d, loading } = useCourse(mode, slug); // GET /api/courses/offline/:slug

  // ---- ALL hooks live above the early return ----
  const [lead, setLead] = useState(EMPTY_LEAD);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [leadError, setLeadError] = useState("");

  const [showNav, setShowNav] = useState(false);
  const [active, setActive] = useState(TABS[0][0]);
  const heroRef = useRef(null);
  const navRef = useRef(null);

  // tab strip scrolling + arrows
  const linksRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // Page scroll: show the sticky nav + scrollspy
  useEffect(() => {
    const onScroll = () => {
      document.body.classList.toggle(
        "course-header-hidden",
        window.scrollY > HIDE_HEADER_AFTER
      );

      const gateEl = document.getElementById(TABS[SHOW_TABS_AFTER - 1][0]);
      if (gateEl) setShowNav(gateEl.getBoundingClientRect().bottom <= 0);

      const line = (navRef.current?.offsetHeight || 564) + 30;
      let current = TABS[0][0];
      for (const [id] of TABS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = TABS[TABS.length - 1][0];

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      document.body.classList.remove("course-header-hidden");
    };
  }, [slug]);

  useEffect(() => {
    document.body.classList.toggle("course-nav-active", showNav);
    return () => document.body.classList.remove("course-nav-active");
  }, [showNav]);

  useEffect(() => {
    const el = linksRef.current;
    if (!el) return;

    const update = () => {
      setCanLeft(el.scrollLeft > 2);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [showNav, slug]);

  useEffect(() => {
    const box = linksRef.current;
    const tab = box?.querySelector(".course-nav-link.active");
    if (!box || !tab) return;
    box.scrollTo({
      left: tab.offsetLeft - (box.clientWidth - tab.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active, showNav]);

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollMode, setEnrollMode] = useState(""); // "" | "online" | "offline"
  // ---- end hooks ----

  if (loading && !d) return <PageLoading />;
  if (!d) return <NotFound mode={mode} />;

  // small object so the rest of the page can keep using c.title, c.category ...
  const c = {
    title: d.label,
    slug: d.slug,
    category: d.category,
    duration: d.duration,
    brochure: d.brochure,
  };

  const lo = getLearningOptions(d, c.title); // learning options content
  const why = getWhyChoose(d); // "Why choose Catalyst" content

  // ---- FAQ (inline, no separate component) ----
  const faqList = d.faqList; // [{ q, a }] built from the API's faqs
  const faqGroupId = `course-${mode}-${slug}`;
  const faqParentId = `tjAccordion-${faqGroupId}`;
  const faqHeading = "FAQs";
  const faqDescription = `Common questions about the ${c.title} ${isOffline ? "offline" : "online"} course. Can’t find what you’re looking for?`;

  const whyWords = why.heading.split(" ");
  const whyAccent = whyWords.length > 3 ? whyWords.slice(-2).join(" ") : "";
  const whyLead = whyAccent ? whyWords.slice(0, -2).join(" ") : why.heading;
  const openEnroll = (mode = "") => () => {
    setEnrollMode(mode);
    setIsEnrollOpen(true);
  };

  const scrollTabs = (dir) => () => {
    const box = linksRef.current;
    if (box) box.scrollBy({ left: dir * box.clientWidth * 0.6, behavior: "smooth" });
  };

  const onLeadChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const onLeadSubmit = async (e) => {
    e.preventDefault();
    const digits = lead.phone.replace(/\D/g, "");
    if (lead.name.trim().length < 2) return setLeadError("Please enter your name.");
    if (digits.length < 10) return setLeadError("Please enter a valid phone number.");
    if (!lead.location) return setLeadError("Please select your campus location.");

    setLeadError("");
    setStatus("sending");
    try {
      await sendLead("offline-course", {
        name: lead.name,
        phone: lead.phone,
        location: lead.location,
        message: lead.message,
        course: c.title,
        source: window.location.href,
      });
      setStatus("success");
      setLead(EMPTY_LEAD);
    } catch (err) {
      setLeadError(err.message);   // shows the API error message
      setStatus("idle");
    }
  };

  // ---- values for the hero (Section 1) ----
  const heading = d.heading;
  const summary = d.summary;
  const type = d.type;
  const studyMode = isOffline ? "Offline" : "Online"; // follows the page, not the data

  return (
    <>
      <div className="space-for-header" />

      {/* ===== Sticky page navbar ===== */}
      {createPortal(
        <div
          ref={navRef}
          className={`course-nav${showNav ? " is-visible" : ""}`}
          aria-hidden={!showNav}
        >
          <div className="container course-nav-row">
            <div className="course-nav-title" title={c.title}>{c.title}</div>

            <div className="course-nav-links-wrap">
              <button
                type="button"
                className={`course-nav-arrow left${canLeft ? " show" : ""}`}
                onClick={scrollTabs(-1)}
                aria-label="Scroll tabs left"
                tabIndex={canLeft && showNav ? 0 : -1}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <nav ref={linksRef} className="course-nav-links" aria-label="Course sections">
                {TABS.map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={scrollTo(id)}
                    tabIndex={showNav ? 0 : -1}
                    className={`course-nav-link${active === id ? " active" : ""}`}
                    aria-current={active === id ? "true" : undefined}
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                className={`course-nav-arrow right${canRight ? " show" : ""}`}
                onClick={scrollTabs(1)}
                aria-label="Scroll tabs right"
                tabIndex={canRight && showNav ? 0 : -1}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <Link
              className="tj-btn-primary style-2 style-2-sm flip-text-wrap"
              to="/contact"
              tabIndex={showNav ? 0 : -1}
            >
              <span className="btn-icon">
                <i className="tji-arrow-right-2"></i>
              </span>{" "}
              <span className="btn-text">Enquire now</span>
            </Link>
          </div>
        </div>,
        document.body
      )}

      {/* ===== SECTION 1: Landing / hero ===== */}
      <section ref={heroRef} className="tj-page-header tj-page-header-2 course-tj-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="tj-page-header-content">
                <div className="tj-page-link course-tj">
                  <span><i className="tji-home" /></span>
                  <span><Link to="/">Home</Link></span>
                  <span><i className="tji-arrow-right-4" /></span>
                  <span><Link to={courseListPath(mode)}>{isOffline ? "Offline Courses" : "Courses"}</Link></span>
                  <span><i className="tji-arrow-right-4" /></span>
                  <span><span>{c.title}</span></span>
                </div>
                <div className="tj-categories"><span className="tj-cat">{c.category}</span></div>
                <h1 className="tj-page-title">{heading}</h1>
                <p className="tj-page-desc">{summary}</p>

                {/* Type / Study mode / Duration */}
                <div className="course-info-box">
                  {[
                    ["certified", "Type", type],
                    ["calendar", "Study Mode", studyMode],
                    ["clock", "Duration", c.duration],
                  ].map(([icon, label, value]) => (
                    <div className="course-info-item" key={label}>
                      <div className="course-info-heading">
                        <span className="course-info-icon">
                          <i className={`tji-${icon}`} aria-hidden="true" />
                        </span>
                        <span className="course-info-label">{label}</span>
                      </div>
                      <strong className="course-info-value">{value}</strong>
                    </div>
                  ))}
                </div>

                <div className="about-3-btns tj-fade-anim" data-delay=".5">
                  <Link
                    className="tj-btn-primary style-3 style-3-border flip-text-wrap"
                    to={c.brochure || "#"}
                  >
                    <span className="btn-icon"></span>
                    <span className="btn-text">Download Brochure</span>
                  </Link>
                  <button
                    type="button"
                    className="tj-btn-primary style-2 flip-text-wrap"
                    onClick={openEnroll(mode)}
                  >
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>{" "}
                    <span className="btn-text">Enrol Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ===== Lead form (Name / Phone Number / Campus Location / Message) ===== */}
            <div className="col-lg-5">
              <div className="course-sidebar-sticky">
                <div className="tj-course-sidebar lead-sidebar">
                  <div className="lead-form-box">
                    <div className="lead-form-header">
                      <h3 className="lead-form-title">Request a Call Back</h3>
                      <p>Leave your number and a convenient time. A counsellor will help you...</p>
                    </div>

                    <div className="lead-form-content">
                      {status === "success" ? (
                        <p className="lead-form-success" role="status">
                          Thank you! Our team will call you back shortly.
                        </p>
                      ) : (
                        <form onSubmit={onLeadSubmit} noValidate>
                          <div className="lead-field">
                            <label htmlFor="lead-name">Name</label>
                            <input
                              id="lead-name"
                              name="name"
                              type="text"
                              placeholder="Enter your full name"
                              autoComplete="name"
                              value={lead.name}
                              onChange={onLeadChange}
                              required
                            />
                          </div>

                          <div className="d-md-flex gap-3 lead-row">
                            <div className="lead-field">
                              <label htmlFor="lead-phone">Phone Number</label>
                              <div className="lead-phone-input">
                                <span className="lead-country-code">
                                  <span aria-hidden="true">🇮🇳</span> +91
                                </span>
                                <input
                                  id="lead-phone"
                                  name="phone"
                                  type="tel"
                                  inputMode="numeric"
                                  placeholder="Enter 10-digit number"
                                  autoComplete="tel-national"
                                  value={lead.phone}
                                  onChange={onLeadChange}
                                  maxLength={10}
                                  required
                                />
                              </div>
                            </div>

                            <div className="lead-field">
                              <label htmlFor="lead-location">Campus Location</label>
                              <select
                                id="lead-location"
                                name="location"
                                className="lead-select"
                                value={lead.location}
                                onChange={onLeadChange}
                                required
                              >
                                <option value="" disabled>
                                  Select campus
                                </option>
                                {DISTRICTS.map(([name, soon]) => (
                                  <option key={name} value={name}>
                                    {soon ? `${name} (Coming soon)` : name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="lead-field">
                            <label htmlFor="lead-message">Message</label>
                            <input
                              id="lead-message"
                              name="message"
                              placeholder="Your message"
                              value={lead.message}
                              onChange={onLeadChange}
                            />
                          </div>

                          {leadError && (
                            <p className="lead-form-error" role="alert">
                              {leadError}
                            </p>
                          )}

                          {status === "error" && (
                            <p className="lead-form-error" role="alert">
                              Something went wrong. Please try again or call 9745 200 500.
                            </p>
                          )}

                          <button
                            type="submit"
                            className="tj-btn-primary tj-btn-primary-md tj-btn-full flip-text-wrap"
                            disabled={status === "sending"}
                          >
                            <span className="btn-text">
                              {status === "sending" ? "Sending..." : "Request a Call Back"}
                            </span>
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Details (Sections 2, 3, 4) ===== */}
      <section className="tj-course-details tj-sticky-container-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="tj-course-details-wrapper">
                <div className="tj-course-overview">
                  <div className="tutor-course-details-content">

                    {/* SECTION 2: Course introduction */}
                    <div id="overview" className="tj-course-details-box">
                      <h3 className="title">{d.overviewTitle ?? "Course description"}</h3>
                      <p>{d.overview}</p>

                      <h4 className="title" style={{ marginTop: 24 }}>What You’ll Gain</h4>
                      <ul className="tj-list tj-list-2">
                        {d.gain.map((g) => <Check key={g}>{g}</Check>)}
                      </ul>
                    </div>

                    {/* SECTION 3: What you'll learn */}
                    <div id="what-youll-learn" className="tj-course-details-box">
                      <h3 className="title">What You’ll Learn</h3>
                      <div className="row g-3">
                        {d.learn.map((item) => (
                          <div className="col-md-6" key={item.title}>
                            <InfoCard title={item.title}>{item.text}</InfoCard>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div id="tools-youll-learn" className="tj-course-details-box">
                      <h3 className="title">Tools You’ll Learn</h3>
                      <div className="tj-skill-lists">
                        {d.tools.map((t) => (
                          <span className="tj-skill-item" key={t}>{t}</span>
                        ))}
                      </div>
                    </div>

                    <div id="skills-youll-learn" className="tj-course-details-box">
                      <h3 className="title">Skills You’ll Learn</h3>
                      <div className="tj-skill-lists">
                        {d.skills.map((s) => (
                          <span className="tj-skill-item" key={s}>{s}</span>
                        ))}
                      </div>
                    </div>

                    <div id="career-pathways" className="tj-course-details-box">
                      <h3 className="title">Career Opportunities</h3>
                      <div className="tj-skill-lists">
                        {d.careers.map((r) => (
                          <span className="tj-skill-item" key={r}>{r}</span>
                        ))}
                      </div>
                    </div>

                    {/* <div id="eligibility" className="tj-course-details-box">
                      <h3 className="title">{d.eligibilityTitle ?? "Eligibility - Who can learn"}</h3>
                      <ul className="course-details-list">
                        {d.eligibility.map((e) => (
                          <li key={e.label}>
                            <strong>{e.label}:</strong> {e.text}
                          </li>
                        ))}
                      </ul>
                    </div> */}

                    {/* SECTION 4: Certification */}
                    {/* <div id="certificate" className="tj-course-details-box">
                      <h3 className="title">{d.certificateTitle ?? "Course Certification"}</h3>

                      <p>
                        {d.certificateText ??
                          "Earn a certificate from Catalyst SkillHub upon successful completion of the course."}
                      </p>

                      {d.certificate && (
                        <div className="course-certificate-image">
                          <img
                            src={d.certificate}
                            alt={`${d.heading} course certificate`}
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Learning options (content from the API) ===== */}
      <div id="learning-options">
        <section className="tj-categories-section-3 pt-5 pb-5 fix">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="sec-heading sec-heading-center">
                  <span className="sec-subtitle sec-subtitle-3 tj-fade-anim" data-direction="top">
                    <i className="tji-subtitle-2"></i>
                    Learning Path
                  </span>{" "}
                  <h2 className="sec-title tj-fade-anim" data-delay=".3">
                    Learn Your Way. <br />
                    Build Your Future.
                  </h2>
                </div>

                <div className="learning-options-grid">
                  {/* Online Option */}
                  <article className="learning-option-card online">
                    <div className="learning-option-content">
                      <span className="learning-option-label">
                        <span className="learning-option-label-icon" aria-hidden="true">
                          <Laptop size={16} strokeWidth={2.2} />
                        </span>
                        Learn Online
                      </span>

                      <h3>{lo.online.title}</h3>

                      <p className="learning-option-description">
                        {lo.online.description}
                      </p>

                      <div className="learning-option-detail">
                        <span className="learning-option-detail-dot" />
                        Join Online
                      </div>

                      <button
                        type="button"
                        className="tj-btn-primary style-2 flip-text-wrap btn1"
                        onClick={openEnroll("online")}
                      >
                        <span className="btn-icon">
                          <i className="tji-arrow-right-2"></i>
                        </span>
                        <span className="btn-text">
                          Enrol Online</span>
                      </button>
                    </div>

                    <div className="learning-option-image" aria-hidden="true">
                      <img src='/assets/images/course/mode1.jpg' alt="" loading="lazy" />
                    </div>

                    <div className="learning-option-decoration" aria-hidden="true" />
                  </article>

                  {/* Offline Option */}
                  <article className="learning-option-card offline">
                    <div className="learning-option-content">
                      <span className="learning-option-label">
                        <span className="learning-option-label-icon" aria-hidden="true">
                          <MapPin size={16} strokeWidth={2.2} />
                        </span>
                        {lo.offline.label}
                      </span>

                      <h3>{lo.offline.title}</h3>

                      <p className="learning-option-description">
                        {lo.offline.description}
                      </p>

                      <div className="learning-option-detail">
                        <span className="learning-option-detail-dot" />
                        Learn From Campus
                      </div>

                      <button
                        type="button"
                        className="tj-btn-primary style-2 flip-text-wrap btn1"
                        onClick={openEnroll("offline")}
                      >
                        <span className="btn-icon">
                          <i className="tji-arrow-right-2"></i>
                        </span>
                        <span className="btn-text">Learn Offline</span>
                      </button>
                    </div>

                    <div className="learning-option-image" aria-hidden="true">
                      <img src='/assets/images/course/mode2.jpg' alt="" loading="lazy" />
                    </div>

                    <div className="learning-option-decoration" aria-hidden="true" />
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===== Other (shared) sections — unchanged ===== */}
      <div>
        <div id="career-tracks"><CareerPaths /></div>
        <div id="stats"><AboutCounter /></div>
        <div id="clients"><Clients /></div>
        <div id="students"><Students /></div>
        <div id="reviews"><Review /></div>
        <div id="testimonials"><Testimonials /></div>
        <div id="Centers"><Centers /></div>

        {/* ===== SECTION 7: Why choose Catalyst (content from the API) ===== */}
        <section id="benefits" className="about-section-4 section-gap-bottom fix">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="sec-heading sec-heading-center about-4-heading">
                  <span className="sec-subtitle sec-subtitle-4 tj-fade-anim">
                    <i className="tji-subtitle-2"></i>
                    {why.label}
                  </span>

                  <h2 className="sec-title sec-title-2 tj-fade-anim">
                    {whyLead}{" "}
                    {whyAccent && <span className="accent underline">{whyAccent}</span>}
                  </h2>

                  <div className="circle-shape-wrap">
                    <img className="circle-shape" src="/assets/images/shapes/circle.svg" alt="Shape" />
                  </div>
                </div>
              </div>
            </div>

            <div className="why-choose-grid">
              {why.items.map((item) => {
                // const Icon = WHY_ICONS[item.icon] || Compass;
                return (
                  <div className="why-choose-card" key={item.title}>
                    <div className="why-choose-icon">
                      <CircleCheck size={31} strokeWidth={1.8} />
                    </div>
                    <div className="why-choose-content">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="choose-catalyst-button">
              <Link className="tj-btn-primary style-2 flip-text-wrap" to="/about">
                <span className="btn-icon">
                  <i className="tji-arrow-right-2"></i>
                </span>{" "}
                <span className="btn-text">Know more about us</span>
              </Link>
            </div>
          </div>
        </section>

        <div id="blog"><Blog /></div>
        <div id="more-courses"><MoreCourses mode={mode} /></div>
        <div id="faq" style={faqList.length ? undefined : { display: "none" }}>
          <section className="tj-faq-section-3 section-gap fix mb-5">
            <div className="container">
              <div className="row rg-50">
                {/* ---- Left: heading + support box ---- */}
                <div className="col-12 col-xl-4 col-lg-5">
                  <div className="tj-faq-3-info">
                    <div className="sec-heading">
                      <span
                        className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                        data-direction="top"
                      >
                        <i className="tji-subtitle-2"></i>
                        {" FAQ"}
                      </span>

                      <h2 className="sec-title sec-title-faq tj-fade-anim" data-delay=".3">
                        {faqHeading}
                      </h2>

                      <p className="desc tj-fade-anim">{faqDescription}</p>
                    </div>

                    <div
                      className="support-box support-box-2 tj-fade-anim"
                      data-delay=".3"
                      data-duration=".6"
                    >
                      <ul className="tj-users-list">
                        <li><img src="/assets/images/users/Abinand.webp" alt="USER" /></li>
                        <li><img src="/assets/images/users/Amina.webp" alt="USER" /></li>
                        <li><img src="/assets/images/users/Siyas.webp" alt="USER" /></li>
                        <li><img src="/assets/images/users/Sabith.webp" alt="USER" /></li>
                      </ul>

                      <h3 className="support-title tj-fs-h4">Still have questions?</h3>

                      <p className="support-desc">
                        Our support team is here to help you every step of the way.
                      </p>

                      <a
                        className="tj-btn-primary style-2 style-2-sm flip-text-wrap"
                        href="#contact"
                      >
                        <span className="btn-icon">
                          <i className="tji-arrow-right-2"></i>
                        </span>
                        <span className="btn-text">Contact support</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* ---- Right: accordion ---- */}
                <div className="col-12 col-xl-8 col-lg-7">
                  <div className="tj-faq-wrapper-2">
                    <div className="tj-faq tj-faq-2" id={faqParentId} key={faqGroupId}>
                      {faqList.map((item, i) => {
                        const itemId = `${faqGroupId}-accordion-${i + 1}`;
                        return (
                          <div
                            key={itemId}
                            className="tj-accordion-item"
                            data-delay={(0.2 + i * 0.1).toFixed(1)}
                            data-duration="0.6"
                          >
                            <button
                              className="tj-accordion-title collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#${itemId}`}
                              aria-expanded="false"
                            >
                              {item.q}
                            </button>

                            <div
                              id={itemId}
                              className="collapse"
                              data-bs-parent={`#${faqParentId}`}
                            >
                              <div className="accordion-body tj-accordion-content">
                                {item.a}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id="contact"><ContactForm /></div>
      </div>

      <LeadPopup
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        title={`Enroll in ${c.title}`}
        description="Share your details and our admissions team will call you with batch dates, fees and the next steps to join."
        submitLabel="Enroll Now"
        meta={{
          source: isOffline ? "offline-course-details-enroll" : "course-details-enroll",
          course: c.slug,
          courseTitle: c.title,
          category: c.category,
          studyMode: enrollMode || mode,
        }}
      />
    </>
  );
};

export default CourseDetailsContent;