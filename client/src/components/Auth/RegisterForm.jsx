import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PasswordInput from "./PasswordInput";
import RoleSelector from "./RoleSelector";

import { registerUser, loginUser } from "../../services/authService";

import useAuth from "../../hooks/useAuth";

function RegisterForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
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

      await registerUser(formData);

      const { success, user, token } = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (success) {
        login(user, token);
      }

      if (response.user.role === "vendor") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        name="name"
        placeholder="Full Name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-emerald-600"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        required
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-emerald-600"
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

      <RoleSelector
        value={formData.role}
        onChange={(role) =>
          setFormData({
            ...formData,
            role,
          })
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold transition"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="text-emerald-600 font-semibold">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
