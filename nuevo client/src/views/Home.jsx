import React from "react";
import { FaRegBookmark } from "react-icons/fa";

const Card = ({ imgSrc, title, description }) => (
  <div className="flex flex-col border-2 rounded-lg p-4 min-h-48 shadow-lg shadow-gray-400 hover:scale-110 transition ease-in-out duration-100">
    <a href="">
      <img src={imgSrc} alt={title} />
    </a>
    <a href="">
      <h4 className="font-bold text-xl mt-2">{title}</h4>
    </a>
    <a href="">
      <p className="text-gray-600 mt-2">{description}</p>
    </a>
    <a href="" className="text-left font-bold text-black text-lg px-3 py-2">
      Ver
    </a>
  </div>
);

export const Home = () => {
  return (
    <main className="flex flex-col mx-4">
      <h1 className="text-left font-bold m-4 text-3xl">¡Bienvenido!</h1>
      <p className="text-left text-gray-600 w-3/4 mt-4 mb-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi accusamus
        error vel modi explicabo? Minus nihil maxime facilis fugit hic at est,
        facere temporibus consectetur magnam laudantium beatae officia libero.
      </p>

      {/* Separador */}
      <span className="bg-gray-300 w-full h-0.5 my-5"></span>

      {/* Sección de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <h4 className="text-left font-bold col-span-3 mb-4">Hola</h4>
        <Card
          imgSrc="./assets/img/articulos.svg"
          title="Descubre"
          description="Infórmate sobre los últimos avances y tips para cuidar tu salud"
        />
        <Card
          imgSrc="./assets/img/articulos.svg"
          title="Descubre"
          description="Infórmate sobre los últimos avances y tips para cuidar tu salud"
        />
        <Card
          imgSrc="./assets/img/articulos.svg"
          title="Descubre"
          description="Infórmate sobre los últimos avances y tips para cuidar tu salud"
        />
      </div>

      {/* Separador */}
      <span className="bg-gray-300 w-full h-0.5 my-5"></span>

      {/* Sección de Artículos */}
      <div>
        <h4 className="text-left font-bold text-xl mb-4">Últimos Artículos</h4>
        <div className="grid grid-cols-4 gap-8">
          <div className=" flex flex-col border-2 rounded-2xl w-full p-2 bg-slate-400 text-white h-auto shadow-gray-500 shadow-lg hover:scale-105 transition ease-in-out duration-100">
            <div className="relative m-1">
              <img
                src="https://images.pexels.com/photos/5847663/pexels-photo-5847663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Imagen del artículo"
                className="rounded-t-lg object-cover w-full max-h-96"
              />
              <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Salud
              </span>
            </div>

            <div className="flex fle-row justify-between ">
              <a href="">
                <h4 className="text-lg text-black font-bold mt-2">
                  Título del Artículo
                </h4>
              </a>
              <FaRegBookmark className="mt-2 h-auto mr-2  " />
            </div>

            <p className="text-black mt-2 text-sm text-center">
              Un breve resumen sobre el contenido del artículo, con información
              clave para enganchar.
            </p>
            <a
              href=""
              className="mt-4 text-center text-blue-600 font-bold text-sm"
            >
              Leer más
            </a>
          </div>
        </div>
        <h1 className="mt-10">hola</h1>
      </div>
    </main>
  );
};
