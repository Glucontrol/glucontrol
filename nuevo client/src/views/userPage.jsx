import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { link } from "../utilities/functions.js";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

export default function Usuario() {
  let user = useContext(UserContext);
  console.log(user);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/articles/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setArticles(res));
  }, []);

  const [datosUsuario, setDatosUsuario] = useState({
    Nombre: user.Nombre,
    Email: user.Email,
    Diabetes: user.Diabetes,
    Edad: user.Edad,
    Peso: user.Peso,
    Altura: user.Altura,
  });

  const actualizarDatosUsuario = (e) => {
    const { name, value } = e.target;
    setDatosUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const guardarDatosUsuario = async () => {
    try {
      const response = await fetch("http://localhost:8080/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(datosUsuario), // Enviar los datos actualizados
      });

      if (response.ok) {
        console.log("Datos guardados exitosamente");
      } else {
        console.log("Error al guardar los datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col md:flex-row">
        <Navbar />
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-4 md:p-8 bg-white">
            <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8">
              Configuración de Usuario
            </h1>
            <div className="flex flex-col md:flex-row items-center mb-6 md:mb-8">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8 flex-shrink-0">
                <img
                  src={user.urlImg}
                  className="w-full h-full object-cover"
                  alt="User profile"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-semibold">
                  {datosUsuario.Nombre}
                </h2>
                <p className="text-gray-500 mb-2 md:mb-4">
                  {datosUsuario.Email}
                </p>
                <p className="text-sm md:text-base">
                  Tipo de Diabetes: {user.Type}
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
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">
                Mis Artículos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {articles.map((el) => (
                  <div
                    key={el._id}
                    className="bg-white text-center rounded-lg shadow-md p-4 hover:bg-gray-100 transition duration-300"
                  >
                    <div className="flex flex-col items-center">
                      {el.urlImg ? (
                        <img
                          src={el.urlImg}
                          alt="Artículo"
                          className="w-full h-24 md:h-32 rounded-lg object-cover mb-2"
                        />
                      ) : (
                        <div className="bg-gray-400 w-full h-24 md:h-32 rounded-lg animate-pulse"></div>
                      )}
                      <h1 className="text-md font-semibold">{el.Titulo}</h1>
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
                        <AiOutlineEdit className="h-8 w-8 text-blue-600" />
                      </button>

                      <button
                        className="transform hover:scale-110 transition duration-300"
                        onClick={() =>
                          link.delete(el._id).then(() => {
                            setArticles(
                              articles.filter(
                                (article) => article._id !== el._id
                              )
                            );
                          })
                        }
                      >
                        <AiOutlineDelete className="h-8 w-8 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <div>{value}</div>
    </div>
  );
}
