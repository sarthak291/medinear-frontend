import { useEffect, useState } from "react";
import api from "../../services/api";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/store/reservations");
      setReservations(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const updateStatus = async (reservationId, status) => {
    try {
      await api.put("/reservations/update-status", {
      reservationId: reservationId,
      status: status,
      });

      fetchReservations();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading reservations...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Reservations
      </h2>

      {reservations.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No reservations yet.
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((resv) => (
            <div
              key={resv._id}
              className="bg-white p-4 rounded-xl shadow border flex flex-col md:flex-row md:justify-between gap-4"
            >
              <div>
                <p className="font-medium">{resv.userName}</p>
                <p className="text-sm text-gray-600">
                  📞 {resv.phone}
                </p>

                <p className="text-sm mt-2">
                  💊{" "}
                  {resv.medicines
                  .map((m) => m.medicineId?.name || "Unknown Medicine")
                   .join(", ")}

                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Status:{" "}
                  <span className="font-semibold">
                    {resv.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  disabled={resv.status !== "PENDING"}
                  onClick={() =>
                    updateStatus(resv._id, "VISITED")
                  }
                  className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
                >
                  VISITED
                </button>

                <button
                  disabled={resv.status !== "PENDING"}
                  onClick={() =>
                    updateStatus(resv._id, "NO_SHOW")
                  }
                  className="px-4 py-2 rounded bg-red-600 text-white disabled:opacity-50"
                >
                  NO SHOW
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reservations;
