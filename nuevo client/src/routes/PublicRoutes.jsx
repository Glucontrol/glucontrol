import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const user = useContext(UserContext);
  console.log("publica:", user.loggedIn);
  return user.loggedIn ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;
