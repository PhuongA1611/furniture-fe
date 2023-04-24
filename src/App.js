import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteConfig from './config/RouteConfig';
import './assets/fontawewsome/css/all.min.css'
import './App.scss';


function App() {
  return (
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  );
}

export default App;
