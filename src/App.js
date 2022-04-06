import './App.css';
import NavBar from './components/NavBar';
import React from "react";
import ItemListContainer from './components/ItemList/ItemListContainer'

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <div className="app-content">
        <h2>Bienvenido</h2>
        <p>
          En esta web podras visualizar y solicitar la compra de diferentes productos y servicios
        </p>
        <ItemListContainer />
      </div>
    </div>
  );
}

export default App;
