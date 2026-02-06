import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import BuyNowModal from "../components/BuyNowModal";

function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query") || "";
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  const nearbyOnly = searchParams.get("nearby") === "true";

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setResults([]);

        let res;

        if (nearbyOnly) {
          res = await api.get("/search/nearby", {
            params: { lat, lng, radius: 50 },
          });

          // Some APIs return array directly
          const data = res.data?.results || res.data;

          setResults(Array.isArray(data) ? data : []);
          setMedicineName("Nearby Medical Stores");
          setSuggestion(null);
        } else {
          res = await api.get("/search/medicine", {
            params: { query, lat, lng, radius: 50 },
          });

          setMedicineName(res.data?.medicine || query);
          setSuggestion(res.data?.suggestion || null);

          setResults(Array.isArray(res.data?.results) ? res.data.results : []);
        }
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Prevent calling API with invalid coordinates
    if (!lat || !lng) {
      setLoading(false);
      setResults([]);
      return;
    }

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

        {/* ✅ DID YOU MEAN (show even if results exist) */}
        {!nearbyOnly && suggestion && suggestion !== query && (
          <p className="text-sm text-gray-600 mb-6">
            Did you mean{" "}
            <button
              onClick={() =>
                navigate(
                  `/results?query=${encodeURIComponent(
                    suggestion
                  )}&lat=${lat}&lng=${lng}`
                )
              }
              className="text-blue-600 font-semibold hover:underline"
            >
              {suggestion}
            </button>
            ?
          </p>
        )}

        {results.length === 0 && (
          <div className="bg-white p-6 rounded shadow text-center">
            No results found
          </div>
        )}

        <div className="space-y-4">
          {results.map((item) => (
  <div
  key={item.storeId || item._id || item.storeName}
  className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:shadow-lg transition"
>
  {/* LEFT SIDE */}
  <div>
    <h3 className="text-lg font-semibold text-gray-900">
      {item.storeName}
    </h3>

    <p className="text-sm text-gray-500 mt-1">
      📍 {item.area}
    </p>

    <div className="flex flex-wrap gap-2 mt-3">
      <span className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
        {item.distance} km away
      </span>

      {!nearbyOnly && (
        <span className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-700">
          Stock: {item.quantityAvailable ?? "N/A"}
        </span>
      )}
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex flex-col items-end gap-3">
    {!nearbyOnly && (
      <p className="text-xl font-bold text-blue-600">
        ₹{item.price}
      </p>
    )}

    <div className="flex gap-3">
      {!nearbyOnly && (
        <button
          onClick={() => setSelectedItem(item)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
        >
          Buy Now
        </button>
      )}

      {item.googleMapLink?.trim() !== "" && (
        <a
          href={item.googleMapLink}
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1"
        >
          📍 Map
        </a>
      )}
    </div>
  </div>
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
