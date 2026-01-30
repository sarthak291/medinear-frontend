import { useEffect, useState } from "react";
import api from "../../services/api";

function Profile() {
  const [form, setForm] = useState({
    storeName: "",
    phone: "",
    area: "",
    city: "",
    lat: "",
    lng: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/store/profile");
        const store = res.data;

        setForm({
          storeName: store.storeName || "",
          phone: store.phone || "",
          area: store.address?.area || "",
          city: store.address?.city || "",
          lat: store.coordinates?.lat || "",
          lng: store.coordinates?.lng || "",
        });

        setExistingImages(store.images || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle new images
  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  // 🔹 Delete existing image
  const handleDeleteImage = async (imageUrl) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await api.delete("/store/profile/image", {
        data: { imageUrl },
      });

      setExistingImages(
        existingImages.filter((img) => img !== imageUrl)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete image");
    }
  };

  // 🔹 Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (newImages.length > 0) {
      newImages.forEach((img) =>
        formData.append("images", img)
      );
    }

    try {
      await api.put("/store/profile", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

      alert("Profile updated successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Profile update failed");
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Store Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="storeName"
          value={form.storeName}
          onChange={handleChange}
          placeholder="Store Name"
          className="w-full p-2 border rounded"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 border rounded"
        />

        <input
          name="area"
          value={form.area}
          onChange={handleChange}
          placeholder="Area"
          className="w-full p-2 border rounded"
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 border rounded"
        />

        <input
          name="lat"
          value={form.lat}
          onChange={handleChange}
          placeholder="Latitude"
          className="w-full p-2 border rounded"
        />

        <input
          name="lng"
          value={form.lng}
          onChange={handleChange}
          placeholder="Longitude"
          className="w-full p-2 border rounded"
        />

        {/* 🔹 Existing Images */}
        {existingImages.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">
              Existing Store Images
            </p>
            <div className="flex gap-3 flex-wrap">
              {existingImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24"
                >
                  <img
                    src={img}
                    alt="store"
                    className="w-full h-full object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteImage(img)
                    }
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔹 Upload New Images */}
        <div>
          <p className="text-sm font-medium mb-1">
            Upload New Images (optional)
          </p>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
