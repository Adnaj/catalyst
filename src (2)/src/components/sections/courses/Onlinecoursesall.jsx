import React from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../../../api/courses";

// Online courses list. Data comes from GET /api/courses/online (see src/api/courses.js).
// Each course links to /courses-online/:slug

const OnlineCoursesAll = () => {
  const { data, loading, error } = useCourses("online");
  const courses = data || [];

  return (
    <section
      className="tj-course-section section-gap fix tj-theme-bg"
      id="explore-offline-courses"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading sec-heading-center">
              <span
                className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                data-direction="top"
              >
                <i className="tji-subtitle-2"></i> All Online Courses
              </span>

              <h2 className="sec-title tj-fade-anim" data-delay="0.3">
                Explore Online Courses Built For Success.
              </h2>
            </div>
          </div>
        </div>

        <div
          className="row justify-content-center tj-course-filter tj_filter_item_wrapper tj-fade-anim"
          data-delay="0.5"
        >
          {loading && (
            <p className="text-center w-100">Loading courses...</p>
          )}
          {!loading && error && (
            <p className="text-center w-100">
              Could not load courses. Please try again later.
            </p>
          )}
          {!loading && !error && courses.length === 0 && (
            <p className="text-center w-100">New courses are coming soon.</p>
          )}

          {courses.map((course) => (
            <div key={course.slug} className="col-lg-4 col-md-6 tj_filter_item">
              <div className="tj-course-item">
                <div className="tj-course-img">
                  <Link to={course.path}>
                    <img src={course.image} alt={course.title} />
                  </Link>

                  {course.badge && (
                    <div className="tj-product-badge">
                      <span>{course.badge}</span>
                    </div>
                  )}

                  <div className="tj-wishlist-btn">
                    <button type="button" aria-label="Add to wishlist">
                      <i className="tji-heart"></i>
                    </button>
                  </div>
                </div>

                <div className="tj-course-content">
                  <div className="tj-cat-level-wrap">
                    <div className="tj-categories">
                      <span className="tj-cat">{course.category}</span>
                    </div>
                    <div className="tj-level">
                      <span>"Online"</span>
                    </div>
                  </div>

                  <h3 className="title tj-fs-h5">
                    <Link to={course.path}>{course.title}</Link>
                  </h3>

                  <div className="course-meta">
                    <span>
                      <i className="tji-clock"></i>
                      {course.duration}
                    </span>{" "}
                    {course.type && (
                      <span>
                        <i className="tji-user-duo"></i>
                        {course.type}
                      </span>
                    )}
                  </div>

                  <a
                    className="tj-btn-primary style-3 style-3-border flip-text-wrap mb-3"
                    href={course.brochure || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="btn-icon"></span>{" "}
                    <span className="btn-text">Download Brochure</span>
                  </a>

                  <Link
                    className="tj-btn-primary style-2 style-2-full flip-text-wrap"
                    to={course.path}
                  >
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>{" "}
                    <span className="btn-text">View Details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnlineCoursesAll;