import { NavLink } from "react-router-dom";
import { logoutStore } from "../../utils/storeAuth";

const StoreSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-5">
      <h2 className="text-xl font-bold mb-6 text-blue-600">Medinear Store</h2>

      <nav className="flex flex-col gap-4">
        <NavLink to="/store/dashboard">Dashboard</NavLink>
        <NavLink to="/store/profile">Profile</NavLink>
        <NavLink to="/store/inventory">Inventory</NavLink>
        <NavLink to="/store/reservations">Reservations</NavLink>

        <button
          onClick={logoutStore}
          className="mt-6 text-red-500 text-left"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default StoreSidebar;
