import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import React from "react";
import ItemListContainer from './components/ItemList/ItemListContainer'
import ItemDetailContainer from './components/ItemDetail/ItemDetailContainer.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>

          <Route exact path="/" element={<ItemListContainer />} />
          <Route exact path="/detail/:itemId" element={<ItemDetailContainer />} />
            



        </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
