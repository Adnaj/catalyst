import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import SuccessStoriesBanner from "../components/sections/success-stories/SuccessStoriesBanner";
import Students from "../components/sections/success-stories/Students";
import Testimonials from "../components/sections/home2/Testimonials";
import Faculty from "../components/sections/home3/Testimonials";
import Faq from "../components/sections/home3/Faq";
import Blog from "../components/sections/home2/Blog";
import ContactForm from "../components/sections/home2/ContactForm";


const sections = [SuccessStoriesBanner,Students,Testimonials,Faculty,Faq,ContactForm];

const SuccessStories = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);

export default SuccessStories;