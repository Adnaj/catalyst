import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import ThankYouContent from "../components/sections/thank-you/ThankYouContent";

// Thank-you page: /thank-you
const sections = [ThankYouContent];

const ThankYou = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);

export default ThankYou;