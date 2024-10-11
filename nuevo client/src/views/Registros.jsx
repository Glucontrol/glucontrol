import React, { useEffect } from "react";
import { link } from "../utilities/functions";
import { Navbar } from "../components/Navbar";
import { LuSyringe, LuCalendarCheck, LuClock9 } from "react-icons/lu";
import { PiDrop, PiLightning } from "react-icons/pi";

export const Registros = () => {
  const [registros, setRegistros] = React.useState([]);
  useEffect(() => {
    link.getRegistersI().then((data) => setRegistros(data));
  }, []);
  return (
    <>
      <main className="flex ">
        <Navbar />
        <div className="flex-1 pt-10">
          <div className="flex justify-center mb-10">
            <button
              className=" p-4 shadow-md rounded-2xl self-center text-2xl text-white hover:scale-105 bg-gray-400 hover:bg-gray-500 hover:text-white transition duration-200 "
              onClick={() => {
                window.location.href = "/crearRegistro";
              }}
            >
              Registrar
            </button>
          </div>
          <div className=" container flex-row flex flex-wrap gap-4 justify-around">
            {registros.map((registro, index) => {
              return (
                <div className="bg-white shadow-lg shadow-slate-500 min-h-40 min-w-60 flex flex-col hover:shadow-2xl hover:scale-105 transition-transform duration-200 rounded-lg p-4 space-y-2">
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
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};
