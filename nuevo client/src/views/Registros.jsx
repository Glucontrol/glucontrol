import React, { useEffect } from "react";
import { link } from "../utilities/functions";
import { Navbar } from "../components/Navbar";

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
              className="h-20 w-40 shadow-md rounded-2xl self-center text-2xl hover:shadow-2xl hover:scale-110 hover:bg-gray-200 duration-200 "
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
                <div className="bg-slate-200 shadow-lg min-h-40 min-w-60 flex flex-col hover:shadow-2xl hover:scale-110 duration-200">
                  <p className="text-lg">Tipo:{registro.Tipo}</p>
                  <p className="text-lg">Fecha:{registro.Fecha}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};
