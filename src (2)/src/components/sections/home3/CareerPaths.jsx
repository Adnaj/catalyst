import React, { useState } from "react";
import LeadPopup from "../../common/LeadPopup";

const careerPaths = [
  {
    id: "start",
    variant: "blue",
    title: "Start your career",
    desc: "Build the skills and certifications to launch your career with confidence.",
    cta: "Start your journey",
    image: "/assets/images/shapes/start.png",
    popup: {
      title: "Start Your Career",
      description:
        "Tell us a little about yourself and our counsellors will help you choose the right course to launch your career.",
      submitLabel: "Start Your Journey",
      source: "career-start-your-career",
    },
  },
  {
    id: "switch",
    variant: "light",
    title: "Switch your career",
    desc: "Learn in-demand skills and prepare for a new career field.",
    cta: "Explore career paths",
    image: "/assets/images/shapes/switch-2.png",
    popup: {
      title: "Switch Your Career",
      description:
        "Share your details and our counsellors will guide you on the best courses to move into a new career field.",
      submitLabel: "Explore Career Paths",
      source: "career-switch-your-career",
    },
  },
  {
    id: "upgrade",
    variant: "navy",
    title: "Upgrade your career",
    desc: "Stay ahead in a changing job market with new skills and emerging tech.",
    cta: "Upgrade your skills",
    image: "/assets/images/shapes/change.png",
    popup: {
      title: "Upgrade Your Career",
      description:
        "Let us know where you are today and our counsellors will suggest the right skills to help you stay ahead.",
      submitLabel: "Upgrade Your Skills",
      source: "career-upgrade-your-career",
    },
  },
];

const styles = `
.cp-section {
  padding: 20px 0 110px 0;
 
}
.cp-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
.cp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.cp-card {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 204px;
  border-radius: 16px;
  overflow: hidden;
  color: #fff;
}
.cp-card.is-blue  { background: #4645a1; box-shadow: 0 14px 30px rgba(0, 86, 232, 0.22); }
.cp-card.is-light { background: #8ee1f4; color: #0f1d33; }
.cp-card.is-navy  { background: #232350; }

.cp-content {
  position: relative;
  z-index: 2;
  width: 65%;
  padding: 45px 0 24px 30px;
}
.cp-title { margin: 0 0 15px; }
.cp-card.is-blue .cp-title,
.cp-card.is-navy .cp-title { color: #fff; }
.cp-card.is-blue .cp-desc,
.cp-card.is-navy .cp-desc { color: #fff;  }
.cp-desc {
  margin: 0 0 60px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height:1.3;
  max-width:80%;
}

.cp-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  padding: 6px 0;
  border: 2px solid transparent;
  border-radius: 10px;
}
.cp-btn svg { font-size: 16px; transition: transform 0.2s ease; }
.cp-btn:hover svg { transform: translateX(3px); }
.cp-btn:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }

.is-light .cp-btn {
  color: #0056d2;
  border-color: #0056d2;
  padding: 7px 10px;
}

.cp-image {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 55%;
  z-index: 1;
}
.cp-image img {
  width: 450px;
  height: auto;
  object-fit: cover;
  object-position: center top;
  display: block;
  position:absolute;
  bottom:0;
}

@media (max-width: 1100px) {
  .cp-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 700px) {
  .cp-container { padding: 0 20px; }
  .cp-grid { grid-template-columns: 1fr; }
}
`;

const CareerPaths = ({ items = careerPaths }) => {
  const [activeItem, setActiveItem] = useState(null); // clicked card or null

  return (
    <section className="cp-section">
      <style>{styles}</style>
      <div className="cp-container">
        <div className="cp-grid">
          {items.map((item) => (
            <article key={item.id} className={`cp-card is-${item.variant}`}>
              <div className="cp-content">
                <h3 className="cp-title">{item.title}</h3>
                <p className="cp-desc">{item.desc}</p>

                <button
                  type="button"
                  className="tj-btn-primary style-2 flip-text-wrap btn1"
                  onClick={() => setActiveItem(item)}
                >
                  <span className="btn-icon">
                    <i className="tji-arrow-right-2"></i>
                  </span>
                  <span className="btn-text">{item.cta}</span>
                </button>
              </div>

              <div className="cp-image">
                <img src={item.image} alt="" loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>

      <LeadPopup
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        title={activeItem?.popup?.title}
        description={activeItem?.popup?.description}
        submitLabel={activeItem?.popup?.submitLabel}
        meta={{
          source: activeItem?.popup?.source || "career-paths",
          careerPath: activeItem?.id,
        }}
      />
    </section>
  );
};

export default CareerPaths;