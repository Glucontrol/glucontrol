import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import { Racha } from "./Racha.jsx";
import "../style.css";
import { Footer } from "../components/Footer.jsx";
import { Navbar } from "../components/Navbar.jsx";
const Card = ({ imgSrc, title, description }) => (
  <div className="flex flex-col border-2 rounded-lg p-4 min-h-48 shadow-lg shadow-gray-400 hover:scale-105 transition ease-in-out duration-200">
    <a href="#">
      <img
        src={imgSrc}
        alt={title}
        className="w-full object-cover rounded-md"
      />
    </a>
    <a href="#">
      <h4 className="font-bold text-lg md:text-xl mt-2">{title}</h4>
    </a>
    <a href="#">
      <p className="text-gray-600 text-sm md:text-base mt-2">{description}</p>
    </a>
    <a
      href="#"
      className="text-left font-bold text-black text-md md:text-lg px-3 py-2"
    >
      Ver
    </a>
  </div>
);

const ArticleCard = ({ info }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = async (info) => {
    const prevBookmarked = isBookmarked; // Guarda el valor previo
    setIsBookmarked(!prevBookmarked);

    // Lógica para enviar a la base de datos
    try {
      const response = await fetch("http://localhost:8080/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleId: info._id, // Se asume que info contiene un campo _id
          bookmarked: !prevBookmarked, // Invertimos el estado anterior
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al marcar el artículo: ${response.statusText}`);
      }

      // Respuesta exitosa
      console.log("Artículo marcado/desmarcado con éxito");
    } catch (error) {
      console.error("Error:", error);
      // Volver al estado anterior en caso de error
      setIsBookmarked(prevBookmarked);
    }
  };

  return (
    <div className="flex flex-col border-2 rounded-lg p-4 min-h-48 shadow-lg shadow-gray-400 hover:scale-95 transition ease-in-out duration-200">
      <div className="relative m-1">
        <img
          src="https://images.pexels.com/photos/28403274/pexels-photo-28403274/free-photo-of-fresas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt={info.title}
          className="rounded-t-lg object-cover w-full max-h-96"
        />
        <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          salud
        </span>
      </div>
      <div className=" flex flex-row justify-around">
        <a
          onClick={() => {
            window.location.href = `./articulo?${info._id}`;
          }}
        >
          <h4 className="text-sm md:text-lg text-black font-bold mt-2">
            {info.Titulo}
          </h4>
        </a>
        {/* Cambiar el ícono según el estado */}
        <div onClick={handleBookmarkClick} className="cursor-pointer">
          {isBookmarked ? (
            <FaBookmark className="top-3 right-3 mt-4 text-black" />
          ) : (
            <FaRegBookmark className="top-3 right-3 mt-4 text-gray-400" />
          )}
        </div>
      </div>
      <p className="text-black mt-2 text-xs md:text-sm text-center">
        {info.Autor}
      </p>
      <a
        href="#"
        className="mt-4 text-center text-blue-600 font-bold text-xs md:text-sm"
      >
        Leer más
      </a>
    </div>
  );
};

export const Articulos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/articulos")
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);

  const Articulos = data.slice(0, 4).map((el) => <ArticleCard info={el} />);

  return Articulos;
};

export const Home = () => {
  const currentStreak = 75;
  const [date, setDate] = useState(new Date());
  const [records, setRecords] = useState({
    "2024-09-26": { glucose: [100], insulin: [5] },
    "2024-09-27": {},
    "2024-09-28": { glucose: [110], insulin: [6] },
  });

  useEffect(() => {
    const fetchData = async () => {
      /*   try {
              setLoading(true); // Establecer estado de carga 
              const response = await fetch("http://localhost:8080/registrosI");
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              const fetchedData = await response.json();
              setRecords(fetchedData);
          } catch (error) {
              console.error("Error fetching data:", error);
              alert("Ocurrió un error al obtener los registros.");
          } finally {
              setLoading(false); // Finalizar estado de carga
          } */
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 1000); // Simulando un retraso de 1 segundo

    return () => clearTimeout(timeoutId); // Limpiar el timeout
  }, []);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];

    if (records[dateString]) {
      if (records[dateString].glucose && records[dateString].insulin) {
        return "bg-purple-300 text-white"; // Ambos registros
      } else if (records[dateString].glucose) {
        return "bg-blue-300 text-white"; // Solo glucosa
      } else if (records[dateString].insulin) {
        return "bg-green-300 text-white"; // Solo insulina
      }
    }
    return "";
  };

  const handleDateClick = (value) => {
    const dateString = value.toISOString().split("T")[0];
    if (records[dateString] && Object.keys(records[dateString]).length > 0) {
      alert(
        `Registros para ${dateString}: ${JSON.stringify(records[dateString])}`
      );
    } else {
      alert(`No hay registros para ${dateString}`);
    }
  };

  return (
    <>
      <main className="flex">
        <Navbar />
        <div className="container flex-1">
          <div className="grid grid-cols-4 justify-around">
            <div className="my-10 mx-4 col-span-2 gap-4">
              <h1 className="text-left font-bold m-4 text-2xl md:text-3xl">
                ¡Bienvenido!
              </h1>
              <p className="text-left text-gray-600 w-full md:w-3/4 mt-4 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                accusamus error vel modi explicabo? Minus nihil maxime facilis
                fugit hic at est, facere temporibus consectetur magnam
                laudantium beatae officia libero.
              </p>
            </div>
            <div className="my-10 mx-4">
              <div className="flex flex-col items-center justify-center ">
                <h4 className="text-center  font-semibold mb-4">Racha</h4>
                <Racha value={currentStreak} />
              </div>
            </div>
            <div className="my-10 mx-4">
              <div className="flex flex-col items-center  justify-center">
                <h4 className="mb-4 text-center font-semibold">Tu actividad</h4>
                <Calendar
                  onChange={onChange}
                  value={date}
                  className={"shadow-2xl shadow-gray-400"}
                  tileClassName={tileClassName}
                  onClickDay={handleDateClick}
                />
              </div>
            </div>
          </div>

          {/* Separador */}
          <span className="bg-gray-300 w-full h-0.5 my-5"></span>

          {/* Sección de Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-4">
            <h4 className="text-left font-bold col-span-full mb-4">
              ¿Qué puedo hacer?
            </h4>
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mx-4">
            <h4 className="text-left font-bold col-span-full mb-1">
              Ultimos artículos
            </h4>

            <Articulos />
          </div>
          <span className="bg-gray-300 w-full h-0.5 my-5"></span>
        </div>
      </main>
      <Footer />
    </>
  );
};
