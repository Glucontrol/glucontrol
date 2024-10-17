import React, { useEffect } from "react";
import { link } from "../utilities/functions";
import { Navbar } from "../components/Navbar";
import { LuSyringe, LuCalendarCheck, LuClock9 } from "react-icons/lu";
import { PiDrop, PiLightning } from "react-icons/pi";
import { Footer } from "../components/Footer.jsx";

export const Registros = () => {
  const [registros, setRegistros] = React.useState([]);
  useEffect(() => {
    link.getRegistersI().then((data) => setRegistros(data));
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
          <div className=" container grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 gap-4 justify-around">
            {registros.map((registro, index) => {
              return (
                <div className="bg-white shadow-md hover:shadow-lg shadow-gray-400 border border-gray-200 min-h-40 min-w-60 flex flex-col hover:scale-105 hover:bg-indigo-50 transition-all duration-300 ease-in-out rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <PiLightning className="text-indigo-500 w-6 h-6" />
                    <p className="text-base font-semibold text-gray-700">
                      {registro.Tipo}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PiDrop className="text-indigo-500 w-6 h-6" />
                    <p className="text-base font-semibold text-gray-700">
                      {registro.Dosis}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuSyringe className="text-indigo-500 w-6 h-6" />
                    <p className="text-base font-semibold text-gray-700">
                      {registro.Via}
                    </p>
                  </div>
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
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
