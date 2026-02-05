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
  const nearbyOnly = searchParams.get("nearby") === "true";

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ NEW (only for Did you mean)
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        let res;

        if (nearbyOnly) {
          res = await api.get("/search/nearby", {
            params: { lat, lng, radius: 50 },
          });
          setMedicineName("Nearby Medical Stores");
          setSuggestion(null);
        } else {
          res = await api.get("/search/medicine", {
            params: { query, lat, lng, radius: 50 },
          });
          setMedicineName(res.data.medicine || query);
          setSuggestion(res.data.suggestion || null);
        }

        setResults(Array.isArray(res.data.results) ? res.data.results : []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, lat, lng, nearbyOnly]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 mb-4 hover:underline"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-semibold mb-2">
          {nearbyOnly ? "Nearby Medical Stores" : `Results for ${medicineName}`}
        </h2>

        {/* ✅ DID YOU MEAN */}
        {!nearbyOnly && suggestion && results.length === 0 && (
          <p className="text-sm text-gray-600 mb-6">
            Did you mean{" "}
            <span className="text-blue-600 font-semibold">{suggestion}</span> ?
          </p>
        )}

        {results.length === 0 && (
          <div className="bg-white p-6 rounded shadow text-center">
            No results found
          </div>
        )}

        <div className="space-y-4">
          {results.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded shadow border p-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{item.storeName}</h3>
                <p className="text-sm text-gray-600">{item.area}</p>
                <p className="text-sm text-gray-500">{item.distance} km away</p>

                {!nearbyOnly && (
                  <p className="text-sm">
                    Stock: {item.quantityAvailable ?? "N/A"}
                  </p>
                )}
              </div>

              {!nearbyOnly && (
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">₹{item.price}</p>

                  <button
                    onClick={() => setSelectedItem(item)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Buy Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {!nearbyOnly && (
        <BuyNowModal
          open={!!selectedItem}
          item={selectedItem}
          medicineName={medicineName}
          lat={lat}
          lng={lng}
          onClose={() => setSelectedItem(null)}
          onSuccess={(id) => navigate(`/confirm?reservationId=${id}`)}
        />
      )}
    </div>
  );
}

export default Results;
