import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home2/Header";
import StickyHeader from "../components/layout/home2/StickyHeader";
import Footer from "../components/layout/home2/Footer";
import Banner from "../components/sections/home2/Banner";
import Clients from "../components/sections/home2/Clients";
import Instructors from "../components/sections/home2/Instructors";
import TextMarquee from "../components/sections/home2/TextMarquee";
import Growth from "../components/sections/home2/Growth";
import Courses from "../components/sections/home2/Courses";
import Categories from "../components/sections/home2/Categories";
import Pricing from "../components/sections/home2/Pricing";
import Faq from "../components/sections/home2/Faq";
import Testimonials from "../components/sections/home2/Testimonials";
import Blog from "../components/sections/home2/Blog";

const sections = [
  Banner,
  Clients,
  Instructors,
  TextMarquee,
  Growth,
  Courses,
  Categories,
  Pricing,
  Faq,
  Testimonials,
  Blog,
];

const Home2 = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} />
);
export default Home2;
