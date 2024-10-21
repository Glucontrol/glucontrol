import { useState, Suspense, lazy } from "react";
import { UserContext } from "./context/UserContext";
import "./style.css";
import { link } from "./utilities/functions";
const AppRouter = lazy(() => import("./routes/AppRouter.jsx"));

function App() {
  const [user, setUser] = useState({ loggedIn: false });
  const [loading, setLoading] = useState(true);

  useState(() => {
    link
      .sesion()
      .then((res) => setUser(res))
      .then(() => setLoading(false));
  }, []);
  return loading ? (
    <h1>Hola</h1>
  ) : (
    <UserContext.Provider value={user}>
      <Suspense fallback={<h1>Cargando po'</h1>}>
        <AppRouter />
      </Suspense>
    </UserContext.Provider>
  );
}
export default App;
