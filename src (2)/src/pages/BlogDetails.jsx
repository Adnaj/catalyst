import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import BlogDetailsContent from "../components/sections/blog/BlogDetailsContent";

// Blog details page: /blog/:slug
const sections = [BlogDetailsContent];

const BlogDetails = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);

export default BlogDetails;