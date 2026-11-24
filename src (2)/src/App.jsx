import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home3 from "./pages/Home3";
import Home2 from "./pages/Home2";
import CourseDetails from "./pages/CourseDetails";
import OnlineCourseDetails from "./pages/OnlineCourseDetails";
import About from "./pages/About";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import OnlineCourses from "./pages/Onlinecourses";
import CourseCategory from "./pages/CourseCategory";
import Campus from "./pages/Campus";
import Campuses from "./pages/Campuses";
import SuccessStories from "./pages/SuccessStories";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import AdminApp from "./admin/AdminApp";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />

    <Routes>
      <Route path="/" element={<Home3 />} />
      <Route path="/home-2" element={<Home2 />} />
      <Route path="/about" element={<About />} />
      <Route path="/career" element={<Career />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Courses-online" element={<OnlineCourses />} />
      <Route
        path="/courses-online/:slug"
        element={<OnlineCourseDetails />}
      />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:slug" element={<CourseDetails />} />
      <Route path="/category/:categorySlug" element={<CourseCategory />} />
      <Route path="/campus/:campusSlug" element={<Campus />} />
      <Route path="/campus" element={<Campuses />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
       <Route path="/thank-you" element={<ThankYou />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  </BrowserRouter>
);

export default App;