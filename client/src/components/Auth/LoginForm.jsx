import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PasswordInput from "./PasswordInput";

import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { success, user, token } = await loginUser(formData);

      if (success) {
        login(user, token);
      }

      if (response.user.role === "vendor") {
        navigate("/vendor-dashboard");
      } else if (response.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="email"
        name="email"
        required
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded-2xl px-5 py-4 focus:border-emerald-600 outline-none"
      />

      <PasswordInput
        value={formData.password}
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold transition"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <p className="text-center text-slate-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-emerald-600 font-semibold">
          Register
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
