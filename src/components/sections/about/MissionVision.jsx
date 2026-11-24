import "./MissionVision.css";
import {
  Target,
  Eye,
  Users,
  Lightbulb,
  Handshake,
  TrendingUp,
  Heart,
} from "lucide-react";

/* ---------------------------------------------------------
   IMAGES – change these paths/file names to match your project
--------------------------------------------------------- */


const coreValues = [
  {
    id: 1,
    title: "Excellence",
    description:
      "We strive for the highest standards in education and service.",
    icon: Users,
    tone: "purple",
  },
  {
    id: 2,
    title: "Innovation",
    description: "We embrace new ideas and modern learning approaches.",
    icon: Lightbulb,
    tone: "blue",
  },
  {
    id: 3,
    title: "Integrity",
    description: "We uphold honesty, transparency and ethical practices.",
    icon: Handshake,
    tone: "purple",
  },
  {
    id: 4,
    title: "Growth",
    description:
      "We are committed to continuous learning and development.",
    icon: TrendingUp,
    tone: "blue",
  },
  {
    id: 5,
    title: "Empathy",
    description: "We care for our learners, staff and community.",
    icon: Heart,
    tone: "purple",
  },
];

const MissionVision = () => {
  return (
    <>
      {/* Mission & Vision Section */}
      <section className="tj-mission-section section-gap fix">
        <div className="container">
          <div className="row">
            <div className="col-12">
               <div className="sec-heading sec-heading-center">
              <span
                className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                data-direction="top"
              >
                <i className="tji-subtitle-2"></i>
                {" Our Purpose"}
              </span>{" "}
              <h2 className="sec-title tj-fade-anim" data-delay=".3">
                {" "}
               Mission &amp;  Vision{" "}
              </h2>
            </div>

            </div>
          </div>

          <div className="row g-4">
            {/* Mission Card */}
            <div className="col-lg-6">
              <div className="mission-vision-card mission-card">
                <div className="mv-content">
                  {/* <div className="mv-icon">
                    <Target size={50} strokeWidth={1.8} />
                  </div> */}

                  <h3>
                    Our <span>Mission</span>
                  </h3>
                  <span className="mv-divider"></span>

                  <p>
                    To deliver high-quality, industry-relevant education that
                    empowers every learner to achieve their goals and build a
                    successful career.
                  </p>
                </div>

                <img
                  className="mv-illustration mv-illustration-mission"
                  src='/assets/images/about/mission.png'
                  alt="Graduation cap on books"
                />
              </div>
            </div>

            {/* Vision Card */}
            <div className="col-lg-6">
              <div className="mission-vision-card vision-card">
                <div className="mv-content">
                  {/* <div className="mv-icon">
                    <Eye size={50} strokeWidth={1.8} />
                  </div> */}

                  <h3>
                    Our <span>Vision</span>
                  </h3>
                  <span className="mv-divider"></span>

                  <p>
                    To be a globally recognized academy, shaping future-ready
                    professionals and contributing to a smarter, more skilled
                    society.
                  </p>
                </div>

                <img
                  className="mv-illustration mv-illustration-vision"
                  src='/assets/images/about/vission.png'
                  alt="Mountain with flag"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="tj-values-section section-gap fix">
        <div className="container">
          <div className="row">
            <div className="col-12">
                 <div className="sec-heading sec-heading-center">
              <span
                className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                data-direction="top"
              >
                <i className="tji-subtitle-2"></i>
                {" What Drives Us"}
              </span>{" "}
              <h2 className="sec-title tj-fade-anim" data-delay=".3">
                {" "}
              Our <span>Values</span>
              </h2>
                <p className="mission-section-desc">
                  Our values define who we are and guide everything we do.
                </p>
            </div>

            </div>
          </div>

          <div className="core-values-grid">
            {coreValues.map((value) => {
              const Icon = value.icon;

              return (
                <div className={`core-value-card tone-${value.tone}`} key={value.id}>
                  <div className="value-icon">
                    <Icon size={34} strokeWidth={1.6} />
                  </div>

                  <h3>{value.title}</h3>
                  <span className="value-divider"></span>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MissionVision;