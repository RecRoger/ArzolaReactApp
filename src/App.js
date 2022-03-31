import './App.css';
import NavBar from './components/NavBar';
import React from "react";
import ItemListContainer from './components/ItemListContainer'


function App() {


  return (
    <div className="app-container">
      <NavBar />
      <div className="app-content">
        <h2>Bienvenido</h2>
        <p>
          Aca podrás solicitar diferentes servicios digitales, tanto del area de diseño gráfico, como marqueting digital y desarrollo web.
        </p>
        <ItemListContainer />
      </div>
    </div>
  );
}

export default App;
