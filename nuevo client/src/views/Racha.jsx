import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export const Racha = ({ value }) => {
  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={value} // Porcentaje de racha (0 a 100)
        text={`${value}%`} // Texto que aparece en el centro
        styles={buildStyles({
          pathColor: `#4db8ff`, // Color de la barra
          textColor: `#4db8ff`, // Color del texto
          trailColor: '#d6d6d6', // Color de la parte no completada
        })}
      />
      <p className="text-center">Tu Racha</p> {/* Etiqueta adicional */}
    </div>
  );
};


