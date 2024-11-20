import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import toast, { Toaster } from "react-hot-toast";

export const Racha = ({ value }) => {
  const [pop, setPop] = useState(false);
  useEffect(() => setPop(true), []);

  return (
    <div
      style={{ width: 150, height: 150 }}
      className={`${pop ? "scale-100" : "scale-0"} duration-500 delay-100`}
    >
      <CircularProgressbar
        value={(value / 90) * 100} // Convertir la racha actual a porcentaje sobre 10 días
        text={value > 1 ? `${value} días` : `${value} día`} // Mostrar el total de días de racha alcanzados
        styles={buildStyles({
          pathColor: `#4db8ff`, // Color de la barra de progreso
          textColor: `#4db8ff`, // Color del texto
          trailColor: "#d6d6d6", // Color de la parte no completada
        })}
        backgroundPadding={40}
      />
    </div>
  );
};

export const calcularRacha = (recordsMap) => {
  const fechas = Object.keys(recordsMap).sort();
  let rachaActual = 1; // Inicializamos la racha actual en 1
  let mayorRacha = 1; // Mayor racha registrada, iniciada en 1 si hay al menos un registro

  for (let i = 1; i < fechas.length; i++) {
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

    // Mantiene el mayor valor de racha
    mayorRacha = Math.max(mayorRacha, rachaActual);

    // Mostrar alerta cuando la racha es de 5, 10 días, etc.
  }

  // Si no hay registros, devuelve 0 para evitar división por cero
  if (fechas.length === 0) return 0;

  return rachaActual;
};
