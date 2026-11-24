import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useCourses } from "../../../api/courses";

// Featured courses slider. Data: GET /api/courses/offline?featured=true
// The slider is a React <Swiper> (not the one started in hooks/useSwipers.js) because the
// slides arrive after the page has loaded.
const FEATURED_MODE = "offline"; // links go to /courses/:slug. Use "online" for /courses-online/:slug

const Courses = () => {
  const { data, loading } = useCourses(FEATURED_MODE, { featured: true });
  const featured = (data || []).slice(0, 6);

  return (
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
                {loading && <p className="text-center">Loading courses...</p>}

                {featured.length > 0 && (
                  <Swiper
                    className="tj-course-slider"
                    data-no-auto-swiper="true"
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={15}
                    loop={featured.length > 3}
                    speed={1000}
                    autoplay={{ delay: 3000 }}
                    navigation={{ prevEl: ".slider-prev-1", nextEl: ".slider-next-1" }}
                    pagination={{ el: ".course-pagination-1", clickable: true }}
                    breakpoints={{
                      768: { slidesPerView: 2, spaceBetween: 20 },
                      992: { slidesPerView: 3, spaceBetween: 20 },
                      1200: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                  >
                    {featured.map((course) => (
                      <SwiperSlide key={course.slug}>
                        <div className="tj-course-item">
                          <div className="tj-course-img">
                            <Link to={course.path}>
                              <img src={course.image} alt={course.title} />
                            </Link>{" "}
                            <div className="tj-product-badge">
                              <span>Featured</span>
                            </div>
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
                                <span>{course.type}</span>
                              </div>
                            </div>

                            <h3 className="title tj-fs-h5">
                              <Link to={course.path}>{course.title}</Link>
                            </h3>{" "}

                            <div className="course-meta">
                              <span>
                                <i className="tji-clock"></i>
                                {course.duration}
                              </span>
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
                      </SwiperSlide>
                    ))}
                    <div
                      slot="container-end"
                      className="swiper-pagination-area course-pagination-1"
                    ></div>
                  </Swiper>
                )}

                {/* arrows stay inside the slider area, like the original markup */}
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
};

export default Courses;