import React from "react";
import {
  Compass,
  UserPlus,
  Presentation,
  MessagesSquare,
  Award,
  Briefcase,
} from "lucide-react";

const milestones = [
  {
    date: "Step 1",
    title: "Get the Right Guidance",
    description:
      "Find the right course for your interests and career goals.",
    icon: Compass,
  },
  {
    date: "Step 2",
    title: "Join Catalyst",
    description: "Begin your learning journey with a clear direction.",
    icon: UserPlus,
  },
  {
    date: "Step 3",
    title: "Get Expert-led Training",
    description:
      "Learn from industry expert trainers through practical sessions and live projects.",
    icon: Presentation,
  },
  {
    date: "Step 4",
    title: "Build English & Soft Skills",
    description:
      "Build the communication skills and confidence for your future.",
    icon: MessagesSquare,
  },
  {
    date: "Step 5",
    title: "Get Certified",
    description:
      "Complete your course and earn your professional and international certifications.",
    icon: Award,
  },
  {
    date: "Step 6",
    title: "Get Placed in Leading Companies",
    description: "Start your professional journey with leading companies.",
    icon: Briefcase,
  },
];

const Timeline = () => {
  return (
    <section className="about-section-4 tj-timeline-section section-gap-bottom fix">
      <style>{`
        .tj-timeline-section {
          --tl-from: #232350;
          --tl-to: #313085;
          --tl-accent: #01abde;
          --tl-line: #d9d9e3;
        }

        /* Timeline wrapper + centre line */
        .tj-timeline {
          position: relative;
          margin-top: 56px;
        }
        .tj-timeline::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          transform: translateX(-50%);
          background: var(--tl-line);
        }

        /* Item */
        .tj-tl-item {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 44px 1fr;
          grid-template-areas: "pill dot content";
          align-items: start;
          padding-bottom: 72px;
        }
        .tj-tl-item:last-child {
          padding-bottom: 0;
        }
        .tj-tl-item.is-right {
          grid-template-areas: "content dot pill";
        }

        /* Date pill side */
        .tj-tl-pillcell {
          grid-area: pill;
          position: relative;
          display: flex;
          justify-content: flex-end;
          min-height: 34px;
        }
        .tj-tl-item.is-right .tj-tl-pillcell {
          justify-content: flex-start;
        }
        .tj-tl-pill {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          height: 34px;
          padding: 0 22px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          white-space: nowrap;
          color: #fff;
          background: linear-gradient(135deg, var(--tl-from), var(--tl-to));
          box-shadow: 0 8px 20px rgba(49, 48, 133, 0.3);
        }

        /* big faint line-art circle behind the pill */
        .tj-tl-art {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 190px;
          height: 190px;
          border-radius: 50%;
          border: 2px solid #5fc8ce40;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5fc8ce40;
          pointer-events: none;
        }
        .tj-tl-art svg {
          width: 96px;
          height: 96px;
        }

        /* Dot */
        .tj-tl-dot {
          grid-area: dot;
          position: relative;
          z-index: 2;
          justify-self: center;
          margin-top: 10px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--tl-from), var(--tl-to));
          box-shadow: 0 0 0 5px #fff, 0 0 0 6px rgba(49, 48, 133, 0.25);
        }

        /* Content side */
        .tj-tl-content {
          grid-area: content;
          min-width: 0;
        }
        .tj-tl-item.is-right .tj-tl-content {
          text-align: right;
          display:flex;
      flex-direction: column;
    align-items: flex-end;
        }
        .tj-tl-head {
          display: flex;
          align-items: baseline;
          gap: 10px;
          min-height: 34px;
          margin-bottom: 14px;
        }
       .tj-tl-item.is-right .tj-tl-head {
  justify-content: flex-end;
  flex-direction: row;
}
        .tj-tl-head h3 {
          margin: 0;
          font-size: 23px;
          font-weight: 600;
          line-height: 34px;
          color: var(--tl-to);
        }

        /* Card */
        .tj-tl-card {
          position: relative;
          overflow: hidden;
          padding: 24px 26px;
          border-radius: 14px;
          background: #fff;
          max-width:400px;
          box-shadow: 0 14px 36px rgba(35, 35, 80, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;

        }
        .tj-tl-item:hover .tj-tl-card {
          transform: translateY(-4px);
          box-shadow: 0 20px 44px rgba(35, 35, 80, 0.16);
        }
        .tj-tl-card p {
          position: relative;
          z-index: 1;
          margin: 0;
          font-size: 15px;
          line-height: 1.7;
          font-weight:500;
        }
        /* small faint icon in the card corner */
        .tj-tl-mini {
          position: absolute;
          right: 14px;
          bottom: 6px;
          width: 84px;
          height: 84px;
          color: rgba(35, 35, 80, 0.07);
          pointer-events: none;
        }
        .tj-tl-item.is-right .tj-tl-mini {
          right: auto;
          left: 14px;
        }
        .tj-tl-item.is-right .tj-tl-card {
          text-align: right;
        }

        /* Tablet / mobile: single column, line on the left */
        @media (max-width: 767px) {
          .tj-timeline::before {
            left: 7px;
            transform: none;
          }
          .tj-tl-item,
          .tj-tl-item.is-right {
            grid-template-columns: 14px 1fr;
            grid-template-areas:
              "dot pill"
              "dot content";
            column-gap: 22px;
            row-gap: 14px;
            padding-bottom: 48px;
          }
          .tj-tl-dot {
            margin-top: 10px;
            box-shadow: 0 0 0 4px #fff, 0 0 0 5px rgba(49, 48, 133, 0.25);
          }
          .tj-tl-pillcell,
          .tj-tl-item.is-right .tj-tl-pillcell {
            justify-content: flex-start;
          }
          .tj-tl-art {
            display: none;
          }
          .tj-tl-item.is-right .tj-tl-content,
          .tj-tl-item.is-right .tj-tl-card {
            text-align: left;
          }
            .tj-tl-item.is-right .tj-tl-content {
  text-align: right;
  
}
          .tj-tl-item.is-right .tj-tl-head {
            justify-content: flex-start;
            flex-direction: row;
          }
            .tj-tl-item.is-right .tj-tl-head h3 {
  width: 100%;
  text-align: right;
}
          .tj-tl-item.is-right .tj-tl-mini {
            left: auto;
            right: 14px;
          }
          .tj-tl-head {
            flex-wrap: wrap;
            row-gap: 0;
          }
          .tj-tl-head h3 {
            font-size: 18px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .tj-tl-card {
            transition: none;
          }
          .tj-tl-item:hover .tj-tl-card {
            transform: none;
          }
        }
      `}</style>

      <div className="container">
        {/* Heading */}
        <div className="row">
          <div className="col">
            <div className="sec-heading sec-heading-center about-4-heading">
              <span
                className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                data-direction="top"
              >
                <i className="tji-subtitle-2"></i>
                {" Student Journey "}
              </span>

              <h2 className="sec-title sec-title-2 tj-fade-anim">
                Your journey from learning <br />
                <span className="accent underline">to career success.</span>
              </h2>

              <div className="btn-wrap tj-fade-anim"></div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="tj-timeline">
          {milestones.map((item, index) => {
            const Icon = item.icon;
            const isRight = index % 2 === 1;
            return (
              <div
                className={`tj-tl-item ${isRight ? "is-right" : ""}`}
                key={`${item.date}-${index}`}
              >
                <div className="tj-tl-pillcell">
                  <span className="tj-tl-art" aria-hidden="true">
                    <Icon strokeWidth={0.8} />
                  </span>
                  <span className="tj-tl-pill">{item.date}</span>
                </div>

                <span className="tj-tl-dot" aria-hidden="true"></span>

                <div className="tj-tl-content">
                  <div className="tj-tl-head">
                    <h3>{item.title}</h3>
                  </div>

                  <div className="tj-tl-card">
            
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
           <div className="choose-catalyst-button pt-5">
           <a className="tj-btn-primary style-2 flip-text-wrap" href="#">
                  <span className="btn-icon">
                    <i className="tji-arrow-right-2"></i>
                  </span>{" "}
                  <span className="btn-text">Connect Us</span>
                </a>{" "}
        </div>
      </div>
    </section>
  );
};

export default Timeline;