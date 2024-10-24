import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { link } from "../utilities/functions";

const PublicRoutes = () => {
  link.sesion().then((res) => console.log("hola", res));
  return <Outlet />;
};
export default PublicRoutes;
