import { useState, useEffect, useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import { link } from "../utilities/functions";
import { UserContext } from "../context/UserContext";

export default function Register() {
  const [type, setType] = useState();
  const user = useContext(UserContext);
  const path = window.location.pathname.split("/");
  const edit = path[1] === "edit";

  const handleRegister = (e) => {
    e.preventDefault();
    // Implementa tu lógica de registro aquí
  };

  const Box = ({ text, index }) => {
    return (
      <button
        className={`${
          type === text
            ? "border-2 border-sky-500 scale-105 shadow-lg"
            : "bg-gray-100 hover:scale-95"
        } w-1/4 h-32 flex items-center justify-center rounded-md transition-all duration-300`}
        onClick={() => setType(text)}
      >
        {text}
      </button>
    );
  };

  return (
    <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <form
            action="post"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              formData.append("Type", type);
              try {
                edit
                  ? link
                      .editProfile(formData)
                      .then((res) =>
                        res
                          ? (window.location.href = "/me")
                          : alert("malió sal")
                      )
                  : link.signUp(formData);
              } catch (error) {}
            }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6 justify-center">
              <a href="/me" className="text-blue-500 hover:text-blue-700 mr-5 ">
                <BiArrowBack size={24} />
              </a>
              <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mx-2 ">
                {edit ? "Editar usuario" : "Crear nuevo Usuario"}
              </h1>
            </div>

            <div className="flex flex-col items-center">
              <label
                htmlFor="Nombre"
                className="text-lg text-gray-600 dark:text-gray-300"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                name="Nombre"
                defaultValue={edit ? user.Nombre : ""}
                className="bg-gray-200 dark:bg-gray-700 border border-gray-300 w-full max-w-xs rounded-lg p-2 text-center text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex flex-col items-center">
              <label
                htmlFor="Email"
                className="text-lg text-gray-600 dark:text-gray-300"
              >
                Correo Electrónico
              </label>
              {edit ? (
                <input
                  type="text"
                  name="Email"
                  defaultValue={user.Email}
                  className="bg-gray-200 dark:bg-gray-700 border border-gray-300 w-full max-w-xs rounded-lg p-2 text-center text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-sky-500"
                  disabled
                />
              ) : (
                <input
                  type="text"
                  name="Email"
                  className="bg-gray-200 dark:bg-gray-700 border border-gray-300 w-full max-w-xs rounded-lg p-2 text-center text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-sky-500"
                />
              )}
            </div>
            <div className="flex flex-col items-center">
              <label
                htmlFor="Contraseña"
                className="text-lg text-gray-600 dark:text-gray-300"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="Contrasenia"
                className="bg-gray-200 dark:bg-gray-700 border border-gray-300 w-full max-w-xs rounded-lg p-2 text-center text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-lg text-gray-600 dark:text-gray-300">
                Foto de Perfil
              </h1>
              <div className="border-dotted border-2 border-gray-300 dark:border-gray-500 rounded-md w-full max-w-xs h-24 flex items-center justify-center cursor-pointer overflow-hidden">
                <input
                  type="file"
                  name="profile"
                  onChange={(e) => setPreview(e.target.files[0])}
                  className="opacity-0 w-full h-full cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-around my-4 gap-2">
              <Box text="Tipo 1" index={1} />
              <Box text="Tipo 2" index={2} />
              <Box text="Gestacional" index={3} />
              <Box text="Pre-diabetes" index={4} />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              {edit ? "Actualizar" : "Registrarse"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
