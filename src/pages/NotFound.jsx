import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import ErrorContent from "../components/sections/error/ErrorContent";

// 404 page: shown for any URL that has no route
const sections = [ErrorContent];

const NotFound = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);

export default NotFound;