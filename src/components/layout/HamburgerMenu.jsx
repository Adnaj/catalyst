import MobileMenu from "./MobileMenu";
// Converted from index-2.html (Hamburger Menu)
const HamburgerMenu = () => (
  <>
    <div className="hamburger-area">
      <div className="hamburger_bg"></div>
      <div className="hamburger_wrapper">
        <div className="hamburger_inner">
          <div className="hamburger_top d-flex align-items-center justify-content-between">
            <div className="hamburger_logo">
              <a href="#" className="mobile_logo">
                <img src="/assets/images/logos/logo.png" alt="Logo" />
              </a>
            </div>
            <div className="hamburger_close">
              <button className="hamburger_close_btn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 1L1 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M1 1L17 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="hamburger-text d-none d-lg-block">
            <p>
              {" "}
              Developing personalize our customer journeys to increase
              satisfaction &amp; loyalty of our expansion recognized by industry
              leaders.{" "}
            </p>
          </div>
          <div className="hamburger-search-area">
            <h5 className="hamburger-title">Search now</h5>
            <div className="hamburger_search">
              <form method="get" action="index.html">
                <button type="submit">
                  <i className="tji-search"></i>
                </button>{" "}
                <input
                  type="search"
                  autoComplete="off"
                  name="s"
                  defaultValue=""
                  placeholder="Search here..."
                />
              </form>
            </div>
          </div>
          <div className="hamburger_menu">
            <div className="mobile_menu">
              <MobileMenu />
            </div>
          </div>
          <div className="hamburger-infos">
            <h5 className="hamburger-title">Contact info</h5>
            <div className="contact-info">
              <div className="contact-item">
                <span className="subtitle">Phone:</span>{" "}
                <a className="contact-link" href="tel:+1(009)544-7818">
                  +1 (009) 544-7818
                </a>
              </div>
              <div className="contact-item">
                <span className="subtitle">Email:</span>{" "}
                <a className="contact-link" href="mailto:support@edunex.com">
                  support@edunex.com
                </a>
              </div>
              <div className="contact-item">
                <span className="subtitle">Location:</span>{" "}
                <span className="contact-link">
                  189 Congress, Suite 300 TX 78701, USA
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hamburger-socials">
          <h5 className="hamburger-title">Follow us</h5>
          <div className="social-links">
            <ul className="tj-socials">
              <li>
                <a href="https://facebook.com" target="_blank">
                  <i className="tji-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank">
                  <i className="tji-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank">
                  <i className="tji-x-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/" target="_blank">
                  <i className="tji-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default HamburgerMenu;
