// ONLINE course detail page  (route: /courses/:slug)
// Content comes from GET /api/courses/online/:slug (see src/api/courses.js)
import { useState } from "react";
import {
  Laptop,
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
  Play,
  CalendarDays,
  Clock,
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
// Districts for the "Campus Location" dropdown: [name, comingSoon]


// Tabs for the course details block: [id, label]
const COURSE_TABS = [
  ["overview", "Overview"],
  ["gain", "What You’ll Gain"],
  ["learn", "What You’ll Learn"],
  ["tools", "Tools You’ll Learn"],
  ["skills", "Skills You’ll Learn"],
  ["careers", "Career Opportunities"],
];

const EMPTY_LEAD = { name: "", phone: "", message: "" };

// Icons for the "Why choose Catalyst" cards (data files refer to them by name)
const WHY_ICONS = {
  BriefcaseBusiness, UsersRound, Wrench, Sparkles, Compass, GraduationCap,
  ChartNoAxesCombined, UserRoundCheck, Calculator, Globe, Network, Layers,
};

const mode = "online"; // this file = the online page

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

const OnlineCourseDetailsContent = () => {

  const isOffline = mode === "offline";
  const { slug } = useParams();
  const { data: d, loading } = useCourse(mode, slug); // GET /api/courses/online/:slug

  // ---- ALL hooks live above the early return ----
  const [lead, setLead] = useState(EMPTY_LEAD);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [leadError, setLeadError] = useState("");

  const [activeTab, setActiveTab] = useState("overview");
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollMode, setEnrollMode] = useState(""); // "" | "online" | "offline"
  // ---- end hooks ----

  if (loading && !d) return <PageLoading />;
  if (!d) return <NotFound mode={mode} />;
  const c = {
    title: d.label,
    slug: d.slug,
    category: d.category,
    duration: d.duration,
    brochure: d.brochure,
  };

  const lo = getLearningOptions(d, c.title);

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

  const onLeadChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const onLeadSubmit = async (e) => {
    e.preventDefault();
    const digits = lead.phone.replace(/\D/g, "");
    if (lead.name.trim().length < 2) return setLeadError("Please enter your name.");
    if (digits.length < 10) return setLeadError("Please enter a valid phone number.");

    setLeadError("");
    setStatus("sending");
    try {
      await sendLead("online-course", {
        name: lead.name,
        phone: lead.phone,
        message: lead.message,
        course: c.title,
        source: window.location.href,
      });
      setStatus("success");
      setLead(EMPTY_LEAD);
    } catch (err) {
      setLeadError(err.message);
      setStatus("idle");
    }
  };

  // ---- values for the hero (Section 1) ----
  const heading = d.heading;
  const summary = d.summary;
  const brochure = d.brochure;
  const type = d.type;
  const studyMode = isOffline ? "Offline" : "Online"; // follows the page, not the data

  return (
    <>
      <div className="space-for-header" />

      {/* ===== SECTION 1: Landing / hero ===== */}
      <section className="tj-page-header tj-page-header-2 offline-detail-sec course-tj-main">
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
                <div>
                  <div className="blog-category-two course-highlights-modern">
                    {[
                      {
                        icon: <GraduationCap size={30} />,
                        label: "Course Type",
                        value: type,
                        color: "purple",
                      },
                      {
                        icon: <Laptop size={27} />,
                        label: "Study Mode",
                        value: studyMode,
                        color: "blue",
                      },
                      {
                        icon: <CalendarDays size={27} />,
                        label: "Course Duration",
                        value: c.duration,
                        color: "cyan",
                      },
                    ].map((item) => (
                      <div className="category-item" key={item.label}>
                        <div className={`cate-icons ${item.color}`}>
                          {item.icon}
                        </div>

                        <div className="cate-text">
                          <span className="designation">{item.label}</span>
                          <h6 className="text">{item.value}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


                {/* <div className="ct-skills-wrap">
                  {(d.skills).slice(0, 5).map((item) => (
                    <span className="ct-skill-chip" key={item}>
                      {item}
                    </span>
                  ))}

                  {(d.skills).length > 5 && (
                    <span className="ct-skill-chip ct-skill-more">
                      +{(d.skills).length - 5} more skills
                    </span>
                  )}
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

                          <div className="lead-row">
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



      {/* ===== COURSE TABS (Overview / Gain / Learn / Tools / Skills / Careers) ===== */}
      <section id="overview" className="course-tabs-wrap">
        <div className="container">
          <div className="ct-bar" role="tablist" aria-label="Course details">
            {COURSE_TABS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={activeTab === id}
                className={`ct-tab${activeTab === id ? " active" : ""}`}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="ct-panel" role="tabpanel">
            {activeTab === "overview" && (
              <>
                <h3>{d?.overviewTitle ?? "About This Course"}</h3>
                {d ? <p>{d.overview}</p> : c.description.map((p) => <p key={p}>{p}</p>)}
              </>
            )}

            {activeTab === "gain" && (
              <>
                <h3>What You’ll Gain</h3>
                <p>Explore the knowledge, skills and opportunities you can gain through this course.</p>
                <div className="ct-grid">
                  {(d.gain).map((item) => (
                    <div className="ct-item" key={item}>
                      <span className="ct-check"><i className="tji-check" /></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "learn" && (
              <>
                <h3>What You’ll Learn</h3>
                <p>Explore the knowledge and practical skills you'll develop throughout this course.</p>
                <div className="ct-grid ct-grid-1">
                  {d?.learn
                    ? d.learn.map((item) => (
                      <div className="ct-card" key={item.title}>
                        <h4>  <Play size={18} fill="#180761" strokeWidth={0} style={{ marginRight: "7px" }} />{item.title}</h4>



                        <p>{item.text}</p>
                      </div>
                    ))
                    : c.goals.map((item) => (
                      <div className="ct-card" key={item}>
                        <h4>{item}</h4>
                      </div>
                    ))}
                </div>
              </>
            )}

            {activeTab === "tools" && (
              <>
                <h3>Tools You’ll Learn</h3>
                <p>Get familiar with the essential tools and technologies used in your chosen field.</p>
                <div className="ct-grid">
                  {(d.tools).map((item) => (
                    <div className="ct-item" key={item}>
                      <span className="ct-check"><i className="tji-check" /></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "skills" && (
              <>
                <h3>Skills You’ll Learn</h3>
                <p>Develop practical abilities and professional skills to prepare for real-world opportunities.</p>
                <div className="ct-grid">
                  {(d.skills).map((item) => (
                    <div className="ct-item" key={item}>
                      <span className="ct-check"><i className="tji-check" /></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "careers" && (
              <>
                <h3>Career Opportunities</h3>
                <p>Explore career paths you can pursue after completing this course.</p>
                <div className="ct-grid">
                  {(d.careers).map((role) => (
                    <div className="ct-item" key={role}>
                      <span className="ct-check"><i className="tji-check" /></span>
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

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
                const Icon = WHY_ICONS[item.icon] || Compass;
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
          source: "online-course-details-enroll",
          course: d.slug,
          courseTitle: c.title,
          category: d.category,
          studyMode: "online",
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
          source: "online-course-brochure",
          course: c.slug,
          courseTitle: c.title,
          category: c.category,
          studyMode: "online",
        }}
      />
    </>
  );
};

export default OnlineCourseDetailsContent;