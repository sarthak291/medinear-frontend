import { useEffect, useState } from "react";

function InventoryModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    medicineName: "",
    price: "",
    quantityAvailable: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        medicineName:
          initialData.medicineName ||
          initialData.medicineId?.name ||
          "",
        price: initialData.price || "",
        quantityAvailable:
          initialData.quantityAvailable || "",
        expiryDate: initialData.expiryDate
          ? initialData.expiryDate.split("T")[0]
          : "",
      });
    } else {
      setForm({
        medicineName: "",
        price: "",
        quantityAvailable: "",
        expiryDate: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Medicine" : "Add Medicine"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* ✅ MEDICINE NAME (NOT ID) */}
          <input
            name="medicineName"
            value={form.medicineName}
            onChange={handleChange}
            placeholder="Medicine Name (e.g. Paracetamol 500mg)"
            className="w-full p-2 border rounded"
            required
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price (₹)"
            className="w-full p-2 border rounded"
            required
          />

          <input
            name="quantityAvailable"
            type="number"
            value={form.quantityAvailable}
            onChange={handleChange}
            placeholder="Quantity Available"
            className="w-full p-2 border rounded"
            required
          />

          <input
            name="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InventoryModal;
