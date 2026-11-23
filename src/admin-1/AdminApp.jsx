import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useTheme } from "./hooks/useTheme";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ToastProvider } from "./components/ui/Toast";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Courses from "./pages/Courses/Courses";
import CourseForm from "./pages/Courses/CourseForm";
import Categories from "./pages/Categories/Categories";
import Career from "./pages/Career/Career";
import Testimonial from "./pages/Testimonial/Testimonial";
import Leads from "./pages/Leads/Leads";
import ContactForm from "./pages/ContactForm/ContactForm";
import "./styles/admin-base.css";
import "./styles/admin-ui.css";

// Mounted in your main router as:  <Route path="/admin/*" element={<AdminApp />} />
export default function AdminApp() {
  const [theme, toggleTheme] = useTheme();

  return (
    <AuthProvider>
      <div className="admin-root">
        <ToastProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route element={<ProtectedRoute><AdminLayout theme={theme} onToggleTheme={toggleTheme} /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:mode/new" element={<CourseForm />} />
              <Route path="courses/:mode/:key/edit" element={<CourseForm />} />
              <Route path="categories" element={<Categories />} />
              <Route path="career" element={<Career />} />
              <Route path="testimonials" element={<Testimonial />} />
              <Route path="leads" element={<Leads />} />
              <Route path="contact" element={<ContactForm />} />
            </Route>

            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </ToastProvider>
      </div>
    </AuthProvider>
  );
}
