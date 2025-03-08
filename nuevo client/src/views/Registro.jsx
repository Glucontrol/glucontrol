import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { LuSyringe, LuCalendarCheck, LuClock9 } from "react-icons/lu";
import { PiDrop, PiLightning } from "react-icons/pi";
import { link } from "../utilities/functions";

export const Registro = () => {
  const { fecha } = useParams(); // Extraer la fecha de los parámetros
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const fetchRegistros = async () => {
      if (fecha) {
        console.log("fecha", fecha);
        try {
          const response = await fetch(
            `http://localhost:8080/registrosI/${fecha}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const data = await response.json();

          if (Array.isArray(data)) {
            setRegistros(data);
          } else {
            console.error("Los datos no son un array:", data);
            setRegistros([]); // Maneja el caso donde no sea un array
          }
        } catch (error) {
          console.error("Error al obtener los registros:", error);
          setRegistros([]); // Manejo de error estableciendo un array vacío
        }
      }
    };

    fetchRegistros();
  }, [fecha]); // Ejecuta el useEffect cuando cambie la fecha

  return (
    <>
      <main className="flex h-full w-full">
        <Navbar />
        <div className="flex-1 pt-10">
          <div className="flex justify-center mb-10">
            <h1 className="text-2xl font-bold text-center">Tus registros</h1>
          </div>
          <div className="container grid grid-cols-4 mx-4 gap-4 justify-around">
            {Array.isArray(registros) &&
              registros.map((registro) => (
                <div
                  key={registro._id}
                  className="bg-white shadow-lg shadow-slate-500 min-h-40 min-w-60 flex flex-col hover:shadow-2xl hover:scale-105 transition-transform duration-200 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <PiLightning className="text-blue-600 w-6 h-6" />
                    <p className="text-lg font-medium">{registro.Tipo}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PiDrop className="text-blue-600 w-6 h-6" />
                    <p className="text-lg font-medium">{registro.Dosis}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuSyringe className="text-blue-600 w-6 h-6" />
                    <p className="text-lg font-medium">{registro.Via}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCalendarCheck className="text-blue-600 w-6 h-6" />
                    <p className="text-lg font-medium">
                      {registro.Fecha.split("T")[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuClock9 className="text-blue-600 w-6 h-6" />
                    <p className="text-lg font-medium">
                      {new Date(registro.Fecha).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};
