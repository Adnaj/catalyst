import {
  FaLightbulb,
  FaLaptopCode,
  FaBriefcase,
  FaRocket,
} from "react-icons/fa";
import { Link } from "react-router-dom";
// Auto-converted from index-3.html (Features Section)
const Features = () => (
  <>
    <section className="tj-features-section section-gap fix">
      <div className="bg-noise bg-noise-2"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading sec-heading-center">
              <span
                className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                data-direction="top"
              >
                <i className="tji-subtitle-2"></i>
                {" Key Benefits"}
              </span>{" "}
              <h2 className="sec-title tj-fade-anim" data-delay=".3">
                {" "}
                Upgrade your skills and career with catalyst{" "}
              </h2>
            </div>
          </div>
        </div>
        <div className="row rg-30">
          <div className="col-xl-3 col-sm-6 tj-fade-anim" data-delay=".2">
            <div className="tj-feature-card">
              <span className="tj-feature-icon">
                <FaLightbulb />
              </span>{" "}
              <h3 className="title tj-fs-h6">Deep Master in demand skills</h3>
              <p>
                {" "}
                Develop the skills aligned with today's industry needs.{" "}
              </p>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 tj-fade-anim" data-delay=".4">
            <div className="tj-feature-card">
              <span className="tj-feature-icon">
               <FaLaptopCode />
              </span>{" "}
              <h3 className="title tj-fs-h6">Work on real projects</h3>
              <p>
                {" "}
                Apply what you learn through practical projects.{" "}
              </p>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 tj-fade-anim" data-delay=".6">
            <div className="tj-feature-card">
              <span className="tj-feature-icon">
                <FaBriefcase />
              </span>{" "}
              <h3 className="title tj-fs-h6">Gain industry exposure</h3>
              <p>
                {" "}
                Get opportunities to experience how your skills work in the real world.{" "}
              </p>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 tj-fade-anim" data-delay=".8">
            <div className="tj-feature-card">
              <span className="tj-feature-icon">
                <FaRocket />
              </span>{" "}
              <h3 className="title tj-fs-h6">Upgrade your career</h3>
              <p>
                {" "}
                Take your skill to the next level and prepare for new career opportunities.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="course-bottom-content style-2">
              <span>
                <img src="/assets/images/icons/fire.svg" alt="" />
                {" Popular"}
              </span>{" "}
              <p>Learn with 200+ world-class courses.</p>
              <div>
               <Link className="tj-text-btn-2" to="/courses">
  <span className="btn-text">
    <span>Explore More Courses</span>
  </span>{" "}
  <span className="btn-icon">
    <i className="tji-arrow-right-2"></i>
  </span>
</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tj-feature-shape">
        <img src="/assets/images/shapes/h3-feature-shape.png" alt="" />
      </div>
    </section>
  </>
);

export default Features;
