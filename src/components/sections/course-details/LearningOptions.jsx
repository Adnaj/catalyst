
import { Link } from "react-router-dom";
import { Laptop, MapPin, ArrowRight } from "lucide-react";
import "./LearningOptions.css";

const learningOptions = [
  {
    id: "online",
    title: "Learn Online",
    description:
      "Build career-ready skills with expert-led online training, from wherever you are.",
    icon: Laptop,
    badge: "Flexible Learning",
    detail: "Live & Recorded Classes",
    button: "Explore Online",
    link: "/courses",
    image: "/assets/images/course/mode1.jpg",
    className: "online",
  },
  {
    id: "offline",
    title: "Learn Offline",
    description:
      "Get practical experience, personal guidance, and hands-on classroom training.",
    icon: MapPin,
    badge: "Classroom Learning",
    detail: "Expert-Led Training",
    button: "Find a Centre",
    link: "/contact",
    image: "/assets/images/course/mode2.jpg",
    className: "offline",
  },
];

const LearningOptions = () => {
  return (
        <section className="tj-categories-section-3 pt-5  pb-5 fix">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading sec-heading-center">
              <span
                className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                data-direction="top"
              >
                <i className="tji-subtitle-2"></i>
                Learning Path
              </span>{" "}
              <h2 className="sec-title tj-fade-anim" data-delay=".3">
                {" "}
                Learn Your Way. <br /> Build Your Future.{" "}
              </h2>
            </div>

              <div className="learning-options-grid">
          {learningOptions.map((option) => {
            const Icon = option.icon;

            return (
              <article
                key={option.id}
                className={`learning-option-card ${option.className}`}
              >
                <div className="learning-option-content">
          

                  <h3>{option.title}</h3>

                  <p className="learning-option-description">
                    {option.description}
                  </p>

                  <div className="learning-option-detail">
                    <span className="learning-option-detail-dot" />
                    {option.detail}
                  </div>

                  {/* <Link
                    to={option.link}
                   className='tj-btn-primary style-2 flip-text-wrap btn1'
                  >
                     <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>
                    <span className="btn-icon">{option.button}</span>
                  
                  </Link> */}
                  <a className='tj-btn-primary style-2 flip-text-wrap btn1' href="#">
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>
                    <span className="btn-text">{option.button}</span>
                  </a>
                </div>

                <div
                  className="learning-option-image"
                  aria-hidden="true"
                >
                  <img
                    src={option.image}
                    alt=""
                    loading="lazy"
                  />
                </div>

                <div
                  className="learning-option-decoration"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
          </div>
        </div>
       
      </div>
    </section>
 
  );
};

export default LearningOptions;
