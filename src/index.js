import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAu6bvZj6R-HTt06u_ILv_3nqkTYFSiwS0",
  authDomain: "react-bakery-3a1e9.firebaseapp.com",
  projectId: "react-bakery-3a1e9",
  storageBucket: "react-bakery-3a1e9.appspot.com",
  messagingSenderId: "889233902318",
  appId: "1:889233902318:web:ebb6a83219e3760c8341ff",
  measurementId: "G-S0LR8MNHKM"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
