import React, { useState } from "react";
import AppRouter from "./routes/AppRouter";
import { UserContext } from "./context/UserContext";
import "./style.css";
import { useEffect } from "react";
import { link } from "./utilities/functions";

function App() {
  const [user, setUser] = useState({ loggedIn: false });
  useEffect(() => {
    link
      .sesion()
      .then((resultado) => resultado.json())
      .then((resultado) => setUser(resultado));
  }, []);
  return (
    <UserContext.Provider value={user}>
      <AppRouter />
    </UserContext.Provider>
  );
}
export default App;
