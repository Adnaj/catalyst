import { useParams } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import CampusBanner from "../components/sections/campus/CampusBanner";
import CampusLocations from "../components/sections/campus/CampusLocations";
import Promo from "../components/sections/home3/Promo";
import CareerPaths from "../components/sections/home3/CareerPaths";
import Instructors from "../components/sections/home3/Instructors";
import Faq from "../components/sections/home3/Faq";
import ContactForm from "../components/sections/home2/ContactForm";

const CampusInstructors = () => (
  <div className="campus-feature-section">
    <Promo />
    <CareerPaths/>
  </div>
);

const sections = [CampusBanner, CampusLocations,CampusInstructors,Instructors,Faq , ContactForm];

const Campus = () => {
  const { campusSlug } = useParams();
  return (
    <PageLayout
      key={campusSlug}
      {...{ Header, StickyHeader, Footer, sections }}
      alwaysSticky
    />
  );
};

export default Campus;