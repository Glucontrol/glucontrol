import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import { Racha } from "../components/Racha.jsx";
import "../style.css";
import { Footer } from "../components/Footer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { calcularRacha } from "../components/Racha.jsx";
import toast, { Toaster } from "react-hot-toast";

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

  const articulos = data
    .slice(0, 4)
    .map((el) => <ArticleCard key={el._id} info={el} />);

  return <>{articulos}</>;
};

export const Home = () => {
  const [date, setDate] = useState(new Date());
  const [records, setRecords] = useState({}); // Cambiar a un objeto vacío
  const [streak, setStreak] = useState(0);
  const [fechas, setFechas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dateString = date.toISOString().split("T")[0]; // Fecha en formato YYYY-MM-DD
        console.log("Fetching data for date:", dateString); // Verificar la fecha solicitada
        const response = await fetch(`http://localhost:8080/registrosI`, {
          method: "GET",
          credentials: "include", // Para incluir las cookies
          headers: {
            "Cache-Control": "no-cache", // Evitar que se use una respuesta cacheada
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los registros");
        }

        const data = await response.json();
        console.log("Datos recibidos para la fecha:", dateString, data); // Verifica la respuesta del servidor

        const recordsMap = data.reduce((acc, registro) => {
          const dateString = registro.Fecha.split("T")[0];
          acc[dateString] = {
            insulin: registro.Dosis,
            id: registro._id,
            glucosa: registro.Glucosa,
          };
          return acc;
        }, {});

        setRecords(recordsMap); // Guardar los registros en el estado
        console.log("Records actualizados para la fecha:", recordsMap); // Verifica la estructura de records
        const fetchedDates = Object.keys(recordsMap).sort();
        setFechas(fetchedDates);

        // Llamamos a la función calcularRacha y actualizamos el estado
        const nuevaRacha = calcularRacha(recordsMap);
        setStreak(nuevaRacha);
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      }
    };

    fetchData(); // Ejecutar el fetch cuando cambia la fecha
  }, [date]); // Asegúrate de que el useEffect se dispare al cambiar la fecha

  const onChange = (newDate) => {
    setDate(newDate);
  };
  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];

    if (records[dateString]) {
      if (records[dateString].insulin || records[dateString].glucosa) {
        return "bg-blue-200 text-white"; // Celeste si hay insulina
      }
    }

    return ""; // Sin clase si no hay registro
  };

  const handleDateClick = (value) => {
    const dateString = value.toISOString().split("T")[0];

    if (records[dateString] && records[dateString].insulin) {
      window.location.href = `./Registro/${dateString}`;
    } else {
      return toast.error("No hay registros para esta fecha:(");
    }
  };

  return (
    <>
      <Toaster />
      <main className="flex flex-col md:flex-row">
        <Navbar />
        <div className="container flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-around m-10">
            <div className="my-5 mx-2 col-span-1 md:col-span-2">
              <h1 className="text-left font-bold m-4 text-2xl md:text-3xl">
                ¡Bienvenido!
              </h1>
              <p className="text-left text-gray-600 w-full mt-4 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                accusamus error vel modi explicabo? Minus nihil maxime facilis
                fugit hic at est, facere temporibus consectetur magnam
                laudantium beatae officia libero.
              </p>
            </div>
            <div className="my-5 mx-2 col-span-1">
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-center font-semibold mb-4">Racha</h4>
                <Racha value={streak} max={30} />
              </div>
            </div>
            <div className="my-5 mx-2 col-span-1">
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

          {/* Separador */}
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

          {/* Separador */}
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

export default Home;
