import EmptyState from "../EmptyState";
import BookingItem from "./BookingItem";

function RecentBookings({ bookings }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Recent Booking Requests</h2>

      {bookings.length === 0 ? (
        <EmptyState
          title="No Booking Requests"
          description="New requests will appear here."
        />
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingItem key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentBookings;
