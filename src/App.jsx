import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

import './app.css'
import Profile from './pages/Profile';

function App(props) {
  return (
    <>

      <div id="app">
        <div className="side">
          <Sidebar />
        </div>
        
        <div className="content-wrapper">
          <div className="content">


            <Route path="/app/profile">
              <Profile />
            </Route>
          </div>
        </div>
      </div>
    </>

  );
}


export default App;
