import { useEffect, useState } from "react";
import api from "../../services/api";
import InventoryModal from "../../components/store/InventoryModal";

function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchInventory = async () => {
    try {
      const res = await api.get("/store/inventory");
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/store/inventory/${id}`);
      fetchInventory();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editingItem) {
        await api.put(
          `/store/inventory/${editingItem._id}`,
          formData
        );
      } else {
        await api.post("/store/inventory", formData);
      }

      setIsModalOpen(false);
      fetchInventory();
    } catch (err) {
      console.error(err);
      alert("Failed to save medicine");
    }
  };

  if (loading) return <div>Loading inventory...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Inventory</h2>

        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Medicine
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          No medicines added yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Medicine</th>
                <th className="p-3 text-left">Price (₹)</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">
                    {item.medicineName ||
                      item.medicineId?.name ||
                      "—"}
                  </td>

                  <td className="p-3">{item.price}</td>

                  <td className="p-3">
                    {item.quantityAvailable}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleStatus(item._id)}
                      className="text-gray-600 hover:underline"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />
    </div>
  );
}

export default Inventory;
