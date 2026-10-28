import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import { getCourse } from "../../../data/courses";
import LearningOptions from "../../sections/course-details/LearningOptions";
import "./LearningOptions.css";
import Students from "../home3/Students";

import Instructors from "../home3/Instructors";
import AboutCounter from "../about/AboutCounter";
import Review from "../home2/Testimonials";
import Testimonials from "../home3/Testimonials";
import Blog from "../home2/Blog";
import Faq from "../home3/Faq";
import Clients from "../home3/Clients";
import CareerPaths from "../home3/CareerPaths";
import MoreCourses from "../home3/MoreCourse";
import ContactForm from "../home2/ContactForm";
import Centers from "../home3/Centers";
import LeadPopup from "../../common/LeadPopup";

// Every id here must exist on a section in the page below.
const TABS = [
  ["overview", "Overview"],
  ["benefits", "Benefits"],
  ["what-youll-learn", "What you'll learn"],
  ["tools-youll-learn", "Tools"],
  ["skills-youll-learn", "Skills"],
  ["career-pathways", "Career pathways"],
  ["eligibility", "Eligibility"],
  ["certificate", "Certificate"],
   ["career-tracks", "Career tracks"],
  ["learning-options", "Learning options"],
  ["stats", "Our impact"],
  ["clients", "Hiring partners"],
 
  ["students", "Students"],
 
  ["reviews", "Reviews"],
  ["testimonials", "Testimonials"],
   ["more-courses", "More courses"],
  
  ["faq", "FAQ"],
];

// Districts for the "Preferred Location" dropdown: [name, comingSoon]
const DISTRICTS = [
  ["Kasaragod", false],
  ["Kannur", false],
  ["Kozhikode", false],
  ["Malappuram", false],
  ["Palakkad", false],
  ["Thrissur", false],
  ["Ernakulam", false],

];

const HIDE_HEADER_AFTER = 10; // px scrolled before the main navbar hides
const SHOW_TABS_AFTER = 2;    // show the tab nav after this many sections have been passed

const EMPTY_LEAD = { name: "", phone: "", location: "", message: "" };

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

const NotFound = () => (
  <>
    <div className="space-for-header" />
    <section className="section-gap">
      <div className="container text-center">
        <h2 className="sec-title">Course not found</h2>
        <p className="mb-4">The course you are looking for does not exist.</p>
        <Link className="tj-btn-primary style-2 flip-text-wrap" to="/">
          <span className="btn-icon"><i className="tji-arrow-right-2" /></span>
          <span className="btn-text">Back to home</span>
        </Link>
      </div>
    </section>
  </>
);

