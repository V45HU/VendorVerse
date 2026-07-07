import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Vendors from "./pages/Vendors";
import VendorDetails from "./pages/VendorDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";

import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import CustomerBookings from "./pages/dashboard/CustomerBookings";
import CustomerReviews from "./pages/dashboard/CustomerReviews";
import CustomerProfile from "./pages/dashboard/CustomerProfile";
import CustomerSettings from "./pages/dashboard/CustomerSettings";
import VendorDashboard from "./pages/dashboard/VendorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminUsers from "./pages/dashboard/AdminUsers";
import AdminVendors from "./pages/dashboard/AdminVendors";
import AdminBookings from "./pages/dashboard/AdminBookings";
import AdminAnalytics from "./pages/dashboard/AdminAnalytics";
import AdminSettings from "./pages/dashboard/AdminSettings";
import VendorBusinessProfile from "./pages/dashboard/VendorBusinessProfile";
import VendorPortfolioManager from "./pages/dashboard/VendorPortfolioManager";

import ProtectedRoute from "./routes/ProtectedRoute";

import VendorBookings from "./pages/dashboard/VendorBookings";

function App() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/vendors" element={<Vendors />} />

      <Route path="/vendors/:id" element={<VendorDetails />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/vendor-dashboard/bookings"
        element={
          <ProtectedRoute roles={["vendor"]}>
            <VendorBookings />
          </ProtectedRoute>
        }
      />

      {/* Customer */}

      <Route
        path="/customer-dashboard"
        element={
          <ProtectedRoute roles={["customer"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer-dashboard/bookings"
        element={
          <ProtectedRoute roles={["customer"]}>
            <CustomerBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer-dashboard/reviews"
        element={
          <ProtectedRoute roles={["customer"]}>
            <CustomerReviews />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer-dashboard/profile"
        element={
          <ProtectedRoute roles={["customer"]}>
            <CustomerProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer-dashboard/settings"
        element={
          <ProtectedRoute roles={["customer"]}>
            <CustomerSettings />
          </ProtectedRoute>
        }
      />

      {/* Vendor */}

      <Route
        path="/vendor-dashboard/profile"
        element={
          <ProtectedRoute roles={["vendor"]}>
            <VendorBusinessProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vendor-dashboard/portfolio"
        element={
          <ProtectedRoute roles={["vendor"]}>
            <VendorPortfolioManager />
          </ProtectedRoute>
        }
      />

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

      <Route
        path="/admin-dashboard/users"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard/vendors"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminVendors />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard/bookings"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard/analytics"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminAnalytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard/settings"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminSettings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
