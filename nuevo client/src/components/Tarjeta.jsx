import React from "react";
export const Tarjeta = ({ info }) => {
  switch (info.Categoria) {
    case "Ejercicio":
      var color = "bg-red-200";
      var icon = "../src/assets/icons/ejercicio.svg";
      break;
    case "Salud":
      var color = "bg-green-200";
      var icon = "../src/assets/icons/health.svg";
      break;
    case "Recetas":
      var color = "bg-yellow-200";
      var icon = "../src/assets/icons/recetas.svg";
      break;
    default:
      var color = "bg-sky-200";
      var icon = "../src/assets/icons/libro.svg";
      break;
  }
  return (
    <a
      onClick={() => {
        window.location.href = `./articulo?${info._id}`;
      }}
    >
      <div
        className={`tarjeta border-2 mx-5 border-solid  border-gray-200 shadow-lg shadow-gray-300 hover:scale-110 rounded-lg transition ease-in-out duration-200 mt-10 cursor-pointer`}
      >
        <div className="3/4 flex flex-row">
          <div className="w-80 h-40 flex flex-col align-text-bottom p-2">
            <h2 className=" font-semibold text-center">{info.Titulo}</h2>
            <p className="font-normal text-center">{info.Autor}</p>
          </div>
          <div className={`${color} h-auto w-10 `}>
            <img src={`${icon}`} className="h-10 w-10" alt="" />
          </div>
        </div>
      </div>
    </a>
  );
};
