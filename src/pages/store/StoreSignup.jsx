import { useState } from "react";
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
    lat: "",
    lng: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    images.forEach((img) => data.append("images", img));

    try {
      await api.post("/store/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Store registered successfully. Await verification.");
      navigate("/store/login");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-3"
      >
        <h2 className="text-2xl font-bold text-center">
          Store Signup
        </h2>

        <input
          name="storeName"
          placeholder="Store Name"
          onChange={handleChange}
          required
          className="input"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="input"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="input"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
          className="input"
        />

        <input
          name="area"
          placeholder="Area"
          onChange={handleChange}
          required
          className="input"
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
          className="input"
        />

        <input
          name="lat"
          placeholder="Latitude"
          onChange={handleChange}
          className="input"
        />

        <input
          name="lng"
          placeholder="Longitude"
          onChange={handleChange}
          className="input"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setImages([...e.target.files])
          }
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Register Store
        </button>

        <p className="text-sm text-center text-gray-500">
          Already registered?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/store/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default StoreSignup;
