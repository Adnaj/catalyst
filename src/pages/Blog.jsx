import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import BlogHeader from "../components/sections/blog/BlogHeader";
import BlogList from "../components/sections/blog/BlogList";

// Blog listing page: /blog
const sections = [BlogHeader, BlogList];

const Blog = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);

export default Blog;