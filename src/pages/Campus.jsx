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
import Students from "../components/sections/home3/Students";
import CampusFaq from "../components/sections/campus/CampusFaq";
import ContactForm from "../components/sections/home2/ContactForm";

const CampusInstructors = () => (
  <div className="campus-feature-section">
    <Promo />
    <CareerPaths/>
  </div>
);

const sections = [CampusBanner, CampusLocations,CampusInstructors,Instructors, Students, CampusFaq, ContactForm];

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