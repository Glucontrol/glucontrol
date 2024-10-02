import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../style.css";

const CrearArticulo = () => {
  const [contenido, setContenido] = useState("");

  const handleChange = (value) => {
    setContenido(value);
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <a href="#" className="text-blue-500 hover:text-blue-700">
          <BiArrowBack size={24} />
        </a>
        <h1 className="text-2xl font-bold ml-4">Crear Nuevo Artículo</h1>
      </div>
      <div>
        <h2 className="text-xl mb-4">
          Completa con los detalles de tu artículo
        </h2>
        <form className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="nombreArticulo" className="mb-2 font-semibold">
              Nombre del Artículo
            </label>
            <input
              type="text"
              id="nombreArticulo"
              name="nombreArticulo"
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <select className="select w-full rounded-lg focus:outline-none p-2 border border-gray-300 focus:ring-2  focus:ring-blue-500">
              <option disabled selected>
                Selecciona una categoría
              </option>
              <option>Salud</option>
              <option>Nutrición</option>
              <option>Ejercicio</option>
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
            <div className="h-64">
              <ReactQuill
                theme="snow"
                value={contenido}
                onChange={handleChange}
                placeholder="Escribe el contenido del artículo..."
                className="h-full"
              />
            </div>
          </div>
        </form>
        <button className="bg-blue-400 text-white w-1/3  mt-16 p-2 rounded-lg hover:bg-blue-600 hover:text-white">
          Listo
        </button>
      </div>
    </main>
  );
};

export { CrearArticulo };
