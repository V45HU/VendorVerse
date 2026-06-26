import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold text-emerald-600"
        >
          VendorVerse
        </Link>

        {/* Navigation */}

        <div className="flex gap-8">

          <Link
            to="/"
            className="hover:text-emerald-600 transition"
          >
            Home
          </Link>

          <Link
            to="/vendors"
            className="hover:text-emerald-600 transition"
          >
            Vendors
          </Link>

          <Link
            to="/login"
            className="hover:text-emerald-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;