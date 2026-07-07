import { useEffect, useState } from "react";
import { UserCircle2 } from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import LoadingState from "../../components/Dashboard/LoadingState";

import { customerMenu } from "../../components/Dashboard/dashboardMenus";
import API from "../../api/axios";

function CustomerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const response = await API.get("/users/profile");
        setProfile(response.data.user || null);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

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
        title="My Profile"
        description="View the account details linked to your customer dashboard."
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
            <UserCircle2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {profile?.name || "Customer"}
            </h2>
            <p className="text-sm text-slate-500">
              {profile?.email || "No email available"}
            </p>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-slate-500">Account Role</p>
            <p className="mt-2 font-semibold capitalize">
              {profile?.role || "customer"}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-slate-500">Member Since</p>
            <p className="mt-2 font-semibold">
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CustomerProfile;
