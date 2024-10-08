import React from "react";
export const Tarjeta = ({ info }) => {
  return (
    <a
      onClick={() => {
        window.location.href = `./articulo?${info._id}`;
      }}
    >
      <div className="tarjeta border-2 mx-5 border-solid  border-gray-200 shadow-lg shadow-gray-300 hover:scale-110 rounded-lg transition ease-in-out duration-200 mt-10">
        <div className="w-80 h-40 flex flex-col align-text-bottom p-2">
          <h2 className=" font-semibold text-center">{info.Titulo}</h2>
          <p className="font-normal text-center">{info.Autor}</p>
        </div>
      </div>
    </a>
  );
};
