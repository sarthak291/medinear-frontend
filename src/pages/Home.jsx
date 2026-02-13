import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

function Home() {
  const [selected, setSelected] = useState(false);
  const [medicine, setMedicine] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const [newStores, setNewStores] = useState([]);

  const navigate = useNavigate();

  // 🔍 Search medicine
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

  // 📍 Nearby Stores
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

  // 🔍 Autocomplete Suggestions
  useEffect(() => {
    if (selected) {
      setSelected(false);
      return;
    }

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

  // 🏪 Fetch newest stores
  useEffect(() => {
    const fetchNewestStores = async () => {
      try {
        const res = await api.get("/search/newest-stores");
        setNewStores(res.data || []);
      } catch (err) {
        console.error("Error fetching newest stores:", err);
      }
    };

    fetchNewestStores();
  }, []);

  // 🛒 Add to cart
  const addToCart = () => {
    if (!medicine.trim()) {
      alert("Please enter a medicine name");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const existing = cart.find(
      (c) => c.medicineName.toLowerCase() === medicine.toLowerCase()
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        medicineName: medicine,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

    alert("Added to cart ✅");
    setMedicine("");
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex flex-col overflow-x-hidden">
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

          {/* Desktop Menu */}
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
              View Nearby Stores
            </button>

            <button
              onClick={() => navigate("/store/login")}
              className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              Store Panel
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium">
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              Contact Us
            </Link>

            <button
              onClick={() => {
                setMenuOpen(false);
                findNearMe();
              }}
              className="text-left text-blue-600 hover:underline transition"
            >
              View Nearby Stores
            </button>

            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/store/login");
              }}
              className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              Store Panel
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <main className="flex-1 px-4 py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Find Medicines <span className="text-blue-600">Near You</span>{" "}
              Instantly
            </h1>

            <p className="text-gray-600 mt-6 text-lg leading-relaxed">
              Search medicine availability, compare prices, and reserve medicines
              from nearby verified medical stores — quickly and easily.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
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

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="px-3 py-1 rounded-full bg-white shadow-sm border">
                ✅ Verified Stores
              </span>
              <span className="px-3 py-1 rounded-full bg-white shadow-sm border">
                ⚡ Fast Reservations
              </span>
              <span className="px-3 py-1 rounded-full bg-white shadow-sm border">
                💊 Price Comparison
              </span>
              <span className="px-3 py-1 rounded-full bg-white shadow-sm border">
                🛒 Cart Support
              </span>
            </div>
          </motion.div>

          {/* RIGHT SEARCH CARD */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 p-8"
          >
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
                        setSelected(true);
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

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={addToCart}
                className="w-full sm:w-1/2 border border-blue-600 text-blue-600 py-3 rounded-xl text-lg font-medium hover:bg-blue-50 transition"
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={getLocationAndSearch}
                className="w-full sm:w-1/2 bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
              >
                Search Now 📍
              </button>
            </div>

            {/* Go to Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition"
            >
              Go to Cart →
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Location is used only to find nearby medical stores.
            </p>
          </motion.div>
        </div>

        {/* 🔥 OUR STORES SECTION */}
        <section className="max-w-7xl mx-auto mt-20 px-2">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center"
          >
            Our Newest Medical Stores 🏪
          </motion.h2>

          <p className="text-gray-600 text-center mt-3 mb-10">
            Recently added verified stores available for quick medicine
            reservation.
          </p>

          {newStores.length === 0 ? (
            <p className="text-center text-gray-500">
              No stores found yet. Add stores from Store Panel.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {newStores.map((store, index) => (
                <motion.div
                  key={store._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition"
                >
                  {/* Image */}
                  <img
                    src={
                      store.images?.[0]?.url ||
                      store.images?.[0]?.secure_url ||
                      store.images?.[0] ||
                      "https://via.placeholder.com/400x250"
                    }
                    alt="store"
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {store.storeName}
                    </h3>

                    <p className="text-gray-600 text-sm mt-2">
                      📍 {store.address?.area}, {store.address?.city}
                    </p>

                    <p className="text-gray-500 text-sm mt-2">
                      📞 {store.phone || "Not Available"}
                    </p>

                    <div className="mt-5 flex gap-3">
                      {store.googleMapLink && (
                        <a
                          href={store.googleMapLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
                        >
                          View Map
                        </a>
                      )}

                      <button
                        onClick={findNearMe}
                        className="flex-1 text-center border border-gray-300 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition"
                      >
                        Nearby
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-8 border-t mt-16 bg-white">
        © {new Date().getFullYear()} MediNear · Built for faster access to
        medicines
      </footer>
    </div>
  );
}

export default Home;
