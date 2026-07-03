import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Vendors from "./pages/Vendors";
import VendorDetails from "./pages/VendorDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";

import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import VendorDashboard from "./pages/dashboard/VendorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/vendors" element={<Vendors />} />

      <Route path="/vendors/:id" element={<VendorDetails />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Customer */}

      <Route
        path="/customer-dashboard"
        element={
          <ProtectedRoute roles={["customer"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Vendor */}

      <Route
        path="/vendor-dashboard"
        element={
          <ProtectedRoute roles={["vendor"]}>
            <VendorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin */}

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
