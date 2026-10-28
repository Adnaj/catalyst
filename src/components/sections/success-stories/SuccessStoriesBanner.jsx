import { useState } from "react";
import LeadPopup from "../../common/LeadPopup";
import "../campus/Campus.css"; // reuses .cp-chips / .cp-chip

const SuccessStoriesBanner = () => {
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);

  return (
    <>
      <div className="space-for-header" />
      <section className="tj-banner-section fix">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-content">
                <span
                  className="sec-subtitle tj-fade-anim"
                  data-direction="top"
                  data-duration="0.5"
                >
                  <i className="tji-subtitle"></i> Real Learners. Real Careers.
                </span>

                <h1 className="banner-title tj-fade-anim" data-delay="0.3">
                 Catalyst Skillhub Success Stories
                </h1>

                <div className="banner-desc tj-fade-anim" data-delay="0.5">
                  See how our learners built new skills, changed careers and moved ahead with Catalyst SkillHub across Accounting, Marketing & Management, and Technology.
                </div>

                <div className="btn-area tj-fade-anim" data-delay=".6">
                  <button
                    type="button"
                    className="tj-btn-primary flip-text-wrap"
                    onClick={() => setIsLeadPopupOpen(true)}
                  >
                    <span className="btn-text">Enquire now</span>
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>
                  </button>
                </div>


              </div>
            </div>

            <div className="col-lg-6">
              <div className="banner-img campus-img-banner d-flex justify-content-center">
                <img src="/assets/images/hero/success-stories.png" alt="Catalyst Skillhub Success Stories" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadPopup
        isOpen={isLeadPopupOpen}
        onClose={() => setIsLeadPopupOpen(false)}
        meta={{ source: "success-stories-banner-enquire" }}
      />
    </>
  );
};

export default SuccessStoriesBanner;