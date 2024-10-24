import React from "react";
import { Header } from "../components/Header.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { link } from "../utilities/functions.js";
import { LuChevronsRight } from "react-icons/lu";

export const CrearArticulo = () => {
  const url = useLocation().search.slice(1);
  const [contenido, setContenido] = useState(22);

  useEffect(() => {
    link.articuloId(url).then((response) => setContenido(response));
    console.log(contenido);
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg my-12">
          <div className="flex items-center space-x-2 text-gray-600">
            <p className="text-lg font-semibold">{contenido.Categoria}</p>
            <LuChevronsRight className="h-6 w-6" />
          </div>

          <h1 className="text-center text-4xl font-bold text-gray-800 mt-4 mb-6">
            {contenido.Titulo}
          </h1>

          <p className="text-center text-sm text-gray-500 mb-8">
            Por <span className="font-medium">{contenido.Autor}</span>
          </p>

          <div className="prose max-w-none prose-lg text-gray-700 mx-auto leading-relaxed whitespace-pre-line">
            <p>{contenido.Contenido}</p>
          </div>
        </div>
      </main>
    </>
  );
};
