import { useState } from "react";
import api from "../services/api";

function CartReserveModal({ open, onClose, store, cartItems, onSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open || !store) return null;

  const handleReserve = async () => {
    if (!name.trim() || !phone.trim()) {
      alert("Enter name and phone");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/reservations/cart", {
        userName: name,
        phone,
        storeId: store.storeId,
        medicines: cartItems,
      });

      onSuccess(res.data.reservationId);
    } catch (err) {
      console.error(err);
      alert("Reservation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">Reserve Cart Medicines</h2>
        <p className="text-sm text-gray-600 mb-4">
          Store: <span className="font-semibold">{store.storeName}</span>
        </p>

        <div className="bg-slate-50 p-4 rounded-xl mb-4">
          {cartItems.map((m, i) => (
            <p key={i} className="text-sm">
              💊 {m.medicineName} (Qty: {m.quantity})
            </p>
          ))}
        </div>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded-lg mb-3"
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded-lg mb-4"
        />

        <button
          onClick={handleReserve}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Reserving..." : "Confirm Reservation"}
        </button>
      </div>
    </div>
  );
}

export default CartReserveModal;
