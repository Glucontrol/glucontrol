import React from "react";
import { useEffect, useState } from "react";
import { Tarjeta } from "../components/Tarjeta.jsx";
import { Header } from "../components/Header.jsx";
export const Articulos = () => {
  const [data, setData] = useState(["hola", "hola2"]);
  useEffect(() => {
    fetch("http://localhost:8080/articulos")
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);
  const Tarjetas = data.map((el) => <Tarjeta info={el} />);
  return (
    <>
      <Header />
      <main className="flex">
        <div className="flex justify-center flex-row gap-5 flex-wrap ">
          {Tarjetas}
        </div>
      </main>
    </>
  );
};
