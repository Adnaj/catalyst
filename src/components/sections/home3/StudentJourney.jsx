import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  UserPlus,
  Presentation,
  MessagesSquare,
  Award,
  BriefcaseBusiness,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Compass,
    title: "Get the Right Guidance",
    description:
      "Find the right course for your interests and career goals.",
  },
  {
    icon: UserPlus,
    title: "Join Catalyst",
    description:
      "Begin your learning journey with a clear direction.",
  },
  {
    icon: Presentation,
    title: "Get Expert-led Training",
    description:
      "Learn from industry expert trainers through practical sessions and live projects.",
  },
  {
    icon: MessagesSquare,
    title: "Build English & Soft Skills",
    description:
      "Build the communication skills and confidence for your future.",
  },
  {
    icon: Award,
    title: "Get Certified",
    description:
      "Complete your course and earn your professional and international certifications.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Get Placed in Leading Companies",
    description:
      "Start your professional journey with leading companies.",
  },
];

const CARD_W = 308;
const GAP = 40;
const SLOT = CARD_W + GAP;
const DOT = 64;
const SPEED = 1.5;

// Where the CENTER of the first card sits, as a fraction of screen width.
// 0.5 = middle of the screen, 0.25 = a quarter from the left.
const START_POSITION = 0.25;

const getSidePad = () => {
  if (typeof window === "undefined") return 20;

  const w = window.innerWidth;

  // Mobile: keep the card centered (25% would push it off-screen).
  if (w < 768) return Math.max(20, (w - CARD_W) / 2);

  return Math.max(20, w * START_POSITION - CARD_W / 2);
};

