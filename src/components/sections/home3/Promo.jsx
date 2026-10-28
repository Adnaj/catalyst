import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { categoryPath } from "../../../data/categories";

import "swiper/css";
import "swiper/css/pagination";

const Promo = () => {
  const courses = [
    {
      title: "Accounting Courses",
      slug: "accounting",
      description:
        "Build expertise in accounting and finance and gain the financial qualifications needed for a career in finance. Learn CIFA, GCC Accounting, Business Accounting, SAP Accounting and more.",
      image: "/assets/images/shapes/shapes4.png",
      imageClass: "#232350",
      btnClass: 'btn1',
      alt: "Start your learning journey",
    },
    {
      title: "Marketing & Management Courses",
      slug: "marketing-management",
      description:
        "Develop practical marketing and management skills across areas such as Digital Marketing, HR Management, Office Administration and more.",
      image: "/assets/images/shapes/shapes1.png",
      imageClass: "#9f9ee7",
      btnClass: 'btn1',
      alt: "Lead the next generation",
    },
    {
      // Copy of the first card
      title: "Tech Courses",
      slug: "tech",
      description:
        "Build in demand technology skills in areas such as python full-stack with DevOps, Data analytics with gen ai, and cyber security",
      image: "/assets/images/shapes/shapes3.png",
      imageClass: "#01abde",
      btnClass: 'btn1',
      alt: "Start your learning journey",
    },
  ];

  return (
    <section className="tj-promo-section section-gap-bottom" id="course-category">
      <style>{`
        /* Swiper layout */
        .tj-promo-swiper {
          padding-bottom: 15px; /* room for pagination dots */
        }
        .tj-promo-swiper .swiper-slide {
          height: auto;          /* equal-height cards */
          display: flex;
        }
        .tj-promo-swiper .swiper-pagination-bullet {
          background: #0d0d12;
          opacity: 0.25;
        }
        .tj-promo-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }

        /* Card */
        .tj-promo-card {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 420px;
          overflow: hidden;
          border-radius: 24px;
          background: #0d0d12;
          color: #fff;
          border:none;
        }
        .tj-promo-card .tj-promo-content {
          position: relative;
          z-index: 2;
        }
        .tj-promo-card .title {
          margin: 0 0 12px;
          color: #fff;
      
     
        }
        .tj-promo-card .desc {
          margin: 0 0 24px;
          color: rgba(255, 255, 255, 0.95);
          font-size: 15px;
          line-height: 1.6;
        }

        /* Image at the bottom over colourful shapes */
        .tj-promo-card .tj-promo-img {
          z-index: 1;
          margin-top: auto;
          height: 220px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: hidden;
        }
        .tj-promo-card .tj-promo-img img {
          position: absolute;
          right:-5px;
          bottom:-5px;
          z-index: 2;
          display: block;
          max-height: 100%;
          width: auto;
          max-width: 80%;
          object-fit: contain;
          object-position: bottom center;
        }

        .tj-btn-primary.style-2.btn1{
        background :#fff !important;
            border: 1px solid #313085;
        color:#313085!important;
        }

        .tj-btn-primary.style-2.btn1 .btn-icon::before{
        background-color:#313085;
        }
        .tj-btn-primary.style-2.btn1:hover{
        color:#fff!important;
        }
     
       
      `}</style>

      <div className="container">
        <div className="sec-heading sec-heading-center">
          <span
            className="sec-subtitle sec-subtitle-3 tj-fade-anim"
            data-direction="top"
          >
            <i className="tji-subtitle-2"></i>
            {" Future ready skills"}
          </span>{" "}
          <h2 className="sec-title tj-fade-anim" data-delay=".3">
            {" "}
            Browse Expert Led Career Courses.{" "}
          </h2>
        </div>
        <Swiper
          className="tj-promo-swiper"
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1.5}            /* mobile: 1 card */
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },  /* tablet: 2 cards */
            992: { slidesPerView: 3 },  /* desktop: 3 cards */
          }}
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <div className="tj-promo-card" style={{ background: course.imageClass }}
              >
                {/* Top: title, description, button */}
                <div className="tj-promo-content">
                  <h3 className="title tj-fs-h3">{course.title}</h3>

                  <p className="desc">{course.description}</p>

                 <Link
  className={`tj-btn-primary style-2 flip-text-wrap ${course.btnClass}`}
  to={categoryPath(course.slug)}
>
  <span className="btn-icon">
    <i className="tji-arrow-right-2"></i>
  </span>
  <span className="btn-text">Explore courses</span>
</Link>
                </div>

                {/* Bottom: image over decorative shapes */}
                <div className={`tj-promo-img ${course.imageClass}`}>
                  <img src={course.image} alt={course.alt} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Promo;