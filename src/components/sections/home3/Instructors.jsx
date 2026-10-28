
import React from "react";
import {
  FiBriefcase,
  FiUsers,
  FiTool,
  FiCpu,
  FiCompass,
  FiAward,
  FiTrendingUp,
  FiStar,
} from "react-icons/fi";

import {
  BriefcaseBusiness,
  UsersRound,
  Wrench,
  Sparkles,
  Compass,
  GraduationCap,
  ChartNoAxesCombined,
  UserRoundCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const whyChooseUs = [
  {
    icon: BriefcaseBusiness,
    title: "Real world projects",
    description:
      "Go beyond theory with hands-on practice with real world projects.",
  },
  {
    icon: UsersRound,
    title: "Industry expert mentors",
    description:
      "Learn from the mentors who have 8+ years of industry experience.",
  },
  {
    icon: Wrench,
    title: "Master advanced tools",
    description:
      "Gain hands-on experience with advanced tools, technologies and applications.",
  },
  {
    icon: Sparkles,
    title: "AI powered learning",
    description:
      "Develop the skills that help you lead in an increasingly AI powered industry.",
  },
  {
    icon: Compass,
    title: "Personalised guidance",
    description:
      "Get the right guidance for your career and future.",
  },
  {
    icon: GraduationCap,
    title: "Internship opportunities",
    description:
      "Apply your skills in a professional environment and gain valuable work experience.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Career & placement guidance",
    description:
      "Get the guidance and support you need to prepare for and find the right job.",
  },
  {
    icon: UserRoundCheck,
    title: "Professional skill development",
    description:
      "Build communication, problem-solving and professional skills needed to grow in your career.",
  },
];

const Instructors = () => {
  return (
    <section className="about-section-4 section-gap-bottom fix">
      <div className="container">

        {/* Heading */}
        <div className="row">
          <div className="col">
            <div className="sec-heading sec-heading-center about-4-heading">

              <span className="sec-subtitle sec-subtitle-4 tj-fade-anim">
                <i className="tji-subtitle-2"></i>
                Why choose Catalyst
              </span>

              <h2 className="sec-title sec-title-2 tj-fade-anim">
                Upskill with the right guidance{" "}
                <span className="accent underline">
                  for your career.
                </span>
              </h2>

              <p className="desc tj-fade-anim">
                Build practical skills, gain industry exposure and get the
                guidance you need to confidently grow your career in a
                rapidly changing professional world.
              </p>

              <div className="btn-wrap tj-fade-anim">


              </div>

              {/* Original Circle Shape */}
              <div className="circle-shape-wrap">
                <img
                  className="circle-shape"
                  src="/assets/images/shapes/circle.svg"
                  alt="Shape"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Why Choose Cards */}
        <div className="why-choose-grid">
          {whyChooseUs.map((item) => (
            <div className="why-choose-card" key={item.title}>
              <div className="why-choose-icon">
                <item.icon
                  size={31}
                  strokeWidth={1.8}
                />
              </div>

              <div className="why-choose-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="choose-catalyst-button">
          <Link
            className="tj-btn-primary style-2 flip-text-wrap"
            to="/about"
          >
            <span className="btn-icon">
              <i className="tji-arrow-right-2"></i>
            </span>{" "}
            <span className="btn-text">Know more about us</span>
          </Link>
        </div>

      </div>
    </section>
  );
};


export default Instructors;

