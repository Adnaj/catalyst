import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import AboutHeader from "../components/sections/about/AboutHeader";
import AboutVideo from "../components/sections/about/AboutVideo";
import AboutCounter from "../components/sections/about/AboutCounter";
import AboutIntro from "../components/sections/about/AboutPlatform";
import Clients from "../components/sections/home3/Clients";
import Testimonials from "../components/sections/home3/Testimonials";
// import AboutClients from "../components/sections/about/AboutClients";
// import AboutInstructors from "../components/sections/about/AboutInstructors";
// import AboutTestimonials from "../components/sections/about/AboutTestimonials";
// import AboutFaq from "../components/sections/about/AboutFaq";
import Features from "../components/sections/home3/Features";
import Faq from "../components/sections/home3/Faq";
import ContactForm from "../components/sections/home2/ContactForm";
import Categories from "../components/sections/home3/Categories";
import Promo from "../components/sections/home3/Promo";

const sections = [
  AboutHeader,
  AboutVideo,
  AboutCounter,
  AboutIntro,
  Promo,
  Features,

  Testimonials,
    Clients,
  Faq,
  ContactForm
//   AboutClients,
//   AboutInstructors,
//   AboutTestimonials,
//   AboutFaq,
];

const About = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);

export default About;