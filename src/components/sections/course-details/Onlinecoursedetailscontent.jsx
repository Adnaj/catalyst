// OFFLINE course detail page  (route: /offline-courses/:slug)
// Content comes from data/courseDetailContent.js  ->  courseDetailContent.offline
// Starts as a copy of CourseDetailsContent.jsx - edit this file freely to redesign the offline page.
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
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getCourse, courseListPath } from "../../../data/courses";
import { getCourseDetail, getLearningOptions, getWhyChoose } from "../../../data/courseDetailContent";
import "./LearningOptions.css";
import Students from "../home3/Students";

import AboutCounter from "../about/Aboutcounter";
import Review from "../home2/Testimonials";
import Testimonials from "../home3/Testimonials";
import Blog from "../home2/Blog";
import CourseFaq from "../faq/Coursefaq";
import Clients from "../home3/Clients";
import CareerPaths from "../home3/CareerPaths";
import MoreCourses from "../home3/MoreCourse";
import ContactForm from "../home2/ContactForm";
import Centers from "../home3/Centers";
import LeadPopup from "../../common/LeadPopup";



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



// Icons for the "Why choose Catalyst" cards (data files refer to them by name)
const WHY_ICONS = {
  BriefcaseBusiness, UsersRound, Wrench, Sparkles, Compass, GraduationCap,
  ChartNoAxesCombined, UserRoundCheck, Calculator, Globe, Network, Layers,
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

const mode = "online"; // this file = the offline page

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

const OnlineCourseDetailsContent = () => {
  const isOffline = mode === "offline";
  const { slug } = useParams();
  const course = getCourse(slug);

  // ---- ALL hooks live above the early return ----
  const [lead, setLead] = useState(EMPTY_LEAD);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [leadError, setLeadError] = useState("");




  const [activeOverviewTab, setActiveOverviewTab] = useState("overview");
const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollMode, setEnrollMode] = useState(""); // "" | "online" | "offline"
  // ---- end hooks ----

  if (!course) return <NotFound mode={mode} />;
  const c = course;
  const d = getCourseDetail(slug, mode); // content from data/courseDetailContent.js (undefined -> generic fields of `course`)
  const lo = getLearningOptions(slug, c.title, mode); // learning options content
  const why = getWhyChoose(slug, mode); // "Why choose Catalyst" content
  // highlight the last two words of the heading (e.g. "Choose the [Right Guidance]")
  const whyWords = why.heading.split(" ");
  const whyAccent = whyWords.length > 3 ? whyWords.slice(-2).join(" ") : "";
  const whyLead = whyAccent ? whyWords.slice(0, -2).join(" ") : why.heading;
  const openEnroll = (mode = "") => () => {
    setEnrollMode(mode);
    setIsEnrollOpen(true);
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
      // TODO: replace with your real endpoint (backend not connected yet)
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, course: c.title, studyMode: mode, source: window.location.href }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setLead(EMPTY_LEAD);
    } catch {
      setStatus("error");
    }
  };

  // ---- values for the hero (Section 1) ----
  const heading = d?.heading ?? c.title;
  const summary = d?.summary ?? c.summary;
  const brochure = d?.brochure
  const type = d?.type ?? c.type;
  const studyMode = isOffline ? "Offline" : "Online"; // follows the page, not the data

  return (
    <>
      <div className="space-for-header" />

      {/* ===== Sticky page navbar ===== */}
      {/* {createPortal(
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
      )} */}

      {/* ===== SECTION 1: Landing / hero ===== */}
      <section className="tj-page-header tj-page-header-2 offline-detail-sec course-tj-main"


      >
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
                {/* <div className="course-info-box">
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
                </div> */}

                <div className="about-3-btns tj-fade-anim" data-delay=".5">
                  <button
                    type="button"
                    className="tj-btn-primary style-3 style-3-border flip-text-wrap"
                    onClick={() => setIsBrochureOpen(true)}
                  >
                    <span className="btn-icon"></span>
                    <span className="btn-text">Download Brochure</span>
                  </button>
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

            {/* ===== Lead form (Name / Phone Number / Campus Location) ===== */}
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


      {/* ===== COURSE HIGHLIGHTS ===== */}
      <div className="course-highlights-section">
        <div className="container">
          <div className="course-highlights-grid">
            {[
              {
                icon: <GraduationCap size={25} />,
                label: "Course Type",
                value: type,
                description: "Industry-focused certification",
                color: "purple",
              },
              {
                icon: <Laptop size={25} />,
                label: "Study Mode",
                value: studyMode,
                description: "Learn with expert guidance",
                color: "blue",
              },
              {
                icon: <Wrench size={25} />,
                label: "Course Duration",
                value: c.duration,
                description: "Structured learning program",
                color: "cyan",
              },
            ].map((item) => (
              <div className="course-highlight-card" key={item.label}>
                <div className={`course-highlight-icon ${item.color}`}>
                  {item.icon}
                </div>

                <div className="course-highlight-content">
                  <span className="course-highlight-label">
                    {item.label}
                  </span>

                  <h3>{item.value}</h3>

                  <p>{item.description}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Details (Sections 2, 3, 4) ===== */}
      <section className="tj-course-details tj-sticky-container-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="tj-course-details-wrapper">
                <div className="tj-course-overview">
                  <div className="tutor-course-details-content">


                    {/* COURSE OVERVIEW + WHAT YOU'LL GAIN TABS */}
                    <div id="overview" className="tj-course-details-box course-tabs-section">

                      {/* Tab Navigation */}
                      <div className="course-overview-tabs">

                        <button
                          type="button"
                          className={`course-overview-tab ${activeOverviewTab === "overview" ? "active" : ""
                            }`}
                          onClick={() => setActiveOverviewTab("overview")}
                        >
                          <span className="tab-number">1</span>
                          <span>Course Overview</span>
                        </button>

                        <button
                          type="button"
                          className={`course-overview-tab ${activeOverviewTab === "gain" ? "active" : ""
                            }`}
                          onClick={() => setActiveOverviewTab("gain")}
                        >
                          <span className="tab-number">2</span>
                          <span>What You’ll Gain</span>
                        </button>

                      </div>

                      {/* Tab Content */}
                      <div className="course-overview-tab-content offline-course-tab">

                        {activeOverviewTab === "overview" && (
                          <div className="course-tab-panel overview-panel">

                            <div className="course-tab-panel-inner">

                              <span className="course-tab-eyebrow">
                                <i className="tji-subtitle-2"></i>
                                OVERVIEW
                              </span>

                              <h3>
                                {d?.overviewTitle ?? "About This Course"}
                              </h3>

                              <div className="course-tab-description">
                                {d ? (
                                  <p>{d.overview}</p>
                                ) : (
                                  c.description.map((p) => <p key={p}>{p}</p>)
                                )}
                              </div>

                            </div>

                          </div>
                        )}

                        {activeOverviewTab === "gain" && (
                          <div className="course-tab-panel gain-panel">

                            <div className="course-tab-panel-inner">

                              <span className="course-tab-eyebrow">
                                <i className="tji-subtitle-2"></i>
                                BENEFITS
                              </span>

                              <h3>What You’ll Gain</h3>

                              <p className="course-gain-intro">
                                Explore the knowledge, skills and opportunities
                                you can gain through this course.
                              </p>

                              <div className="course-gain-grid">
                                {(d?.gain ?? c.audience).map((item, index) => (
                                  <div className="course-gain-card" key={item}>



                                    <div className="course-gain-card-content">
                                      <span className="course-gain-check">
                                        <i className="tji-check"></i>
                                      </span>

                                      <h4>{item}</h4>
                                    </div>

                                  </div>
                                ))}
                              </div>

                            </div>

                          </div>
                        )}

                      </div>
                    </div>




                    {/* <div id="eligibility" className="tj-course-details-box">
                      <h3 className="title">{d?.eligibilityTitle ?? "Eligibility - Who can learn"}</h3>
                      <ul className="course-details-list">
                        {d
                          ? d.eligibility.map((e) => (
                            <li key={e.label}>
                              <strong>{e.label}:</strong> {e.text}
                            </li>
                          ))
                          : c.requirements.map((r) => <li key={r}>{r}</li>)}
                      </ul>
                    </div> */}

                    {/* SECTION 4: Certification */}
                    {/* <div id="certificate" className="tj-course-details-box">
                      <h3 className="title">{d?.certificateTitle ?? "Course Certification"}</h3>

                      <p>
                        {d?.certificateText ??
                          "Earn a certificate from Catalyst SkillHub upon successful completion of the course."}
                      </p>

                      {d?.certificate && (
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


      {/* SECTION 3: WHAT YOU'LL LEARN */}

      <div
        id="what-youll-learn"
        className="tj-course-details-box course-learn-dark"
      >

        <div className="course-learn-dark-inner">

          {/* Heading */}
          <div className="course-learn-dark-header">
            <div>


              <h3>
                What You’ll <span>Learn</span>
              </h3>

              <p>
                Explore the knowledge and practical skills you'll develop
                throughout this course.
              </p>
            </div>


          </div>



          {/* Learning Cards */}
          <div className="course-learn-dark-grid">

            {d?.learn ? (
              d.learn.map((item, index) => (
                <article className="course-learn-dark-card" key={item.title}>



                  <h4>{item.title}</h4>

                  <p>{item.text}</p>

                </article>
              ))
            ) : (
              c.goals.map((item, index) => (
                <article className="course-learn-dark-card" key={item}>

                  <div className="course-learn-dark-card-top">
                    <span className="course-learn-dark-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="course-learn-dark-arrow">
                      <i className="tji-arrow-right-2"></i>
                    </span>
                  </div>

                  <h4>{item}</h4>

                </article>
              ))
            )}

          </div>


        </div>
      </div>

      <div>
        <div className="container">

          {/* COURSE LEARNING, TOOLS & SKILLS */}

          <div className="course-feature-cards">



            {/* TOOLS YOU'LL LEARN */}
            <article
              id="tools-youll-learn"
              className="course-feature-card"
            >


              <div className="course-feature-content">

                <h3>Tools You’ll Learn</h3>

                <p className="course-feature-description">
                  Get familiar with the essential tools and technologies
                  used in your chosen field.
                </p>

                <h5>Tools & Technologies</h5>

                <div className="course-feature-list">
                  {(d?.tools ?? c.tools ?? c.skills).map((item) => (
                    <div className="course-feature-item" key={item}>
                      <span>{item}</span>
                      <i className="tji-arrow-right-2"></i>
                    </div>
                  ))}
                </div>

              </div>
            </article>


            {/* SKILLS YOU'LL LEARN */}
            <article
              id="skills-youll-learn"
              className="course-feature-card"
            >


              <div className="course-feature-content">

                <h3>Skills You’ll Learn</h3>

                <p className="course-feature-description">
                  Develop practical abilities and professional skills
                  to prepare yourself for real-world opportunities.
                </p>

                <h5>Skills Development</h5>

                <div className="course-feature-list">
                  {(d?.skills ?? c.skills).map((item) => (
                    <div className="course-feature-item" key={item}>
                      <span>{item}</span>
                      <i className="tji-arrow-right-2"></i>
                    </div>
                  ))}
                </div>

              </div>
            </article>


            {/* CAREER OPPORTUNITIES */}
            <article
              id="career-pathways"
              className="course-feature-card"
            >


              <div className="course-feature-content">

                <h3>Career Opportunities</h3>

                <p className="course-feature-description">
                  Explore exciting career paths and professional opportunities
                  you can pursue after completing this course.
                </p>

                <h5>Potential Career Paths</h5>

                <div className="course-feature-list">
                  {(d?.careers ?? c.jobRoles ?? []).map((role) => (
                    <div className="course-feature-item" key={role}>
                      <span>{role}</span>
                      <i className="tji-arrow-right-2"></i>
                    </div>
                  ))}
                </div>

              </div>
            </article>


          </div>

        </div>
      </div>


      {/* <div className="sec-heading sec-heading-center pt-5">
        <span className="sec-subtitle sec-subtitle-3 tj-fade-anim" data-direction="top">
          <i className="tji-subtitle-2"></i>
          Learning Path
        </span>{" "}
        <h2 className="sec-title tj-fade-anim" data-delay=".3">
          Learn Your Way.
          Build Your Future.
        </h2>
      </div> */}



      {/* ===== Other (shared) sections — unchanged ===== */}
      <div>
        <div id="career-tracks"><CareerPaths /></div>
        <div id="stats"><AboutCounter /></div>
        <div id="clients"><Clients /></div>
        <div id="students"><Students /></div>
        <div id="reviews"><Review /></div>
        <div id="testimonials"><Testimonials /></div>
        <div id="Centers"><Centers /></div>

        {/* ===== SECTION 7: Why choose Catalyst (content from data/courseDetailContent.js) ===== */}
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
                const Icon = WHY_ICONS[item.icon] || Compass;
                return (
                  <div className="why-choose-card" key={item.title}>
                    <div className="why-choose-icon">
                      <Icon size={31} strokeWidth={1.8} />
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
        <div id="faq"><CourseFaq slug={slug} title={c.title} mode={mode} /></div>
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
          studyMode: "offline",
        }}
      />
      <LeadPopup
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        title={`Download ${c.title} Brochure`}
        description="Enter your details to download the course brochure."
        submitLabel="Submit & Download"
        downloadUrl={brochure || c.brochure}
        meta={{
          source: "offline-course-brochure",
          course: c.slug,
          courseTitle: c.title,
          category: c.category,
          studyMode: "offline",
        }}
      />
    </>
  );
};

export default OnlineCourseDetailsContent;