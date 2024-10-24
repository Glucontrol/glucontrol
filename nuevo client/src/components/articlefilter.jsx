import React, { useState, useEffect } from "react";
import { link } from "../utilities/functions";

export const FiltroArticulos = () => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [temaSeleccionado, setTemaSeleccionado] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [articulosFiltrados, setArticulosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const articulosPorPagina = 5;

  const temas = [
    "Nutrición",
    "Actividad Física",
    "Salud",
    "Tratamientos",
    "Investigación",
  ];

  useEffect(() => {
    buscarArticulos();
  }, [temaSeleccionado, fechaDesde, fechaHasta, busqueda]);

  const buscarArticulos = async () => {
    try {
      const data = {
        tema: temaSeleccionado,
        fechaInicio: fechaDesde,
        fechaFin: fechaHasta,
        keywords: busqueda,
      };

      const resultado = await link.filterArticulos(data);
      setArticulosFiltrados(resultado);
      setPaginaActual(1);
    } catch (error) {
      console.error("Error:", error);
      setArticulosFiltrados([]);
    }
  };

  const indiceUltimoArticulo = paginaActual * articulosPorPagina;
  const indicePrimerArticulo = indiceUltimoArticulo - articulosPorPagina;
  const articulosActuales = articulosFiltrados.slice(
    indicePrimerArticulo,
    indiceUltimoArticulo
  );

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar artículos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-2 border rounded-md"
          aria-label="Buscar artículos"
        />
        <button
          onClick={buscarArticulos}
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Buscar
        </button>
      </div>

      <button
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center"
        aria-expanded={mostrarFiltros}
        aria-controls="opciones-filtro"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
        Filtrar
      </button>

      {mostrarFiltros && (
        <div id="opciones-filtro" className="bg-gray-100 p-4 mb-4 rounded-md">
          <div className="mb-4">
            <label htmlFor="tema-select" className="block mb-2">
              Tema:
            </label>
            <select
              id="tema-select"
              value={temaSeleccionado}
              onChange={(e) => setTemaSeleccionado(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Todos los temas</option>
              {temas.map((tema) => (
                <option key={tema} value={tema}>
                  {tema}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="fecha-desde" className="block mb-2">
              Fecha desde:
            </label>
            <input
              id="fecha-desde"
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="fecha-hasta" className="block mb-2">
              Fecha hasta:
            </label>
            <input
              id="fecha-hasta"
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {articulosActuales.map((articulo) => (
          <article
            key={articulo._id}
            className="bg-white p-4 rounded-md shadow"
          >
            <h2 className="text-xl font-bold">{articulo.titulo}</h2>
            <p className="text-gray-600">Tema: {articulo.tema}</p>
            <p className="text-gray-600">
              Fecha: {new Date(articulo.fechaPublicacion).toLocaleDateString()}
            </p>
            <p className="mt-2">{articulo.contenido.substring(0, 150)}...</p>
          </article>
        ))}
      </div>

      {articulosFiltrados.length > articulosPorPagina && (
        <nav
          className="mt-4 flex justify-center"
          aria-label="Paginación de artículos"
        >
          {Array.from(
            {
              length: Math.ceil(articulosFiltrados.length / articulosPorPagina),
            },
            (_, i) => (
              <button
                key={i}
                onClick={() => cambiarPagina(i + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${
                  paginaActual === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                aria-current={paginaActual === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            )
          )}
        </nav>
      )}

      {articulosFiltrados.length === 0 && (
        <p className="text-center mt-4">
          No se encontraron artículos que coincidan con los criterios de
          búsqueda.
        </p>
      )}
    </div>
  );
};
