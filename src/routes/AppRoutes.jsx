import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { usePermissionStore } from "../store/permissionStore";
import Layout from "../layout/Main";
import PageLoader from "../components/PageLoader";
import {
  websiteRoutes,
  publicRoutes,
  protectedRoutes,
  errorRoutes,
} from "../config/routeConfig";
import ScrollToTop from "../components/ScrollToTop";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, authUser } = useAuthStore();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => {
  const { isLoggedIn, authUser } = useAuthStore();
  const { fetchMyPermissions } = usePermissionStore();

  useEffect(() => {
    if (isLoggedIn) {
      fetchMyPermissions();
    }
  }, [isLoggedIn, fetchMyPermissions]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Website Routes */}
        {websiteRoutes.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}

        {/* Public Auth Routes */}
        {publicRoutes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              isLoggedIn && (path === "/login" || path === "/register") ? (
                <Navigate
                  to={`/dashboard/${authUser?.roleName
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  replace
                />
              ) : (
                <Element />
              )
            }
          />
        ))}

        {/* Protected ERP Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {protectedRoutes.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Route>

        {/* Error Routes */}
        {errorRoutes.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
