import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  CalendarCheck,
  BarChart3,
  Clock3,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import EmptyState from "../../components/Dashboard/EmptyState";
import LoadingState from "../../components/Dashboard/LoadingState";

import { adminMenu } from "../../components/Dashboard/dashboardMenus";
import {
  getAdminDashboard,
  toggleVendorVisibility,
  updateBookingStatusByAdmin,
  updateVendorApproval,
} from "../../services/dashboardService";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await getAdminDashboard();
      setDashboard(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleVendorApproval = async (vendorId, isApproved) => {
    try {
      setActionLoading(true);
      await updateVendorApproval(vendorId, isApproved);
      await loadDashboard();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update vendor approval",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleVisibilityToggle = async (vendorId, isApproved, isFeatured) => {
    try {
      setActionLoading(true);
      await toggleVendorVisibility(vendorId, {
        isApproved,
        isFeatured,
      });
      await loadDashboard();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update vendor visibility",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleBookingAction = async (bookingId, status) => {
    try {
      setActionLoading(true);
      await updateBookingStatusByAdmin(bookingId, status);
      await loadDashboard();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update booking status",
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <DashboardLayout menuItems={adminMenu}>
        <div className="text-red-500 text-xl">{error}</div>
      </DashboardLayout>
    );
  }

  const { stats, recentUsers, recentBookings, pendingVendors = [] } = dashboard;

  return (
    <DashboardLayout menuItems={adminMenu}>
      <DashboardHeader
        title="Admin Dashboard"
        description="Monitor platform growth and recent activity."
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <DashboardCard
          title="Users"
          value={stats.userCount}
          icon={Users}
          color="blue"
        />

        <DashboardCard
          title="Vendors"
          value={stats.vendorCount}
          icon={Briefcase}
        />

        <DashboardCard
          title="Bookings"
          value={stats.bookingCount}
          icon={CalendarCheck}
          color="amber"
        />

        <DashboardCard
          title="Reviews"
          value={stats.reviewCount}
          icon={BarChart3}
          color="rose"
        />

        <DashboardCard
          title="Pending"
          value={stats.pendingBookings}
          icon={Clock3}
          color="emerald"
        />
      </div>

      <div className="grid xl:grid-cols-2 gap-6 mt-10">
        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            Pending Vendor Approvals
          </h2>

          {pendingVendors.length === 0 ? (
            <EmptyState
              title="No pending vendors"
              description="Approved vendors will appear here for review."
            />
          ) : (
            <div className="space-y-4">
              {pendingVendors.map((vendor) => (
                <div
                  key={vendor._id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{vendor.businessName}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {vendor.category} • {vendor.city}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Owner: {vendor.userId?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {vendor.userId?.email || "No email"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleVendorApproval(vendor._id, true)}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                      >
                        <CheckCircle2 size={16} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleVendorApproval(vendor._id, false)}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          handleVisibilityToggle(
                            vendor._id,
                            vendor.isApproved,
                            !vendor.isFeatured,
                          )
                        }
                        disabled={actionLoading}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                      >
                        {vendor.isFeatured ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                        {vendor.isFeatured ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Recent Customers</h2>

          {recentUsers.length === 0 ? (
            <EmptyState
              title="No customers yet"
              description="New users will appear here."
            />
          ) : (
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user._id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{user.email}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Recent Bookings</h2>

          {recentBookings.length === 0 ? (
            <EmptyState
              title="No bookings yet"
              description="Booking activity will appear here."
            />
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">
                        {booking.customerId?.name || "Customer"}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {booking.vendorId?.businessName || "Vendor"}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
