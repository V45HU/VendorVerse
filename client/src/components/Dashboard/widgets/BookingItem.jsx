import { CalendarDays, MapPin } from "lucide-react";

function BookingItem({ booking }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-5
        flex
        justify-between
        items-center
        hover:shadow-md
        transition
      "
    >
      <div>
        <h3 className="font-semibold text-lg">{booking.customerId.name}</h3>

        <p className="text-slate-500 mt-1">{booking.eventType}</p>

        <div className="flex gap-5 mt-3 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <CalendarDays size={15} />

            {new Date(booking.eventDate).toLocaleDateString()}
          </span>

          <span className="flex items-center gap-2">
            <MapPin size={15} />

            {booking.city}
          </span>
        </div>
      </div>

      <span
        className="
          px-4
          py-2
          rounded-xl
          bg-amber-100
          text-amber-700
          font-semibold
        "
      >
        {booking.status}
      </span>
    </div>
  );
}

export default BookingItem;
