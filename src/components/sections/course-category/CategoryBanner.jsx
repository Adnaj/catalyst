import { Link } from "react-router-dom";
import useCategory from "./useCategory";
import "./CourseCategory.css";
const DEFAULT_IMAGE = "/assets/images/hero/hero-img.png";

const CategoryBanner = () => {
  const { category, courses } = useCategory();

  if (!category) {
    return (
      <>
        <div className="space-for-header" />
        <section className="tj-banner-section fix">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="banner-content">
                  <h1 className="banner-title">Category not found</h1>
                  <div className="banner-desc">
                    We couldn&rsquo;t find this course category.
                  </div>
                  <div className="btn-area">
                    <Link className="tj-btn-primary flip-text-wrap" to="/courses">
                      <span className="btn-text">View all courses</span>
                      <span className="btn-icon">
                        <i className="tji-arrow-right-2"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
          
            </div>
          </div>
        </section>
      </>
    );
  }

  // dynamic checklist: category highlights + live course count
  const checklist = [
    `${courses.length} ${courses.length === 1 ? "course" : "courses"} available`,
    ...(category.highlights || []),
  ];

  return (
    <>
      <div className="space-for-header" />
      <section className="tj-banner-section fix">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-content course-banner-content">
                <span
                  className="sec-subtitle tj-fade-anim"
                  data-direction="top"
                  data-duration="0.5"
                >
                  <i className="tji-subtitle"></i> {category.subtitle}
                </span>

                <h1 className="banner-title tj-fade-anim" data-delay="0.3">
                  {category.title}
                </h1>

                <div className="banner-desc tj-fade-anim" data-delay="0.5">
                  {category.description}
                </div>

                <div className="btn-area tj-fade-anim" data-delay=".6">
                  <a className="tj-btn-primary flip-text-wrap" href="#category-courses">
                    <span className="btn-text">Explore courses</span>
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>
                  </a>
                  <Link
                    className="tj-btn-primary tj-btn-primary-light flip-text-wrap"
                    to="/contact"
                  >
                    <span className="btn-text">Connect Us</span>
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>
                  </Link>
                </div>

                <div
                  className="list-area tj-fade-anim"
                  data-delay=".6"
                  data-duration="1"
                  data-direction="left"
                >
                  <ul className="tj-list">
                    {checklist.map((text) => (
                      <li key={text}>
                        <span className="icon">
                          <i className="tji-check"></i>
                        </span>
                        <span className="text">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
                  
            </div>
          </div>
        </div>

        {/* right half: image */}
        <div className="banner-right">
          <div className="banner-img">
            <img src={category.image || DEFAULT_IMAGE} alt={category.title} />
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryBanner;