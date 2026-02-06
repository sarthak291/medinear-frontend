import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            About <span className="text-blue-600">MediNear</span>
          </h1>

          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
            MediNear is a medicine availability platform that helps users find
            medicines quickly in nearby verified medical stores. We focus on
            saving time and reducing stress in urgent situations.
          </p>
        </div>

        {/* INFO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CARD 1 */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              🚀 Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To create a fast and reliable medicine search system that connects
              people with nearby medical stores and makes medicine access
              quicker, especially during emergencies.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              🎯 Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to reduce the time wasted in searching medicines by
              providing real-time stock availability, price comparison, and
              store navigation using Google Maps.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              💊 What MediNear Offers
            </h2>

            <ul className="text-gray-700 space-y-2">
              <li>✅ Search medicines near your location</li>
              <li>✅ View available stock in nearby stores</li>
              <li>✅ Compare prices between stores</li>
              <li>✅ Reserve medicines instantly (Buy Now system)</li>
              <li>✅ Get Google Maps direction to store</li>
            </ul>
          </div>

          {/* CARD 4 */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              ⭐ Why MediNear?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Unlike delivery-first platforms, MediNear is designed for quick
              availability checking. It helps users save time by showing the
              nearest medical stores that actually have the required medicine.
            </p>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="mt-14 text-center bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl p-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Want to connect with us?
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            If you have any feedback, queries, or suggestions, feel free to
            contact us.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-md transition"
          >
            📩 Contact Us
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-10">
          © {new Date().getFullYear()} MediNear · Built to make medicine access faster
        </p>
      </div>
    </div>
  );
}

export default About;
