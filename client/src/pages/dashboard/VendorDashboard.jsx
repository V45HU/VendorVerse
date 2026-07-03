import {
  ClipboardList,
  Images,
  Star,
  MessageSquare,
  IndianRupee,
  ThumbsUp,
} from "lucide-react";

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
  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
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
