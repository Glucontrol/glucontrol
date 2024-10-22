import React from "react";
import { useEffect, useState } from "react";
import { Tarjeta } from "../components/Tarjeta.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { link } from "../utilities/functions.js";
export const Articulos = () => {
  const [data, setData] = useState(["hola", "hola2"]);
  useEffect(() => {
    link.articulos().then((response) => {
      setData(response);
    });
  }, []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);
  let Tarjetas = data.map((el) => <Tarjeta info={el} />);
  const Standard = (string) => {
    return string.toUpperCase().trim();
  };
  return (
    <>
      <main className="flex">
        <Navbar />
        <div className="container flex items-center justify-center">
          <div className="flex flex-col items-center">
            <button
              className="h-20 w-40 shadow-md rounded-2xl self-center text-2xl hover:shadow-2xl 
          hover:scale-110 hover:bg-gray-200 duration-200 mt-10 mb-10"
              onClick={() => {
                window.location.href = "/crearArticulo";
              }}
            >
              Crear Articulo
            </button>
            {/* Input */}
            <input
              type="text"
              className="bg-red-200 "
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex flex-wrap flex-row justify-around gap-4 mt-10">
              {data.map((el) => {
                if (typeof el.Titulo == "string") {
                  if (Standard(el.Titulo).match(Standard(search))) {
                    return <Tarjeta info={el} />;
                  }
                }
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
