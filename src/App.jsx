import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Home } from "./components/home";
import { Login } from "./components/login";
import { Register } from "./components/register";

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Login />
      <Register />
    </div>
  );
}

export default App;
