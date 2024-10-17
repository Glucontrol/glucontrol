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
