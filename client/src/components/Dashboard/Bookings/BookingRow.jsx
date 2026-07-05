import StatusBadge from "./StatusBadge";

function BookingRow({ booking, onView }) {
  return (
    <tr className="border-b">
      <td className="py-5">{booking.customerId.name}</td>

      <td>{booking.eventType}</td>

      <td>{new Date(booking.eventDate).toLocaleDateString()}</td>

      <td>₹{booking.budget.toLocaleString()}</td>

      <td>
        <StatusBadge status={booking.status} />
      </td>

      <td>
        <button
          onClick={() => onView(booking)}
          className="
            text-emerald-600
            font-semibold
          "
        >
          View
        </button>
      </td>
    </tr>
  );
}

export default BookingRow;
