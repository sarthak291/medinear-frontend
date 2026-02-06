import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

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
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        Medinear
      </Link>

      {/* Right Menu */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link
          to="/about"
          className="text-gray-700 hover:text-blue-600"
        >
          About Us
        </Link>

        <Link
          to="/contact"
          className="text-gray-700 hover:text-blue-600"
        >
          Contact Us
        </Link>

        <button
          onClick={findNearMe}
          className="text-blue-600 hover:underline"
        >
          View Medical Stores Near You
        </button>
      </div>
    </nav>
  );
};




export default Navbar;
