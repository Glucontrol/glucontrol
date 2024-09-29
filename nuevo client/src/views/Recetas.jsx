import React from "react";
import { useEffect, useState } from "react";
import { TarjetaArticulo } from "../components/Tarjeta.jsx";
import { Header } from "../components/Header.jsx";
import { Navbar } from "../components/Navbar.jsx";
export const Recetas = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/recetas")
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);
  const Tarjetas = data.map((el) => <TarjetaArticulo info={el} />);
  return (
    <>
    <Navbar/>
      <Header />
      <main className="flex">
        <div className="flex-1 justify-evenly flex-row gap-5 flex-wrap ">
          {Tarjetas}
        </div>
      </main>
    </>
  );
};
