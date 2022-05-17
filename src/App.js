import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import React from "react";
import ItemListContainer from './components/ItemList/ItemListContainer'
import ItemDetailContainer from './components/ItemDetail/ItemDetailContainer.jsx';
import ContextProvider from './Context/Context';
import Cart from './components/Cart/Cart';
import logo from './assets/logo_rorg_gray.svg';


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
            <Route exact path="/cart" element={<Cart />}/>
              
          </Routes>
        
          <footer className="container">
            <img className="footer-logo" src={logo} alt="rogr"></img>
            <div className="footer-signature">
                App creada por <b>RecRoger</b> - 05/2022
            </div>
        </footer>
        </BrowserRouter>
    </ContextProvider>
    </>
  );
}

export default App;