const CourseDetailsContent = () => {
  const { slug } = useParams();
  const course = getCourse(slug);

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
      // hide the main navbar after scrolling 10px
      document.body.classList.toggle(
        "course-header-hidden",
        window.scrollY > HIDE_HEADER_AFTER
      );

      // show the tab nav once the 3rd section has been scrolled past
      const gateEl = document.getElementById(TABS[SHOW_TABS_AFTER - 1][0]);
      if (gateEl) setShowNav(gateEl.getBoundingClientRect().bottom <= 0);

      // scrollspy: last section whose top has passed the line under the bar
      const line = (navRef.current?.offsetHeight || 564) + 30;
      let current = TABS[0][0];
      for (const [id] of TABS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      // at the very bottom of the page, highlight the last tab
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = TABS[TABS.length - 1][0];

      setActive(current);
    };

    onScroll();
    // capture: true also catches scrolling inside wrapper elements (some themes scroll a div, not the window)
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      document.body.classList.remove("course-header-hidden");
    };
  }, [slug]);

  // hide the default header only on this page, only while the new nav is visible
  useEffect(() => {
    document.body.classList.toggle("course-nav-active", showNav);
    return () => document.body.classList.remove("course-nav-active");
  }, [showNav]);

  // Show/hide the arrows depending on whether the tab strip can scroll
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

  // Move the tab strip so the active tab is centred (horizontal only, page doesn't jump)
  useEffect(() => {
    const box = linksRef.current;
    const tab = box?.querySelector(".course-nav-link.active");
    if (!box || !tab) return;
    box.scrollTo({
      left: tab.offsetLeft - (box.clientWidth - tab.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active, showNav]);
  // ---- end hooks ----

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  if (!course) return <NotFound />;
  const c = course;

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
    if (!lead.location) return setLeadError("Please select your preferred location.");
    setLeadError("");
    setStatus("sending");
    try {
      // TODO: replace with your real endpoint
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, course: c.title, source: window.location.href }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setLead(EMPTY_LEAD);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="space-for-header" />

      {/* ===== Sticky page navbar (rendered into <body> so no theme wrapper can hide it) ===== */}
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

      {/* ===== Page header / hero ===== */}
      <section ref={heroRef} className="tj-page-header tj-page-header-2 course-tj-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="tj-page-header-content">
                <div className="tj-page-link course-tj">
                  <span><i className="tji-home" /></span>
                  <span><Link to="/">Home</Link></span>
                  <span><i className="tji-arrow-right-4" /></span>
                  <span><span>Courses</span></span>
                  <span><i className="tji-arrow-right-4" /></span>
                  <span><span>{c.title}</span></span>
                </div>
                <div className="tj-categories"><span className="tj-cat">{c.category}</span></div>
                <h1 className="tj-page-title">{c.title}</h1>
                <p className="tj-page-desc">{c.summary}</p>

                {/* Type / Study mode / Duration */}
                <div className="course-info-box">
                  {[
                    ["certified", "Type", c.type],
                    ["calendar", "Study Mode", c.mode],
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
                    to="#"
                  >
                    <span className="btn-icon"></span>
                    <span className="btn-text">Download Brochure</span>
                  </Link>
                  <button
                    type="button"
                    className="tj-btn-primary style-2 flip-text-wrap"
                    onClick={() => setIsEnrollOpen(true)}
                  >
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>{" "}
                    <span className="btn-text">Enroll Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ===== Sidebar lead form ===== */}
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
                            <label htmlFor="lead-name">Full Name</label>
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

                          <div className="d-flex gap-3 lead-row">
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

                            {/* Preferred Location (district dropdown) */}
                            <div className="lead-field">
                              <label htmlFor="lead-location">Preferred Location</label>
                              <select
                                id="lead-location"
                                name="location"
                                className="lead-select"
                                value={lead.location}
                                onChange={onLeadChange}
                                required
                              >
                                <option value="" disabled>
                                  Select district
                                </option>
                                {DISTRICTS.map(([name, soon]) => (
                                  <option key={name} value={name}>
                                    {soon ? `${name} (Coming soon)` : name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Message */}
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

      {/* ===== Details ===== */}
      <section className="tj-course-details tj-sticky-container-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="tj-course-details-wrapper">
                <div className="tj-course-overview">
                  <div className="tutor-course-details-content">

                    <div id="overview" className="tj-course-details-box">
                      <h3 className="title">Course description</h3>
                      <p>
                        This end-to-end programme takes you from programming basics to deploying
                        production applications. You will build several projects and learn the
                        DevOps workflow used by modern engineering teams.
                        This end-to-end programme takes you from programming basics to deploying
                        production applications. You will build several projects and learn the
                        DevOps workflow used by modern engineering teams.
                      </p>
                    </div>

                    <div id="benefits" className="tj-course-details-box">
                      <h3 className="title">Catalyst benefits - what you'll get</h3>
                      <ul className="tj-list tj-list-2">
                        {c.audience.map((a) => <Check key={a}>{a}</Check>)}
                      </ul>
                    </div>

                    <div id="what-youll-learn" className="tj-course-details-box">
                      <h3 className="title">What You Will Learn</h3>
                      <ul className="tj-list">
                        {c.goals.map((g) => <Check key={g}>{g}</Check>)}
                      </ul>
                    </div>

                    <div id="tools-youll-learn" className="tj-course-details-box">
                      <h3 className="title">Tools You Will Learn</h3>
                      <div className="tj-skill-lists">
                        {c.skills.map((s) => <span className="tj-skill-item" key={s}>{s}</span>)}
                      </div>
                    </div>

                    <div id="skills-youll-learn" className="tj-course-details-box">
                      <h3 className="title">Skills you'll Learn</h3>
                      {/* TODO: swap c.skills for your real skills data */}
                      <div className="tj-skill-lists">
                        {c.skills.map((s) => <span className="tj-skill-item" key={s}>{s}</span>)}
                      </div>
                    </div>

                    <div id="career-pathways" className="tj-course-details-box">
                      <h3 className="title">Career options</h3>
                      <p>
                        This end-to-end programme takes you from programming basics to deploying
                        production applications.
                      </p>
                    </div>

                    <div id="eligibility" className="tj-course-details-box">
                      <h3 className="title">Eligibility - Who can learn</h3>
                      <ul className="course-details-list">
                        {c.requirements.map((r) => <li key={r}>{r}</li>)}
                      </ul>
                    </div>

                    <div id="certificate" className="tj-course-details-box">
                      <h3 className="title">Course Certification</h3>

                      <p>
                        Earn a certificate from Catalyst SkillHub upon successful
                        completion of the course.
                      </p>

                      {c.certificate && (
                        <div className="course-certificate-image">
                          <img
                            src={c.certificate}
                            alt={`${c.title} course certificate`}
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>



                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Learning options (full-width section, part of the nav) ===== */}
      
       <div id="clients"><Clients /></div>
      <div id="learning-options">
        <LearningOptions />
      </div>

      <div>
        <div id="stats"><AboutCounter /></div>
          <div id="career-tracks"><CareerPaths /></div>
          <div id="students"><Students /></div>
       
     
        <div id="testimonials"><Testimonials /></div>
         <div id="reviews"><Review /></div>
         <div id="Centers"><Centers /></div>
          <div id="instructors"><Instructors /></div>
           <div id="blog"><Blog /></div>
        <div id="more-courses"><MoreCourses /></div>
       
        
        
       
        <div id="faq"><Faq /></div>
        <div id="contact"><ContactForm /></div>

      </div>
      <LeadPopup
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        title={`Enroll in ${c.title}`}
        description="Share your details and our admissions team will call you with batch dates, fees and the next steps to join."
        submitLabel="Enroll Now"
        meta={{
          source: "course-details-enroll",
          course: c.slug,
          courseTitle: c.title,
          category: c.category,
        }}
      />
    </>
  );
};

export default CourseDetailsContent;