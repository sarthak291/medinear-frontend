import { Outlet } from "react-router-dom";
import StoreSidebar from "./StoreSidebar";
import StoreTopbar from "./StoreTopbar";

const StoreLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <StoreSidebar />
      <div className="flex-1 flex flex-col">
        <StoreTopbar />
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StoreLayout;
