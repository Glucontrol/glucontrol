import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import "../style.css";
import { link } from "../utilities/functions.js";
import toast, { Toaster } from "react-hot-toast";

const CrearArticulo = () => {
  const path = window.location.pathname.split("/");
  const edit = path[1] == "edit" ? true : false;
  const article = path[3];
  const [articulo, setArticulo] = useState({});
  useEffect(() => {
    if (edit) {
      link.articuloId(article).then((el) => setArticulo(el));
    }
  }, []);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    setError(""); // Reiniciar el error si todo está correcto

    try {
      if (edit) {
        await link.edit(formData, article).then((res) => console.log(res));
      } else {
        await link.createArticulo(formData);
      }
      toast.success("Artículo creado exitosamente!"); // Notificación de éxito

      setTimeout(() => {
        // window.location.href = "/articulos";
      }, 1000);
    } catch (err) {
      toast.error("Hubo un error al crear el artículo."); // Notificación de error
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Toaster />
      <div className="flex items-center mb-6">
        <a
          href="/articulos"
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          <BiArrowBack size={24} />
        </a>
        <h1 className="text-2xl font-bold ml-4">
          {edit ? "Editar Nuevo Artículo" : "Crear Nuevo Artículo"}
        </h1>
      </div>
      <div>
        <h2 className="text-xl mb-4">
          Completa con los detalles de tu artículo
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Mostrar mensaje de error */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="nombreArticulo" className="mb-2 font-semibold">
              Nombre del Artículo
            </label>
            <input
              type="text"
              id="nombreArticulo"
              name="Titulo"
              defaultValue={`${articulo.Titulo}`}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce el nombre del artículo"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="categoriaArticulo" className="mb-2 font-semibold">
              Categoría
            </label>
            <select
              id="categoriaArticulo"
              className="select w-full rounded-lg focus:outline-none p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              name="Categoria"
            >
              <option defaultValue={`${articulo.Categoria}`} disabled>
                Selecciona una categoría
              </option>
              <option value="Salud">Salud</option>
              <option value="Nutricion">Nutrición</option>
              <option value="Ejercicio">Ejercicio</option>
              <option>Tecnología</option>
              <option>Investigación</option>
              <option>Consejos</option>
              <option>Recetas</option>
            </select>
          </div>
          <div>
            <label htmlFor="contenidoArticulo" className="mb-2 font-semibold">
              Contenido
            </label>
            <textarea
              id="contenidoArticulo"
              name="Contenido"
              defaultValue={`${articulo.Contenido}`}
              placeholder="Escribe el contenido del artículo..."
              className="w-full h-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input type="file" name="photo" />
          <button
            type="submit"
            className="bg-blue-400 text-white w-1/3 mt-16 p-2 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Listo
          </button>
        </form>
      </div>
    </main>
  );
};

export { CrearArticulo };
