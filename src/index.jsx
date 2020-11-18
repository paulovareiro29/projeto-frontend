import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/global.css';

import App from './App';
import Landing from './pages/Landing';
import ProtectedRoute from './components/ProtectedRoute';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Route exact path="/" component={Landing} />
          <ProtectedRoute path="/app" component={App} />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
