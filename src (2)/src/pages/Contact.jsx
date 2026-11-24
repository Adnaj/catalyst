import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import Contact from "../components/sections/contact/Contact";




const sections = [

  Contact

];

const ContactUs = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);

export default ContactUs;