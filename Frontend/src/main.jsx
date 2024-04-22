import React from 'react'
import ReactDOM from 'react-dom/client'
import ROUTER from './Router.jsx'
import '../public/Homescreen.css'
import '../public/patients.css'
import '../public/Dashboard.css';
import '../public/login.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ROUTER />
  </React.StrictMode>,
)
