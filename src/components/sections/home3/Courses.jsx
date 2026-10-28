
import { Link } from "react-router-dom";
import { courses } from "../../../data/courses";
// Adjust the import path if your course data file is located elsewhere.

const Courses = () => (
  <>
    <section className="tj-course-section-3 section-gap fix tj-theme-bg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading">
              <span
                className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                data-direction="top"
              >
                <i className="tji-subtitle-2"></i>
                {" Featured courses"}
              </span>{" "}
              <div className="sec-heading-inner">
                <div className="sec-heading-inner-left">
                  <h2 className="sec-title tj-fade-anim" data-delay=".3">
                    {" "}
                    Explore Courses Built For Success.{" "}
                  </h2>
                </div>
                <div
                  className="tj-fade-anim"
                  data-delay=".5"
                  data-duration="0.5"
                >
                  <Link
                    className="tj-btn-primary style-2 flip-text-wrap"
                    to="/courses"
                  >
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>{" "}
                    <span className="btn-text">Explore More Courses</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div
              className="tj-course-slider-area tj__slider-wrapper tj-fade-anim"
              data-delay=".3"
            >
              <div className="tj-course-slider swiper">
                <div className="swiper-wrapper">
                  {courses
                    .filter((course) => course.featured === true)
                    .slice(0, 3)
                    .map((course) => (
                      <div className="swiper-slide" key={course.slug}>
                        <div className="tj-course-item">
                          <div className="tj-course-img">
                            <Link to={`/courses/${course.slug}`}>
                              <img
                                src={course.image || course.thumb}
                                alt={course.title}
                              />
                            </Link>{" "}
                            <div className="tj-product-badge">
                              <span>Featured</span>
                            </div>
                            <div className="tj-wishlist-btn">
                              <button>
                                <i className="tji-heart"></i>
                              </button>
                            </div>
                          </div>

                          <div className="tj-course-content">
                            <div className="tj-cat-level-wrap">
                              <div className="tj-categories">
                                <a className="tj-cat" href="#">
                                  {course.category}
                                </a>
                              </div>
                              <div className="tj-level">
                                <span>{course.mode}</span>
                              </div>
                            </div>

                            <h3 className="title tj-fs-h5">
                              <Link to={`/courses/${course.slug}`}>
                                {course.title}
                              </Link>
                            </h3>{" "}

                            <div className="course-meta">
                              <span>
                                <i className="tji-clock"></i>
                                {course.duration}
                              </span>{" "}
                              <span>
                                <i className="tji-user-duo"></i>
                                {course.students}
                              </span>
                            </div>

                            <a
                              className="tj-btn-primary style-3 style-3-border flip-text-wrap video-popup mb-3"
                              data-autoplay="true"
                              data-vbtype="video"
                              data-maxwidth="1200px"
                              href={
                                course.brochure && course.brochure !== "#"
                                  ? course.brochure
                                  : "#"
                              }
                            >
                              <span className="btn-icon"></span>{" "}
                              <span className="btn-text">
                                Download Brochure
                              </span>
                            </a>

                            <Link
                              className="tj-btn-primary style-2 style-2-full flip-text-wrap"
                              to={`/courses/${course.slug}`}
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

                <div className="swiper-pagination-area course-pagination-1"></div>
              </div>

              <div className="slider-prev slider-prev-1">
                <span className="anim-icon">
                  <i className="tji-arrow-left-3"></i>{" "}
                  <i className="tji-arrow-left-3"></i>
                </span>
              </div>

              <div className="slider-next slider-next-1">
                <span className="anim-icon">
                  <i className="tji-arrow-right-3"></i>{" "}
                  <i className="tji-arrow-right-3"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Courses;
