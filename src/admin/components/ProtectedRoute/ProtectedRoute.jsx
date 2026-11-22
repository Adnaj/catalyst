import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./ProtectedRoute.css";

export default function ProtectedRoute({ children }) {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) return <div className="guard">Loading…</div>;

  if (!user) return <Navigate to="/admin/login" replace state={{ from: location }} />;

  if (user.role !== "admin") {
    return (
      <div className="guard">
        <div className="guard__box">
          <h1 className="guard__title">This account can't open the dashboard</h1>
          <p className="guard__text">
            You're signed in as {user.email}. Ask an existing admin to give your account the admin
            role, then sign in again.
          </p>
          <button type="button" className="guard__btn" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return children;
}
