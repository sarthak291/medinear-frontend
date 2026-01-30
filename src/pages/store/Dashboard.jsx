import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/store/dashboard");
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      {/* Store Name */}
      <h2 className="text-2xl font-bold mb-2">
        {data.store.storeName}
      </h2>

      {/* Verification Badge */}
      <p
        className={`inline-block mb-6 px-3 py-1 rounded-full text-sm
          ${
            data.store.isVerified
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }
        `}
      >
        {data.store.isVerified
          ? "Verified Store"
          : "Verification Pending"}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Medicines</p>
          <p className="text-3xl font-bold">
            {data.stats.totalMedicines}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Active Reservations</p>
          <p className="text-3xl font-bold">
            {data.stats.activeReservations}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
