import { Link } from "react-router-dom";
import { useCourses } from "../../../api/courses";

// Course links come from GET /api/courses/<mode>.
// <MoreCourses mode="online" /> links to /courses-online/:slug, default (offline) to /courses/:slug
const MoreCourses = ({ mode = "offline" }) => {
  const { data } = useCourses(mode);
  const courses = data || [];
  if (courses.length === 0) return null;

  return (
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
                {courses.map((c) => (
                  <Link key={c.slug} to={c.path} className="tj-skill-item">
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

export default MoreCourses;