import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import BuyNowModal from "../components/BuyNowModal";

function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/search/medicine?query=${query}&lat=${lat}&lng=${lng}&radius=50`
        );

        setMedicineName(res.data.medicine || query);
        setResults(res.data.results || []);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, lat, lng]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg text-gray-600">
          Searching nearby medical stores…
        </p>
      </div>
    );
  }

  const bestPrice = results.length
    ? Math.min(...results.map((r) => r.price))
    : null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* 🔙 BACK */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 mb-4 hover:underline"
        >
          ← Back
        </button>

        {/* 🔹 HEADER */}
        <h2 className="text-2xl font-semibold mb-1">
          Results for{" "}
          <span className="text-blue-600">{medicineName}</span>
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Showing nearby medical stores with available stock
        </p>

        {/* ❌ NO RESULTS */}
        {results.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-600">
              No medical stores found nearby.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                {/* 🏪 STORE INFO */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">
                      {item.storeName}
                    </h3>

                    {item.price === bestPrice && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        Best Price
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {item.area}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {item.distance} km away
                    </span>

                    <span className="bg-gray-100 px-2 py-1 rounded">
                      Stock: {item.quantityAvailable}
                    </span>

                    {item.deliveryAvailable && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        Home Delivery
                      </span>
                    )}
                  </div>
                </div>

                {/* 💰 PRICE + CTA */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => setSelectedItem(item)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🧾 BUY NOW MODAL */}
      <BuyNowModal
        open={!!selectedItem}
        item={selectedItem}
        medicineName={medicineName}
        lat={lat}
        lng={lng}
        onClose={() => setSelectedItem(null)}
        onSuccess={(reservationId) =>
          navigate(`/confirm?reservationId=${reservationId}`)
        }
      />
    </div>
  );
}

export default Results;
