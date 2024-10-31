import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const Racha = ({ value }) => {
  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={value} // Porcentaje de racha (0 a 100)
        text={`${Math.round(value)}%`} // Texto que aparece en el centro, redondeado
        styles={buildStyles({
          pathColor: `#4db8ff`, // Color de la barra de progreso
          textColor: `#4db8ff`, // Color del texto
          trailColor: "#d6d6d6", // Color de la parte no completada
        })}
      />
    </div>
  );
};

// calcularRacha.js
export const calcularRacha = (recordsMap) => {
  const fechas = Object.keys(recordsMap).sort(); // Obtener y ordenar las fechas de los registros
  let rachaActual = 0; // Inicializamos la racha actual
  let mayorRacha = 0; // Mayor racha registrada

  for (let i = 0; i < fechas.length; i++) {
    if (i > 0) {
      const fechaActual = new Date(fechas[i]);
      const fechaAnterior = new Date(fechas[i - 1]);

      // Calcula la diferencia en días entre las dos fechas
      const diferenciaDias =
        (fechaActual - fechaAnterior) / (1000 * 60 * 60 * 24);

      if (diferenciaDias === 1) {
        // Si las fechas son consecutivas, incrementa la racha
        rachaActual++;
      } else {
        // Si no son consecutivas, reinicia la racha a 1
        rachaActual = 1;
      }
    } else {
      // Primer día siempre inicia la racha en 1
      rachaActual = 1;
    }
    // Mantiene el mayor valor de racha
    mayorRacha = Math.max(mayorRacha, rachaActual);
  }

  // Si no hay registros, devuelve 0 para evitar división por cero
  if (mayorRacha === 0) return 0;

  // Convertir la mayor racha a porcentaje (de 0 a 100)

  return mayorRacha;
};
