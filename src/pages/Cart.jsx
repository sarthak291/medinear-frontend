import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  removeFromCart,
  updateCartQty,
  clearCart,
} from "../utils/cart";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemove = (medicineName) => {
    const updated = removeFromCart(medicineName);
    setCartItems(updated);
  };

  const handleQtyChange = (medicineName, qty) => {
    if (qty < 1) qty = 1;
    const updated = updateCartQty(medicineName, qty);
    setCartItems(updated);
  };

  const handleClear = () => {
    clearCart();
    setCartItems([]);
  };

  const goFindStores = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        // We will build this page later
        navigate(`/cart-results?lat=${latitude}&lng=${longitude}`);
      },
      () => alert("Location permission denied")
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">🛒 Cart</h2>
            <p className="text-gray-600">
              Your selected medicines will be checked across nearby stores.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition"
          >
            + Add More Medicines
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Your cart is empty 😔
            </h3>
            <p className="text-gray-500 mt-2">
              Search medicines on home page and add them to cart.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">
                    Medicine
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.medicineName} className="border-t">
                    <td className="p-4 font-medium text-gray-900">
                      {item.medicineName}
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQtyChange(
                            item.medicineName,
                            Number(e.target.value)
                          )
                        }
                        className="w-20 border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleRemove(item.medicineName)}
                        className="text-red-600 hover:underline text-sm font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-5 flex flex-col sm:flex-row gap-3 justify-between">
              <button
                onClick={handleClear}
                className="border border-red-500 text-red-600 px-5 py-2 rounded-xl hover:bg-red-50 transition"
              >
                Clear Cart
              </button>

              <button
                onClick={goFindStores}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-medium"
              >
                Find Stores for My Cart 📍
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
