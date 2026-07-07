import { useState } from "react";

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";

import { adminMenu } from "../../components/Dashboard/dashboardMenus";
import API from "../../api/axios";

function AdminSettings() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put("/dashboard/admin/profile", form);
      setMessage(response.data.message || "Profile updated successfully");
      setError("");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      setMessage("");
    }
  };

  return (
    <DashboardLayout menuItems={adminMenu}>
      <DashboardHeader
        title="Admin Settings"
        description="Update your administrator account details securely."
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter new username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter new email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter new password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Save Changes
        </button>

        {message && <p className="mt-4 text-emerald-600">{message}</p>}
        {error && <p className="mt-4 text-rose-600">{error}</p>}
      </form>
    </DashboardLayout>
  );
}

export default AdminSettings;
