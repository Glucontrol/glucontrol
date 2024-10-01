import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Home } from "./views/home";
import { Login } from "./views/login";
import { Register } from "./views/register";
import { AuthForm } from "./views/authForm";

function App() {
  return (
    <div className="App">
      <AuthForm />
      {/* <Home /> */}
      <Login />
      <Register />
    </div>
  );
}

export default App;
