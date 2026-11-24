const AboutCounter = () => (
  <>
    <section  className="about-counter-section section-gap-bottom fix">
            <div  className="container">
              <div  className="row rg-30">
                <div  className="col-xl-3 col-sm-6 tj-fade-anim" data-delay=".4">
                  <div
                     className="tj-counter-item tj-counter-item-2 skill-counter-item tj-theme-bg-6"
                  >
                    <div  className="tj-counter">
                      <div  className="counter-number">
                        <span  className="counter" data-target="1000">50</span>
                        <span  className="suffix">+</span>
                      </div>
                      <div  className="counter-label">Expert Faculty</div>
                    </div>
                  </div>
                </div>
                <div  className="col-xl-3 col-sm-6 tj-fade-anim" data-delay=".3">
                  <div
                     className="tj-counter-item tj-counter-item-2 skill-counter-item tj-theme-bg-2"
                  >
                    <div  className="tj-counter">
                      <div  className="counter-number">
                        <span  className="counter" data-target="100">15</span>
                        <span  className="suffix">%</span>
                      </div>
                      <div  className="counter-label">Placement Assistanc</div>
                    </div>
                  </div>
                </div>
                <div  className="col-xl-3 col-sm-6 tj-fade-anim" data-delay=".5">
                  <div
                     className="tj-counter-item tj-counter-item-2 skill-counter-item tj-theme-bg"
                  >
                    <div  className="tj-counter">
                      <div  className="counter-number">
                        <span  className="counter" data-target="5">1</span>
                        <span  className="suffix">+</span>
                      </div>
                      <div  className="counter-label">Languages</div>
                    </div>
                  </div>
                </div>
                <div  className="col-xl-3 col-sm-6 tj-fade-anim" data-delay=".5">
                  <div  className="tj-reviews-item tj-theme-bg-7">
                    <ul  className="tj-users-list">
                      <li>
                        <img
                          src="/assets/images/users/user-img-1.png"
                          alt="USER" />
                      </li>
                      <li>
                        <img
                          src="/assets/images/users/user-img-2.png"
                          alt="USER" />
                      </li>
                      <li>
                        <img
                          src="/assets/images/users/user-img-3.png"
                          alt="USER" />
                      </li>
                     
                    </ul>
                    <div  className="reviews-label">35000+ Students Join Us.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  </>
);

export default AboutCounter;