import React, { useEffect, useState } from "react";
import { Route} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

import "./app.css";
import Profile from "./pages/Profile";

import Administracao from "./pages/Administracao";
import AreaTreinador from "./pages/AreaTreinador";
import Loading from "./components/Loading/Loading";
import { UserContext } from "./components/Context";
import API from "./components/API";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import AreaAtleta from "./pages/AreaAtleta";
import Planos from "./pages/Planos";

function App(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      let token = Auth.getToken()

      if (token) {
        await fetch(`${API.getURL()}/user/token/${token}`, {
          method: "GET",
          headers: { "content-type": "application/json" },
          mode: "cors",
        })
          .then((res) => res.json())
          .then((result) => {
            
            if(result === null){
              
              Auth.logout()
              props.history.push("/")
            }else{
              setUser(result);
            }
            
          })
          .catch((err) => {
            console.log("xau")
            props.history.push("/");
          });
      } else {
        props.history.push("/");
      }
    }

    if(!user) fetchUser();
  }, [user, props.history]);

  if (user === null) return <Loading />;

  return (
    <UserContext.Provider value={user}>
      <div id="app">
        <div className="side">
          <Sidebar />
        </div>

        <div className="content-wrapper">
          <div className="content">
            <Route exact path="/app">
              <Loading />
            </Route>

            <Route path="/app/profile/:id">
              <Profile />
            </Route>

            <Route path="/app/planos">
              <Planos />
            </Route>

            {/*atleta pages*/}
            <ProtectedRoute
              path="/app/atleta"
              callback={() => {
                return user.roles.atleta;
              }}
              component={AreaAtleta}
            ></ProtectedRoute>

            {/*treinador pages*/}
            <ProtectedRoute
              path="/app/treinador"
              callback={() => {
                return user.roles.treinador;
              }}
              component={AreaTreinador}
            ></ProtectedRoute>

            {/*admin pages*/}
            <ProtectedRoute
              path="/app/admin"
              callback={() => {
                return user.roles.admin;
              }}
              component={Administracao}
            ></ProtectedRoute>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
