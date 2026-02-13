import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function StoreSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    storeName: "",
    email: "",
    password: "",
    phone: "",
    area: "",
    city: "",
    googleMapLink: "",
    lat: "",
    lng: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Extract lat/lng from google map link
  useEffect(() => {
    if (!form.googleMapLink) return;

    try {
      const link = form.googleMapLink;

      // Case 1: q=lat,lng
      const qMatch = link.match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (qMatch) {
        setForm((prev) => ({
          ...prev,
          lat: qMatch[1],
          lng: qMatch[2],
        }));
        return;
      }

      // Case 2: @lat,lng
      const atMatch = link.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (atMatch) {
        setForm((prev) => ({
          ...prev,
          lat: atMatch[1],
          lng: atMatch[2],
        }));
        return;
      }
    } catch (err) {
      console.error("Invalid Google Map link");
    }
  }, [form.googleMapLink]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 1) {
      alert("Please upload at least 1 image");
      return;
    }
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      alert("You can upload maximum 3 images");
      return;
    }

setImages(files);

    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    images.forEach((img) => data.append("images", img));

    try {
      await api.post("/store/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Store registered successfully. Await verification ✅");
      navigate("/store/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE TEXT */}
        <div className="hidden md:block">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Register Your <span className="text-blue-600">Medical Store</span>
          </h1>

          <p className="text-gray-600 mt-5 text-lg leading-relaxed">
            Join MediNear and make your store visible to nearby customers.
            Upload your store info and inventory, and let users reserve medicines
            instantly.
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm text-gray-600">
            <p className="px-4 py-2 bg-white shadow-sm border rounded-xl">
              ✅ Verified stores gain visibility
            </p>
            <p className="px-4 py-2 bg-white shadow-sm border rounded-xl">
              ✅ Customers can reserve medicines easily
            </p>
            <p className="px-4 py-2 bg-white shadow-sm border rounded-xl">
              ✅ Add medicines and manage inventory
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl p-8 w-full"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Store Signup
          </h2>

          <p className="text-gray-600 text-center mt-2 mb-6 text-sm">
            Fill details below to register your store
          </p>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="storeName"
              placeholder="Store Name"
              value={form.storeName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="area"
              placeholder="Area"
              value={form.area}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* GOOGLE MAP LINK */}
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              Google Map Link
            </label>

            <input
              name="googleMapLink"
              placeholder="Paste Google Maps link"
              value={form.googleMapLink}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-gray-500 mt-1">
              Paste link and latitude/longitude will auto-fill.
            </p>
          </div>

          {/* LAT LNG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              name="lat"
              placeholder="Latitude"
              value={form.lat}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="lng"
              placeholder="Longitude"
              value={form.lng}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700">
              Upload Store Images (1-3)
            </label>

            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-2xl p-4 bg-white">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages([...e.target.files])}
                className="w-full text-sm text-gray-600"
                required
              />

              {images.length > 0 && (
                <p className="text-xs text-green-600 mt-2">
                  {images.length} image(s) selected ✅
                </p>
              )}
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold shadow-md transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register Store"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-sm text-center text-gray-600 mt-5">
            Already registered?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/store/login")}
            >
              Login
            </span>
          </p>

          <p className="text-xs text-gray-500 text-center mt-2">
            Note: Store must be verified by admin before login access.
          </p>
        </form>
      </div>
    </div>
  );
}

export default StoreSignup;
