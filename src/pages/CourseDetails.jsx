import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import CourseDetailsContent from "../components/sections/course-details/CourseDetailsContent";

// Online course detail page: /courses/:slug
const sections = [CourseDetailsContent];

const CourseDetails = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);
export default CourseDetails;