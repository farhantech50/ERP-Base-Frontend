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
    roles: [
      "Super Admin",
      "Admin",
      "Factory & Production Manager",
      "Factory & Production Executive",
      "Inventory Manager",
      "Inventory Executive",
      "Sales Manager",
      "Sales Executive",
      "Accounts Manager",
      "Accounts Executive",
      "Marketing Manager",
      "Marketing Executive",
      "HR Manager",
      "HR Executive",
      "POS User",
    ],
    subMenu: [],
  },
  {
    key: "hr_employee",
    title: "HR & Admin",
    path: "/hr/employees",
    icon: FaUsers,
    roles: [
      "Super Admin",
      "Admin",
      "HR Manager",
      "HR Executive",
      "Sales Manager",
      "Sales Executive",
      "Inventory Manager",
      "Inventory Executive",
      "Factory & Production Manager",
      "Factory & Production Executive",
      "Accounts Manager",
      "Accounts Executive",
      "Marketing Manager",
      "Marketing Executive",
      "POS User",
    ],
    subMenu: [
      {
        title: "Setup",
        path: "/hr/setup",
        icon: FaUserCog,
        roles: ["Super Admin", "Admin", "HR Manager", "HR Executive"],
      },
      {
        title: "Employees",
        path: "/hr/employees",
        icon: FaUser,
        roles: ["Super Admin", "Admin", "HR Manager", "HR Executive"],
      },
      {
        title: "Roles & Permissions",
        path: "/hr/permissions",
        icon: MdAdminPanelSettings,
        roles: ["Super Admin", "Admin"],
      },
      {
        title: "Active Users",
        path: "/hr/active-users",
        icon: FaUsers,
        roles: ["Super Admin", "Admin"],
      },
    ],
  }
];

export default menuConfig;
