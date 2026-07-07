import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Trash2 } from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import EmptyState from "../../components/Dashboard/EmptyState";
import LoadingState from "../../components/Dashboard/LoadingState";

import { customerMenu } from "../../components/Dashboard/dashboardMenus";
import { getMyBookings, deleteBooking } from "../../services/bookingService";

function CustomerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await getMyBookings();
      setBookings(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      setActionLoading(true);
      await deleteBooking(id);
      await loadBookings();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <DashboardLayout menuItems={customerMenu}>
        <div className="text-red-500 text-xl">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout menuItems={customerMenu}>
      <DashboardHeader
        title="My Bookings"
        description="Track every event request and manage upcoming plans."
      />

      {bookings.length === 0 ? (
        <EmptyState
          title="No bookings yet"
          description="Book vendors to see your requests here."
        />
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {booking.vendorId?.businessName || "Vendor"}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {booking.eventType}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
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

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      booking.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : booking.status === "Accepted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                  {booking.status !== "Completed" && (
                    <button
                      onClick={() => handleDelete(booking._id)}
                      disabled={actionLoading}
                      className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
                    >
                      <span className="flex items-center gap-2">
                        <Trash2 size={16} />
                        Cancel
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default CustomerBookings;
