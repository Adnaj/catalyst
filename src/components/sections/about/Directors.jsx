import { useState } from "react";
import LeadPopup from "../../common/LeadPopup";

const directorsData = [
  {
    id: 1,
    name: "Salman EV",
    designation: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/salman-e-v-531491173/",
    image: "/assets/images/directors/salman.webp",
  },
  {
    id: 2,
    name: "Dinesh KS",
    designation: "Director",
    linkedin: "https://www.linkedin.com/in/dr-dinesh-k-sadayakumar/",
    image: "/assets/images/directors/dinesh.webp",
  },
  {
    id: 3,
    name: "Afeef Yusaf",
    designation: "Director",
    linkedin: "", // add when available
    image: "/assets/images/directors/afeef.webp",
  },
  {
    id: 4,
    name: "Mohammed Shafeer K",
    designation: "Director",
    linkedin: "https://www.linkedin.com/in/mohammed-shafeer-k-3915a7184/",
    image: "/assets/images/directors/shafeer.jpg",
  },
  {
    id: 5,
    name: "Mohammed Shamras CK",
    designation: "Director",
    linkedin: "https://www.linkedin.com/in/mohammed-shamras-c-k-954461301/",
    image: "/assets/images/directors/shamras.jpg",
  },
];

const Directors = () => {
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
                  {" Directors"}
                </span>

                <h2 className="sec-title tj-fade-anim" data-delay=".3">
                  Meet Our Directors
                </h2>
              </div>
            </div>
          </div>

          {/* 5 cards in one row on large screens */}
          <div className="">
            <div className="row directors-row">
              {directorsData.map((director) => (
                <div key={director.id} className="directors-col col-md-4">
                  <div className="tj-instructor-item tj-instructor-item-2">
                    <div className="tj-instructor-img">
                      <div>
                        <img
                          src={director.image}
                          alt={director.name}
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="tj-instructor-content">
                      <div className="name-area">
                        <h3 className="name tj-fs-h5">{director.name}</h3>

                        <span className="designation">
                          {director.designation}
                        </span>


                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
        meta={{ source: "directors-talk-to-expert" }}
      />
    </>
  );
};

export default Directors;