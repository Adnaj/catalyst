import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonialsData = [
  {
    name: "Amaana",
    text: "Having a great experience with Digital Marketing at Catalyst. The faculty are really supportive and classes are easy to follow. So glad that I chose Catalyst for Digital Marketing.",
  },
  {
    name: "Arjun",
    text: "I was initially worried about choosing digital marketing after completing my BA, especially because I didn’t have an IT background. But after joining Catalyst, I realised that I can learn everything step by step from the basics. The classes are easy to understand, and so far the learning experience has been going really well.",
  },
  {
    name: "Sivapriya",
    text: "After my degree, I had a career gap because I was confused about which field to choose. Then I decided to explore digital marketing and joined Catalyst. In just three months, I’ve learned so many things and, more importantly, I now have a much clearer idea about my career and future.",
  },
  {
    name: "Athul Krishna",
    text: "The lab facility at Catalyst is really helpful. Since the course is mostly practical, I can practise everything here without needing to buy a new laptop. It made learning much easier for me.",
  },
  {
    name: "Angel",
    text: "I was confused about starting a new career in a new field and worried about how much I would have to spend on the course and everything I would need for it. Choosing Catalyst made it easier for me. The course was affordable, and the lab facility was very helpful. I’m happy I took this step.",
  },
  {
    name: "Neha K",
    text: "I didn’t realise how important DevOps was when I started learning Python full-stack. After starting my first job, I understood that having development and DevOps skills makes me different from being just a developer.",
  },
  {
    name: "Keerthana",
    text: "Catalyst is a big part of my career today. What I learned here helped me build my skills and gave me the confidence to move forward in my career. I’m really glad I chose Catalyst.",
  },
  {
    name: "Alan",
    text: "I was worried about finding a job after completing the course. The career guidance and placement support at Catalyst really helped me. The mock interviews and LinkedIn support also made me feel more prepared and confident to start my career.",
  },
  {
    name: "Anjana K",
    text: "I learned a lot about office administration during this course. The training also helped me improve my communication and soft skills, and I feel more confident in handling professional situations.",
  },
  {
    name: "Rajitha",
    text: "One thing I liked about the course was the opportunity to develop myself along with learning the subjects. I feel I have grown in both knowledge and confidence.",
  },
  {
    name: "Nanditha K",
    text: "Joining this course turned out to be a really good decision for me. I learned a lot of things I didn't know, and the classes helped me understand how these skills are used in real workplaces. I also became more comfortable communicating with others and expressing myself. I'm happy with how much I've learned during this course.",
  },
  {
    name: "Sreerag",
    text: "What I liked most about learning here was that it wasn't just about studying the subjects. I got to learn how to communicate better, work with others, and carry myself more confidently. These things matter a lot when you're preparing to enter a professional environment. I'm glad I got to improve in these areas along with my studies.",
  },
  {
    name: "Sreejith",
    text: "I came here wanting to learn something useful for my career, and the course gave me that opportunity. The topics were interesting, and I started getting a clearer picture of what working in an office actually involves. I also noticed a change in my confidence and the way I interact with people. For me, that has been one of the most valuable parts of this learning experience.",
  },
  {
    name: "Anusree M",
    text: "Managing work and studies together can be difficult, but the flexibility of this course made it easier for me. I could attend live classes, interact with the trainers, and go back to the recorded sessions whenever I needed to revise something. I didn't have to miss out on learning because of my work schedule, and that made a big difference for me.",
  },
];

const avatars = [
  "/assets/images/users/user.png",
  "/assets/images/users/user.png",
  "/assets/images/users/user.png",
  "/assets/images/users/user.png",
  "/assets/images/users/user.png",

];

const Rating = () => (
  <div
    className="tj-rating-wrapper rating"
    content="5"
    role="img"
    aria-label="Rated 5 out of 5"
  >
    {[0, 1, 2, 3, 4].map((i) => (
      <div className="r-icon" key={i}>
        <div
          className="r-icon-wrapper r-icon-marked"
          style={
            i === 4 ? { "--r-rating-icon-marked-width": "60%" } : undefined
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

const Testimonials = () => (
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
                {testimonialsData.map((item, index) => (
                  <SwiperSlide key={item.name}>
                    <div className="tj-testimonial-item tj-testimonial-item-2">
                      <div className="tj-testimonial-content-wrap">
                        <div className="tj-testimonial-top">
                          <div className="author-wrap">
                            <div className="author-avatar">
                              <img
                                src={avatars[index % avatars.length]}
                                alt=""
                              />
                            </div>
                            <div className="author-info">
                              <h3 className="name tj-fs-h6">{item.name}</h3>
                              <span className="designation">Student</span>
                            </div>
                          </div>
                        </div>
                        <div className="tj-testimonial-content">
                          <div className="desc">
                            <p>“{item.text}”</p>
                          </div>
                          <Rating />
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

export default Testimonials;