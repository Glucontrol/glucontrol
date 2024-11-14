import { useEffect } from "react";
import { link } from "../utilities/functions";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  link.logOut();

  return (
    <main className="flex flex-col items-center space-y-4">
      <h1>Nos vemos pronto</h1>
      <p>Redirigiendo al inicio en 3 segundos...</p>
    </main>
  );
};

export default LogOut;
