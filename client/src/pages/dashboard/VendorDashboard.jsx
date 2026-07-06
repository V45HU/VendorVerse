import {
  ClipboardList,
  Images,
  Star,
  MessageSquare,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import EmptyState from "../../components/Dashboard/EmptyState";
import LoadingState from "../../components/Dashboard/LoadingState";

import { vendorMenu } from "../../components/Dashboard/dashboardMenus";

import useDashboard from "../../hooks/useDashboard";

import RecentBookings from "../../components/Dashboard/widgets/RecentBookings";
import RecentReviews from "../../components/Dashboard/widgets/RecentReviews";

function VendorDashboard() {
  const { dashboard, loading, error, errorStatus } = useDashboard();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    if (errorStatus === 404) {
      return (
        <DashboardLayout menuItems={vendorMenu}>
          <DashboardHeader
            title="Your business is not registered yet"
            description="Create a business profile to activate your vendor dashboard."
          />
          <EmptyState
            title="Vendor business account required"
            description="Add your business information first. Once it is saved, your dashboard, portfolio, bookings, and public vendor profile will use those details."
            icon={Building2}
            action={
              <Link
                className="inline-flex items-center rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                to="/vendor-dashboard/profile"
              >
                Create Business Profile
              </Link>
            }
          />
        </DashboardLayout>
      );
    }

    return (
      <DashboardLayout menuItems={vendorMenu}>
        <div className="text-red-500 text-xl">{error}</div>
      </DashboardLayout>
    );
  }

  const { vendor, stats, recentBookings, recentReviews } = dashboard;

  return (
    <DashboardLayout menuItems={vendorMenu}>
      <DashboardHeader
        title={`Welcome, ${vendor.businessName}`}
        description="Manage your business from one place."
      />

      {/* Statistics */}

      <div className="grid lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Pending Requests"
          value={stats.pendingBookings}
          icon={ClipboardList}
          color="rose"
        />

        <DashboardCard
          title="Portfolio"
          value={stats.portfolioCount}
          icon={Images}
          color="blue"
        />

        <DashboardCard
          title="Reviews"
          value={stats.totalReviews}
          icon={MessageSquare}
          color="emerald"
        />

        <DashboardCard
          title="Rating"
          value={stats.averageRating}
          icon={Star}
          color="amber"
        />
      </div>

      {/* Recent Bookings */}

      <RecentBookings bookings={recentBookings} />

      {/* Recent Reviews */}

      <RecentReviews reviews={recentReviews} />
    </DashboardLayout>
  );
}

export default VendorDashboard;
