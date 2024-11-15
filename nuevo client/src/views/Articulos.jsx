import React, { useEffect, useState } from "react";
import { Tarjeta } from "../components/Tarjeta.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { link } from "../utilities/functions.js";
import { LuArrowDownWideNarrow, LuFilter, LuSearch } from "react-icons/lu";
import { Footer } from "../components/Footer.jsx";

export default function Articulos() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtroTema, setFiltroTema] = useState("Todos");
  const [filtroFecha, setFiltroFecha] = useState("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    link
      .articulos()
      .then((response) => {
        setData(Array.isArray(response) ? response : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los artículos:", error);
        setData([]);
        setIsLoading(false);
      });
  }, []);

  const filtrarArticulos = () => {
    if (!Array.isArray(data)) return [];

    return data
      .filter((articulo) => {
        if (filtroTema === "Todos") return true;
        return (
          articulo &&
          articulo.Categoria &&
          articulo.Categoria.toLowerCase() === filtroTema.toLowerCase()
        );
      })
      .filter((articulo) => {
        if (filtroFecha === "Todos") return true;

        if (!articulo || !articulo.Fecha) return false;

        const articuloFecha = new Date(articulo.Fecha);
        const hoy = new Date();
        const sieteDiasAtras = new Date(
          hoy.getTime() - 7 * 24 * 60 * 60 * 1000
        );

        if (filtroFecha === "Recientes") {
          return articuloFecha >= sieteDiasAtras;
        }

        if (filtroFecha === "Antiguos") {
          return articuloFecha < sieteDiasAtras;
        }

        return true;
      })
      .filter((articulo) => {
        if (!search) return true;
        const searchLower = search.toLowerCase().trim();
        return (
          articulo &&
          ((articulo.Titulo &&
            articulo.Titulo.toLowerCase().includes(searchLower)) ||
            (articulo.Categoria &&
              articulo.Categoria.toLowerCase().includes(searchLower)))
        );
      });
  };

  return (
    <>
      <main className="flex dark:bg-slate-800">
        <Navbar />
        <div className="flex-1 pt-10">
          <div className="flex justify-center mb-10">
            <button
              className="px-6 py-3 shadow-lg rounded-full text-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out border border-indigo-600"
              onClick={() => {
                window.location.href = "/crearArticulo";
              }}
            >
              Crear Artículo
            </button>
          </div>

          <div className="flex justify-center items-center mb-6 gap-4 p-4">
            <div className="flex items-center gap-2">
              <LuArrowDownWideNarrow className="text-xl text-indigo-600" />
              <select
                value={filtroTema}
                onChange={(e) => setFiltroTema(e.target.value)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out hover:bg-gray-100"
              >
                <option value="Todos">Todos los temas</option>
                <option value="Salud">Salud</option>
                <option value="Nutrición">Nutrición</option>
                <option value="Ejercicio">Ejercicio</option>
                <option value="Tecnologia">Tecnología</option>
                <option value="Investigacion">Investigación</option>
                <option value="Consejos">Consejos</option>
                <option value="Recetas">Recetas</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <LuFilter className="text-xl text-indigo-600" />
              <select
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out hover:bg-gray-100"
              >
                <option value="Todos">Todas las fechas</option>
                <option value="Recientes">Recientes</option>
                <option value="Antiguos">Antiguos</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <LuSearch className="text-xl text-indigo-600" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out hover:bg-gray-100"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>

          {isLoading ? (
            <p className="text-center text-xl text-gray-500 h-full ">
              Cargando artículos...
            </p>
          ) : data.length === 0 ? (
            <p className="text-center text-xl text-gray-500">
              No hay artículos disponibles
            </p>
          ) : (
            <div className="container grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 gap-4 justify-around">
              {filtrarArticulos().map((articulo) => (
                <Tarjeta key={articulo.id || Math.random()} info={articulo} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
