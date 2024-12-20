import { useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import useBookmark from "../utilities/useBookmark";

export const Tarjeta = ({ info }) => {
  const [isBookmarked, toggleBookmark] = useBookmark(info._id);

  const [pop, setPop] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setPop(true);
    }, 200);
  }, []);

  switch (info.Categoria) {
    case "Ejercicio":
      var color = "bg-red-200";
      var icon = "../src/assets/icons/ejercicio.svg";
      break;
    case "Salud":
      var color = "bg-green-200";
      var icon = "../src/assets/icons/health.svg";
      break;
    case "Recetas":
      var color = "bg-yellow-200";
      var icon = "../src/assets/icons/recetas.svg";
      break;
    case "Investigación":
      var color = "bg-blue-200";
      var icon = "../src/assets/icons/research.svg";
      break;
    case "Tecnología":
      var color = "bg-blue-200";
      var icon = "../src/assets/icons/tecnologia.svg";
      break;
    case "Consejos":
      var color = "bg-blue-200";
      var icon = "../src/assets/icons/consejos.svg";
      break;
    case "Nutrición":
      var color = "bg-blue-200";
      var icon = "../src/assets/icons/nutri.svg";
      break;
    default:
      var color = "bg-sky-200";
      var icon = "../src/assets/icons/libro.svg";
      break;
  }

  return (
    <a
      href={`./articulo?${info._id}`}
      className={`block w-full rounded-lg max-w-sm mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 dark:bg-slate-900 border-gray-950 dark:text-gray-50 ${
        pop ? "opacity-100 scale-100 " : "opacity-0 scale-95"
      }`}
    >
      <div
        className={`flex flex-col rounded-lg shadow-md hover:shadow-xl border dark:border-gray-900 transition-shadow duration-300`}
      >
        <div className="relative flex-grow">
          {info.urlImg ? (
            <img
              src={info.urlImg}
              alt={`${info.Titulo} image`}
              className="w-full h-48 object-cover transition-transform duration-300 ease-in-out"
            />
          ) : (
            <div className="w-full h-48 flex bg-gray-200 dark:bg-gray-700">
              <p className="flex m-auto">No hay imágen</p>
            </div>
          )}
          <div className="absolute top-2 right-2 flex flex-col items-center space-y-2">
            {info.verified && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white  shadow-md">
                <img
                  src="../src/assets/icons/verified.svg"
                  alt="Verificado"
                  className="w-4 h-4"
                />
              </div>
            )}
            <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md">
              <img
                src={icon}
                className="h-4 w-4"
                alt=""
                style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.25))" }}
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleBookmark();
              }}
              className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md"
            >
              {isBookmarked ? (
                <FaBookmark className="text-[#0000F5]" />
              ) : (
                <FaRegBookmark className="text-[#0000F5]" />
              )}
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold line-clamp-1 mb-2 text-ellipsis">
              {info.Titulo}
            </h2>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            {info.Autor || "Anónimo"}
          </p>
        </div>
      </div>
    </a>
  );
};
