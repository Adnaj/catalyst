import { Link, useLocation } from "react-router-dom";
import LeadPopup from "../../common/LeadPopup";


import { useState } from "react";

const About = () => {
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);
  const location = useLocation();
  return (



    <>
      <section className="tj-about-section-3 section-gap fix">
        <div className="container">
          <div className="row align-items-center flex-column-reverse flex-lg-row rg-50">
            <div className="col-lg-6">
              <div
                className="about-3-gallery tj-fade-anim"
                data-direction="left"
                data-delay=".2"
              >
                <div className="about-3-gallery-col">
                  <div className="about-3-img about-3-img-1">
                    <img
                      src="/assets/images/about/h3-about-grid-1.png"
                      alt="Student learning with headphones"
                    />
                  </div>
                  <div className="about-3-img about-3-img-2">
                    <img
                      src="/assets/images/about/h3-about-grid-3.png"
                      alt="Happy student"
                    />
                  </div>
                </div>
                <div className="about-3-gallery-col about-3-gallery-col-wide">
                  <div className="about-3-img about-3-img-3">
                    <img
                      src="/assets/images/about/h3-about-grid-2.png"
                      alt="Student attending an online class"
                    />
                  </div>
                  <div
                    className="about-3-course-card"
                    data-bg-image="/assets/images/about/h3-about-grid-bg.png"
                  >
                    <span className="about-3-course-icon">
                      <img src="/assets/images/icons/tj-award.png" alt="" />
                    </span>{" "}
                    <h4 className="about-3-course-title">
                      {" "}
                      Business growth strate masterclass 2026.{" "}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-3-content">
                <div className="sec-heading">
                  <span
                    className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                    data-direction="top"
                  >
                    <i className="tji-subtitle-2"></i>
                    {" About Academy"}
                  </span>{" "}
                  <h2 className="sec-title tj-fade-anim" data-delay=".3">
                    {" "}
                    Catalyst SkillHub{" "}
                  </h2>
                </div>
                <div className="about-3-feature-list row rg-20 gx-0">
                  <div className="col-12 tj-fade-anim" data-delay=".2">
                    <p>
                      Recognised as India's No1. Commerce platform
                      Catalyst has spent years helping learners build careers through professional education in commerce, accounting and finance.
                      <br />
                      Today career opportunities extend far beyond traditional fields.
                      Technology is creating new roles, businesses are evolving, and employers are looking for new skills. Catalyst SkillHub brings that wider vision to life. From management and digital skills to technology and emerging fields, SkillHub creates more opportunities for learners to build the skills their career demands.</p>

                  </div>


                </div>
                <div className="about-3-btns tj-fade-anim" data-delay=".5">
                  <button
                    type="button"
                    onClick={() => setIsLeadPopupOpen(true)}
                    className="tj-btn-primary style-2 flip-text-wrap"

                  >
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>{" "}
                    <span className="btn-text">Enquire Now</span>
                  </button>
                  <LeadPopup
                    isOpen={isLeadPopupOpen}
                    onClose={() => setIsLeadPopupOpen(false)}
                    meta={{ source: "home-about-enquire" }}
                  />
                  <Link
                    className="tj-btn-primary style-3 style-3-border flip-text-wrap"
                    to="/about"
                  >
                    <span className="btn-icon"></span>
                    <span className="btn-text">About Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>



      </section>
    </>
  )
};

export default About;
