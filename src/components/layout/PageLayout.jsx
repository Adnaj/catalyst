
import Preloader from "../common/Preloader";
import BackToTop from "../common/BackToTop";
import HamburgerMenu from "./HamburgerMenu";
import useSiteInteractions from "../../hooks/useSiteInteractions";
import useGsap from "../../hooks/useGsap";
import useSwipers from "../../hooks/useSwipers";

const PageLayout = ({
  Header,
  StickyHeader,
  Footer,
  sections = [],
  alwaysSticky = false,
}) => {
  useSwipers();
  useSiteInteractions(alwaysSticky);
  useGsap();


  return (
    <>
      <div className="body-overlay" />
      <Preloader />
      <BackToTop />
      <HamburgerMenu />

      <Header />
      <StickyHeader />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="primary" className="site-main">
            {sections.map((Section, index) => (
              <Section
                key={Section.name || `section-${index}`}
              />
            ))}
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default PageLayout;
