import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { link } from "../utilities/functions";

const PublicRoutes = () => {
  const user = useContext(UserContext);
  console.log("Publica :", user);
  return !user.loggedIn ? <Outlet /> : <Navigate to="/home" />;
};
export default PublicRoutes;
