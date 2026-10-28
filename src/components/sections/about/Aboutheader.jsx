import React from "react";

const AboutHeader = () => (
  <>
    <div className="space-for-header" />

    <section className="tj-page-header tj-page-header-2">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tj-page-header-content">
              {/* Breadcrumb */}
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
                  <span>About Us</span>
                </span>
              </div>

              {/* Main Heading */}
              <div className="sec-heading sec-heading-center">
                <span
                  className="sec-subtitle tj-fade-anim"
                  data-direction="top"
                >
                  <i className="tji-subtitle"></i>
                  Catalyst SkillHub
                </span>

                <h1
                  className="sec-title tj-fade-anim"
                  data-delay=".3"
                >
                  Empowering Learners Through
                  <span> Career-Focused </span>
                  Education.
                </h1>

                <p className="desc tj-fade-anim" data-delay=".5">
                  Master modern digital and technology skills through
                  AI-powered learning paths and structured courses
                  designed for 2026 and beyond.
                </p>

                {/* Action Buttons */}
                <div
                  className="btn-area justify-content-center tj-fade-anim"
                  data-delay=".7"
                >
                  <a
                    className="tj-btn-primary flip-text-wrap"
                    href="/courses"
                  >
                    <span className="btn-text">
                      Connect Us
                    </span>

                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>
                  </a>

                  <a
                    className="tj-btn-primary tj-btn-primary-light flip-text-wrap"
                    href="/courses"
                  >
                    <span className="btn-text">
                      Explore Courses
                    </span>

                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>
                  </a>
                </div>
              </div>

              {/* Decorative Banner Elements */}
              <div className="about-banner-elements">
                <span className="banner-4-dot banner-4-dot-green"></span>
                <span className="banner-4-dot banner-4-dot-orange"></span>
                <span className="banner-4-dot banner-4-dot-red"></span>

                <span className="banner-4-spark banner-4-spark-1"></span>
                <span className="banner-4-spark banner-4-spark-2"></span>
                <span className="banner-4-spark banner-4-spark-3"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default AboutHeader;