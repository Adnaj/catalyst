import { useParams } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import CategoryBanner from "../components/sections/course-category/CategoryBanner";
import CategoryCourses from "../components/sections/course-category/CategoryCourses";
import CareerPaths from "../components/sections/home3/CareerPaths";
import Centers from "../components/sections/home3/Centers";
import Faq from "../components/sections/home3/Faq";
import Blog from "../components/sections/home2/Blog";
import ContactForm from "../components/sections/home2/ContactForm";

const sections = [CategoryBanner, CategoryCourses, Centers, Faq,Blog,ContactForm ];

const CourseCategory = () => {
  const { categorySlug } = useParams();
  return (
    <PageLayout
      key={categorySlug}
      {...{ Header, StickyHeader, Footer, sections }}
      alwaysSticky
    />
  );
};

export default CourseCategory;