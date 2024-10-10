import { UserContext } from "../context/UserContext";
import { Suspense, useContext } from "react";
import { Outlet } from "react-router-dom";
import { link } from "../utilities/functions";

const PrivateRoutes = () => {
  const user = useContext(UserContext);
  link.sesion();
  return <Outlet />;
};

export default PrivateRoutes;
