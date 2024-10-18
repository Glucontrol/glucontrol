import React from "react";
import { link } from "../utilities/functions";

const Logout = () => {
  const [logged, setLogged] = React.useState(false);
  link.logOut().then((res) => setLogged(true));
  return logged ? (
    <h1>Logouteando...</h1>
  ) : (
    <h1>
      Logouteado, puede cambiar de página manualmente porque no quiero hacer
      redireccionamiento
    </h1>
  );
};

export default Logout;
