import React from "react";
import { useEffect, useState } from "react";
import { Tarjeta } from "../components/Tarjeta.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { link } from "../utilities/functions.js";
export const Articulos = () => {
  const [data, setData] = useState(["hola", "hola2"]);
  useEffect(() => {
    link.articulos().then((response) => {
      setData(response);
    });
  }, []);
  const Tarjetas = data.map((el) => <Tarjeta info={el} />);
  return (
    <>
      <main className="flex">
        <Navbar />
        <div className="container flex">
          <div className="flex flex-wrap flex-row justify-around gap-4">
            {Tarjetas}
          </div>
        </div>
      </main>
    </>
  );
};
