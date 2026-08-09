import Home from "../pages/website/Home";

import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import EmployeeDashboard from "../pages/Dashboard/EmployeeDashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import AccessDenied from "../pages/Landing/AccessDenied";
import NotFound from "../pages/Landing/NotFound";

import Employees from "../pages/HR/Employees/Employees";
import Setup from "../pages/HR/Setup/Setup";
import RolesPermissions from "../pages/HR/RolesPermissions/RolesPermissions";
import LookupManagement from "../pages/HR/Setup/LookupManagement/LookupManagement";
import ActiveUsers from "../pages/HR/ActiveUsers/ActiveUsers";

const Empty = () => (
  <div className="p-4 text-gray-500">Module Component Coming Soon...</div>
);

export const websiteRoutes = [
  { path: "/", element: Home },
];

export const publicRoutes = [
  { path: "/login", element: Login },
  { path: "/register", element: Register },
  { path: "/forgot-password", element: ForgotPassword },
  { path: "/reset-password", element: ResetPassword },
];

export const protectedRoutes = [
  { path: "/dashboard/super-admin", element: AdminDashboard },
  { path: "/dashboard/admin", element: AdminDashboard },
  { path: "/dashboard/employee", element: EmployeeDashboard },
  // Keeping base generic dashboard for any other roles you might add
  { path: "/dashboard/:role", element: EmployeeDashboard }, 
  
  // HR & Admin Routes for Base
  { path: "/hr/setup", element: Setup },
  { path: "/hr/setup/lookup-management", element: LookupManagement },
  { path: "/hr/employees", element: Employees },
  { path: "/hr/permissions", element: RolesPermissions },
  { path: "/hr/active-users", element: ActiveUsers },
];

export const errorRoutes = [
  { path: "/unauthorized", element: AccessDenied },
  { path: "*", element: NotFound },
];
