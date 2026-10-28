import React from "react";
import { Link } from "react-router-dom";


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
                  <span>Courses</span>
                </span>
              </div>

              {/* Main Heading */}
              <div className="sec-heading sec-heading-center">
                <span
                  className="sec-subtitle tj-fade-anim"
                  data-direction="top"
                >
                  <i className="tji-subtitle"></i>
                  Explore Our Courses
                </span>

                <h1
                  className="sec-title tj-fade-anim"
                  data-delay=".3"
                >
                  Build In-Demand Skills. Shape Your Future.
               
                </h1>

                <p className="desc tj-fade-anim" data-delay=".5">
                  Discover career-focused courses in Accounting, Digital Marketing, Management, and Technology. Learn from industry experts through practical training, real-world projects, and structured learning paths designed to prepare you for today's job market and beyond.
                </p>

                {/* Action Buttons */}
                <div
                  className="btn-area justify-content-center tj-fade-anim"
                  data-delay=".7"
                >
                 <Link
  className="tj-btn-primary flip-text-wrap"
  to="/contact"
>
  <span className="btn-text">Connect Us</span>

  <span className="btn-icon">
    <i className="tji-arrow-right-2"></i>
  </span>
</Link>

                 <a
  className="tj-btn-primary tj-btn-primary-light flip-text-wrap"
  href="#"
>
  <span className="btn-text">Enquire Now</span>

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