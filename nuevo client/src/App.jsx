import { useState, Suspense, lazy } from "react";
import { UserContext } from "./context/UserContext";
import "./style.css";
import { link } from "./utilities/functions";
const AppRouter = lazy(() => import("./routes/AppRouter.jsx"));

function App() {
  const [user, setUser] = useState({ loggedIn: false });
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  darkMode
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
  useState(() => {
    link
      .sesion()
      .then((res) => setUser(res))
      .then(() => setLoading(false));
  }, []);
  return loading ? (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className=" bg-red-600 w-20 h-20 animate-spin"></div>
    </div>
  ) : (
    <UserContext.Provider value={user}>
      <Suspense
        fallback={
          <div className="flex flex-row justify-center gap-5 h-screen w-screen items-center">
            <div className="bg-slate-400 flex h-10 w-10 animate-bounce"></div>
            <div className="bg-slate-400 flex h-10 w-10 animate-bounce"></div>
            <div className="bg-slate-400 flex h-10 w-10 animate-bounce"></div>
          </div>
        }
      >
        <AppRouter />
      </Suspense>
    </UserContext.Provider>
  );
}
export default App;
