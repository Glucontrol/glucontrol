import { useEffect, useState } from "react";
const Alert = ({ prop }) => {
  const { texto } = prop;
  const [pop, setPop] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPop(true);
    }, 400);

    () => {
      return setPop(false);
    };
  }, []);
  return (
    <div className="flex w-screen h-20 top-0  fixed ">
      <div
        className={`  ${
          !pop
            ? "scale-0"
            : "scale-100 bg-gray-200 shadow-lg mt-5 flex w-1/3 h-10 mx-auto rounded-xl"
        } duration-200`}
      >
        <h1 className="text-center font-bold text-2xl mx-auto ">{texto}</h1>
      </div>
    </div>
  );
};

export default Alert;
