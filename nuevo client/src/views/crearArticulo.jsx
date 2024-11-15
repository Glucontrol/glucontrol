import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import "../style.css";
import { link } from "../utilities/functions.js";
import toast, { Toaster } from "react-hot-toast";

export default function CrearArticulo() {
  const path = window.location.pathname.split("/");
  const edit = path[1] == "edit" ? true : false;
  const article = path[3];
  const [articulo, setArticulo] = useState({});
  const time = new Date().toISOString();
  useEffect(() => {
    if (edit) {
      link
        .articuloId(article)
        .then((el) => setArticulo(el))
        .then(() => setLoading(true));
    } else {
      setLoading(true);
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    setError(""); // Reiniciar el error si todo está correcto

    try {
      if (edit) {
        await link.edit(formData, article).then((res) => console.log(res));
      } else {
        formData.append("Fecha", new Date().toISOString());
        console.log(formData);
        await link.createArticulo(formData);
      }
      toast.success("Artículo creado exitosamente!"); // Notificación de éxito

      setTimeout(() => {
        window.location.href = "/articulos";
      }, 1000);
    } catch (err) {
      toast.error("Hubo un error al crear el artículo."); // Notificación de error
    }
  };

  return !loading ? (
    <main className="max-w-4xl mx-auto p-4 ">
      <Toaster />
      <div className="flex items-center mb-6">
        <a
          href="/articulos"
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          <BiArrowBack size={24} />
        </a>
        <h1 className="text-2xl font-bold ml-4 bg-gray-100 border border-gray-100 animate-pulse text-transparent">
          {edit ? "Editar Artículo" : "Crear Nuevo Artículo"}
        </h1>
      </div>
      <div>
        <h2 className="text-xl mb-4 bg-gray-100 border border-gray-100 text-transparent">
          Completa con los detalles de tu artículo
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Mostrar mensaje de error */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="nombreArticulo"
              className="mb-2 font-semibold bg-gray-100 animate-pulse border border-gray-100"
            ></label>
            <input
              disabled
              className="p-2 rounded-lg border border-gray-100 bg-gray-100 animate-pulse text-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="categoriaArticulo"
              className="mb-2 font-semibold bg-gray-100 animate-pulse border border-gray-100"
            ></label>
            <select
              id="categoriaArticulo"
              className="select w-full rounded-lg focus:outline-none p-2 border border-gray-100 bg-gray-100 animate-pulse text-transparent "
              name="Categoria"
              disabled
            ></select>
          </div>
          <div>
            <label
              htmlFor="contenidoArticulo"
              className="mb-2 font-semibold text-transparent bg-gray-100 border border-gray-100 animate-pulse"
            >
              Contenido
            </label>
            <textarea
              id="contenidoArticulo"
              disabled
              name="Contenido"
              className="w-full h-64 p-2 border border-gray-100 bg-gray-100 animate-pulse text-transparent"
            />
          </div>
          <input
            type="file"
            name="photo"
            className="border border-gray-100 bg-gray-100 text-transparent animate-pulse"
            disabled
          />
          <button
            type="submit"
            disabled
            className="bg-blue-200 text-transparent animate-pulse w-1/3 mt-16 p-2 rounded-lg"
          >
            Listo
          </button>
        </form>
      </div>
    </main>
  ) : (
    <main className="max-w-4xl mx-auto p-4 dark:bg-slate-700">
      {document.documentElement.classList.contains("dark")
        ? document.querySelector("#root").classList.add("bg-slate-800")
        : console.log("ño")}
      <Toaster />
      <div className="flex items-center mb-6">
        <a
          href="/articulos"
          className="text-blue-500 hover:text-blue-70 cursor-pointer"
        >
          <BiArrowBack size={24} />
        </a>
        <h1 className="text-2xl font-bold ml-4 dark:text-gray-100">
          {edit ? "Editar Nuevo Artículo" : "Crear Nuevo Artículo"}
        </h1>
      </div>
      <div>
        <h2 className="text-xl mb-4 dark:text-gray-300">
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
              defaultValue={`${edit ? articulo.Titulo : ""}`}
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
              <option
                defaultValue={`${edit ? articulo.Categoria : ""}`}
                disabled
              >
                Selecciona una categoría
              </option>
              <option value="Salud">Salud</option>
              <option value="Nutrición">Nutrición</option>
              <option value="Ejercicio">Ejercicio</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Investigación">Investigación</option>
              <option value="Consejos">Consejos</option>
              <option value="Recetas">Recetas</option>
            </select>
          </div>
          <div>
            <label htmlFor="contenidoArticulo" className="mb-2 font-semibold">
              Contenido
            </label>
            <textarea
              id="contenidoArticulo"
              name="Contenido"
              defaultValue={`${edit ? articulo.Contenido : ""}`}
              placeholder="Escribe el contenido del artículo..."
              className="w-full h-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="file"
            name="photo"
            onChange={(e) => {
              const reader = new FileReader();
              const file = e.target.files[0];
              reader.onload = (readerEvent) => {
                let $img = document.querySelector("#img");

                if (!$img) {
                  $img = document.createElement("img");
                }

                $img.src = readerEvent.target.result;
                $img.style.width = "512px";
                document.querySelector("form").append($img);
              };

              reader.readAsDataURL(file);
            }}
          />
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
}

export { CrearArticulo };
