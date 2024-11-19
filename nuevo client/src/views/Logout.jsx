import { useEffect, useState } from "react";
import { link } from "../utilities/functions";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    link.logOut().then((el) => {
      setLogged(false);
      setTimeout(() => {
        window.location.href = "./";
      }, 5000);
    });
  }, []);

  return (
    <main className="flex flex-col items-center space-y-4">
      {logged ? (
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold">Cerrando Sesión</h1>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">Sesión Cerrada</h1>
        </div>
      )}
    </main>
  );
};

export default LogOut;
