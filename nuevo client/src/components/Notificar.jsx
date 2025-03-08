import { link } from "../utilities/functions";

const Notificar = () => {
  return (
    <>
      <div className=" w-full text-center h-36 rounded-b-xl mb-10 shadow-lg">
        <h1 className="font-semibold text-2xl">Notificar</h1>
        <p>Envía recordatorios a tu gmail.</p>
        <div className="flex justify-center my-10">
          <input type="datetime-local" name="" id="fecha" />
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-4 py-2 mx-3 rounded-lg"
            onClick={() => {
              try {
                link
                  .newGmail(document.querySelector("#fecha").value)
                  .then((el) => {
                    alert(el);
                  });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Crear Recordatorio
          </button>
        </div>
      </div>
    </>
  );
};
export default Notificar;
