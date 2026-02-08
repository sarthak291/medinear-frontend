import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      (err) => {
        alert("Location permission denied");
        console.error(err);
      }
    );
  };

  const findNearMe = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        navigate(`/results?nearby=true&lat=${latitude}&lng=${longitude}`);
      },
      (err) => {
        alert("Location permission denied");
        console.error(err);
      }
    );
  };

  // 🔍 Autocomplete
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex flex-col">
      {/* ✅ NAVBAR */}
      <nav className="w-full bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-blue-600 tracking-tight"
          >
            MediNear
          </Link>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link to="/about" className="hover:text-blue-600 transition">
              About Us
            </Link>

            <Link to="/contact" className="hover:text-blue-600 transition">
              Contact Us
            </Link>

            <button
              onClick={findNearMe}
              className="text-blue-600 hover:underline transition"
            >
              View Medical Stores Near You
            </button>

            <button
              onClick={() => navigate("/store/login")}
              className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              Store Panel
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Find Medicines <span className="text-blue-600">Near You</span>{" "}
              Instantly
            </h1>

            <p className="text-gray-600 mt-5 text-lg leading-relaxed">
              Search medicine availability, compare prices, and reserve medicines
              from nearby verified medical stores — quickly and easily.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={findNearMe}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition"
              >
                📍 View Nearby Stores
              </button>

              <button
                onClick={() => navigate("/store/signup")}
                className="bg-white border border-gray-300 hover:border-blue-400 text-gray-800 px-6 py-3 rounded-2xl font-semibold shadow-sm transition"
              >
                🏥 Register Your Store
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="px-3 py-1 rounded-full bg-white shadow-sm border">
                ✅ Verified Stores
              </span>
              <span className="px-3 py-1 rounded-full bg-white shadow-sm border">
                ⚡ Fast Reservations
              </span>
              <span className="px-3 py-1 rounded-full bg-white shadow-sm border">
                💊 Price Comparison
              </span>
            </div>
          </div>

          {/* RIGHT SEARCH CARD */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Search Medicines Nearby
            </h2>

            <p className="text-gray-600 text-center mb-6">
              Type medicine name and reserve from nearby stores.
            </p>

            {/* INPUT */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search medicine name (e.g. Paracetamol)"
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* AUTOCOMPLETE */}
              {suggestions.length > 0 && (
                <div className="absolute z-20 w-full bg-white border rounded-2xl shadow-lg mt-2 overflow-hidden">
                  {suggestions.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-800"
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

            {/* BUTTON */}
            <button
              onClick={getLocationAndSearch}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-lg font-semibold shadow-md transition"
            >
              🔍 Search Using My Location
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Location is used only to find nearby medical stores.
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} MediNear · Built for faster access to
        medicines
      </footer>
    </div>
  );
}

export default Home;
