import React, { useEffect, useState } from "react";
export const Hola = () => {
  const [algo, setAlgo] = useState(24);
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
