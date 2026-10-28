import { useState } from "react";
import PriceSwitcher from "../../common/PriceSwitcher";

// Converted from index-2.html (Pricing Section)
const Pricing = () => {
  const [yearly, setYearly] = useState(false);
  return (
    <>
      <section
        className="tj-pricing-section section-gap fix"
        data-bg-image="/assets/images/hero/h2-hero-bg.png"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-center">
                <span
                  className="sec-subtitle sec-subtitle-2 tj-fade-anim"
                  data-direction="top"
                >
                  Chose pricing plan
                </span>
                <h2
                  className="sec-title tj-fade-anim tj-text-light-1"
                  data-delay="0.3"
                >
                  {" "}
                  Choose Best Coaching Online plans.{" "}
                </h2>
                <PriceSwitcher yearly={yearly} onChange={setYearly} />
              </div>
              <div className="pricing-item-wrapper">
                <div
                  className="pricing-item pricing-item-lg tj-fade-anim"
                  data-duration="0.6"
                >
                  <div className="pricing-item-inner">
                    <div className="pricing-header">
                      <h3 className="package-title">Starter plan</h3>
                      <div className="package-desc">
                        {" "}
                        Perfect for individuals beginning.{" "}
                      </div>
                      <div className="package-price">
                        <span className="tj-currency">$</span>{" "}
                        <span className="tj-price">{yearly ? 22 : 29}</span>{" "}
                        <span className="tj-period">/ month</span>
                      </div>
                      <a
                        className="tj-btn-primary-2 tj-btn-primary-2-blur tj-btn-full"
                        href="#"
                      >
                        <span className="btn-inner">
                          <span className="btn-text">
                            <span>Chose plan</span>
                          </span>{" "}
                          <span className="btn-icon">
                            <span>
                              <i className="tji-arrow-right-2"></i>
                            </span>
                          </span>
                        </span>
                      </a>
                    </div>
                    <div className="pricing-footer">
                      <div className="pricing-features-title">Included</div>
                      <ul className="pricing-features">
                        <li>
                          <i className="tji-check"></i>
                          {"2 coaching sessions / month "}
                        </li>
                        <li>
                          <i className="tji-check"></i>
                          {"Group coaching access "}
                        </li>
                        <li>
                          <i className="tji-check"></i>
                          {"Goal setting resources "}
                        </li>
                        <li>
                          <i className="tji-check"></i>Session recordings
                        </li>
                        <li>
                          <i className="tji-check"></i>Email support
                        </li>
                        <li>
                          <i className="tji-check"></i>Progress tracking
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="pricing-item pricing-item-popular pricing-item-lg tj-fade-anim"
                  data-delay=".3"
                  data-duration="0.6"
                >
                  <div className="shape-blur">
                    <img src="/assets/images/shapes/blur-shape-2.png" alt="" />
                  </div>
                  <div className="pricing-item-inner">
                    <div className="pricing-badge">
                      <span className="pricing-badge-icon">
                        <img src="/assets/images/icons/fire.svg" alt="" />
                      </span>{" "}
                      <span className="pricing-badge-text">Most popular</span>
                    </div>
                    <div className="pricing-header">
                      <h3 className="package-title">Professional plan</h3>
                      <div className="package-desc">
                        {" "}
                        Ideal for professionals seeking.{" "}
                      </div>
                      <div className="package-price">
                        <span className="tj-currency">$</span>{" "}
                        <span className="tj-price">{yearly ? 69 : 79}</span>{" "}
                        <span className="tj-period">/ month</span>
                      </div>
                      <a className="tj-btn-primary-2 tj-btn-full" href="#">
                        <span className="btn-inner">
                          <span className="btn-text">
                            <span>Chose plan</span>
                          </span>{" "}
                          <span className="btn-icon">
                            <span>
                              <i className="tji-arrow-right-2"></i>
                            </span>
                          </span>
                        </span>
                      </a>
                    </div>
                    <div className="pricing-footer">
                      <div className="pricing-features-title">Included</div>
                      <ul className="pricing-features">
                        <li>
                          <i className="tji-check"></i>
                          {"6 Coaching sessions / month "}
                        </li>
                        <li>
                          <i className="tji-check"></i>1-on-1 coaching
                        </li>
                        <li>
                          <i className="tji-check"></i>
                          {"Priority email support "}
                        </li>
                        <li>
                          <i className="tji-check"></i>Progress reports
                        </li>
                        <li>
                          <i className="tji-check"></i>Community access
                        </li>
                        <li>
                          <i className="tji-check"></i>Session recordings
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="pricing-item pricing-item-lg tj-fade-anim"
                  data-delay=".5"
                  data-duration="0.6"
                >
                  <div className="pricing-item-inner">
                    <div className="pricing-header">
                      <h3 className="package-title">Elite plan</h3>
                      <div className="package-desc">
                        {" "}
                        Designed for leaders and individuals.{" "}
                      </div>
                      <div className="package-price">
                        <span className="tj-currency">$</span>{" "}
                        <span className="tj-price">{yearly ? 129 : 149}</span>{" "}
                        <span className="tj-period">/ month</span>
                      </div>
                      <a
                        className="tj-btn-primary-2 tj-btn-primary-2-blur tj-btn-full"
                        href="#"
                      >
                        <span className="btn-inner">
                          <span className="btn-text">
                            <span>Chose plan</span>
                          </span>{" "}
                          <span className="btn-icon">
                            <span>
                              <i className="tji-arrow-right-2"></i>
                            </span>
                          </span>
                        </span>
                      </a>
                    </div>
                    <div className="pricing-footer">
                      <div className="pricing-features-title">Included</div>
                      <ul className="pricing-features">
                        <li>
                          <i className="tji-check"></i>
                          {"Unlimited coaching sessions "}
                        </li>
                        <li>
                          <i className="tji-check"></i>
                          {"Dedicated personal coach "}
                        </li>
                        <li>
                          <i className="tji-check"></i>
                          {"Customized growth strategy "}
                        </li>
                        <li>
                          <i className="tji-check"></i>
                          {"Weekly performance reviews "}
                        </li>
                        <li>
                          <i className="tji-check"></i>
                          {"Priority scheduling "}
                        </li>
                        <li>
                          <i className="tji-check"></i>
                          {"Direct messaging support "}
                        </li>
                      </ul>
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
};

export default Pricing;
