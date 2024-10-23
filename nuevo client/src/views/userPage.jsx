import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { Tarjeta } from "../components/Tarjeta.jsx";
import { link } from "../utilities/functions.js";

export default function Usuario() {
  const navigate = useNavigate();
  let user = useContext(UserContext);
<<<<<<< HEAD

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/articles/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setArticles(res));
  }, []);
=======
  console.log(user);
  setTimeout(() => {
    console.log("ahi anda");
  }, 2000 * 2000);
>>>>>>> b94cbec27c7c7ee904a0df4f955b80f730cccd3d
  const [datosUsuario, setDatosUsuario] = useState({
    Nombre: user.Nombre || "No especificado",
    Email: user.Email || "No especificado",
    Diabetes: user.Type || "No especificado",
    Edad: user.Age || "No especificado",
    Peso: user.Weight || "No especificado",
    Altura: "190",
    Medicaciones: [
      { nombre: "Metformina", dosis: "500mg", frecuencia: "2 veces al día" },
      {
        nombre: "Insulina",
        dosis: "10 unidades",
        frecuencia: "antes de dormir",
      },
    ],
    Citas: [
      { fecha: "2023-07-15", descripcion: "Chequeo general" },
      { fecha: "2023-08-01", descripcion: "Análisis de sangre" },
    ],
  });

  const actualizarDatosUsuario = (nuevosDatos) => {
    setDatosUsuario((prevState) => ({
      ...prevState,
      ...nuevosDatos,
    }));
  };

  const handleEditarPerfil = (e) => {
    e.preventDefault();
    navigate("/editProfile", {
      state: {
        datosUsuario: datosUsuario,
      },
    });
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
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  onClick={handleEditarPerfil}
                >
                  Editar Perfil
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <InfoItem
                label="Tipo de Diabetes"
                value={datosUsuario.Diabetes}
              />
              <InfoItem
                label="Edad"
                value={`${
                  user.age ? datosUsuario.Edad + "años" : datosUsuario.Edad
                } `}
              />
              <InfoItem
                label="Peso"
                value={`${
                  user.Weight ? datosUsuario.Peso + "kg" : datosUsuario.Peso
                } `}
              />
              <InfoItem
                label="Altura"
                value={`${
                  user.Height
                    ? datosUsuario.Altura + "metros"
                    : datosUsuario.Altura
                } `}
              />
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Medicación actual</h3>
              <ul className="space-y-2">
                {datosUsuario.Medicaciones.map((med, index) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-md">
                    <span className="font-medium">{med.nombre}</span> -{" "}
                    {med.dosis} - {med.frecuencia}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Mis Articulos</h3>
              <div className="grid grid-cols-3 gap-2 ">
                {articles.map((el) => {
                  return (
                    <div className="bg-slate-300 w-full text-center mx-auto rounded-lg hover:bg-slate-400 duration-300 curos grid grid-rows-2">
                      <h1 className="mx-auto font-bold ">{el.Titulo}</h1>
                      <div className="flex flex-row justify-end ">
                        <a
                          className=" duration-300 flex justify-end hover:scale-110"
                          href={`./articulo?${el._id}`}
                        >
                          <img
                            src="../src/assets/icons/read.svg"
                            alt=""
                            srcset=""
                            className=" h-10"
                          />
                        </a>

                        <a
                          className=" duration-300 flex justify-end hover:scale-110"
                          onClick={() => alert("hola")}
                        >
                          <img
                            src="../src/assets/icons/edit.svg"
                            alt=""
                            srcset=""
                            className=" h-10"
                          />
                        </a>

                        <a
                          className=" duration-300 flex justify-end hover:scale-110 cursor-pointer"
                          onClick={() => link.delete(el._id)}
                        >
                          <img
                            src="../src/assets/icons/delete.svg"
                            alt=""
                            srcset=""
                            className=" h-10"
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
      <p className="font-medium">{value}</p>
    </div>
  );
}
