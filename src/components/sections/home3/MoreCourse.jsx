import { Link } from "react-router-dom";

// Auto-converted from index-3.html (Course Section)
const MoreCourses = () => (
  <>
    <section className="tj-course-section-3 section-gap fix tj-theme-bg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading sec-heading-center">
              <span
                className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                data-direction="top"
              >
                <i className="tji-subtitle-2"></i>
                {" Courses"}
              </span>{" "}
              <div className="">
                <div className="">
                  <h2 className="sec-title tj-fade-anim" data-delay=".3">
                    {" "}
                    Find More course.{" "}
                  </h2>
                </div>
                <div
                  className="tj-fade-anim"
                  data-delay=".5"
                  data-duration="0.5"
                >



                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div id="tools-youll-learn" className="">
              <div className="tj-skill-lists justify-content-center">
                {/* Accounting Courses */}
                <Link
                  to="/courses/gcc-accounting"
                  className="tj-skill-item"
                >
                  GCC Accounting
                </Link>

                <Link
                  to="/courses/business-accounting"
                  className="tj-skill-item"
                >
                  Business Accounting
                </Link>

                <Link
                  to="/courses/sap-accounting"
                  className="tj-skill-item"
                >
                  SAP Accounting
                </Link>

                <Link
                  to="/courses/certified-indian-foreign-accounting"
                  className="tj-skill-item"
                >
                  Certified Indian &amp; Foreign Accounting
                </Link>

                {/* Tech Courses */}
                <Link
                  to="/courses/python-full-stack-devops"
                  className="tj-skill-item"
                >
                  Python Full-Stack with DevOps
                </Link>

                <Link
                  to="/courses/data-analytics-gen-ai"
                  className="tj-skill-item"
                >
                  Data Analytics with Gen AI
                </Link>

                <Link
                  to="/courses/cyber-security"
                  className="tj-skill-item"
                >
                  Cyber Security
                </Link>

                {/* Marketing & Management Courses */}
                <Link
                  to="/courses/digital-marketing"
                  className="tj-skill-item"
                >
                  Digital Marketing
                </Link>

                <Link
                  to="/courses/human-resource-management"
                  className="tj-skill-item"
                >
                  Human Resource Management
                </Link>

                <Link
                  to="/courses/office-administration"
                  className="tj-skill-item"
                >
                  Office Administration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default MoreCourses;
