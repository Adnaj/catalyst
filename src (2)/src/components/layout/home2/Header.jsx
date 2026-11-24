import MainMenu from "../MainMenu";
import { Link } from "react-router-dom";

// Converted from index-2.html (Header Area)
const Header = () => (
  <>
    <header className="header-area header-2 header-absolute">
      <div className="header-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="header-wrapper">
                <div className="site_logo">
                  <a className="logo" href="#">
                    <img src="/assets/images/logos/logo-2.png" alt="Logo" />
                  </a>
                </div>
                <div className="menu-area d-none d-lg-inline-flex align-items-center">
                  <MainMenu id="mobile-menu" />
                </div>
                <div className="header-right-item d-inline-flex">
                  <div className="header-cart">
                    <a className="cart-btn" href="#">
                      <i className="tji-cart-bag"></i>{" "}
                      <span className="cart-count">02</span>
                    </a>
                  </div>
                  <div className="header-user d-lg-none">
                    <a className="user-btn" href="#">
                      <i className="tji-user"></i>
                    </a>
                  </div>
                  <div className="header-button d-xl-flex d-none">
                    <a
                      className="tj-btn-primary tj-btn-primary-border tj-btn-primary-border-sm flip-text-wrap"
                      href="#"
                    >
                      <span className="btn-text">Log in</span>
                    </a>{" "}
                    <a
                      className="tj-btn-primary tj-btn-primary-sm flip-text-wrap"
                      href="#"
                    >
                      <span className="btn-text">Sign in</span>
                    </a>
                  </div>
                </div>
                <button className="menu_btn mobile_menu_bar d-lg-none">
                  <span className="bars">
                    <span></span> <span></span> <span></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </>
);

export default Header;
