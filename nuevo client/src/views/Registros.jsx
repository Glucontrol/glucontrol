import React, { useEffect, useState } from "react";
import { link } from "../utilities/functions";
import { Navbar } from "../components/Navbar";
import {
  LuSyringe,
  LuCalendarCheck,
  LuClock9,
  LuPersonStanding,
  LuPill,
  LuArrowDownWideNarrow,
  LuFilter,
} from "react-icons/lu";
import { PiDrop, PiLightning } from "react-icons/pi";
import { Footer } from "../components/Footer.jsx";

export const Registros = () => {
  const [registros, setRegistros] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [filtro, setFiltro] = useState("Todos"); // Estado para el filtro
  const [fecha, setFecha] = useState("Todos");

  useEffect(() => {
    link.getRegistersI().then((data) => {
      console.log(data);
      setRegistros(data);

      setIsLoading(false); // Detener el estado de carga cuando se obtienen los datos
    });
  }, []);

  return (
    <>
      <main className="flex mb-8">
        <Navbar />
        <div className="flex-1 pt-10">
          <div className="flex justify-center mb-10">
            <button
              className="px-6 py-3 shadow-lg rounded-full text-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out border border-indigo-600"
              onClick={() => {
                window.location.href = "/crearRegistro";
              }}
            >
              Registrar
            </button>
          </div>

          <div className="flex justify-center  items-center mb-6 gap-4 p-4">
            <div className="flex items-center gap-2">
              <LuArrowDownWideNarrow className="text-xl text-indigo-600" />
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out hover:bg-gray-100"
              >
                <option value="Todos">Todos</option>
                <option value="Glucosa">Glucosa</option>
                <option value="Insulina">Insulina</option>
                <option value="HbA1c">HbA1c</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <LuFilter className="text-xl text-indigo-600" />
              <select
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out hover:bg-gray-100"
              >
                <option value="Todos">Todos</option>
                <option value="Recientes">Recientes</option>
                <option value="Antiguos">Antiguos</option>
              </select>
            </div>
          </div>

          {/* Mostrar un mensaje de carga mientras se obtienen los registros */}
          {isLoading ? (
            <p className="text-center text-xl text-gray-500">
              Cargando registros...
            </p>
          ) : registros.length === 0 ? (
            <p className="text-center text-xl text-gray-500 min-h-full">
              No hay registros disponibles
            </p>
          ) : (
            <div className="container grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 gap-4 justify-around">
              {/* Lógica del filtro */}
              {registros
                .filter((registro) => {
                  if (filtro === "Todos") return true;
                  if (filtro === "Glucosa") return registro.Glucosa; // Filtrar por Glucosa
                  if (filtro === "HbA1c") return registro.HbA1c; // Filtrar por Glucosa
                  if (filtro === "Insulina")
                    return registro.Dosis || registro.Via; // Filtrar por Insulina
                  return true;
                })
                .filter((registro) => {
                  // Filtrar por fecha
                  if (fecha === "Todos") return true;

                  const registroFecha = new Date(registro.Fecha);
                  const hoy = new Date();

                  if (fecha === "Recientes") {
                    // Mostrar registros de los últimos 7 días
                    const sieteDiasAtras = new Date();
                    sieteDiasAtras.setDate(hoy.getDate() - 7);
                    return registroFecha >= sieteDiasAtras;
                  }

                  if (fecha === "Antiguos") {
                    // Mostrar registros de hace más de 7 días
                    const sieteDiasAtras = new Date();
                    sieteDiasAtras.setDate(hoy.getDate() - 7);
                    return registroFecha < sieteDiasAtras;
                  }

                  return true; // Si no se cumple ninguna condición, no filtrar
                })
                .map((registro, index) => (
                  <div
                    key={registro.id || index} // Asegurarse de que el key sea único
                    className="bg-white shadow-md hover:shadow-lg shadow-gray-400 border border-gray-200 min-h-40 min-w-60 flex flex-col hover:scale-105 hover:bg-indigo-50 transition-all duration-300 ease-in-out rounded-xl p-6 space-y-4"
                  >
                    {registro.Tipo && (
                      <div className="flex items-center gap-2">
                        <PiLightning className="text-indigo-500 w-6 h-6" />
                        <p className="text-base font-semibold text-gray-700">
                          {registro.Tipo}
                        </p>
                      </div>
                    )}
                    {registro.Dosis && (
                      <div className="flex items-center gap-2">
                        <PiDrop className="text-indigo-500 w-6 h-6" />
                        <p className="text-base font-semibold text-gray-700">
                          {registro.Dosis}
                        </p>
                      </div>
                    )}
                    {registro.HbA1c && (
                      <div className="flex items-center gap-2">
                        <PiDrop className="text-indigo-500 w-6 h-6" />
                        <p className="text-base font-semibold text-gray-700">
                          {registro.HbA1c}
                        </p>
                      </div>
                    )}
                    {registro.Via && (
                      <div className="flex items-center gap-2">
                        <LuSyringe className="text-indigo-500 w-6 h-6" />
                        <p className="text-base font-semibold text-gray-700">
                          {registro.Via}
                        </p>
                      </div>
                    )}
                    {registro.Glucosa && (
                      <div className="flex items-center gap-2">
                        <PiDrop className="text-indigo-500 w-6 h-6" />
                        <p className="text-base font-semibold text-gray-700">
                          {registro.Glucosa}
                        </p>
                      </div>
                    )}
                    {registro.MedicacionAdicional && (
                      <div className="flex items-center gap-2">
                        <LuPill className="text-indigo-500 w-6 h-6" />
                        <p className="text-base font-semibold text-gray-700">
                          {registro.MedicacionAdicional}
                        </p>
                      </div>
                    )}
                    {registro.EstadoFisico && (
                      <div className="flex items-center gap-2">
                        <LuPersonStanding className="text-indigo-500 w-6 h-6" />
                        <p className="text-base font-semibold text-gray-700">
                          {registro.EstadoFisico}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <LuCalendarCheck className="text-indigo-500 w-6 h-6" />
                      <p className="text-base font-semibold text-gray-700">
                        {registro.Fecha.split("T")[0]}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuClock9 className="text-indigo-500 w-6 h-6" />
                      <p className="text-base font-semibold text-gray-700">
                        {new Date(registro.Fecha).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
