import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import OnlineCourseDetailsContent from "../components/sections/course-details/Onlinecoursedetailscontent";

// Offline course detail page: /offline-courses/:slug  (design lives in Onlinecoursedetailscontent.jsx)
const sections = [OnlineCourseDetailsContent];

const OnlineCourseDetails = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);

export default OnlineCourseDetails;