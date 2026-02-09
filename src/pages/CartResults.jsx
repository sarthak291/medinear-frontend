import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { getCart, clearCart } from "../utils/cart";
import CartReserveModal from "../components/CartReserveModal";

function CartResults() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));

  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const cart = getCart();
        setCartItems(cart);

        const res = await api.post("/search/cart", {
          lat,
          lng,
          medicines: cart,
        });

        setStores(res.data.results || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [lat, lng]);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/cart")}
          className="text-blue-600 hover:underline mb-4"
        >
          ← Back to Cart
        </button>

        <h2 className="text-3xl font-bold mb-6">
          Stores matching your cart
        </h2>

        {stores.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            No store has all medicines together 😕
          </div>
        ) : (
          <div className="space-y-4">
            {stores.map((store) => (
              <div
                key={store.storeId}
                className="bg-white rounded-xl shadow p-4 border"
              >
                <h3 className="font-semibold text-lg">{store.storeName}</h3>
                <p className="text-sm text-gray-600">
                  {store.area}, {store.city}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Distance: {store.distance} km
                </p>

                <ul className="mt-3 text-sm space-y-1">
                  {store.medicines.map((m, i) => (
                    <li key={i}>
                      💊 {m.medicineName} – ₹{m.price}
                    </li>
                  ))}
                </ul>

                <p className="mt-3 font-bold text-blue-600 text-lg">
                  Total: ₹{store.totalPrice}
                </p>

                <div className="flex gap-3 mt-4 flex-wrap">
                  {store.googleMapLink && (
                    <a
                      href={store.googleMapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      📍 Map
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedStore(store)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Reserve All
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <CartReserveModal
        open={!!selectedStore}
        store={selectedStore}
        cartItems={cartItems}
        onClose={() => setSelectedStore(null)}
        onSuccess={(reservationId) => {
          clearCart();
          navigate(`/confirm?reservationId=${reservationId}`);
        }}
      />
    </div>
  );
}

export default CartResults;
