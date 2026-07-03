import {
  LayoutDashboard,
  CalendarCheck,
  Images,
  Star,
  User,
  Users,
  Settings,
  Briefcase,
  ClipboardList,
  BarChart3,
} from "lucide-react";

/* -----------------------------
   Customer
------------------------------ */

export const customerMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/customer-dashboard",
  },
  {
    title: "My Bookings",
    icon: CalendarCheck,
    path: "/customer-dashboard/bookings",
  },
  {
    title: "Reviews",
    icon: Star,
    path: "/customer-dashboard/reviews",
  },
  {
    title: "Profile",
    icon: User,
    path: "/customer-dashboard/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/customer-dashboard/settings",
  },
];

/* -----------------------------
   Vendor
------------------------------ */

export const vendorMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/vendor-dashboard",
  },
  {
    title: "Booking Requests",
    icon: ClipboardList,
    path: "/vendor-dashboard/bookings",
  },
  {
    title: "Portfolio",
    icon: Images,
    path: "/vendor-dashboard/portfolio",
  },
  {
    title: "Reviews",
    icon: Star,
    path: "/vendor-dashboard/reviews",
  },
  {
    title: "Business Profile",
    icon: Briefcase,
    path: "/vendor-dashboard/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/vendor-dashboard/settings",
  },
];

/* -----------------------------
   Admin
------------------------------ */

export const adminMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin-dashboard",
  },
  {
    title: "Users",
    icon: Users,
    path: "/admin-dashboard/users",
  },
  {
    title: "Vendors",
    icon: Briefcase,
    path: "/admin-dashboard/vendors",
  },
  {
    title: "Bookings",
    icon: CalendarCheck,
    path: "/admin-dashboard/bookings",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/admin-dashboard/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin-dashboard/settings",
  },
];
