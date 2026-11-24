
import React from "react";

const AboutIntro = () => (
  <section className="tj-about-section-4 section-gap-bottom fix">
    <div className="container">
      <div className="row align-items-center flex-column-reverse flex-lg-row rg-50">
        {/* About Gallery */}
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
                  loading="lazy"
                />
              </div>

              <div className="about-3-img about-3-img-2">
                <img
                  src="/assets/images/about/h3-about-grid-3.png"
                  alt="Student enjoying the learning experience"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="about-3-gallery-col about-3-gallery-col-wide">
              <div className="about-3-img about-3-img-3">
                <img
                  src="/assets/images/about/h3-about-grid-2.png"
                  alt="Student attending an online class"
                  loading="lazy"
                />
              </div>

              <div
                className="about-3-course-card"
                data-bg-image="/assets/images/about/h3-about-grid-bg.png"
              >
                <span className="about-3-course-icon">
                  <img
                    src="/assets/images/icons/tj-award.png"
                    alt=""
                    loading="lazy"
                  />
                </span>

                <h4 className="about-3-course-title">
                  Career-Focused Learning for 2026 and Beyond
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="col-lg-6">
          <div className="about-3-content">
            <div className="sec-heading">
              <span
                className="sec-subtitle tj-fade-anim"
                data-direction="top"
              >
                <i className="tji-subtitle"></i>
                About Our Academy
              </span>

              <h2 className="sec-title tj-fade-anim" data-delay=".3">
                Transforming Knowledge into Career Opportunities Through{" "}
                <span>Edunex.</span>
              </h2>
            </div>

            {/* Features */}
            <div className="about-3-feature-list row rg-20 gx-0">
              <div className="col-12 tj-fade-anim" data-delay=".2">
                <div className="about-3-feature">
                  <div className="about-3-feature-head">
                    <span className="about-3-feature-icon">
                      <i className="tji-user-duo"></i>
                    </span>

                    <h3 className="about-3-feature-title tj-fs-h5">
                      Expert-Led Learning
                    </h3>
                  </div>

                  <p className="about-3-feature-desc">
                    Learn from experienced industry professionals who
                    provide practical guidance, personalized mentorship,
                    and the support you need to achieve your career goals.
                  </p>
                </div>
              </div>

              <div className="col-12 tj-fade-anim" data-delay=".4">
                <div className="about-3-feature">
                  <div className="about-3-feature-head">
                    <span className="about-3-feature-icon">
                      <i className="tji-book-2"></i>
                    </span>

                    <h3 className="about-3-feature-title tj-fs-h5">
                      Personalized Learning Paths
                    </h3>
                  </div>

                  <p className="about-3-feature-desc">
                    Follow structured learning paths designed around
                    your interests and career ambitions, with practical
                    projects that help you build relevant, job-ready skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutIntro;
