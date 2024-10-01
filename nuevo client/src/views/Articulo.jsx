import React from "react";
import { Header } from "../components/Header.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { link } from "../utilities/functions.js";
export const Articulo = () => {
  const url = (useLocation().search).slice(1)
  const [contenido, setContenido] = useState(22);
  useEffect(() => {
    link.articuloId(url)
      .then((response) => setContenido(response));
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="flex justify-center flex-col">
          <h1 className="text-center text-2xl font-bold">{contenido.Titulo}</h1>
          <div className="bg-slate-400 flex justify-center">
            <p className="text-xl">{contenido.Contenido}</p>
          </div>
        </div>
      </main>
    </>
  );
};
