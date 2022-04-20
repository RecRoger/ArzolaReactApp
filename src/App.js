import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import React from "react";
import ItemListContainer from './components/ItemList/ItemListContainer'
import ItemDetailContainer from './components/ItemDetail/ItemDetailContainer.jsx';
import ContextProvider from './Context/Context';

function App() {  

  return (
    <>
    <ContextProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>

            <Route exact path="/" element={<ItemListContainer />} />
            <Route exact path="/category/:category" element={<ItemListContainer />} />
            <Route exact path="/detail/:itemId" element={<ItemDetailContainer />} />
              
          </Routes>
        
        </BrowserRouter>
    </ContextProvider>
    </>
  );
}

export default App;
