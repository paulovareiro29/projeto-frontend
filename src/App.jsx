import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

import "./app.css";
import Profile from "./pages/Profile";

import Administracao from "./pages/Administracao";
import AreaTreinador from "./pages/AreaTreinador";
import Loading from "./components/Loading/Loading";
import { UserContext } from "./components/Context";
import API from "./components/API";
import Auth from "./components/Auth";
import PlanosAtletaPage from "./pages/atleta/planos/PlanosAtletaPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AreaAtleta from "./pages/AreaAtleta";

function App(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setUser(await API.getUserByToken(await Auth.getToken()));
    }

    if (!user) fetchUser();
  }, [user]);

  if (user === null) return <Loading />;

  return (
    <UserContext.Provider value={user}>
      <div id="app">
        <div className="side">
          <Sidebar />
        </div>

        <div className="content-wrapper">
          <div className="content">
            <Route path="/app/profile/:id">
              <Profile />
            </Route>

            {/*atleta pages*/}
            <ProtectedRoute path="/app/atleta" callback={() => {
              return user.roles.atleta
            }} component={AreaAtleta}>
              
            </ProtectedRoute>

            {/*treinador pages*/}
            <ProtectedRoute path="/app/treinador" callback={() => {
              return user.roles.treinador
            }} component={AreaTreinador}>
            </ProtectedRoute>

            {/*admin pages*/}
            <ProtectedRoute path="/app/admin" callback={() => {
              return user.roles.admin
            }} component={Administracao}>
            </ProtectedRoute>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
