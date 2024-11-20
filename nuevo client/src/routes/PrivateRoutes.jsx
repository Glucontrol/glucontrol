import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useContext(UserContext);
  console.log("Privada :", user);
  return user.loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
