import { useState } from "react";
import { Link } from "react-router-dom";
import MainMenu from "../MainMenu";
import LeadPopup from "../../common/LeadPopup";

// Auto-converted from index-3.html (Sticky Header Area)
const StickyHeader = () => {
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);

  return (
    <>
      <header className="header-area header-3 header-duplicate header-sticky">
        <div className="header-bottom">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="header-wrapper">
                  <div className="site_logo">
                    <a className="logo" href="#">
                      <img
                        src="/assets/images/hero/logo.png"
                        alt="Logo"
                      />
                    </a>
                  </div>

                  <div className="menu-area d-none d-lg-inline-flex align-items-center">
                    <MainMenu
                      {...("StickyHeader" === "Header"
                        ? { id: "mobile-menu" }
                        : {})}
                    />
                  </div>

                  <div className="header-right-item d-inline-flex align-items-center">
                    <div className="header-button d-lg-flex d-none">
                      <button
                        type="button"
                        className="tj-btn-primary style-2 style-2-sm flip-text-wrap"
                        onClick={() => setIsLeadPopupOpen(true)}
                      >
                        <span className="btn-icon">
                          <i className="tji-arrow-right-2"></i>
                        </span>{" "}
                        <span className="btn-text">Enquire Now</span>
                      </button>
                    </div>

                    <button className="menu_btn mobile_menu_bar d-lg-none">
                      <span className="bars">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <LeadPopup
        isOpen={isLeadPopupOpen}
        onClose={() => setIsLeadPopupOpen(false)}
      />
    </>
  );
};

export default StickyHeader;