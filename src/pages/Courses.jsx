import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import CourseIntro from "../components/sections/courses/CourseIntro";
import CoursesAll from "../components/sections/courses/CoursesAll";
import Promo from "../components/sections/home3/Promo";
import Categories from "../components/sections/home3/Categories";



const sections = [
  CourseIntro,
    Promo,
  CoursesAll,



];

const Courses = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);

export default Courses;