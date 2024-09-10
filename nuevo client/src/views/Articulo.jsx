import React from "react";
import { Header } from "../components/Header.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export const Articulo = () => {
  const link = useLocation();
  const [contenido, setContenido] = useState(22);
  useEffect(() => {
    console.log(link.search);
    fetch(`http://localhost:8080/articulo/${link.search.slice(1)}`)
      .then((response) => response.json())
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
