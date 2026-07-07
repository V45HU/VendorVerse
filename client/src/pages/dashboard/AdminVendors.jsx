import { useEffect, useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import EmptyState from "../../components/Dashboard/EmptyState";
import LoadingState from "../../components/Dashboard/LoadingState";

import { adminMenu } from "../../components/Dashboard/dashboardMenus";
import API from "../../api/axios";

function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const response = await API.get("/dashboard/admin/vendors");
      setVendors(response.data.vendors || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const handleApproval = async (vendorId, isApproved) => {
    try {
      setActionLoading(true);
      await API.patch(`/dashboard/admin/vendors/${vendorId}/approve`, {
        isApproved,
      });
      await loadVendors();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update vendor approval",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleVisibility = async (vendorId, isApproved, isFeatured) => {
    try {
      setActionLoading(true);
      await API.patch(`/dashboard/admin/vendors/${vendorId}/visibility`, {
        isApproved,
        isFeatured,
      });
      await loadVendors();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update vendor visibility",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (vendorId) => {
    try {
      setActionLoading(true);
      await API.delete(`/dashboard/admin/vendors/${vendorId}`);
      await loadVendors();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete vendor");
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
        title="Vendors"
        description="Review and manage all registered vendors and their approval status."
      />

      {vendors.length === 0 ? (
        <EmptyState
          title="No vendors found"
          description="Vendor profiles will appear here."
        />
      ) : (
        <div className="grid gap-4">
          {vendors.map((vendor) => (
            <div
              key={vendor._id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {vendor.businessName}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {vendor.category} • {vendor.city}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {vendor.email || "No email"}
                  </p>
                  <p className="text-sm mt-2">
                    Status:{" "}
                    <span className="font-semibold">
                      {vendor.isApproved ? "Approved" : "Pending"}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleApproval(vendor._id, true)}
                    disabled={actionLoading}
                    className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      Approve
                    </span>
                  </button>
                  <button
                    onClick={() => handleApproval(vendor._id, false)}
                    disabled={actionLoading}
                    className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
                  >
                    <span className="flex items-center gap-2">
                      <XCircle size={16} />
                      Reject
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      handleVisibility(
                        vendor._id,
                        vendor.isApproved,
                        !vendor.isFeatured,
                      )
                    }
                    disabled={actionLoading}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                  >
                    <span className="flex items-center gap-2">
                      {vendor.isFeatured ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                      {vendor.isFeatured ? "Hide" : "Show"}
                    </span>
                  </button>
                  <button
                    onClick={() => handleDelete(vendor._id)}
                    disabled={actionLoading}
                    className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
                  >
                    <span className="flex items-center gap-2">
                      <Trash2 size={16} />
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminVendors;
