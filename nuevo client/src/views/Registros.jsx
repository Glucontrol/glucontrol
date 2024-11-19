import React, { useEffect, useState } from "react";
import { link } from "../utilities/functions";
import { Navbar } from "../components/Navbar";
import Calendar from "../components/Calendar";
import toast, { Toaster } from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title
);
import { Line } from "react-chartjs-2";

import {
  LuSyringe,
  LuCalendarCheck,
  LuClock9,
  LuPersonStanding,
  LuPill,
  LuArrowDownWideNarrow,
  LuFilter,
  LuTrash,
} from "react-icons/lu";
import { PiDrop, PiLightning } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export const Registros = () => {
  const [month, setMonth] = useState(1);
  const [registros, setRegistros] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [filtro, setFiltro] = useState("Todos"); // Estado para el filtro
  const [fecha, setFecha] = useState("Todos");

  const navigate = useNavigate();

  useEffect(() => {
    link.getRegistersI().then((data) => {
      console.log(data);
      setRegistros(data);
    });

    setIsLoading(false); // Detener el estado de carga cuando se obtienen los datos
  }, []);
  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col items-center justify-centerspace-y-4">
          <p className="text-gray-800 font-medium py-2 text-center">
            ¿Estás seguro de que deseas eliminar este registro?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                toast.dismiss(t.id); // Cerrar el toast
              }}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Cerrar el toast
                await link.deleteRegister(id).then((res) => {
                  console.log(res);
                  setRegistros((prevRegistros) =>
                    prevRegistros.filter((registro) => registro._id !== id)
                  );
                  toast.success("Registro eliminado con éxito");
                });
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000, // Tiempo antes de que se cierre automáticamente
        position: "top-center",
      }
    );
  };

  return (
    <>
      <Toaster />
      <main className="flex mb-8">
        <Navbar />
        <div className="flex-1 pt-10">
          <div className="flex justify-center mb-10">
            <button
              className="px-6 py-3 shadow-lg rounded-full text-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out border border-indigo-600"
              onClick={() => {
                navigate("/crearRegistro");
              }}
            >
              Registrar
            </button>
          </div>

          <Line
            data={{
              labels: ["Enero", "Febrero", "Marzo", "Abril"],
              datasets: [
                {
                  label: "Ventas",
                  data: [12, 19, 3, 5],
                  borderColor: "rgba(255, 99, 132, 1)",
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  pointBackgroundColor: "rgba(255, 99, 132, 1)",
                  pointBorderColor: "rgba(255, 99, 132, 1)",
                  pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
                  pointHoverBorderColor: "rgba(255, 99, 132, 1)",
                },
              ],
            }}
          />
          <Calendar props={month} onClick={setMonth} />
          {month}

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
                .map((registro) => (
                  <div
                    key={registro._id} // Asegurarse de que el key sea único
                    className="bg-white shadow-md hover:shadow-lg shadow-gray-400 border border-gray-200 min-h-40 min-w-60 flex flex-col hover:scale-105 hover:bg-indigo-50 transition-all duration-300 ease-in-out rounded-xl p-6 space-y-4 relative"
                  >
                    <button
                      onClick={() => handleDelete(registro._id)}
                      className="absolute top-2 right-2 text-indigo-500 w-6 h-6 hover:text-indigo-700 transition duration-200"
                    >
                      <LuTrash />
                    </button>

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
                    {registro.Fecha && (
                      <div className="flex items-center gap-2">
                        <LuCalendarCheck className="text-indigo-500 w-6 h-6" />
                        <p className="text-base font-semibold text-gray-700">
                          {new Date(registro.Fecha).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <LuClock9 className="text-indigo-500 w-6 h-6" />
                      <p className="text-base font-semibold text-gray-700">
                        {new Date(registro.Fecha).toLocaleTimeString([], {
                          timeZone: "America/Argentina/Buenos_Aires", // Ajusta según tu zona horaria
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
    </>
  );
};
