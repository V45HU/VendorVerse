import {
  CalendarCheck,
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
} from "lucide-react";

function BookingSidebar({ vendor }) {
  return (
    <aside className="sticky top-28">
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-7">
        {/* Heading */}

        <h3 className="text-2xl font-bold text-slate-900">Book This Vendor</h3>

        {/* Price */}

        <div className="mt-6">
          <p className="text-slate-500 text-sm">Starting Price</p>

          <h2 className="text-4xl font-bold mt-1">
            {vendor.startingPrice > 0
              ? `₹${vendor.startingPrice.toLocaleString("en-IN")}`
              : "Contact for Pricing"}
          </h2>

          <p className="text-slate-500">Per Event</p>
        </div>

        {/* Booking Button */}

        <button className="mt-7 w-full bg-emerald-600 hover:bg-emerald-700 transition text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2">
          <CalendarCheck size={20} />
          Send Booking Request
        </button>

        {/* Contact Buttons */}

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button className="border rounded-xl py-3 font-medium flex justify-center items-center gap-2 hover:bg-slate-50">
            <Phone size={18} />
            <a href={`tel:${vendor.phone}`} className="...">
              Call Now
            </a>
          </button>

          <button className="border rounded-xl py-3 font-medium flex justify-center items-center gap-2 hover:bg-slate-50">
            <MessageCircle size={18} />

            <a
              href={`https://wa.me/91${vendor.whatsapp || vendor.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="..."
            >
              WhatsApp
            </a>
          </button>
        </div>

        {/* Divider */}

        <div className="border-t my-7"></div>

        {/* Contact Details */}

        <div className="space-y-5 text-slate-600">
          <div className="flex gap-3">
            <MapPin size={18} className="mt-1 text-emerald-600" />

            <span>Bhilai, Chhattisgarh</span>
          </div>

          <div className="flex gap-3">
            <Mail size={18} className="mt-1 text-emerald-600" />

            <span>pixelstudio@email.com</span>
          </div>

          <div className="flex gap-3">
            <Phone size={18} className="mt-1 text-emerald-600" />

            <span>{vendor.phone}</span>
          </div>

          <div className="flex gap-3">
            <Clock size={18} className="mt-1 text-emerald-600" />

            <span>{vendor.workingHours || "Not specified"}</span>
          </div>
        </div>

        {/* Map Button */}

        <button className="w-full mt-8 border rounded-xl py-3 hover:bg-slate-50 font-medium">
          View On Map
        </button>
      </div>
    </aside>
  );
}

export default BookingSidebar;
