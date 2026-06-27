import { Link, NavLink } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}

          <Link
            to="/"
            className="text-4xl font-extrabold text-emerald-600"
          >
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
              href="#categories"
              className="text-gray-700 hover:text-emerald-600 transition"
            >
              Categories
            </a>

            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-emerald-600 transition"
            >
              How It Works
            </a>

            <a
              href="#footer"
              className="text-gray-700 hover:text-emerald-600 transition"
            >
              About
            </a>

          </nav>

          {/* Right */}

          <div className="hidden md:flex items-center gap-4">

            <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 hover:border-emerald-500 transition">

              <FaMapMarkerAlt className="text-emerald-600" />

              <span>Bhilai</span>

            </button>

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

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;