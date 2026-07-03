import { Users, Briefcase, CalendarCheck, BarChart3 } from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import EmptyState from "../../components/Dashboard/EmptyState";

import { adminMenu } from "../../components/Dashboard/dashboardMenus";

function AdminDashboard() {
  return (
    <DashboardLayout menuItems={adminMenu}>
      <DashboardHeader
        title="Admin Dashboard"
        description="Monitor the VendorVerse platform."
      />

      <div className="grid lg:grid-cols-4 gap-6">
        <DashboardCard title="Users" value="0" icon={Users} color="blue" />

        <DashboardCard title="Vendors" value="0" icon={Briefcase} />

        <DashboardCard
          title="Bookings"
          value="0"
          icon={CalendarCheck}
          color="amber"
        />

        <DashboardCard
          title="Analytics"
          value="0"
          icon={BarChart3}
          color="rose"
        />
      </div>

      <div className="mt-10">
        <EmptyState
          title="Analytics coming soon"
          description="Platform insights and reports will appear here."
        />
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
