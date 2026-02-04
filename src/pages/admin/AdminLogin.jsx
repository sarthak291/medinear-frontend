import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await api.post("/admin/login", { password });
      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");
    } catch {
      alert("Wrong admin password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          Admin Panel
        </h2>

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
