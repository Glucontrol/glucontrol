import { useState, useEffect, useContext } from "react";
import {
  FaRegEnvelope,
  FaGoogle,
  FaFacebook,
  FaApple,
  FaUser,
} from "react-icons/fa";
import { link } from "../utilities/functions";
import { UserContext } from "../context/UserContext";

export const Register = () => {
  const Box = ({ text, index }) => {
    return (
      <a
        className={`${
          index == type
            ? "border-2 shadow-sky-300 scale-100 transition duration-300 "
            : "bg-white scale-100 hover:scale-95"
        } w-1/6 h-40 rounded-md shadow-lg duration-700 `}
        onClick={() => {
          setType(index);
        }}
      >
        {text}
      </a>
    );
  };

  const [type, setType] = useState();
  const user = useContext(UserContext);
  const path = window.location.pathname.split("/");
  const edit = path[1] == "edit" ? true : false;
  const [preview, setPreview] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleRegister = (e) => {
    e.preventDefault();
    // Implementa tu lógica de registro aquí
  };

  return (
    <>
      <main className="flex min-h-screen">
        <div className="flex-1 p-8">
          <div className="bg-red-200  shadow-lg w-5/6 mx-auto">
            <form
              action="post"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                formData.append("Type", type);
                if (edit) {
                  link.editProfile(formData);
                } else {
                  link.signUp(formData);
                }
              }}
            >
              <div className="bg-white shadow-lg text-center flex flex-col w-full gap-5">
                <h1 className="text-3xl font-semibold ">
                  {edit ? "Editar usuario" : "Crear nuevo Usuario"}
                </h1>
                <div className="w-full ">
                  <label htmlFor="Nombre" className="text-2xl">
                    Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    name="Nombre"
                    defaultValue={`${edit ? user.Nombre : ""}`}
                    className="bg-gray-200 border  w-1/2 mx-auto border-gray200 outline-none rounded-xl text-center"
                  />
                </div>
                <div className="w-full ">
                  <label htmlFor="Contraseña" className="text-2xl">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="Contrasenia"
                    className="bg-gray-200 border  w-1/2 mx-auto border-gray200 outline-none rounded-xl text-center"
                  />
                </div>
                <div>
                  <h1 className="border-b-2 border-gray-50">Foto de Perfil</h1>
                  <div className=" border-dotted border-gray-200 border-2 h-20 w-1/2 mx-auto">
                    <input
                      type="file"
                      name="profile"
                      onChange={(e) => setPreview(e.target.files[0])}
                      className="opacity-0  mx-auto h-full w-full cursor-pointer"
                    />
                  </div>
                </div>
                <div className=" h-2/3 flex flex-row justify-around">
                  <Box text={"bom día"} index={1} />
                  <Box text={"Tipo 2"} index={2} />
                  <Box text={"Gestacional"} index={3} />
                </div>
                <button
                  type="submit"
                  className="bg-sky-300 w-1/2 rounded-lg self-center hover:text-white hover:bg-sky-400"
                >
                  Chi
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
