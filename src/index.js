import React from 'react';
import ReactDOM from 'react-dom';
import './themes/dark theme/dark-theme.scss';
import App from './App';
import './Assets/css/modal.css'


ReactDOM.render(
  <React.StrictMode>
    <App className = "html-body"/>
  </React.StrictMode>,
  document.getElementById('root')
);

