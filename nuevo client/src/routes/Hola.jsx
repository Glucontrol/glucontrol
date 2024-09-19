import React, { useEffect, useState } from "react";
//Tutorial del useState
export const Hola = () => {
  //La función useState devuelve 2 valores:
  //1. El valor actual del estado
  //2. Una función para actualizar el estado
  const [algo, setAlgo] = useState(24);

  //La función useEffect permite realizar una función cada vez que se actualiza el valor de una variable
  useEffect(() => {
    console.log("se actualizo el algo");
  }, [algo]);
  return (
    <>
      <p>{algo}</p>
      <button
        type="button"
        onClick={() => {
          setAlgo(algo + 1);
        }}
      >
        dsadsa
      </button>
    </>
  );
};
