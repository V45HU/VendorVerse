import { CalendarCheck, Heart, Star, Wallet } from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import EmptyState from "../../components/Dashboard/EmptyState";

import { customerMenu } from "../../components/Dashboard/dashboardMenus";

function CustomerDashboard() {
  return (
    <DashboardLayout menuItems={customerMenu}>
      <DashboardHeader
        title="Customer Dashboard"
        description="Manage your bookings and activity."
      />

      <div className="grid lg:grid-cols-4 gap-6">
        <DashboardCard title="Bookings" value="0" icon={CalendarCheck} />

        <DashboardCard title="Favorites" value="0" icon={Heart} color="rose" />

        <DashboardCard title="Reviews" value="0" icon={Star} color="amber" />

        <DashboardCard title="Spent" value="₹0" icon={Wallet} color="blue" />
      </div>

      <div className="mt-10">
        <EmptyState
          title="No bookings yet"
          description="Book your first vendor to start managing your events."
        />
      </div>
    </DashboardLayout>
  );
}

export default CustomerDashboard;
