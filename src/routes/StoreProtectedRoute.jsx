import { Navigate } from "react-router-dom";
import { isStoreLoggedIn } from "../utils/storeAuth";

const StoreProtectedRoute = ({ children }) => {
  if (!isStoreLoggedIn()) {
    return <Navigate to="/store/login" replace />;
  }
  return children;
};

export default StoreProtectedRoute;
