import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Vendors from "./pages/Vendors";
import VendorDetails from "./pages/VendorDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/vendors"
          element={<Vendors />}
        />

        <Route
          path="/vendors/:id"
          element={<VendorDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;