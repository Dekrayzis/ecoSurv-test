import React from 'react';
import {render} from 'react-dom';
import './styles/style.scss';
import App from './App';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);