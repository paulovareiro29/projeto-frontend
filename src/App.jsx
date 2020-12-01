import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

import './app.css'
import Profile from './pages/Profile';

import Administracao from './pages/Administracao';
import AreaTreinador from './pages/AreaTreinador';

function App(props) {
  return (
    <>

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
    </>

  );
}


export default App;
