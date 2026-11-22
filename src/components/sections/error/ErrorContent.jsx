import { Link } from "react-router-dom";

// 404 page content (route: any unknown URL). Class names are the same as error.html.
const ErrorContent = () => (
  <>

          <div className="space-for-header"></div>
          {/* start: Page Header Section */}
          <section className="tj-page-header error-page-header">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="tj-page-header-content">
                    {/* <div className="tj-page-link">
                      <span><i className="tji-home"></i></span>
                      <span>
                        <Link to="/">Home</Link>
                      </span>
                      <span><i className="tji-arrow-right-4"></i></span>
                      <span>
                        <span>Error 404</span>
                      </span>
                    </div> */}
                    <div className="shape">
                      <img src="/assets/images/shapes/stars.png" alt="" />
                    </div>
                  </div>
                    <div className=" text-center">
                    <div className="tj-error-content">
                      <div className="error-img">
                        <img src="/assets/images/404/error.png" alt="404" />
                      </div>

                      <h2 className="error-title">Oops! Page not found</h2>

                      <div
                        className="error-btn d-flex flex-wrap align-items-center justify-content-center gap-3"
                      >
                        <Link
                          className="tj-btn-primary flip-text-wrap"
                          to="/"
                        >
                          <span className="btn-text">Back to home</span>
                          <span className="btn-icon"
                            ><i className="tji-arrow-right-2"></i></span>
                        </Link>
                        <Link
                          className="tj-btn-primary tj-btn-primary-light flip-text-wrap"
                          to="/courses"
                        >
                          <span className="btn-text">Explore courses</span>
                          <span className="btn-icon"
                            ><i className="tji-arrow-right-2"></i></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* end: Page Header Section */}
          {/* start: Error Section */}

  </>
);

export default ErrorContent;