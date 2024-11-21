import { useState, useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import { link } from "../utilities/functions";
import { UserContext } from "../context/UserContext";
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline, MdOutlineMailOutline } from "react-icons/md";

export default function Register() {
  const [type, setType] = useState();
  const user = useContext(UserContext);
  const path = window.location.pathname.split("/");
  const edit = path[1] === "edit";

  const Box = ({ text, index }) => {
    return (
      <button
        className={`${
          type === text
            ? "border-2 border-indigo-500 scale-105 shadow-lg"
            : "bg-gray-100 hover:scale-95"
        } w-1/4 h-32 flex items-center justify-center rounded-md transition-all duration-300`}
        onClick={() => setType(text)}
      >
        {text}
      </button>
    );
  };

  return (
    <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900 mt-4">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
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
                          : alert("Error al actualizar")
                      )
                  : link
                      .signUp(formData)
                      .then(() => (window.location.href = "/login"));
              } catch (error) {}
            }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6 justify-center">
              <a
                href="/me"
                className="text-indigo-500 hover:text-indigo-700 mr-5"
              >
                <BiArrowBack size={24} />
              </a>
              <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mx-2">
                {edit ? "Editar usuario" : "Crear nuevo Usuario"}
              </h1>
            </div>

            {/* Nombre de Usuario */}
            <div className="flex flex-col mb-4 w-full">
              <label
                htmlFor="Nombre"
                className="text-lg text-gray-600 dark:text-gray-300 mb-1"
              >
                Nombre de Usuario
              </label>
              <div className="flex items-center bg-transparent dark:bg-gray-700 border border-gray-300 rounded-lg px-4 focus-within:ring-2 focus-within:ring-indigo-500 py-2">
                <FaRegUser className="text-gray-400 dark:text-gray-500 m-1" />
                <input
                  type="text"
                  name="Nombre"
                  defaultValue={edit ? user.Nombre : ""}
                  className="bg-transparent text-gray-900 placeholder-gray-500 dark:text-gray-200 dark:placeholder-gray-400 outline-none w-full pl-2"
                  placeholder="Ingrese su nombre"
                />
              </div>
            </div>

            {/* Correo Electrónico */}
            <div className="flex flex-col mb-4 w-full">
              <label
                htmlFor="Email"
                className="text-lg text-gray-600 dark:text-gray-300 mb-1"
              >
                Correo Electrónico
              </label>
              <div className="flex items-center bg-transparent dark:bg-gray-700 border border-gray-300 rounded-lg px-4 focus-within:ring-2 focus-within:ring-indigo-500 py-2">
                <MdOutlineMailOutline className="text-gray-400 dark:text-gray-500 m-1" />
                <input
                  type="email"
                  name="Email"
                  defaultValue={edit ? user.Email : ""}
                  className="bg-transparent text-gray-900 placeholder-gray-500 dark:text-gray-200 dark:placeholder-gray-400 outline-none w-full pl-2"
                  placeholder="Ingrese su correo electrónico"
                  disabled={edit}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="flex flex-col mb-4 w-full">
              <label
                htmlFor="Contrasenia"
                className="text-lg text-gray-600 dark:text-gray-300 mb-1"
              >
                Contraseña
              </label>
              <div className="flex items-center bg-transparent dark:bg-gray-700 border border-gray-300 rounded-lg px-4 focus-within:ring-2 focus-within:ring-indigo-500 py-2">
                <MdLockOutline className="text-gray-400 dark:text-gray-500 m-1" />
                <input
                  type="password"
                  name="Contrasenia"
                  className="bg-transparent text-gray-900 placeholder-gray-500 dark:text-gray-200 dark:placeholder-gray-400 outline-none w-full pl-2"
                  placeholder="Ingrese su contraseña"
                />
              </div>
            </div>

            {/* Foto de Perfil */}
            <div className="flex flex-col items-center">
              <h1 className="text-lg text-gray-600 dark:text-gray-300">
                Foto de Perfil
              </h1>
              <div className="border-dotted border-2 border-gray-300 dark:border-gray-500 rounded-md w-full px-4 py-2 h-24 flex items-center justify-center cursor-pointer overflow-hidden">
                <input
                  type="file"
                  name="profile"
                  className="opacity-0 w-full h-full cursor-pointer"
                />
              </div>
            </div>

            {/* Botones de Tipo */}
            <div className="flex justify-around my-4 gap-2">
              <Box text="Tipo 1" index={1} />
              <Box text="Tipo 2" index={2} />
              <Box text="Gestacional" index={3} />
              <Box text="Pre-diabetes" index={4} />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              {edit ? "Actualizar" : "Registrarse"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
