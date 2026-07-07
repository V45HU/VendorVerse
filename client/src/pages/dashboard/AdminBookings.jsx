import { useEffect, useState } from "react";
import { CalendarCheck, ShieldCheck } from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import EmptyState from "../../components/Dashboard/EmptyState";
import LoadingState from "../../components/Dashboard/LoadingState";

import { adminMenu } from "../../components/Dashboard/dashboardMenus";
import API from "../../api/axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await API.get("/dashboard/admin/bookings");
      const data = response.data.bookings || [];
      setBookings(data);
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

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      setActionLoading(true);
      await API.patch(`/dashboard/admin/bookings/${bookingId}/status`, {
        status,
      });
      await loadBookings();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update booking status",
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <DashboardLayout menuItems={adminMenu}>
        <div className="text-red-500 text-xl">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout menuItems={adminMenu}>
      <DashboardHeader
        title="Bookings"
        description="Review platform-wide booking requests and their progress."
      />

      {bookings.length === 0 ? (
        <EmptyState
          title="No bookings found"
          description="Bookings will appear here once customers start requesting vendors."
        />
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{booking.eventType}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {booking.customerId?.name || "Customer"} •{" "}
                    {booking.vendorId?.businessName || "Vendor"}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">{booking.city}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                    {booking.status}
                  </span>
                  {booking.status !== "Completed" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "Completed")
                      }
                      disabled={actionLoading}
                      className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck size={16} />
                        Mark Done
                      </span>
                    </button>
                  )}
                  <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                    <CalendarCheck size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminBookings;
