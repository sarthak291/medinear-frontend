import { useState } from "react";
import api from "../services/api";

function BuyNowModal({
  open,
  onClose,
  item,
  medicineName,
  lat,
  lng,
  onSuccess,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open || !item) return null;

  const handleConfirm = async () => {
    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/reservations/buy-now", {
        userName: name,
        phone,
        storeId: item.storeId,
        medicines: [
          {
            medicineId: item.medicineId,
            quantity: 1,
            price: item.price,
          },
        ],
      });

      onSuccess(res.data.reservationId);
    } catch (err) {
      console.error(err);
      setError("Failed to create reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
        
        {/* ❌ CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* 🧾 HEADER */}
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Confirm Reservation
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Medicine will be reserved for 2 hours
        </p>

        {/* 🏪 DETAILS */}
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-600">Medicine</p>
          <p className="font-medium">{medicineName}</p>

          <p className="text-sm text-gray-600 mt-2">Store</p>
          <p className="font-medium">{item.storeName}</p>

          <p className="text-xl font-bold text-blue-600 mt-3">
            ₹{item.price}
          </p>
        </div>

        {/* 👤 USER INPUT */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* ⚠️ ERROR */}
        {error && (
          <p className="text-sm text-red-600 mt-3">{error}</p>
        )}

        {/* ✅ ACTIONS */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border rounded-lg py-2 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Reserving..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyNowModal;
