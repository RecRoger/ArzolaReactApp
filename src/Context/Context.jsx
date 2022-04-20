import React, { useState, createContext } from "react";
import Swal from 'sweetalert2'

export const CartContext = createContext();
export const ProductsContext = createContext();

export default function ContextProvider({ children }) {

  const [cartList, setCartList] = useState([])
  let [items, setItems] = useState([]);
  let [reloadIndicator, setReloadIndicator] = useState(false);
  
  const addToCart = (addItem, addCount) => {    
      const updatedCart = [...cartList]
      let cartItem = updatedCart.find(cart=> cart.item?.id === addItem.id);
      if (!cartItem) {
      cartItem = {
          item: {
              id: addItem.id,
              name: addItem.name,
              price: addItem.price,
              discount: addItem.discount,
          }, 
          count: 0
      }
      updatedCart.push(cartItem)
      }
      const shopCount = cartItem.count + addCount
      cartItem.count = shopCount
      setCartList(updatedCart)
      

      const updateItems = [...items]
      const item = updateItems.find(item=> item.id === addItem.id)
      item.stock = item?.stock - addCount
      setItems(updateItems)
  
      Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: `${addItem.name}${addCount > 1 ? `(x${addCount})` : '' } sumados a la lista de compras`,
          showConfirmButton: false,
          timer: 4500,
      })
  }
  const removeItem = (itemId) => {
    const cartItem = {...cartList.find(cart=> cart.item.id === itemId)};

    Swal.fire({
        title: `¿Seguro que deseas eliminar ${cartItem.item.name}${cartItem.count > 1 ? `(x${cartItem.count})` : '' } de la lista de compras?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        position: 'bottom-end',
    }).then((result) => {
        if (result.isConfirmed) {
          const updateItems = [...items]
          const item = updateItems.find(item=> item.id === itemId)
          item.stock = (item?.stock || 0) + Number(cartItem.count)
          setItems(updateItems)
          
          const updatedCart = cartList.filter(cart=> cart.item.id !== itemId)
          setCartList(updatedCart)
          
          Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: `${cartItem.item?.name}${cartItem.count > 1 ? `(x${cartItem.count})` : '' } eliminado de la lista de compras`,
              showConfirmButton: false,
              timer: 4500,
          })
        } 
    })
    
  }

  const clearCart = () => {
    Swal.fire({
        title: `¿Seguro que deseas vasiar la lista de compras?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        position: 'bottom-end',
    }).then((result) => {
        if (result.isConfirmed) {
            setReloadIndicator(true)
            setCartList([])
            
            Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: `Lista de compras vasiada`,
                showConfirmButton: false,
                timer: 4500,
            })
        } 
    })
  }

  const isInCart = (itemId) => {
    return cartList.find(cart=> cart.item?.id === itemId)?.count || 0
  }

  
  return (
    <>
        <ProductsContext.Provider value={{items, setItems, reloadIndicator, setReloadIndicator}} >
            <CartContext.Provider value={{cartList, setCartList, addToCart, removeItem, clearCart, isInCart}} >
                {children}
            </CartContext.Provider>
        </ProductsContext.Provider>
    </>
  );
}
