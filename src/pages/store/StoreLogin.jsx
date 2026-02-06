import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function StoreLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/store/login", {
        email,
        password,
      });

      localStorage.setItem("storeToken", res.data.token);

      navigate("/store/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE TEXT */}
        <div className="hidden md:block">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Welcome Back to <span className="text-blue-600">MediNear</span>
          </h1>

          <p className="text-gray-600 mt-5 text-lg leading-relaxed">
            Login to your medical store dashboard and manage your inventory,
            reservations, and profile.
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm text-gray-600">
            <p className="px-4 py-2 bg-white shadow-sm border rounded-xl">
              ✅ Manage medicines stock easily
            </p>
            <p className="px-4 py-2 bg-white shadow-sm border rounded-xl">
              ✅ View and update reservations
            </p>
            <p className="px-4 py-2 bg-white shadow-sm border rounded-xl">
              ✅ Update store profile & images
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Store Login
          </h2>

          <p className="text-gray-600 text-center mt-2 mb-6 text-sm">
            Login to access your store dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold shadow-md transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center text-gray-600 mt-4">
              New medical store?{" "}
              <span
                onClick={() => navigate("/store/signup")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Register here
              </span>
            </p>

            <p className="text-xs text-gray-500 text-center">
              Only verified stores can login.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StoreLogin;
