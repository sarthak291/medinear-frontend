import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [medicine, setMedicine] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const getLocationAndSearch = () => {
    if (!medicine.trim()) {
      alert("Please enter a medicine name");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        navigate(
          `/results?query=${encodeURIComponent(
            medicine
          )}&lat=${latitude}&lng=${longitude}`
        );
      },
      () => alert("Location permission denied")
    );
  };

  // 🔍 Autocomplete (Google-like)
  useEffect(() => {
    if (medicine.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await api.get(
          `/search/suggest?q=${encodeURIComponent(medicine)}`
        );
        setSuggestions(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [medicine]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* 🔷 HEADER */}
      <header className="px-6 py-4 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">
            MediNear
          </h1>
          <span className="text-sm text-gray-500">
            Find medicines near you
          </span>
        </div>
      </header>

      {/* 🔶 HERO SECTION */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
          
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-3">
            Search Medicines Nearby
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Check availability, compare prices, and reserve medicines
            from nearby medical stores instantly.
          </p>

          {/* 🔍 SEARCH INPUT */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search medicine name (e.g. Paracetamol)"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* 🔽 AUTOCOMPLETE DROPDOWN */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-xl shadow mt-1 overflow-hidden">
                {suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setMedicine(item);
                      setSuggestions([]);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 📍 ACTION BUTTON */}
          <button
            onClick={getLocationAndSearch}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
          >
            Use My Location
          </button>

          {/* 🔹 TRUST TEXT */}
          <p className="text-xs text-gray-400 text-center mt-4">
            Location is used only to find nearby medical stores
          </p>
        </div>
      </main>

      {/* 🔻 FOOTER */}
      <footer className="text-center text-sm text-gray-400 py-4">
        © {new Date().getFullYear()} MediNear · Built for faster access to medicines
      </footer>
    </div>
  );
}

export default Home;
