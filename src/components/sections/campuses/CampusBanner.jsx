import { Link } from "react-router-dom";
import { CAMPUS_TAGLINE } from "../../../data/campuses";
import { categoryPath } from "../../../data/categories";
import CampusCallbackForm from "./CampusCallbackForm";
import useCategories from "./useCampus";
import "./Campus.css";

const CampusBanner = () => {
const { categories } = useCategories();



  return (
    <>
      <div className="space-for-header" />
      <section className="tj-banner-section fix">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-content">
                <span className="sec-subtitle tj-fade-anim" data-direction="top" data-duration="0.5">
                  <i className="tji-subtitle"></i>India's Top Upskilling Platform
                </span>

                <h1 className="banner-title tj-fade-anim " data-delay="0.3">
                 Explore Our Campuses Across India
                </h1>

                <div className="banner-desc tj-fade-anim" data-delay="0.5">
                Discover Catalyst SkillHub Academy campuses across India and find the perfect place to begin your learning journey. Explore career-focused programmes in Accounting, Marketing & Management, and Technology, designed to develop practical skills and industry-relevant knowledge.
<br /><br />
Our campuses provide a supportive learning environment with experienced mentors and hands-on training. Find your nearest campus, explore available programmes, and take the next step towards building a successful career.
                </div>

                <div className="btn-area tj-fade-anim" data-delay=".6">
                  <Link
                    className="tj-btn-primary flip-text-wrap"
                    to={`/contact?campus`}
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
                   {/* <div className="banner-img campus-img-banner">
            <img src={campus.image} alt={`Catalyst Skillhub ${campus.name}`} />
                  </div> */}
                   <CampusCallbackForm />
            </div>
          </div>
        </div>


      </section>
    </>
  );
};

export default CampusBanner;