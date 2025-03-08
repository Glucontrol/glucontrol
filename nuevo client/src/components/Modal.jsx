import React from "react";

/* Para usar el modal:

Llaman al modal y le pasan los siguientes valores:
<Modal 
title: (Es el texto grande que aparece arriba),
text1: (El textito de abajo),
confirm: (Texto de botón de confirmar),
cancel: (Texto de cancelar),
onConfirm: (Función a ejecutar)
/>

*/
export default function Modal({ prop }) {
  const [pop, setPop] = React.useState(false);
  const [close, setClose] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setPop(true);
    }, 100);
  }, []);
  const { title, text1, confirm, cancel, onConfirm } = prop;
  return (
    <>
      {!close ? (
        <div
          className="w-screen h-screen flex fixed bg-slate-600 z-10 bg-opacity-60"
          onClick={() => setClose(true)}
        >
          <div
            className={`${
              pop ? "scale-100" : "scale-0"
            } duration-150 bg-white h-1/3 w-1/2 self-center mx-auto z-20 rounded-lg shadow-lg grid grid-rows-2 `}
          >
            <div>
              <h1 className="font-bold text-red-500 text-3xl text-center mt-5">
                {title}
              </h1>
              <span className="flex w-full mx-24 mt-5"> {text1} </span>
            </div>
            <div className="flex flex-row w-full items-end gap-6 justify-center mb-10">
              <button
                className="bg-red-500 w-1/3 h-1/2 rounded-lg text-white hover:scale-110 duration-300"
                onCLick={() => onConfirm.substr(1, -1)}
              >
                {confirm}
              </button>
              <button
                className="bg-white rounded-lg border-2 border-gray-400 w-1/3 h-1/2 hover:scale-110 duration-300"
                onClick={() => setClose(true)}
              >
                {cancel}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
