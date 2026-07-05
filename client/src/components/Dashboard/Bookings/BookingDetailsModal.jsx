import { X } from "lucide-react";

function BookingDetailsModal({ booking, onClose, onStatus, onQuotation }) {
  if (!booking) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          p-8
          w-full
          max-w-2xl
          relative
        "
      >
        <button onClick={onClose} className="absolute top-6 right-6">
          <X />
        </button>

        <h2 className="text-3xl font-bold mb-8">Booking Details</h2>

        <div className="grid grid-cols-2 gap-6">
          <Info label="Customer" value={booking.customerId.name} />

          <Info label="Email" value={booking.customerId.email} />

          <Info label="Event" value={booking.eventType} />

          <Info
            label="Date"
            value={new Date(booking.eventDate).toLocaleDateString()}
          />

          <Info label="City" value={booking.city} />

          <Info label="Venue" value={booking.venue} />

          <Info label="Guests" value={booking.guestCount} />

          <Info label="Budget" value={`₹${booking.budget}`} />
        </div>

        {/* to be replaced */}
        <div className="mt-8">
          <h3 className="font-semibold">Requirements</h3>

          <p className="mt-3 text-slate-600">{booking.requirements || "-"}</p>
        </div>

        {/* by this ig */}
        <div className="flex gap-4 mt-10">
          <button
            onClick={() => onStatus("Accepted")}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl"
          >
            Accept
          </button>

          <button
            onClick={() => onStatus("Rejected")}
            className="bg-red-600 text-white px-6 py-3 rounded-xl"
          >
            Reject
          </button>

          <button onClick={onQuotation} className="border px-6 py-3 rounded-xl">
            Send Quotation
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-slate-500">{label}</p>

      <h4 className="font-semibold mt-1">{value}</h4>
    </div>
  );
}

export default BookingDetailsModal;
