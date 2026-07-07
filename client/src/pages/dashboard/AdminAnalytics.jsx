import { useEffect, useState } from "react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import LoadingState from "../../components/Dashboard/LoadingState";

import { adminMenu } from "../../components/Dashboard/dashboardMenus";
import API from "../../api/axios";

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        const response = await API.get("/dashboard/admin/analytics");
        setAnalytics(response.data.analytics);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <DashboardLayout menuItems={adminMenu}>
        <div className="text-red-500 text-xl">{error}</div>
      </DashboardLayout>
    );
  }

  const { totals, bookingsByStatus, vendorStatus, recentBookings } = analytics;

  return (
    <DashboardLayout menuItems={adminMenu}>
      <DashboardHeader
        title="Analytics"
        description="Track platform growth, booking flow, and vendor health."
      />

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Users</p>
          <h3 className="mt-2 text-3xl font-bold">{totals.users}</h3>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Vendors</p>
          <h3 className="mt-2 text-3xl font-bold">{totals.vendors}</h3>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Bookings</p>
          <h3 className="mt-2 text-3xl font-bold">{totals.bookings}</h3>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Reviews</p>
          <h3 className="mt-2 text-3xl font-bold">{totals.reviews}</h3>
        </div>
      </div>

      <div className="mt-8 grid xl:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Booking Status</h2>
          <div className="mt-6 space-y-3">
            {Object.entries(bookingsByStatus).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{
                      width: `${Math.max(8, (value / totals.bookings) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Vendor Health</h2>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span>Approved Vendors</span>
              <span className="font-semibold">{vendorStatus.approved}</span>
            </div>
            <div className="flex justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span>Featured Vendors</span>
              <span className="font-semibold">{vendorStatus.featured}</span>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-sm text-slate-500">Platform roles</p>
              <div className="mt-3 space-y-2">
                {Object.entries(analytics.roleBreakdown || {}).map(
                  ([role, count]) => (
                    <div
                      key={role}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="capitalize">{role}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid xl:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Booking Trend</h2>
          <div className="mt-6 space-y-3">
            {(analytics.monthlyTrend || []).map((entry) => (
              <div key={entry.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{entry.label}</span>
                  <span className="font-semibold">{entry.count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-sky-500"
                    style={{ width: `${Math.max(10, entry.count * 16)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Top Categories</h2>
          <div className="mt-6 space-y-3">
            {(analytics.topCategories || []).map((item) => (
              <div
                key={item._id}
                className="flex justify-between rounded-2xl bg-slate-50 px-4 py-3"
              >
                <span>{item._id || "Uncategorized"}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Recent Booking Activity</h2>
        <div className="mt-6 grid gap-3">
          {recentBookings.map((booking) => (
            <div
              key={booking._id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
            >
              <div>
                <p className="font-semibold">
                  {booking.customerId?.name || "Customer"}
                </p>
                <p className="text-sm text-slate-500">
                  {booking.vendorId?.businessName || "Vendor"}
                </p>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminAnalytics;
