import {
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-5 gap-12">

          {/* Brand */}

          <div className="lg:col-span-2">

            <h2 className="text-4xl font-extrabold text-white">
              VendorVerse
            </h2>

            <p className="mt-6 leading-8 text-slate-400 max-w-md">
              Connecting customers with trusted local vendors across
              Chhattisgarh for weddings, birthdays, corporate events
              and every special occasion.
            </p>

            <div className="space-y-4 mt-8">

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Bhilai, Chhattisgarh</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@vendorverse.in</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white font-semibold text-lg mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">

              <li><Link to="/">Home</Link></li>

              <li><Link to="/vendors">Browse Vendors</Link></li>

              <li><a href="#">Categories</a></li>

              <li><a href="#">How It Works</a></li>

            </ul>

          </div>

          {/* Categories */}

          <div>

            <h3 className="text-white font-semibold text-lg mb-6">
              Categories
            </h3>

            <ul className="space-y-4">

              <li>Photography</li>

              <li>Catering</li>

              <li>Decoration</li>

              <li>Makeup</li>

              <li>DJ</li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-white font-semibold text-lg mb-6">
              Company
            </h3>

            <ul className="space-y-4">

              <li>About</li>

              <li>Become Vendor</li>

              <li>Contact</li>

              <li>Privacy Policy</li>

            </ul>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-slate-400 text-sm">
            © 2026 VendorVerse. Made with ❤️ in Chhattisgarh.
          </p>

          <div className="flex gap-5">

          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">

            <FaInstagram
              className="hover:text-emerald-400 cursor-pointer transition"
              />

            </div>

          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">

            <FaLinkedinIn
              className="hover:text-emerald-400 cursor-pointer transition"
            />
          </div>

          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">

            <FaFacebookF
              className="hover:text-emerald-400 cursor-pointer transition"
            />
          </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;