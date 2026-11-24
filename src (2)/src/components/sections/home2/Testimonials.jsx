import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTestimonials } from "../../../api/testimonials";

const avatars = [
  "/assets/images/users/user.png",
  "/assets/images/users/user.png",
  "/assets/images/users/user.png",
  "/assets/images/users/user.png",
  "/assets/images/users/user.png",

];

const Rating = ({ value = 5 }) => (
  <div
    className="tj-rating-wrapper rating"
    content={String(value)}
    role="img"
    aria-label={`Rated ${value} out of 5`}
  >
    {[0, 1, 2, 3, 4].map((i) => (
      <div className="r-icon" key={i}>
        <div
          className="r-icon-wrapper r-icon-marked"
          style={
            value - i < 1
              ? {
                  "--r-rating-icon-marked-width": `${Math.max(0, value - i) * 100}%`,
                }
              : undefined
          }
        >
          <i aria-hidden="true" className="tji-star"></i>
        </div>
        <div className="r-icon-wrapper r-icon-unmarked">
          <i aria-hidden="true" className="tji-star"></i>
        </div>
      </div>
    ))}
  </div>
);

// Student testimonials from GET /api/testimonials (active ones, lowest `order` first)
const Testimonials = () => {
  const { data } = useTestimonials();
  const items = data || [];
  if (items.length === 0) return null;

  return (
  <>
    <section className="tj-testimonial-section-2 section-gap fix">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading">
              <span
                className="sec-subtitle sec-subtitle-2 tj-fade-anim"
                data-direction="top"
              >
                Students feedback
              </span>
              <div className="sec-heading-inner">
                <h2 className="sec-title tj-fade-anim" data-delay=".3">
                  {" "}
                  Explore our students users feedback.{" "}
                </h2>
                <div className="tj-fade-anim" data-duration="0.5">
                  <div className="slider-navigation">
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
          </div>
        </div>
      </div>
      <div className="container testimonial-container-2 px-0">
        <div className="row">
          <div className="col">
            <div className="tj__slider-wrapper">
              <Swiper
                className="tj-testimonial-slider-2 swiper-container tj-fade-anim"
                data-delay=".3"
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1200: { slidesPerView: 3 },
                }}
                navigation={{
                  prevEl: ".slider-prev-1",
                  nextEl: ".slider-next-1",
                }}
                pagination={{
                  el: ".testimonial-pagination-2",
                  clickable: true,
                }}
              >
                {items.map((item, index) => (
                  <SwiperSlide key={item.id || item.name}>
                    <div className="tj-testimonial-item tj-testimonial-item-2">
                      <div className="tj-testimonial-content-wrap">
                        <div className="tj-testimonial-top">
                          <div className="author-wrap">
                            <div className="author-avatar">
                              <img
                                src={item.image || avatars[index % avatars.length]}
                                alt=""
                              />
                            </div>
                            <div className="author-info">
                              <h3 className="name tj-fs-h6">{item.name}</h3>
                              <span className="designation">{item.designation || "Student"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="tj-testimonial-content">
                          <div className="desc">
                            <p>“{item.text}”</p>
                          </div>
                          <Rating value={item.rating ?? 5} />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div
                  slot="container-end"
                  className="swiper-pagination-area testimonial-pagination-2"
                ></div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

export default Testimonials;