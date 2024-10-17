import React, { useState, useEffect } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import * as Switch from "@radix-ui/react-switch";
import * as Select from "@radix-ui/react-select";
import * as Toast from "@radix-ui/react-toast";
import { Moon, Sun, Plus, Trash } from "lucide-react";
import { Footer } from "../components/Footer.jsx";

const Boton = ({ children, onClick, type = "button", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
  >
    {children}
  </button>
);

const Input = ({ id, type = "text", value, onChange, placeholder }) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-3 py-2 border rounded"
  />
);

const Etiqueta = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block mb-1 font-medium">
    {children}
  </label>
);

export const EditDiabeticProfile = ({
  datosUsuario,
  actualizarDatosUsuario,
}) => {
  const [nombre, setNombre] = useState(datosUsuario?.Nombre || "");
  const [email, setEmail] = useState(datosUsuario?.Email || "");
  const [tipoDiabetes, setTipoDiabetes] = useState(
    datosUsuario?.Diabetes || ""
  );
  const [avatar, setAvatar] = useState("/placeholder.svg?height=128&width=128");
  const [modoOscuro, setModoOscuro] = useState(false);
  const [edad, setEdad] = useState(datosUsuario?.Edad || "");
  const [peso, setPeso] = useState(datosUsuario?.Peso || "");
  const [altura, setAltura] = useState(datosUsuario?.Altura || "");
  const [medicaciones, setMedicaciones] = useState(
    datosUsuario?.Medicaciones || []
  );
  const [citas, setCitas] = useState(datosUsuario?.Citas || []);
  const [toastAbierto, setToastAbierto] = useState(false);

  useEffect(() => {
    if (datosUsuario) {
      setNombre(datosUsuario.Nombre);
      setEmail(datosUsuario.Email);
      setTipoDiabetes(datosUsuario.Diabetes);
      setEdad(datosUsuario.Edad);
      setPeso(datosUsuario.Peso);
      setAltura(datosUsuario.Altura);
      setMedicaciones(datosUsuario.Medicaciones);
      setCitas(datosUsuario.Citas);
    }
  }, [datosUsuario]);

  const manejarCambioAvatar = (event) => {
    const archivo = event.target.files?.[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setAvatar(lector.result);
      };
      lector.readAsDataURL(archivo);
    }
  };

  const manejarEnvio = (event) => {
    event.preventDefault();
    actualizarDatosUsuario({
      Nombre: nombre,
      Email: email,
      Diabetes: tipoDiabetes,
      Edad: edad,
      Peso: peso,
      Altura: altura,
      Medicaciones: medicaciones,
      Citas: citas,
    });
    setToastAbierto(true);
  };

  const alternarModoOscuro = () => {
    setModoOscuro(!modoOscuro);
  };

  const agregarMedicacion = () => {
    setMedicaciones([
      ...medicaciones,
      { nombre: "", dosis: "", frecuencia: "" },
    ]);
  };

  const eliminarMedicacion = (index) => {
    setMedicaciones(medicaciones.filter((_, i) => i !== index));
  };

  const actualizarMedicacion = (index, campo, valor) => {
    const nuevasMedicaciones = [...medicaciones];
    nuevasMedicaciones[index] = {
      ...nuevasMedicaciones[index],
      [campo]: valor,
    };
    setMedicaciones(nuevasMedicaciones);
  };

  const agregarCita = () => {
    setCitas([...citas, { fecha: "", descripcion: "" }]);
  };

  const eliminarCita = (index) => {
    setCitas(citas.filter((_, i) => i !== index));
  };

  const actualizarCita = (index, campo, valor) => {
    const nuevasCitas = [...citas];
    nuevasCitas[index] = { ...nuevasCitas[index], [campo]: valor };
    setCitas(nuevasCitas);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Editar Perfil Diabético</h2>
        <form
          onSubmit={manejarEnvio}
          className={`${modoOscuro ? "dark" : ""} p-6 bg-white rounded-lg`}
        >
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <Avatar.Root className="w-32 h-32 rounded-full overflow-hidden">
                <Avatar.Image src={avatar} alt="Foto de perfil" />
                <Avatar.Fallback>MP</Avatar.Fallback>
              </Avatar.Root>
              <Etiqueta
                htmlFor="avatar"
                className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
              >
                Cambiar foto de perfil
              </Etiqueta>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={manejarCambioAvatar}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Etiqueta htmlFor="nombre">Nombre de usuario</Etiqueta>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div>
                <Etiqueta htmlFor="email">Email</Etiqueta>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <Etiqueta htmlFor="tipoDiabetes">Tipo de Diabetes</Etiqueta>
              <Select.Root value={tipoDiabetes} onValueChange={setTipoDiabetes}>
                <Select.Trigger
                  className="w-full px-3 py-2 text-left bg-white border rounded cursor-pointer"
                  id="tipoDiabetes"
                >
                  <Select.Value placeholder="Selecciona el tipo de diabetes" />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="absolute bg-white border rounded shadow-lg p-2 w-full">
                    <Select.Viewport className="max-h-40 overflow-y-auto">
                      <Select.Item
                        value="Tipo 1"
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        <Select.ItemText>Diabetes Tipo 1</Select.ItemText>
                      </Select.Item>
                      <Select.Item
                        value="Tipo 2"
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        <Select.ItemText>Diabetes Tipo 2</Select.ItemText>
                      </Select.Item>
                      <Select.Item
                        value="Gestacional"
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        <Select.ItemText>Diabetes Gestacional</Select.ItemText>
                      </Select.Item>
                      <Select.Item
                        value="Otro"
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        <Select.ItemText>Otro</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Información Personal
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Etiqueta htmlFor="edad">Edad</Etiqueta>
                  <Input
                    id="edad"
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </div>
                <div>
                  <Etiqueta htmlFor="peso">Peso (kg)</Etiqueta>
                  <Input
                    id="peso"
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                  />
                </div>
                <div>
                  <Etiqueta htmlFor="altura">Altura (cm)</Etiqueta>
                  <Input
                    id="altura"
                    type="number"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Medicación Actual</h3>
              {medicaciones.map((med, index) => (
                <div key={index} className="flex items-end gap-2 mb-2">
                  <Input
                    placeholder="Nombre del medicamento"
                    value={med.nombre}
                    onChange={(e) =>
                      actualizarMedicacion(index, "nombre", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Dosis"
                    value={med.dosis}
                    onChange={(e) =>
                      actualizarMedicacion(index, "dosis", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Frecuencia"
                    value={med.frecuencia}
                    onChange={(e) =>
                      actualizarMedicacion(index, "frecuencia", e.target.value)
                    }
                  />
                  <Boton onClick={() => eliminarMedicacion(index)}>
                    <Trash size={16} />
                  </Boton>
                </div>
              ))}
              <Boton onClick={agregarMedicacion} className="mt-2">
                <Plus size={16} className="mr-2" /> Agregar Medicación
              </Boton>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Próximas Citas</h3>
              {citas.map((cita, index) => (
                <div key={index} className="flex items-end gap-2 mb-2">
                  <Input
                    type="date"
                    value={cita.fecha}
                    onChange={(e) =>
                      actualizarCita(index, "fecha", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Descripción de la cita"
                    value={cita.descripcion}
                    onChange={(e) =>
                      actualizarCita(index, "descripcion", e.target.value)
                    }
                  />
                  <Boton onClick={() => eliminarCita(index)}>
                    <Trash size={16} />
                  </Boton>
                </div>
              ))}
              <Boton onClick={agregarCita} className="mt-2">
                <Plus size={16} className="mr-2" /> Agregar Cita
              </Boton>
            </div>

            <div className="flex items-center justify-between">
              <Etiqueta htmlFor="modoOscuro">Modo Oscuro</Etiqueta>
              <Switch.Root
                id="modoOscuro"
                checked={modoOscuro}
                onCheckedChange={alternarModoOscuro}
                className={`w-11 h-6 bg-gray-200 rounded-full relative ${
                  modoOscuro ? "bg-blue-600" : ""
                }`}
              >
                <Switch.Thumb
                  className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                    modoOscuro ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </Switch.Root>
            </div>
          </div>

          <Boton type="submit" className="w-full mt-6">
            Guardar Cambios
          </Boton>
        </form>

        <Toast.Provider swipeDirection="right">
          <Toast.Root
            className="bg-white border border-gray-200 rounded-md shadow-lg p-4"
            open={toastAbierto}
            onOpenChange={setToastAbierto}
          >
            <Toast.Title className="font-medium">
              Perfil actualizado
            </Toast.Title>
            <Toast.Description>
              Los cambios en tu perfil han sido guardados exitosamente.
            </Toast.Description>
          </Toast.Root>
          <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50" />
        </Toast.Provider>
      </div>
      <Footer />
    </>
  );
};
