
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Brooklyn Simmons",
    designation: "Co-Founder",
    image: "/assets/images/users/user-img-1.png",
    feedback:
      "I'd bought courses for years and finished none. Edunex was different — the structured learning path made every step small enough to take today. Ten months later, I closed my first design contract, and the certificate actually meant something in the interview.",
    company: "NOVA",
  },
  {
    id: 2,
    name: "Cody Fisher",
    designation: "Co-Founder",
    image: "/assets/images/users/user-img-2.png",
    feedback:
      "The practical projects and expert guidance helped me build real-world skills and gain confidence. The structured lessons made learning easier, and I could apply what I learned directly to my career.",
    company: "NOVA",
  },
  {
    id: 3,
    name: "Jenny Wilson",
    designation: "Co-Founder",
    image: "/assets/images/users/user-img-4.png",
    feedback:
      "Edunex gave me a clear learning path and the practical experience I needed to move forward professionally. The mentorship and hands-on projects helped me develop skills that I can use in the workplace.",
    company: "NOVA",
  },
];

const TestimonialRating = () => (
  <div
    className="tj-rating-wrapper rating"
    role="img"
    aria-label="Rated 5 out of 5"
  >
    {[1, 2, 3, 4, 5].map((star) => (
      <div className="r-icon" key={star}>
        <div className="r-icon-wrapper r-icon-marked">
          <i aria-hidden="true" className="tji-star"></i>
        </div>

        <div className="r-icon-wrapper r-icon-unmarked">
          <i aria-hidden="true" className="tji-star"></i>
        </div>
      </div>
    ))}
  </div>
);

const AboutTestimonials = () => (
  <section className="tj-testimonial-section-4 section-gap section-gap-x fix">
    <div className="container">
      <div className="row rg-30">
        {/* Section Heading */}
        <div className="col-12 col-lg-5">
          <div className="sec-heading about-testimonial-heading">
            <span
              className="sec-subtitle tj-fade-anim"
              data-direction="top"
            >
              <i className="tji-subtitle"></i>
              Student Feedback
            </span>

            <h2 className="sec-title tj-fade-anim" data-delay=".3">
              Hear From Our Learners About Their Journey.
            </h2>

            <p className="desc tj-fade-anim" data-delay=".4">
              We help learners build strong, marketable skills through
              hands-on projects, one-to-one mentorship, and a supportive
              learning community.
            </p>

            <div className="btn-wrap tj-fade-anim" data-delay=".5">
              <a
                className="tj-btn-primary flip-text-wrap"
                href="/courses"
              >
                <span className="btn-text">Explore Courses</span>

                <span className="btn-icon">
                  <i className="tji-arrow-right-2"></i>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="col-12 col-lg-7">
          <div className="tj-testimonial-wrapper-4 tj__slider-wrapper">
            <div
              className="tj-testimonial-slider-3 swiper swiper-container tj-fade-anim"
              data-delay=".3"
            >
              <div className="swiper-wrapper">
                {testimonials.map((testimonial) => (
                  <div className="swiper-slide" key={testimonial.id}>
                    <div className="tj-testimonial-item tj-testimonial-item-4">
                      {/* Rating and Quote */}
                      <div className="tj-testimonial-top">
                        <div className="tj-quote">
                          <i className="tji-quote"></i>
                        </div>

                        <TestimonialRating />
                      </div>

                      {/* Feedback */}
                      <div className="desc">
                        <p>{testimonial.feedback}</p>
                      </div>

                      {/* Student Details */}
                      <div className="tj-testimonial-bottom">
                        <div className="author-wrap">
                          <div className="author-avatar">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              loading="lazy"
                            />
                          </div>

                          <div className="author-info">
                            <h3 className="name tj-fs-h6">
                              {testimonial.name}
                            </h3>

                            <span className="designation">
                              {testimonial.designation}
                            </span>
                          </div>
                        </div>

                        <div className="hired">
                          <span>
                            <i className="tji-check"></i>
                          </span>
                          Hired at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Navigation */}
              <div className="slider-navigation justify-content-center">
                <div className="slider-prev slider-prev-1">
                  <span className="anim-icon">
                    <i className="tji-arrow-left-3"></i>
                    <i className="tji-arrow-left-3"></i>
                  </span>
                </div>

                <div className="slider-next slider-next-1">
                  <span className="anim-icon">
                    <i className="tji-arrow-right-3"></i>
                    <i className="tji-arrow-right-3"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutTestimonials;
