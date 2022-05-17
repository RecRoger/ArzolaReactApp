import React, { useState, createContext } from "react";
import Swal from 'sweetalert2'
import {doc, addDoc, collection, getDocs, getFirestore, query, serverTimestamp, where, writeBatch} from 'firebase/firestore'

export const CartContext = createContext();
export const ProductsContext = createContext();

export default function ContextProvider({ children }) {

  const [cartList, setCartList] = useState([])
  const [totals, setTotals] = useState({untaxedPrice: 0, tax: 0, total:0})
  
  let [items, setItems] = useState([]);
  let [reloadIndicator, setReloadIndicator] = useState(false);
  
  const getItems = async (category) => {
    const db = getFirestore();

    let productsCollection

    if(!category) {
      productsCollection = collection(db, "products")
    } else {
      productsCollection = query(collection(db, "products"), where('categories', 'array-contains', category))
    }

    try {
      const snapshot = await getDocs(productsCollection)
      if(snapshot?.docs?.length) {
        const newItems = snapshot.docs.map(item=> ({...item.data(), id: item.id}))
        await setItems(newItems)
        return newItems
      } else {
        return []
      }

    } catch(e) {
      throw e
    }
  }

  const addToCart = (addItem, addCount) => {    
      const updatedCart = [...cartList]
      let cartItem = updatedCart.find(cart=> cart?.id === addItem.id);
      if (!cartItem) {
      cartItem = {
          id: addItem.id,
          name: addItem.name,
          price: addItem.price,
          discount: addItem.discount || null,
          currentPrice: !addItem.discount ? 
            addItem.price : (addItem.price * (1 - (addItem.discount/100))),
          steps: addItem.steps,
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
    const cartItem = {...cartList.find(cart=> cart.id === itemId)};

    Swal.fire({
        title: `¿Seguro que deseas eliminar ${cartItem.name}${cartItem.count > 1 ? `(x${cartItem.count})` : '' } de la lista de compras?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        position: 'bottom-end',
    }).then((result) => {
        if (result.isConfirmed) {
          const updateItems = [...items]
          const item = updateItems.find(item=> item.id === itemId)
          item.stock = (item?.stock || 0) + Number(cartItem.count)
          setItems(updateItems)
          
          const updatedCart = cartList.filter(cart=> cart.id !== itemId)
          setCartList(updatedCart)
          
          Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: `${cartItem.name}${cartItem.count > 1 ? `(x${cartItem.count})` : '' } eliminado de la lista de compras`,
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
    return cartList.find(cart=> cart?.id === itemId)?.count || 0
  }



  const procedePayment = async () => {
    const result = await Swal.fire({
      title: `¿Listo para proceder con la compra?`,
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      position: 'bottom-end',
    })
    
    if (result.isConfirmed) {     

      const { value: id, isConfirmed: confirmed }  = await  Swal.fire({
        titleText: 'Necesitamos tus datos',
        position: 'bottom-end',
        showCancelButton: true,
        confirmButtonText: 'Confirmar orden',
        html:
          '<p>Para completar la orden de compra necesitamos algunos datos personales:</p>' +
          '<input id="name" class="swal2-input" placeholder="Nombre" type="text">' +
          '<input id="email" class="swal2-input" placeholder="Correo" type="email">' +
          '<input id="phone" class="swal2-input" placeholder="Celular" type="tel">',
        focusConfirm: false,
        preConfirm: async () => {
          const buyer = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
          }
          if (buyer && validateUser(buyer)) {
            const valid = await updateServerStock();
            if (valid) {
              return createOrder(buyer).then(orderId => orderId).catch((e) => {throw e})
            } else {
              return 'noStock'
            }
          } else {
            Swal.showValidationMessage(`Datos invalidos`)
          }
        },
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      })
      
      if(confirmed && id) {
        Swal.fire({
          position: 'bottom-end',
          icon: id === 'noStock' ? 'error' :'success',
          title: id === 'noStock' ? 'Problemas de Stock ' : `Listo!!`,
          html: id === 'noStock' ? 'Lo sentimos! <br> Ha cambiado el stock durante la compra, por favor rehacer la orden nuevamente.'
            : `<p>Orden de compras realizada. <br><br> <b>Orden:</b> ${id} <br> ${cartList.length} elementos <br> <b>Total</b> $${totals.totalPrice}</p>`,
          showConfirmButton: false,
        }).then(()=> {
          setCartList([])
        })
        return
      } else if(confirmed && !id) {
        Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: `Ha ocurrido un error`,
            text: `Lo sentimos, no hemos podido crear la orden`,
            showConfirmButton: false,
            timer: 4500,
        })
      }
      
    } 
  }
  const validateUser = (buyer) => {
    const nameRegex = /^[a-zA-Z\s]*$/
    const mailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const phoneRegex = /^[0-9]*$/
    
    if (buyer.name && nameRegex.test(buyer.name))    {
      if (buyer.email && mailRegex.test(buyer.email))    {
        if (buyer.phone && phoneRegex.test(buyer.phone))    {
          return (true)
        }
      }
    }
    return (false)
    
  }
  const createOrder = async (buyer) => {
    const order = { 
      buyer,
      items: cartList,
      totals,
      date: serverTimestamp()
    }
    console.log('La orden', order)

    const db = getFirestore();
    const ordersCollection = collection(db, "orders")
    try {
      const {id} = await addDoc(ordersCollection, order)
      return id
    } catch(e) {
      throw e
    }
    
  }
  const updateServerStock = async () => {
    const db = getFirestore();
    const productsCollection = collection(db, "products")
    const snapshot = await getDocs(productsCollection)
    const newItems = snapshot.docs.map(item=> ({...item.data(), id: item.id}))

    const batch = writeBatch(db);
    let stockError = false;

    cartList.forEach((item) => {
      debugger;
      const dbItem = newItems.find(i=> i.id === item.id)
      const newCount = dbItem.stock - item.count
      if (newCount >= 0) {
        const itemDoc = doc(db, "products", item.id)
        batch.update(itemDoc, {stock: newCount})
      } else {
        stockError = true;
      }
    });

    if(!stockError) {
      await batch.commit()
      return true
    } else{
      return false
    }
  }
  
  return (
    <>
        <ProductsContext.Provider value={{items, getItems, setItems, reloadIndicator, setReloadIndicator}} >
            <CartContext.Provider value={{cartList, setCartList, addToCart, removeItem, clearCart, isInCart, totals, setTotals, procedePayment}} >
                {children}
            </CartContext.Provider>
        </ProductsContext.Provider>
    </>
  );
}
