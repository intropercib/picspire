import { Navigate } from "react-router-dom";
import useAuthStore from "../components/store/useAuthStore";


const ProtectedRoute = ({ children }) => {
  const authUser = useAuthStore((state) => state.user);
  return authUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;