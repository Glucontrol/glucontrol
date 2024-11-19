import { useEffect, useState } from "react";
import { link } from "../utilities/functions";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    link.logOut().then((el) => console.log(el.json()));
  }, []);

  return (
    <main className="flex flex-col items-center space-y-4">
      <h3>Glucontrol te espera pronto</h3>
    </main>
  );
};

export default LogOut;
