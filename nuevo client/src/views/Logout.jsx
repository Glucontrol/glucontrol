import { useEffect, useState } from "react";
import { link } from "../utilities/functions";
import { Link } from "react-router-dom";

const LogOut = () => {
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    link.logOut().then((el) => {
      setLogged(false);
      /* setTimeout(() => {
        window.location.href = "./";
      }, 5000); */
    });
  }, []);

  return (
    <main className="flex flex-col items-center space-y-4">
      {logged ? (
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold">Cerrando Sesión</h1>
        </div>
      ) : (
        <div
          className="
      flex flex-col justify-center items-center min-h-screen"
        >
          <h1 className="text-3xl font-bold mb-6">Nos vemos pronto</h1>
          <img src={`../src/assets/icons/gato.svg`} alt="" />
        </div>
      )}
    </main>
  );
};

export default LogOut;
