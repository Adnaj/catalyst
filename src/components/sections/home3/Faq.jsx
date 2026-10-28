
const Faq = () => (
  <>
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
                  FAQs
                </h2>

                <p className="desc tj-fade-anim">
                  Everything you need to know about learning with Catalyst
                  SkillHub. Can’t find what you’re looking for?
                </p>
              </div>

              <div
                className="support-box support-box-2 tj-fade-anim"
                data-delay=".3"
                data-duration=".6"
              >
                <ul className="tj-users-list">
                  <li>
                    <img
                      src="./assets/images/users/user-img-1.png"
                      alt="USER"
                    />
                  </li>
                  <li>
                    <img
                      src="./assets/images/users/user-img-2.png"
                      alt="USER"
                    />
                  </li>
                  <li>
                    <img
                      src="./assets/images/users/user-img-3.png"
                      alt="USER"
                    />
                  </li>
                  <li>
                    <span>7K+</span>
                  </li>
                </ul>

                <h3 className="support-title tj-fs-h4">
                  Still have questions?
                </h3>

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
              <div className="tj-faq tj-faq-2" id="tjAccordionHome3">

                {/* FAQ 1 */}
                <div
                  className="tj-accordion-item tj-fade-anim"
                  data-delay=".2"
                  data-duration="0.6"
                >
                  <button
                    className="tj-accordion-title collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#home3-accordion-1"
                    aria-expanded="false"
                  >
                    Who can join Catalyst SkillHub courses?
                  </button>

                  <div
                    id="home3-accordion-1"
                    className="collapse"
                    data-bs-parent="#tjAccordionHome3"
                  >
                    <div className="accordion-body tj-accordion-content">
                      Catalyst SkillHub courses are suitable for students,
                      graduates, job seekers, and working professionals at
                      different stages of their careers. Whether you want to
                      start a new career, switch fields, or upskill for better
                      opportunities, our programmes are designed to help you
                      build relevant, practical skills for the workplace.
                    </div>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div
                  className="tj-accordion-item tj-fade-anim"
                  data-delay=".3"
                  data-duration="0.6"
                >
                  <button
                    className="tj-accordion-title collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#home3-accordion-2"
                    aria-expanded="false"
                  >
                    Are SkillHub courses available online and offline?
                  </button>

                  <div
                    id="home3-accordion-2"
                    className="collapse"
                    data-bs-parent="#tjAccordionHome3"
                  >
                    <div className="accordion-body tj-accordion-content">
                      Yes. SkillHub offers both online and offline learning
                      options across all programmes. Join classes at our
                      offline centres in Kannur, Calicut, Vadakara, Manjeri,
                      Kottakkal, Perinthalmanna, Edappal, Thrissur, and Kochi,
                      or choose flexible online learning with live classes and
                      recorded sessions for convenient learning and revision.
                    </div>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div
                  className="tj-accordion-item tj-fade-anim"
                  data-delay=".4"
                  data-duration="0.6"
                >
                  <button
                    className="tj-accordion-title collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#home3-accordion-3"
                    aria-expanded="false"
                  >
                    What courses are offered by Catalyst SkillHub?
                  </button>

                  <div
                    id="home3-accordion-3"
                    className="collapse"
                    data-bs-parent="#tjAccordionHome3"
                  >
                    <div className="accordion-body tj-accordion-content">
                      SkillHub offers programmes across three categories:
                      Accounting courses including Certified Indian and Foreign
                      Accounting (CIFA), GCC Accounting, Business Accounting,
                      and SAP Accounting; Marketing and Management courses
                      including Digital Marketing, HR Management, and Office
                      Administration; and Tech courses including Python
                      Full-Stack with DevOps, Data Analytics with Gen AI, and
                      Cyber Security.
                    </div>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div
                  className="tj-accordion-item tj-fade-anim"
                  data-delay=".5"
                  data-duration="0.6"
                >
                  <button
                    className="tj-accordion-title collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#home3-accordion-4"
                    aria-expanded="false"
                  >
                    Will I get practical learning along with the course?
                  </button>

                  <div
                    id="home3-accordion-4"
                    className="collapse"
                    data-bs-parent="#tjAccordionHome3"
                  >
                    <div className="accordion-body tj-accordion-content">
                      Yes. SkillHub courses include practical, industry-relevant
                      learning to help you apply what you learn. Depending on
                      the programme, you’ll work with practical tasks, projects,
                      tools, case studies, and workplace-based activities to
                      build skills you can use in real professional settings.
                    </div>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div
                  className="tj-accordion-item tj-fade-anim"
                  data-delay=".6"
                  data-duration="0.6"
                >
                  <button
                    className="tj-accordion-title collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#home3-accordion-5"
                    aria-expanded="false"
                  >
                    Do you provide placement assistance for all courses?
                  </button>

                  <div
                    id="home3-accordion-5"
                    className="collapse"
                    data-bs-parent="#tjAccordionHome3"
                  >
                    <div className="accordion-body tj-accordion-content">
                      Yes. SkillHub provides placement assistance to help you
                      prepare for relevant job opportunities. Depending on the
                      programme, support may include job readiness sessions,
                      CV and LinkedIn optimization, mock interviews, interview
                      preparation, career guidance, and assistance in exploring
                      suitable opportunities.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Faq;
