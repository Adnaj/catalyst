import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import CourseDetailsContent from "../components/sections/course-details/CourseDetailsContent";
import ContactForm from "../components/sections/home2/ContactForm";
import  Students from "../components/sections/home3/Students";
import Review from "../components/sections/home2/Testimonials";
import Testimonials from "../components/sections/home3/Testimonials";
import Instructors from "../components/sections/home3/Instructors";
import AboutCounter from "../components/sections/about/AboutCounter";
import Blog from "../components/sections/home2/Blog";
import LearningOptions from "../components/sections/course-details/LearningOptions";



const Contact = () => (
  <div id="contact">
  
    


  </div>
);

const sections = [CourseDetailsContent];

const CourseDetails = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);
export default CourseDetails;
