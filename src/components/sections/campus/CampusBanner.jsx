import { Link } from "react-router-dom";
import { CAMPUS_TAGLINE } from "../../../data/campuses";
import { categoryPath } from "../../../data/categories";
import useCampus from "./useCampus";
import "./Campus.css";

const CampusBanner = () => {
  const { campus, categories } = useCampus();

  if (!campus) {
    return (
      <>
        <div className="space-for-header" />
        <section className="tj-banner-section fix">
          <div className="container">
            <div className="banner-content">
              <h1 className="banner-title">Campus not found</h1>
              <div className="btn-area">
                <Link className="tj-btn-primary flip-text-wrap" to="/">
                  <span className="btn-text">Back to home</span>
                  <span className="btn-icon"><i className="tji-arrow-right-2"></i></span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="space-for-header" />
      <section className="tj-banner-section fix">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-content">
                <span className="sec-subtitle tj-fade-anim" data-direction="top" data-duration="0.5">
                  <i className="tji-subtitle"></i> {CAMPUS_TAGLINE}
                </span>

                <h1 className="banner-title tj-fade-anim" data-delay="0.3">
                  Catalyst Skillhub {campus.name}
                </h1>

                <div className="banner-desc tj-fade-anim" data-delay="0.5">
                  Explore Upskilling programmes in Accounting, Marketing &amp; Management,
                  and Technology at our {campus.name} Campus.
                </div>

                <div className="btn-area tj-fade-anim" data-delay=".6">
                  <Link
                    className="tj-btn-primary flip-text-wrap"
                    to={`/contact?campus=${campus.slug}`}
                  >
                    <span className="btn-text">Enquire now</span>
                    <span className="btn-icon"><i className="tji-arrow-right-2"></i></span>
                  </Link>
                </div>

                {/* course chips: all courses + each category */}
                <div className="cp-chips tj-fade-anim" data-delay=".7">
                  {categories.map((c) => (
                    <Link key={c.slug} className="cp-chip" to={categoryPath(c.slug)}>
                      {c.subtitle}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
                   <div className="banner-img campus-img-banner">
            <img src={campus.image} alt={`Catalyst Skillhub ${campus.name}`} />
          </div>
            </div>
          </div>
        </div>


      </section>
    </>
  );
};

export default CampusBanner;