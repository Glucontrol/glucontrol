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

  const handleBookmarkClick = async () => {
    const prevBookmarked = isBookmarked;
    setIsBookmarked(!prevBookmarked);

    // Lógica para enviar a la base de datos
    try {
      const response = await fetch("http://localhost:8080/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleId: info._id,
          bookmarked: !prevBookmarked,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al marcar el artículo: ${response.statusText}`);
      }

      console.log("Artículo marcado/desmarcado con éxito");
    } catch (error) {
      console.error("Error:", error);
      setIsBookmarked(prevBookmarked);
    }
  };

  return (
    <div className="flex flex-col border-2 rounded-lg p-4 min-h-48 shadow-lg shadow-gray-400 hover:scale-95 transition ease-in-out duration-200">
      <div className="relative m-1">
        <img
          src="https://images.pexels.com/photos/28403274/pexels-photo-28403274/free-photo-of-fresas.jpeg"
          alt={info.title}
          className="rounded-t-lg object-cover w-full max-h-96"
        />
        <span className="block absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          salud
        </span>
      </div>
      <div className="flex flex-row justify-around">
        <a
          onClick={() => {
            window.location.href = `./articulo?${info._id}`;
          }}
        >
          <h4 className="text-sm md:text-lg text-black font-bold mt-2">
            {info.Titulo}
          </h4>
        </a>
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

  const articulos = data.slice(0, 4).map((el) => <ArticleCard key={el._id} info={el} />);

  return <>{articulos}</>;
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
      // Código para obtener los registros
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];

    if (records[dateString]) {
      if (records[dateString].glucose && records[dateString].insulin) {
        return "bg-purple-300 text-white";
      } else if (records[dateString].glucose) {
        return "bg-blue-300 text-white";
      } else if (records[dateString].insulin) {
        return "bg-green-300 text-white";
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
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-center font-semibold mb-4">Racha</h4>
                <Racha value={currentStreak} />
              </div>
            </div>
            <div className="my-10 mx-4">
              <div className="flex flex-col items-center justify-center">
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

          {/* Separador con div */}
          <div className="bg-gray-200 w-full h-0.5 m-6"></div>

          {/* Sección de Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-4 my-2">
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
              title="Aprende"
              description="Conoce más sobre cómo manejar tu condición día a día"
            />
            <Card
              imgSrc="./assets/img/articulos.svg"
              title="Comparte"
              description="Únete a nuestra comunidad y comparte tus experiencias"
            />
          </div>

          {/* Separador con div */}
          <div className="bg-gray-200 w-full h-0.5 m-6"></div>


          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mx-4">
            <h4 className="text-left font-bold col-span-full mb-1">
              Últimos artículos
            </h4>

            <Articulos />
          </div>
          <div className="bg-gray-200 w-full h-0.5 m-6"></div>

        </div>
      </main>
      <Footer />
    </>
  );
};
