import BookingRow from "./BookingRow";

function BookingTable({ bookings, onView }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        overflow-hidden
      "
    >
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-5">Customer</th>

            <th className="text-left">Event</th>

            <th className="text-left">Date</th>

            <th className="text-left">Budget</th>

            <th className="text-left">Status</th>

            <th className="text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <BookingRow key={booking._id} booking={booking} onView={onView} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingTable;
