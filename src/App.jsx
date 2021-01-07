import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

import './app.css'
import Profile from './pages/Profile';

import Administracao from './pages/Administracao';
import AreaTreinador from './pages/AreaTreinador';
import Loading from './components/Loading/Loading';
import { UserContext } from './components/Context';
import API from './components/API';
import Auth from './components/Auth';


function App(props) {

  const [user, setUser] = useState(null)

  useEffect(() => {
      async function fetchUser() {
          setUser(await API.getUserByToken(await Auth.getToken()))
      }

      if (!user)
          fetchUser()
  }, [user])

  

  if(user === null) return <Loading />

  

  return (
    <UserContext.Provider value={user}>
      <div id="app">
        <div className="side">
          <Sidebar />
        </div>

        <div className="content-wrapper">
          <div className="content">


            <Route path="/app/profile/:id" >
              <Profile />
            </Route>

            {/*atleta pages*/}
            <Route path="/app/atleta">
            </Route>

            {/*treinador pages*/}
            <Route path="/app/treinador">
              <AreaTreinador />
            </Route>


            {/*admin pages*/}
            <Route path="/app/admin">
              <Administracao />
            </Route>

          </div>
        </div>
      </div>
    </UserContext.Provider>

  );
}


export default App;
