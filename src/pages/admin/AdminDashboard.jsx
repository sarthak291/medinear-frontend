import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminDashboard() {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin");
      return;
    }

    api.get("/admin/stores/pending").then((res) => {
      setStores(res.data);
    });
  }, []);

  const verifyStore = async (id) => {
    await api.patch(`/admin/store/${id}/verify`);
    setStores(stores.filter((s) => s._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Pending Store Verifications
      </h1>

      {stores.length === 0 ? (
        <p>No pending stores 🎉</p>
      ) : (
        stores.map((store) => (
          <div
            key={store._id}
            className="bg-white p-4 rounded shadow mb-3 flex justify-between"
          >
            <div>
              <p className="font-semibold">{store.storeName}</p>
              <p className="text-sm text-gray-500">
                {store.email}
              </p>
            </div>

            <button
              onClick={() => verifyStore(store._id)}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Verify
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
