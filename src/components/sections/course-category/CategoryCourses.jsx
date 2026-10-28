import { Link } from "react-router-dom";
import { Hammer, Briefcase, Diamond, Check} from "lucide-react";
import { coursePath } from "../../../data/courses";
import useCategory from "./useCategory";
import "./CourseCategory.css";

// "3 Months" -> ["3", "Months"]
const splitDuration = (d = "") => {
  const m = d.match(/^(\d+)\s*(.*)$/);
  return m ? [m[1], m[2] || ""] : [d, ""];
};

// A tool can be a string, or { name, icon: "/path/logo.png", Icon: LucideComponent }
const ToolIcon = ({ tool }) => {
  if (typeof tool !== "string") {
    if (tool.Icon) return <tool.Icon size={16} />;
    if (tool.icon) return <img src={tool.icon} alt="" />;
  }
  return <Check size={16} strokeWidth={3} />;
};

const CategoryCourses = () => {
  const { category, courses } = useCategory();
  if (!category) return null;

  return (
    <div id="category-courses" className="tj-event-section section-gap fix">
      <div className="bg-noise"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading sec-heading-center">
              {/* <span className="sec-subtitle tj-fade-anim" data-direction="top">
                <i className="tji-subtitle"></i> {category.subtitle}
              </span> */}
              <h2
                className="sec-title tj-text-light-1 tj-fade-anim"
                data-delay=".3"
              >
                {category.headline}
              </h2>
            </div>
          </div>

          <div className="col-12">
            {courses.length === 0 ? (
              <div className="cc-empty">
                New courses in this category are coming soon.
              </div>
            ) : (
              <div className="tj-event-wrapper">
                {courses.map((course) => {
                  const [num, unit] = splitDuration(course.duration);
                  const description = course.listingDescription || course.summary;
                  const tools = course.tools || course.skills || [];

                  return (
                    <div className="tj-event-item tj-fade-anim" key={course.slug}>
                      <div className="tj-event-img">
                        <Link to={coursePath(course.slug)}>
                          <img
                            src={course.thumb || course.image}
                            alt={course.title}
                          />
                        </Link>
                      </div>

                      <div className="tj-event-content">
                        <div className="tj-categories">
                          <Link className="tj-cat-2" to={coursePath(course.slug)}>
                            {course.category}
                          </Link>
                        </div>
                        <h3 className="title">
                          <Link to={coursePath(course.slug)}>{course.title}</Link>
                        </h3>
                        <p className="course-cat-dec">{description}</p>

                        {tools.length > 0 && (
                          <div className="cc-block">
                            <div className="cc-head">
                              <span className="cc-head-icon">
                                <Hammer size={22} strokeWidth={2} />
                              </span>
                              <h4 className="cc-head-title">Tools You&rsquo;ll Learn</h4>
                            </div>
                            <ul className="cc-tools">
                              {tools.map((t) => {
                                const name = typeof t === "string" ? t : t.name;
                                return (
                                  <li key={name}>
                                    <span className="cc-tool-icon">
                                      <ToolIcon tool={t} />
                                    </span>
                                    <span className="cc-tool-name">{name}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}

                        {course.jobRoles?.length > 0 && (
                          <div className="cc-block">
                            <div className="cc-head">
                              <span className="cc-head-icon">
                                <Briefcase size={22} strokeWidth={2} />
                              </span>
                              <h4 className="cc-head-title">Job Roles</h4>
                            </div>
                            <ul className="cc-roles">
                              {course.jobRoles.map((r) => (
                                <li key={r}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                 
                           <div className="c-category-btn">
                        

                        <Link
                          className="tj-btn-primary style-2 flip-text-wrap"
                          to={`/contact?course=${course.slug}`}
                        >
                          <span className="btn-icon">
                            <i className="tji-arrow-right-2"></i>
                          </span>{" "}
                          <span className="btn-text">Enquire Now</span>
                        </Link>
                 
                          <a
                            className="tj-btn-primary tj-btn-primary-light flip-text-wrap"
                            href={course.brochure || "#"}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="btn-text">Download Brochure</span>
                            <span className="btn-icon">
                              <i className="tji-arrow-right-2"></i>
                            </span>
                          </a>
                        </div>
                      </div>

               
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCourses;