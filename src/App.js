import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import React from "react";
import ItemListContainer from './components/ItemList/ItemListContainer'
import ItemDetailContainer from './components/ItemDetail/ItemDetailContainer.jsx';
import ContextProvider from './Context/Context';
import Cart from './components/Cart/Cart';
import CartWidget from './components/Cart/CartWidget';

function App() {  
  
  return (
    <>
    <ContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={
              <>
                <CartWidget />
                <ItemListContainer />
              </>
              } />
            <Route exact path="/category/:category" element={
              <>
                <CartWidget />
                <ItemListContainer />
              </>
            } />
            <Route exact path="/detail/:itemId" element={
              <>
                <CartWidget />
                <ItemDetailContainer />
              </>
            } />
            <Route exact path="/cart" element={ <Cart />} />
              
          </Routes>
        
        </BrowserRouter>
    </ContextProvider>
    </>
  );
}

export default App;
