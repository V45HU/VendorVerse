import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import useAuth from "../../hooks/useAuth";

function DashboardSidebar({ menuItems }) {
  const { logout } = useAuth();

  return (
    <aside
      className="
        w-72
        bg-white
        border-r
        border-slate-200
        flex
        flex-col
      "
    >
      {/* Logo */}

      <div className="p-8">
        <Link
          to="/"
          className="
            text-3xl
            font-black
            text-emerald-600
          "
        >
          VendorVerse
        </Link>
      </div>

      {/* Menu */}

      <div
        className="
          flex-1
          px-5
          space-y-2
        "
      >
        {menuItems.map((item) => (
          <SidebarItem key={item.path} {...item} />
        ))}
      </div>

      {/* Logout */}

      <div className="p-5">
        <button
          onClick={logout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-red-50
            text-red-600
            py-4
            hover:bg-red-100
            transition
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
