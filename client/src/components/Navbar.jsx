import { Link, NavLink } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

import { useState } from "react";

import useAuth from "../hooks/useAuth";
import NotificationBell from "./Notification/NotificationBell";

function Navbar() {
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}

          <Link to="/" className="text-4xl font-extrabold text-emerald-600">
            VendorVerse
          </Link>

          {/* Navigation */}

          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-700 hover:text-emerald-600 transition"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/vendors"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-700 hover:text-emerald-600 transition"
              }
            >
              Vendors
            </NavLink>

            <a
              href="/#categories"
              className="text-gray-700 hover:text-emerald-600 transition"
            >
              Categories
            </a>

            <a
              href="/#how-it-works"
              className="text-gray-700 hover:text-emerald-600 transition"
            >
              How It Works
            </a>

            <a
              href="/#about"
              className="text-gray-700 hover:text-emerald-600 transition"
            >
              About
            </a>
          </nav>

          {/* Right */}

          <div className="hidden md:flex items-center gap-4">
            {/* Location */}

            <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 hover:border-emerald-500 transition">
              <FaMapMarkerAlt className="text-emerald-600" />

              <span>Bhilai</span>
            </button>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="font-medium hover:text-emerald-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-emerald-600 hover:bg-emerald-700 transition text-white px-5 py-2 rounded-xl"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <NotificationBell />

                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="
          flex
          items-center
          gap-3
          border
          border-gray-200
          rounded-xl
          px-4
          py-2
          hover:border-emerald-500
          transition
        "
                  >
                    <div
                      className="
            w-10
            h-10
            rounded-full
            bg-emerald-600
            flex
            items-center
            justify-center
            text-white
            font-bold
          "
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="text-left">
                      <p className="font-semibold">{user.name}</p>

                      <p className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>

                    <ChevronDown size={18} />
                  </button>

                  {menuOpen && (
                    <div
                      className="
            absolute
            right-0
            mt-3
            w-56
            bg-white
            rounded-2xl
            border
            border-slate-200
            shadow-xl
            overflow-hidden
            z-50
          "
                    >
                      <Link
                        to={
                          user.role === "vendor"
                            ? "/vendor-dashboard"
                            : user.role === "admin"
                              ? "/admin-dashboard"
                              : "/customer-dashboard"
                        }
                        className="
              block
              px-5
              py-4
              hover:bg-slate-100
            "
                        onClick={() => setMenuOpen(false)}
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={logout}
                        className="
              w-full
              text-left
              px-5
              py-4
              text-red-600
              hover:bg-red-50
            "
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
