import { useState } from "react";
import { generalFaqs } from "../../../data/faq";

// Data-driven FAQ section. With no props it shows the general FAQ (home page etc).
// Props:
//   faqs        array of { q, a }          (see data/faqs.js)
//   idPrefix    unique id for the accordion (needed if 2 FAQs ever share a page)
//   heading     big title            description   short text under the title
//   categories  optional tabs: [{ key, label, faqs }]  (e.g. General / Online / Offline).
//               When given, `faqs` is ignored and the tab list is shown above the questions.
//   defaultCategory  key of the tab that is open first
const Faq = ({
  faqs = generalFaqs,
  categories,
  defaultCategory,
  idPrefix = "home3",
  heading = "FAQs",
  description = "Everything you need to know about learning with Catalyst SkillHub. Can’t find what you’re looking for?",
}) => {
  const hasTabs = Array.isArray(categories) && categories.length > 0;
  const [activeKey, setActiveKey] = useState(
    defaultCategory || (hasTabs ? categories[0].key : "")
  );
  const active = hasTabs
    ? categories.find((c) => c.key === activeKey) || categories[0]
    : null;
  const list = hasTabs ? active.faqs : faqs;
  const groupId = hasTabs ? `${idPrefix}-${active.key}` : idPrefix;
  const parentId = `tjAccordion-${groupId}`;

  return (
    <section className="tj-faq-section-3 section-gap fix mb-5">
      <div className="container">
        <div className="row rg-50">
          <div className="col-12 col-xl-4 col-lg-5">
            <div className="tj-faq-3-info">
              <div className="sec-heading">
                <span
                  className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                  data-direction="top"
                >
                  <i className="tji-subtitle-2"></i>
                  {" FAQ"}
                </span>

                <h2
                  className="sec-title sec-title-faq tj-fade-anim"
                  data-delay=".3"
                >
                  {heading}
                </h2>

                <p className="desc tj-fade-anim">{description}</p>
              </div>

              <div
                className="support-box support-box-2 tj-fade-anim"
                data-delay=".3"
                data-duration=".6"
              >
                <ul className="tj-users-list">
                  <li>
                    <img src="/assets/images/users/Abinand.webp" alt="USER" />
                  </li>
                  <li>
                    <img src="/assets/images/users/Amina.webp" alt="USER" />
                  </li>
                  <li>
                    <img src="/assets/images/users/Siyas.webp" alt="USER" />
                  </li>
                  <li>
                    <img src="/assets/images/users/Sabith.webp" alt="USER" />
                  </li>
                  {/* <li>
                    <span>35K+</span>
                  </li> */}
                </ul>

                <h3 className="support-title tj-fs-h4">Still have questions?</h3>

                <p className="support-desc">
                  Our support team is here to help you every step of the way.
                </p>

                <a
                  className="tj-btn-primary style-2 style-2-sm flip-text-wrap"
                  href="#"
                >
                  <span className="btn-icon">
                    <i className="tji-arrow-right-2"></i>
                  </span>
                  <span className="btn-text">Contact support</span>
                </a>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-8 col-lg-7">
            <div className="tj-faq-wrapper-2">
              {hasTabs && (
                <div
                  role="tablist"
                  aria-label="FAQ categories"
                  style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}
                >
                  {categories.map((c) => {
                    const on = c.key === active.key;
                    return (
                      <button
                        key={c.key}
                        type="button"
                        role="tab"
                        aria-selected={on}
                        onClick={() => setActiveKey(c.key)}
                        style={{
                          padding: "10px 22px",
                          borderRadius: 999,
                          fontWeight: 600,
                          cursor: "pointer",
                          border: "1px solid var(--tj-color-theme-primary)",
                          background: on ? "var(--tj-color-theme-primary)" : "transparent",
                          color: on ? "#fff" : "var(--tj-color-theme-primary)",
                          transition: "all .2s ease",
                        }}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="tj-faq tj-faq-2" id={parentId} key={groupId}>
                {list.map((item, i) => {
                  const itemId = `${groupId}-accordion-${i + 1}`;
                  return (
                    <div
                      key={itemId}
                      className={`tj-accordion-item${hasTabs ? "" : " tj-fade-anim"}`}
                      data-delay={(0.2 + i * 0.1).toFixed(1)}
                      data-duration="0.6"
                    >
                      <button
                        className="tj-accordion-title collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${itemId}`}
                        aria-expanded="false"
                      >
                        {item.q}
                      </button>

                      <div
                        id={itemId}
                        className="collapse"
                        data-bs-parent={`#${parentId}`}
                      >
                        <div className="accordion-body tj-accordion-content">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;