import { useEffect, useState } from "react";
import { Users, ShieldCheck, Trash2 } from "lucide-react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import EmptyState from "../../components/Dashboard/EmptyState";
import LoadingState from "../../components/Dashboard/LoadingState";

import { adminMenu } from "../../components/Dashboard/dashboardMenus";
import API from "../../api/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await API.get("/dashboard/admin/users");
      setUsers(response.data.users || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleUpdate = async (userId, role) => {
    try {
      setActionLoading(true);
      await API.patch(`/dashboard/admin/users/${userId}/role`, { role });
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user role");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      setActionLoading(true);
      await API.delete(`/dashboard/admin/users/${userId}`);
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
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
        title="Users"
        description="Manage customer and vendor accounts registered on the platform."
      />

      {users.length === 0 ? (
        <EmptyState
          title="No users found"
          description="New accounts will appear here."
        />
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                    {user.role === "admin" ? (
                      <ShieldCheck size={20} />
                    ) : (
                      <Users size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{user.email}</p>
                    <p className="text-sm text-slate-500 mt-1 capitalize">
                      Role: {user.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                    disabled={actionLoading}
                    className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => handleDelete(user._id)}
                    disabled={actionLoading}
                    className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
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

export default AdminUsers;
