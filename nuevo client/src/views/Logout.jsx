import React from "react";
import { link } from "../utilities/functions";
const LogOut = () => {
  link.logOut();
  return (
    <>
      <h1>Cerrar Sesión</h1>
    </>
  );
};
export default LogOut;
