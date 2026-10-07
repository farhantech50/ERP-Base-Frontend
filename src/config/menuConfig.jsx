import { MdDashboard, MdAdminPanelSettings } from "react-icons/md";
import { FaUsers, FaUserCog, FaUser } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";

const role =
  useAuthStore
    .getState()
    ?.authUser?.roleName?.toLowerCase()
    .replace(/\s+/g, "-") || "";

const menuConfig = [
  {
    key: "dashboard",
    title: "Dashboard",
    path: `/dashboard/${role}`,
    icon: MdDashboard,
    permission: "VIEW_DASHBOARD",
    subMenu: [],
  },
  {
    key: "hr_employee",
    title: "HR & Admin",
    path: "/hr/employees",
    icon: FaUsers,
    permission: "VIEW_HR_ADMIN",
    subMenu: [
      {
        title: "Setup",
        path: "/hr/setup",
        icon: FaUserCog,
        permission: "VIEW_SETUP",
      },
      {
        title: "Employees",
        path: "/hr/employees",
        icon: FaUser,
        permission: "VIEW_EMPLOYEES",
      },
      {
        title: "Roles & Permissions",
        path: "/hr/permissions",
        icon: MdAdminPanelSettings,
        permission: "VIEW_ROLES_PERMISSIONS",
      },
      {
        title: "Active Users",
        path: "/hr/active-users",
        icon: FaUsers,
        permission: "VIEW_ACTIVE_USERS",
      },
    ],
  }
];

export default menuConfig;
