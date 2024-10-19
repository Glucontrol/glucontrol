import React from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const Racha = ({ value }) => {
  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={value} // Porcentaje de racha (0 a 100)
        text={`${value}%`} // Texto que aparece en el centro
        styles={buildStyles({
          pathColor: `#4db8ff`, // Color de la barra
          textColor: `#4db8ff`, // Color del texto
          trailColor: "#d6d6d6", // Color de la parte no completada
        })}
      />
    </div>
  );
};

// calcularRacha.js
export const calcularRacha = (recordsMap) => {
  const fechas = Object.keys(recordsMap).sort();
  let rachaActual = 0;
  let mayorRacha = 0;

  for (let i = 0; i < fechas.length; i++) {
    if (i > 0) {
      const fechaActual = new Date(fechas[i]);
      const fechaAnterior = new Date(fechas[i - 1]);

      const diferenciaDias =
        (fechaActual - fechaAnterior) / (1000 * 60 * 60 * 24);

      if (diferenciaDias === 1) {
        rachaActual++;
      } else {
        rachaActual = 1;
      }
    } else {
      rachaActual = 1;
    }
    mayorRacha = Math.max(mayorRacha, rachaActual);
  }

  return mayorRacha;
};

export const Card = ({ imgSrc, title, description }) => (
  <div className="flex flex-col border-2 rounded-lg p-4 min-h-48 shadow-lg shadow-gray-400 hover:scale-105 transition ease-in-out duration-200">
    <a href="#">
      <img
        src={imgSrc}
        alt={title}
        className="w-full object-cover rounded-md"
      />
    </a>
    <a href="#">
      <h4 className="font-bold text-lg md:text-xl mt-2">{title}</h4>
    </a>
    <a href="#">
      <p className="text-gray-600 text-sm md:text-base mt-2">{description}</p>
    </a>
    <a
      href="#"
      className="text-left font-bold text-black text-md md:text-lg px-3 py-2"
    >
      Ver
    </a>
  </div>
);
