import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Heart,
  Star,
  Wallet,
  MapPin,
  CalendarDays,
} from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import EmptyState from "../../components/Dashboard/EmptyState";
import LoadingState from "../../components/Dashboard/LoadingState";

import { customerMenu } from "../../components/Dashboard/dashboardMenus";
import { getCustomerDashboard } from "../../services/dashboardService";

function CustomerDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const data = await getCustomerDashboard();
        setDashboard(data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <DashboardLayout menuItems={customerMenu}>
        <div className="text-red-500 text-xl">{error}</div>
      </DashboardLayout>
    );
  }

  const { stats, recentBookings, recentReviews } = dashboard;

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  return (
    <DashboardLayout menuItems={customerMenu}>
      <DashboardHeader
        title="Customer Dashboard"
        description="Track your bookings, reviews, and spending in one place."
      />

      <div className="grid lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Bookings"
          value={stats.totalBookings}
          icon={CalendarCheck}
        />

        <DashboardCard
          title="Favorites"
          value={stats.favoriteCount}
          icon={Heart}
          color="rose"
        />

        <DashboardCard
          title="Reviews"
          value={stats.reviewsCount}
          icon={Star}
          color="amber"
        />

        <DashboardCard
          title="Spent"
          value={formatCurrency(stats.totalSpent)}
          icon={Wallet}
          color="blue"
        />
      </div>

      <div className="grid xl:grid-cols-2 gap-6 mt-10">
        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Recent Bookings</h2>
              <p className="text-sm text-slate-500 mt-1">
                Your latest event requests and updates.
              </p>
            </div>
          </div>

          {recentBookings.length === 0 ? (
            <EmptyState
              title="No bookings yet"
              description="Book your first vendor to start managing your events."
            />
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {booking.vendorId?.businessName || "Vendor"}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {booking.eventType}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : booking.status === "Accepted"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
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
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Recent Reviews</h2>
              <p className="text-sm text-slate-500 mt-1">
                Feedback you’ve left for vendors.
              </p>
            </div>
          </div>

          {recentReviews.length === 0 ? (
            <EmptyState
              title="No reviews yet"
              description="Leave feedback after your experience to build trust."
            />
          ) : (
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {review.vendorId?.businessName || "Vendor"}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {review.comment}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <Star key={index} size={16} fill="currentColor" />
                      ))}
                    </div>
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

export default CustomerDashboard;
