import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import OnlineCourseIntro from "../components/sections/courses/OnlineCourseIntro";
import OnlineCoursesAll from "../components/sections/courses/OnlineCoursesAll";
import Faq from "../components/sections/home3/Faq";
import Promo from "../components/sections/home3/Promo";

// Offline courses page. Uses the same layout as the online /courses page for now;
// swap any section below (or edit OfflineCourseIntro / OfflineCoursesAll) to redesign it.
const sections = [OnlineCourseIntro, Promo, OnlineCoursesAll,Faq];

const OnlineCourses = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);

export default OnlineCourses;