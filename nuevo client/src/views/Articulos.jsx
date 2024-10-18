import React from "react";
import { useEffect, useState } from "react";
import { Tarjeta } from "../components/Tarjeta.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { link } from "../utilities/functions.js";
import { FiltroArticulos } from "../components/articlefilter.jsx";
export const Articulos = () => {
  const [data, setData] = useState(["hola", "hola2"]);
  useEffect(() => {
    link.articulos().then((response) => {
      setData(response);
    });
  }, []);
  const Tarjetas = data.map((el) => <Tarjeta info={el} />);
  return (
    <>
      <main className="flex">
        <Navbar />
        <div className="container flex items-center justify-center">
          <div className="flex flex-col items-center">
            <FiltroArticulos />
            <button
              className="h-20 w-40 shadow-md rounded-2xl self-center text-2xl hover:shadow-2xl 
          hover:scale-110 hover:bg-gray-200 duration-200 mt-10 mb-10"
              onClick={() => {
                window.location.href = "/crearArticulo";
              }}
            >
              Crear Articulo
            </button>
            <div className="flex flex-wrap flex-row justify-around gap-4 mt-10">
              {Tarjetas}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
