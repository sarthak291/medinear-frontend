import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Results from "./pages/Results";
import Confirm from "./pages/Confirm";
import Cart from "./pages/Cart";
import CartResults from "./pages/CartResults";

import Inventory from "./pages/store/Inventory";
import StoreLogin from "./pages/store/StoreLogin";
import Dashboard from "./pages/store/Dashboard";
import Profile from "./pages/store/Profile";
import StoreSignup from "./pages/store/StoreSignup";
import Reservations from "./pages/store/Reservations";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import StoreLayout from "./components/store/StoreLayout";
import StoreProtectedRoute from "./routes/StoreProtectedRoute";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";
  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ---------- Public ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart-results" element={<CartResults />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ---------- Store Auth ---------- */}
        <Route path="/store/login" element={<StoreLogin />} />
        <Route path="/store/signup" element={<StoreSignup />} />

        {/* ---------- Admin ---------- */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* ---------- Store Protected ---------- */}
        <Route
          path="/store"
          element={
            <StoreProtectedRoute>
              <StoreLayout />
            </StoreProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="reservations" element={<Reservations />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
