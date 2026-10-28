import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import LeadPopup from "../../common/LeadPopup";

const facultyData = [
  {
    id: 1,
    name: "Aiswarya",
    designation: "CIFA Faculty",
    description:
      "Learn accounting fundamentals, financial reporting, and practical accounting skills from experienced faculty.",
    image:
      "/assets/images/faculty/CIFA-Faculty-Aiswarya-catalyst-skillhub.webp",
    delay: ".3",
  },
  {
    id: 2,
    name: "Ameera",
    designation: "CIFA Faculty",
    description:
      "Gain practical knowledge of accounting principles, financial management, and industry-relevant practices.",
    image:
      "/assets/images/faculty/CIFA-Faculty-Ameera-Catalyst-skillhub.webp",
    delay: ".4",
  },
  {
    id: 3,
    name: "Prajila",
    designation: "CIFA Faculty",
    description:
      "Develop job-ready accounting skills through practical learning and expert academic guidance.",
    image:
      "/assets/images/faculty/CIFA-Faculty-catalyst-skillhub.webp",
    delay: ".5",
  },
  {
    id: 4,
    name: "Febna",
    designation: "CIFA Faculty",
    description:
      "Strengthen your accounting knowledge with structured lessons and practical, career-focused training.",
    image:
      "/assets/images/faculty/CIFA-Faculty-Febna-Catalyst-skillhub.webp",
    delay: ".6",
  },
  {
    id: 5,
    name: "Rithika Rajan",
    designation: "CIFA Faculty",
    description:
      "Strengthen your accounting knowledge with structured lessons and practical, career-focused training.",
    image:
      "/assets/images/faculty/CIFA-Faculty-Rithika-Rajan-catalyst-skillhub.webp",
    delay: ".6",
  },
  {
    id: 6,
    name: "Romisha",
    designation: "CIFA Faculty",
    description:
      "Strengthen your accounting knowledge with structured lessons and practical, career-focused training.",
    image:
      "/assets/images/faculty/CIFA-Faculty-Romisha-Catalyst-skillhub.webp",
    delay: ".6",
  },
  {
    id: 7,
    name: "Shuhail",
    designation: "DM Faculty",
    description:
      "Strengthen your accounting knowledge with structured lessons and practical, career-focused training.",
    image:
      "/assets/images/faculty/DM-Faculty-Shuhail-catalyst-skillhub.webp",
    delay: ".6",
  },
  {
    id: 8,
    name: "Gopika",
    designation: "CIFA Faculty",
    description:
      "Strengthen your accounting knowledge with structured lessons and practical, career-focused training.",
    image:
      "/assets/images/faculty/Gopika-cifa-faculty-catalyst-skillhub.webp",
    delay: ".6",
  },
  {
    id: 9,
    name: "Sreerag",
    designation: "CIFA Faculty",
    description:
      "Strengthen your accounting knowledge with structured lessons and practical, career-focused training.",
    image:
      "/assets/images/faculty/sreerag-CIFA-faculty-catalyst-skillhub.webp",
    delay: ".6",
  },
];

const Testimonials = () => {
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);

  return (
    <>
      <section className="tj-testimonial-section-3 section-gap fix">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-center">
                <span
                  className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                  data-direction="top"
                >
                  <i className="tji-subtitle-2"></i>
                  {" Faculty"}
                </span>

                <h2
                  className="sec-title tj-fade-anim"
                  data-delay=".3"
                >
                  Get Guidance from Experienced Faculty
                </h2>
              </div>
            </div>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={facultyData.length > 4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              576: { slidesPerView: 2 },
              992: { slidesPerView: 4 },
            }}
            style={{ paddingBottom: "50px" }}
          >
            {facultyData.map((faculty) => (
              <SwiperSlide key={faculty.id}>
                <div className="tj-instructor-item tj-instructor-item-2">
                  <div className="tj-instructor-img">
                    <div>
                      <img
                        src={faculty.image}
                        alt={faculty.name}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="tj-instructor-content">
                    <div className="name-area">
                      <h3 className="name tj-fs-h5">
                        {faculty.name}
                      </h3>

                      <span className="designation">
                        {faculty.designation}
                      </span>

                      {/* <p className="desc">
                        {faculty.description}
                      </p> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="about-3-btns justify-content-center">
            <button
              type="button"
              className="tj-btn-primary style-2 flip-text-wrap"
              onClick={() => setIsLeadPopupOpen(true)}
            >
              <span className="btn-icon">
                <i className="tji-arrow-right-2"></i>
              </span>{" "}
              <span className="btn-text">Talk To Expert</span>
            </button>
          </div>
        </div>
      </section>

      <LeadPopup
        isOpen={isLeadPopupOpen}
        onClose={() => setIsLeadPopupOpen(false)}
        title="Talk to an Expert"
        description="Share your details and our faculty and academic counsellors will call you to guide you on the right course and career path."
        submitLabel="Talk to an Expert"
        meta={{ source: "faculty-talk-to-expert" }}
      />
    </>
  );
};

export default Testimonials;