import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/global.css';

import App from './App';
import Landing from './pages/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './components/Auth';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Route exact path="/" component={Landing} />
          <ProtectedRoute path="/app" callback={() => {
            return Auth.isLoggedIn()
          }} component={App} />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
