import React, { useState, useEffect, useContext } from "react";
import { Header } from "../components/Header.jsx";
import { useLocation } from "react-router-dom";
import { link } from "../utilities/functions.js";
import { LuChevronsRight } from "react-icons/lu";
import { BiArrowBack } from "react-icons/bi";
import { UserContext } from "../context/UserContext.jsx";
import toast, { Toaster } from "react-hot-toast";

export const Articulo = () => {
  const url = useLocation().search.slice(1);
  const [contenido, setContenido] = useState({});
  let user = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    link.articuloId(url).then((response) => setContenido(response));
  }, [url]);

  const handleVerificar = async () => {
    try {
      if (contenido._id) {
        const response = await link.validarArticulo(contenido._id);
        console.log("Respuesta del servidor:", response); // Depuración

        setContenido({ ...contenido, verificado: true });

        if (response.status == 200) {
          console.log("llega hasta acá");
          toast.success("Artículo verificado con éxito", {
            duration: 2000,
            position: "bottom-right",
          });
        } else {
          toast.error("Hubo un error al verificar el artículo");
        }
      } else {
        console.error("No hay id");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error en el servidor. Intenta nuevamente");
    }
  };

  return (
    <>
      <Toaster />
      <main className="min-h-screen bg-gray-50 dark:bg-slate-700 p-10">
        <div className="mx-auto max-w-4xl p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg ">
          <div className="flex items-center mb-6">
            <a href="/articulos" className="text-blue-500 hover:text-blue-700">
              <BiArrowBack size={24} />
            </a>
            <h1 className="text-2xl text-white font-bold ml-4">Articulos</h1>
          </div>
          <img
            src={`${contenido.urlImg}`}
            className="m-auto"
            alt=""
            srcset=""
          />
          <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-gray-100 mt-4 mb-6">
            {contenido.Titulo}
          </h1>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            Por{" "}
            <span className="font-medium">{contenido.Autor || "Anónimo"} </span>
          </p>

          <div
            className="prose max-w-none prose-lg text-gray-700 mx-auto dark:text-gray-400 leading-relaxed h-ful"
            dangerouslySetInnerHTML={{
              __html: contenido.Contenido?.replace(/\n/g, "<br>"),
            }}
          />
          {user.isMed ? (
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                onClick={handleVerificar}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Verificar
              </button>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
};
