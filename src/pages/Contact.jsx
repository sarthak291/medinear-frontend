import { useState } from "react";
import api from "../services/api";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/contact", form);

      alert("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Contact <span className="text-blue-600">MediNear</span>
          </h1>

          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
            Have a question, feedback, or want to register your medical store?
            Send us a message — we’ll respond as soon as possible.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT INFO */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📞 Contact Information
            </h2>

            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-semibold">📍 Location:</span> Pune,
                Maharashtra, India
              </p>

              <p>
                <span className="font-semibold">📧 Email:</span>{" "}
                <span className="text-blue-600">yourgmail@gmail.com</span>
              </p>

              <p>
                <span className="font-semibold">📱 Phone:</span> +91 90000 00000
              </p>

              <p>
                <span className="font-semibold">🕒 Support Hours:</span> Mon - Sat
                (10 AM - 7 PM)
              </p>
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-blue-50 border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2">
                💡 Why Contact Us?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                If you face any issue while searching medicines or using store
                dashboard, our team will assist you quickly.
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ✉️ Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                name="message"
                placeholder="Write your message..."
                rows="6"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold shadow-md transition disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Your message will be delivered directly to MediNear admin email.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-12">
          © {new Date().getFullYear()} MediNear · Built for faster access to
          medicines
        </p>
      </div>
    </div>
  );
}

export default Contact;
