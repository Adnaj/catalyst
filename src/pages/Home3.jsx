import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import Banner from "../components/sections/home3/Banner";
import Categories from "../components/sections/home3/Categories";
import Promo from "../components/sections/home3/Promo";
import Clients from "../components/sections/home3/Clients";
import CareerPaths from "../components/sections/home3/CareerPaths";
import Courses from "../components/sections/home3/Courses";
import About from "../components/sections/home3/About";
import Features from "../components/sections/home3/Features";
import Instructors from "../components/sections/home3/Instructors";
import Events from "../components/sections/home3/Events";
import Testimonials from "../components/sections/home3/Testimonials";
import TextMarquee from "../components/sections/home3/TextMarquee";
import Faq from "../components/sections/home3/Faq";
import Blog from "../components/sections/home2/Blog";
import ContactForm from "../components/sections/home2/ContactForm";
import Students from "../components/sections/home3/Students";
import Centers from "../components/sections/home3/Centers";
import StudentJourney from "../components/sections/home3/StudentJourney";
import Timeline from "../components/sections/home3/Timeline";

// Reorder / remove sections here.
const sections = [
  Banner,
  Promo,
  Clients,
   Instructors,
  Courses,
  About,
      CareerPaths,
    Students,
    StudentJourney,
    // Timeline,
    Centers,
    
// Features,
  Testimonials,
  TextMarquee,
    Blog,
  Faq,

  ContactForm,

];

const Home3 = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} />
);
export default Home3;
