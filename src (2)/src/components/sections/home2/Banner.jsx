// Converted from index-2.html (Banner Section)
const Banner = () => (
  <>
    <section className="tj-banner-section-2 fix tj-parallaxed-container">
      <div
        className="bg-img"
        data-bg-image="/assets/images/hero/h2-hero-bg.png"
      ></div>
      <div className="shape-blur">
        <img src="/assets/images/shapes/blur-shape.png" alt="" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="banner-content-2">
              <span
                className="sec-subtitle sec-subtitle-2 tj-fade-anim"
                data-direction="top"
                data-duration="0.5"
              >
                Trusted by 80,000+ ambitious professionals{" "}
              </span>
              <h1 className="banner-title tj-text-light-1 tj-fade-anim">
                {" Find Expert Coach and Unlock "}
                <span className="title-gradient">Full Potential.</span>
              </h1>
              <div className="banner-desc tj-fade-anim">
                {" "}
                Connect with experienced mentors and coaches who help you
                achieve personal growth, career success, and professional your
                schedule, at your pace.{" "}
              </div>
              <div className="btn-area tj-fade-anim" data-delay=".5">
                <a className="tj-btn-primary-2" href="#">
                  <span className="btn-inner">
                    <span className="btn-text">
                      <span>Find a coach</span>
                    </span>{" "}
                    <span className="btn-icon">
                      <span>
                        <i className="tji-arrow-right-2"></i>
                      </span>
                    </span>
                  </span>
                </a>{" "}
                <a className="tj-btn-primary-2 tj-btn-primary-2-blur" href="#">
                  <span className="btn-inner">
                    <span className="btn-text">
                      <span>Become a coach</span>
                    </span>{" "}
                    <span className="btn-icon">
                      <span>
                        <i className="tji-arrow-right-2"></i>
                      </span>
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <div className="banner-img-2 tj-fade-anim" data-delay=".5">
              <img src="/assets/images/hero/h2-hero-img.webp" alt="Image" />
            </div>
          </div>
        </div>
      </div>
      <div
        className="banner-coach-box d-lg-block d-none tj-fade-anim"
        data-delay=".6"
        data-direction="right"
      >
        <div className="banner-coach-box-inner tj-parallaxed">
          <div className="author-wrap">
            <div className="author-avatar">
              <img src="/assets/images/users/user-img-5.png" alt="" />
            </div>
            <div className="author-info">
              <h3 className="name tj-fs-h6">Devoin Lanee</h3>
              <span className="designation">Business coach</span>
            </div>
          </div>
          <div className="box-bottom d-flex align-items-center justify-content-between">
            <div className="single-rating">
              <i className="tji-star"></i>{" "}
              <span className="label">
                4.9<span>(3K+)</span>
              </span>
            </div>
            <div className="available">Available</div>
          </div>
        </div>
      </div>
      <div
        className="banner-progress-box-2 d-lg-block d-none tj-fade-anim"
        data-delay=".6"
        data-direction="left"
      >
        <div className="banner-progress-box-2-inner tj-parallaxed">
          <span className="box-title">This week</span>
          <div className="tj-counter">
            <div className="counter-number">
              <span className="prefix">+</span>{" "}
              <span className="counter" data-target="38">
                38
              </span>{" "}
              <span className="suffix">%</span>
            </div>
          </div>
          <span className="text">Goal progress</span>
          <div className="progress-line">
            <span></span>
          </div>
        </div>
      </div>
      <div
        className="banner-coaches d-lg-block d-none tj-fade-anim"
        data-delay=".8"
        data-direction="right"
      >
        <div className="banner-coaches-inner tj-parallaxed">
          <ul className="tj-users-list">
            <li>
              <img src="./assets/images/users/user-img-1.png" alt="USER" />
            </li>
            <li>
              <img src="./assets/images/users/user-img-2.png" alt="USER" />
            </li>
            <li>
              <img src="./assets/images/users/user-img-3.png" alt="USER" />
            </li>
            <li>
              <span>7K+</span>
            </li>
          </ul>
          <h6 className="title">+12 New</h6>
          <div className="text">coaches joined</div>
        </div>
      </div>
      <div
        className="banner-coach-box banner-coach-box-2 d-lg-block d-none tj-fade-anim"
        data-delay=".8"
        data-direction="left"
      >
        <div className="banner-coach-box-inner tj-parallaxed">
          <span className="box-title">Next session</span>
          <div className="author-wrap">
            <div className="author-avatar">
              <img src="/assets/images/users/user-img-7.png" alt="" />
            </div>
            <div className="author-info">
              <h3 className="name tj-fs-h6">Devoin Lanee</h3>
              <span className="designation">Today . 4:30 PM</span>
            </div>
          </div>
          <div className="box-bottom">
            <a href="#">Join call</a>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Banner;
