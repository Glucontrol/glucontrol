import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { link } from "../utilities/functions.js";

export default function Usuario() {
  const navigate = useNavigate();
  let user = useContext(UserContext);

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
      <main className="flex min-h-screen">
        <Navbar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-semibold text-center mb-8">
              Configuración de Usuario
            </h1>
            <div className="flex mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden mr-8 flex-shrink-0">
                <img
                  src="/placeholder.svg?height=128&width=128"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">
                  {datosUsuario.Nombre}
                </h2>
                <p className="text-gray-500 mb-4">{datosUsuario.Email}</p>
              </div>
            </div>
            <form className="grid grid-cols-2 gap-6 mb-8">
              <InfoItem
                label="Tipo de Diabetes"
                value={
                  <input
                    type="text"
                    name="Diabetes"
                    value={datosUsuario.Diabetes}
                    onChange={actualizarDatosUsuario}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                }
              />
              <InfoItem
                label="Edad"
                value={
                  <input
                    type="number"
                    name="Edad"
                    value={datosUsuario.Edad}
                    onChange={actualizarDatosUsuario}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                }
              />
              <InfoItem
                label="Peso"
                value={
                  <input
                    type="number"
                    name="Peso"
                    value={datosUsuario.Peso}
                    onChange={actualizarDatosUsuario}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                }
              />
              <InfoItem
                label="Altura"
                value={
                  <input
                    type="number"
                    name="Altura"
                    value={datosUsuario.Altura}
                    onChange={actualizarDatosUsuario}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                }
              />
            </form>

            <div className="flex justify-center">
              <button
                className="px-4 py-2 shadow-lg rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out border border-indigo-600"
                onClick={guardarDatosUsuario} // Guardar cambios al hacer clic
              >
                Guardar Cambios
              </button>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Mis Articulos</h3>
              <div className="grid grid-cols-3 gap-2 px-4">
                {articles.map((el) => {
                  return (
                    <div
                      key={el._id}
                      className="bg-white w-full text-center rounded-lg hover:bg-gray-100 shadow-lg duration-300 "
                    >
                      <div className="flex gap-3 flex-col">
                        <img src={`${el.urlImg}`} alt="" className="w-full h-20 px-10 rounded-lg" />
                        <h1 className="text-xl">{el.Titulo}</h1>
                      </div>
                      <div className="flex flex-row justify-end ">
                        <a
                          className="duration-300 flex justify-end hover:scale-110"
                          href={`./articulo?${el._id}`}
                        >
                          <img
                            src="../src/assets/icons/read.svg"
                            alt=""
                            className="h-10"
                          />
                        </a>

                        <a
                          className="duration-300 flex justify-end hover:scale-110 cursor-pointer"
                          onClick={() =>
                            (window.location.href = `/edit/article/${el._id}`)
                          }
                        >
                          <img
                            src="../src/assets/icons/edit.svg"
                            alt=""
                            className="h-10"
                          />
                        </a>

                        <a
                          className="duration-300 flex justify-end hover:scale-110 cursor-pointer"
                          onClick={() =>
                            link.delete(el._id).then((res) => {
                              console.log(el);
                              const newArray = articles;
                              const hola = newArray.splice(
                                articles.indexOf(el),
                                1
                              );
                              console.log(hola);
                            })
                          }
                        >
                          <img
                            src="../src/assets/icons/delete.svg"
                            alt=""
                            className="h-10"
                          />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
