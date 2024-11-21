import { useEffect, useState } from "react";

const Alert = ({ prop }) => {
  const { texto } = prop;
  const [pop, setPop] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPop(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-20 flex items-center justify-center z-50">
      <div
        className={`transform transition-transform duration-300 ease-out ${
          pop ? "scale-100" : "scale-0"
        } bg-white shadow-xl border border-gray-300 flex items-center justify-center px-6 py-4 rounded-2xl`}
      >
        <h1 className="text-lg font-semibold text-gray-800">{texto}</h1>
      </div>
    </div>
  );
};

export default Alert;
