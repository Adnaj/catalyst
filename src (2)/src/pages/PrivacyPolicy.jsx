import PageLayout from "../components/layout/PageLayout";
import Header from "../components/layout/home3/Header";
import StickyHeader from "../components/layout/home3/StickyHeader";
import Footer from "../components/layout/home3/Footer";
import PrivacyPolicyContent from "../components/sections/privacy/PrivacyPolicyContent";

// Privacy policy page: /privacy-policy
const sections = [PrivacyPolicyContent];

const PrivacyPolicy = () => (
  <PageLayout {...{ Header, StickyHeader, Footer, sections }} alwaysSticky />
);

export default PrivacyPolicy;