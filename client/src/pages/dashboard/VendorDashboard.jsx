import { ClipboardList, Images, Star, IndianRupee } from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import EmptyState from "../../components/Dashboard/EmptyState";

import { vendorMenu } from "../../components/Dashboard/dashboardMenus";

function VendorDashboard() {
  return (
    <DashboardLayout menuItems={vendorMenu}>
      <DashboardHeader
        title="Vendor Dashboard"
        description="Manage bookings, portfolio and reviews."
      />

      <div className="grid lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Booking Requests"
          value="0"
          icon={ClipboardList}
        />

        <DashboardCard title="Portfolio" value="0" icon={Images} color="blue" />

        <DashboardCard title="Reviews" value="0" icon={Star} color="amber" />

        <DashboardCard
          title="Revenue"
          value="₹0"
          icon={IndianRupee}
          color="emerald"
        />
      </div>

      <div className="mt-10">
        <EmptyState
          title="No booking requests"
          description="New customer requests will appear here."
        />
      </div>
    </DashboardLayout>
  );
}

export default VendorDashboard;
