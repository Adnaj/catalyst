
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
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import CourseCategory from "./pages/CourseCategory";
import Campus from "./pages/Campus";
import SuccessStories from "./pages/SuccessStories";

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
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Courses" element={<Courses />} />
      <Route
        path="/courses/:slug"
        element={<CourseDetails />}
      />
      <Route path="/category/:categorySlug" element={<CourseCategory />} />
      <Route path="/campus/:campusSlug" element={<Campus />} />
      <Route path="/success-stories" element={<SuccessStories />} />
    </Routes>
  </BrowserRouter>
);

export default App;
