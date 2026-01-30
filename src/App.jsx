import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Confirm from "./pages/Confirm";
import Inventory from "./pages/store/Inventory";
import StoreLogin from "./pages/store/StoreLogin";
import Dashboard from "./pages/store/Dashboard";
import Profile from "./pages/store/Profile";

import StoreLayout from "./components/store/StoreLayout";
import StoreProtectedRoute from "./routes/StoreProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<Results />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="/store/login" element={<StoreLogin />} />

      {/* Store protected */}
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
      </Route>
    </Routes>
  );
}

export default App;