const StudentJourney = () => {
  const outerRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const itemRefs = useRef([]);

  const [sidePad, setSidePad] = useState(getSidePad);

  const trackWidth =
    sidePad * 2 +
    steps.length * CARD_W +
    (steps.length - 1) * GAP;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;

    if (!section || !track || !fill) return;

    const items = itemRefs.current;
    let lastActive = -1;
    let distance = 0;
    let resizeFrame;

    const setActive = (progress) => {
      const index = Math.min(
        steps.length - 1,
        Math.max(
          0,
          Math.round(progress * (steps.length - 1))
        )
      );

      if (index === lastActive) return;

      lastActive = index;

      items.forEach((el, i) => {
        if (el) el.classList.toggle("is-on", i <= index);
      });
    };

    const render = (progress) => {
      track.style.transform = `translate3d(${
        -distance * progress
      }px, 0, 0)`;

      fill.style.transform = `scaleX(${progress})`;

      setActive(progress);
    };

    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
    };

    measure();

    // IMPORTANT: use a ScrollTrigger pin instead of CSS `position: sticky`.
    // ScrollSmoother moves #smooth-content with a transform, and sticky
    // does not work inside a transformed / fixed scroller. pin does.
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => {
        measure();
        return `+=${distance * SPEED}`;
      },
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,

      onRefresh: (self) => {
        render(self.progress);
      },

      onUpdate: (self) => {
        render(self.progress);
      },
    });

    render(trigger.progress);

    let lastWidth = window.innerWidth;

    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;

      lastWidth = window.innerWidth;

      cancelAnimationFrame(resizeFrame);

      resizeFrame = requestAnimationFrame(() => {
        setSidePad(getSidePad());
      });
    };

    window.addEventListener("resize", handleResize);

    const refresh = () => ScrollTrigger.refresh();

    if (document.readyState !== "complete") {
      window.addEventListener("load", refresh, {
        once: true,
      });
    }

    // ScrollSmoother is created after load by useGsap(); refresh once
    // more afterwards so the pin positions are measured correctly.
    const lateRefresh = setTimeout(refresh, 600);

    return () => {
      cancelAnimationFrame(resizeFrame);

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", refresh);

      clearTimeout(lateRefresh);
      trigger.kill(true);
    };
  }, []);

  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, [sidePad]);

  return (
    <div
      ref={outerRef}
      className="tj-journey-outer"
    >
      <section
        ref={sectionRef}
        className="about-section-4 tj-journey-section"
      >
        <style>{`
          .tj-journey-outer {
            position: relative;
            width: 100%;
          }

          /* Keep the original section background and layout */
          .tj-journey-section {
            position: relative;
            z-index: 1;
            box-sizing: border-box;
            width: 100%;
            height: 100vh;
            height: 100svh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 32px;
            overflow: hidden;
            padding: 40px 0;
            background:#f3f3f3;
          }

          /* Beat the global section-spacing.css rule
             (.site-main section {padding: 70px !important}) */
          .site-main section.tj-journey-section.about-section-4.tj-journey-section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }

          .tj-journey-section *,
          .tj-journey-section *::before,
          .tj-journey-section *::after {
            box-sizing: border-box;
          }

          /* Original heading and paragraph styles */
          .tj-head {
            flex: 0 0 auto;
            text-align: center;
            padding: 0 20px;
          }

          .tj-head .tj-sub {
            display: inline-block;
            margin-bottom: 12px;
            font-size: 15px;
            font-weight: 600;
            color: #313085;
          }

          .tj-head h2 {
            margin: 0 0 12px;
          }

          .tj-head p {
            margin: 0 auto;
            max-width: 560px;
            font-size: 17px;
            line-height: 1.6;
            color: rgba(13, 13, 18, 0.7);
          }

          /* Horizontal timeline */
          .tj-track {
            position: relative;
            display: flex;
            flex: 0 0 auto;
            align-items: stretch;
            gap: ${GAP}px;
            padding: 0 ${sidePad}px;
            width: ${trackWidth}px;
            max-width: none;
            will-change: transform;
          }

          .tj-line,
          .tj-line-fill {
            position: absolute;
            top: ${DOT / 2 - 1}px;
            left: ${sidePad + CARD_W / 2}px;
            width: ${(steps.length - 1) * SLOT}px;
            height: 2px;
            border-radius: 4px;
            pointer-events: none;
          }

          .tj-line {
            background: rgba(116, 91, 151, 0.24);
          }

          .tj-line-fill {
            background: #313085;
            transform-origin: left center;
            will-change: transform;
          }

          .tj-item {
            position: relative;
            flex: 0 0 ${CARD_W}px;
            min-width: 0;
            padding-top: 104px;
          }

          /* Numbered purple circle */
          .tj-dot {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: ${DOT}px;
            height: ${DOT}px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #313085;
            color: #fff;
            border: 0;
            font-size: 23px;
            font-weight: 700;
            letter-spacing: -0.8px;
            white-space: nowrap;
            z-index: 2;
            transition: box-shadow 0.3s ease;
          }

          .tj-item.is-on .tj-dot {
            background: #313085;
            box-shadow: 0 0 0 5px rgba(113, 63, 200, 0.07);
          }

          .tj-item::before {
            display: none;
          }

          /* White rounded card */
          .tj-card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-height: 268px;
            height: 100%;
            padding: 30px;
            border: 1px solid rgba(255, 255, 255, 0.75);
            border-radius: 19px;
            background: #fff;
            box-shadow: 0 12px 35px rgba(71, 42, 86, 0.04);
            overflow: visible;
            opacity: 0.65;
            transition:
              opacity 0.3s ease,
              box-shadow 0.3s ease;
          }

          /* Small triangular pointer */
          .tj-card::before {
            content: "";
            position: absolute;
            top: -8px;
            left: 50%;
            width: 16px;
            height: 16px;
            background: #fff;
            transform: translateX(-50%) rotate(45deg);
            border-radius: 2px;
          }

          .tj-item.is-on .tj-card {
            opacity: 1;
            box-shadow: 0 16px 40px rgba(71, 42, 86, 0.08);
          }

          .tj-num {
            display: none;
          }

          /* Icon above heading */
          .tj-card-heading {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            margin-bottom: 16px;
          }

          .tj-icon {
            flex: 0 0 64px;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #313085;
            background: #b5e8f45e;
            transition:
              color 0.3s ease,
              background-color 0.3s ease;
          }

          .tj-icon svg {
            display: block;
            width: 25px;
            height: 25px;
          }

          .tj-item.is-on .tj-icon {
            color: #713fc8;
            background: #b5e8f45e;
          }

          /* Preserve original card heading typography */
          .tj-card h3 {
            flex: 1;
            min-width: 0;
            margin: 0;
            font-size: 21px;
            font-weight: 600;
            line-height: 1.35;
            color: #0d0d12;
          }

          /* Preserve original card paragraph typography */
          .tj-card p {
            margin: 0;
            font-size: 16px;
            line-height: 1.6;
            color: rgba(13, 13, 18, 0.65);
          }

          @media (max-width: 767px) {
            .tj-journey-section {
              gap: 24px;
              padding: 32px 0;
            }

            .tj-head p {
              font-size: 15px;
            }

            .tj-card {
              padding: 24px 22px;
            }

            .tj-card-heading {
              gap: 20px;
            }

            .tj-card h3 {
              font-size: 19px;
            }
          }

          @media (max-height: 650px) and (min-width: 768px) {
            .tj-journey-section {
              gap: 16px;
              padding: 24px 0;
            }

            .tj-head p {
              font-size: 15px;
            }

            .tj-card {
              min-height: 200px;
              padding: 20px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .tj-dot,
            .tj-card,
            .tj-icon {
              transition: none;
            }
          }
        `}</style>

        {/* Original heading and paragraph */}
        <div className="tj-head">
 
             <span
                  className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                  data-direction="top"
                >
                  <i className="tji-subtitle-2"></i>
                  {" Student journey"}
                </span>{" "}

          <h2 className="sec-title sec-title-2">
            Your journey from learning <br />
            <span className="accent underline">
              to career success.
            </span>
          </h2>

          <p>
            Follow a clear path from choosing the right course to
            starting your career with leading companies.
          </p>
        </div>

        {/* Animated timeline */}
        <div
          className="tj-track"
          ref={trackRef}
        >
          <div className="tj-line" />

          <div
            className="tj-line-fill"
            ref={fillRef}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="tj-item"
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                <span className="tj-dot">
                  {String(index + 1).padStart(2, "0")}.
                </span>

                <div className="tj-card">
                  <span
                    className="tj-num"
                    aria-hidden="true"
                  >
                    Step {index + 1}
                  </span>

                  <div className="tj-card-heading">
                    <span
                      className="tj-icon"
                      aria-hidden="true"
                    >
                      <Icon strokeWidth={1.8} />
                    </span>

                    <h3>{step.title}</h3>
                  </div>

                  <p>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default StudentJourney;