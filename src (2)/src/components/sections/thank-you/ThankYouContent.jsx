import { Link } from "react-router-dom";

// Thank-you page content (route: /thank-you). Shown after the contact form is sent.
// Uses the same classes / layout as the 404 page (page header + centered message).
const ThankYouContent = () => (
  <>
    <div className="space-for-header"></div>

    {/* start: Page Header Section */}
    <section className="tj-page-header error-page-header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tj-page-header-content">
              <div className="tj-page-link">
                <span>
                  <i className="tji-home"></i>
                </span>
                <span>
                  <Link to="/">Home</Link>
                </span>
                <span>
                  <i className="tji-arrow-right-4"></i>
                </span>
                <span>
                  <span>Thank you</span>
                </span>
              </div>
              <div className="shape">
                <img src="/assets/images/shapes/stars.png" alt="" />
              </div>
            </div>
              <div className=" mt-5 text-center">
              <div className="tj-error-content mt-5">
                <div className="error-img mt-5">
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: "var(--tj-color-theme-primary)",
                      color: "#fff",
                      fontSize: 52,
                    }}
                  >
                    <i className="tji-check"></i>
                  </span>
                </div>
                <span className="sec-subtitle">
                  <i className="tji-subtitle"></i> Message received
                </span>
                <h2 className="error-title">Thank you for connecting with us!</h2>
                <div className="error-desc">We’ll reach out to you soon.</div>
                <div className="error-btn d-flex flex-wrap align-items-center justify-content-center gap-3">
                  <Link className="tj-btn-primary flip-text-wrap" to="/">
                    <span className="btn-text">Back to home</span>
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>
                  </Link>
                  <Link
                    className="tj-btn-primary tj-btn-primary-light flip-text-wrap"
                    to="/courses"
                  >
                    <span className="btn-text">Explore courses</span>
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* end: Page Header Section */}


  </>
);

export default ThankYouContent;