import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { link } from "../utilities/functions.js";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

export default function Usuario() {
  let user = useContext(UserContext);
  console.log(user);
  const [pop, setPop] = useState(false);
  const [articles, setArticles] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [section, setSection] = useState("articulos");

  useEffect(() => {
    fetch("http://localhost:8080/articles/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setArticles(res));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/favoritos", {
      credentials: "include",
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setFavoritos(res));

    setPop(true);
  }, []);

  const handleDelete = async (el) => {
    toast(
      (t) => (
        <div className="flex flex-col items-center justify-centerspace-y-4">
          <p className="text-gray-800 font-medium py-2 text-center">
            ¿Estás seguro de que deseas eliminar este registro?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                try {
                  toast.dismiss(t.id);
                  const isDeleted = await link.delete(el._id);
                  if (isDeleted) {
                    setArticles((prevArticles) =>
                      prevArticles.filter((article) => article._id !== el._id)
                    );
                    toast.success("Artículo eliminado correctamente");
                  } else {
                    throw new Error("Error al eliminar el artículo");
                  }
                } catch (error) {
                  toast.error("No se pudo eliminar el artículo");
                  console.error(error);
                }
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
      {
        duration: 2000,
        position: "top-center",
      }
    );
  };

  const [datosUsuario, setDatosUsuario] = useState({
    Nombre: user.Nombre,
    Email: user.Email,
    Diabetes: user.Diabetes,
  });

  const handleSection = (section) => {
    setSection(section);
  };

  return (
    <>
      <Toaster />
      <main className="flex min-h-screen flex-col md:flex-row dark:bg-slate-900">
        <Navbar />
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-4 md:p-8 bg-white dark:bg-slate-800 dark:text-gray-400">
            <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8">
              Configuración de Usuario
            </h1>
            <div className="flex flex-col md:flex-row items-center mb-6 md:mb-8">
              <div
                className={`w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8 duration-500 delay-75 flex-shrink-0 ${
                  pop ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={user.urlImg}
                  className={`mx-auto object-cover duration-300 w-full h-full`}
                  alt="User profile"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="flex flex-row">
                  <h2
                    className={`text-xl md:text-2xl duration-300 delay-150 font-semibold ${
                      pop
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-1 opacity-0"
                    }`}
                  >
                    {datosUsuario.Nombre}
                  </h2>
                  {!user.isMed ? (
                    <></>
                  ) : (
                    <div
                      className={`flex rounded-3xl h-7 mt-1 ml-3 duration-1000 bg-sky-300 text-white w-20 ${
                        pop ? "scale-100 opacity-100" : "scale-125 opacity-35"
                      }`}
                    >
                      <h3 className="m-auto">Médico</h3>
                    </div>
                  )}
                </div>
                <p className="text-gray-500 mb-2 md:mb-4">
                  {datosUsuario.Email}
                </p>
                <p className="text-sm md:text-base ">
                  Tipo de Diabetes:{" "}
                  <span className="font-bold">{user.Type}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                className="px-6 py-2 shadow-lg rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
                onClick={() => (window.location.href = "/edit/user")}
              >
                Editar perfil
              </button>
            </div>

            <section>
              <div className="flex mb-2 space-x-4 justify-center">
                <button
                  className={`px-4 py-2 font-semibold ${
                    section === "articulos"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => handleSection("articulos")}
                >
                  Mis Artículos
                </button>
                <button
                  className={`px-4 py-2 font-semibold ${
                    section === "favoritos"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => handleSection("favoritos")}
                >
                  Favoritos
                </button>
              </div>

              {section === "articulos" ? (
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">
                    Mis Artículos
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {articles.map((el) => (
                      <div
                        key={el._id}
                        className={`bg-white hover:-translate-y-4
                        text-center rounded-lg shadow-md p-4 dark:bg-slate-600 transition duration-300 `}
                      >
                        <div className="flex flex-col items-center">
                          {el.urlImg ? (
                            <img
                              src={el.urlImg}
                              alt="Artículo"
                              className="w-full h-24 md:h-32 rounded-lg object-cover mb-2"
                            />
                          ) : (
                            <div className="w-full h-24 md:h-32 flex bg-gray-400">
                              <p className="flex m-auto">No hay imágen</p>
                            </div>
                          )}
                          <h1 className="text-md font-semibold line-clamp-1">
                            {el.Titulo}
                          </h1>
                        </div>
                        <div className="flex justify-end mt-4">
                          <a
                            className="transform hover:scale-110 transition duration-300"
                            href={`./articulo?${el._id}`}
                          >
                            <AiOutlineEye className="h-8 w-8 text-gray-600" />
                          </a>

                          <button
                            className="transform hover:scale-110 transition duration-300"
                            onClick={() =>
                              (window.location.href = `/edit/article/${el._id}`)
                            }
                          >
                            <AiOutlineEdit className="h-8 w-8 text-gray-500" />
                          </button>

                          <button
                            className="transform hover:scale-110 transition duration-500"
                            onClick={() => handleDelete(el)}
                          >
                            <AiOutlineDelete className="h-8 w-8 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">
                    Favoritos
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {favoritos.map((el) => (
                      <div
                        key={el._id}
                        className="bg-white text-center rounded-lg shadow-md p-4 dark:bg-slate-600 transition duration-300 "
                      >
                        <div className="flex flex-col items-center">
                          {el.urlImg ? (
                            <img
                              src={el.urlImg}
                              alt="Favorito"
                              className="w-full h-24 md:h-32 rounded-lg object-cover mb-2"
                            />
                          ) : (
                            <div className="w-full h-24 md:h-32 flex bg-gray-400">
                              <p className="flex m-auto">No hay imágen</p>
                            </div>
                          )}
                          <h1 className="text-md font-semibold line-clamp-1">
                            {el.Titulo}
                          </h1>
                        </div>
                        <div className="flex justify-end mt-4">
                          <a
                            className="transform hover:scale-110 transition duration-300"
                            href={`./articulo?${el._id}`}
                          >
                            <AiOutlineEye className="h-8 w-8 text-gray-600" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
