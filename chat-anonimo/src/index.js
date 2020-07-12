import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootswatch/dist/darkly/bootstrap.min.css"; 

require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);