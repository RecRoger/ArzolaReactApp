import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../../Context/Context';

export default function Cart() {

  const { cartList, removeItem, clearCart, payCart }  = useContext(CartContext);
  const [items, setItems] = useState([])
  const [totals, setTotals] = useState({untaxedPrice: 0, tax: 0, total:0})

  useEffect(()=> {

    if(!cartList?.length) {
      setItems([])
      setTotals({
        untaxedPrice: 0,
        tax: 0,
        totalPrice: 0,
      })
    } else {
      const parsedItems = cartList.map((cartItem)=> {
        const unitPrice = !cartItem.item.discount ? 
          cartItem.item.price : (cartItem.item.price * (1 - (cartItem.item.discount/100))) ;
        const totalPrice = (cartItem.count/(cartItem.item.steps || 1)) * unitPrice
        return {...cartItem.item, count: cartItem.count, unitPrice, totalPrice}
      })
      setItems(parsedItems)
      const untaxedPrice = parsedItems.map((item)=> item.totalPrice).reduce((a, b) => a+b);
      const tax = untaxedPrice * (0.1);
      const totalPrice = untaxedPrice + tax;
  
      setTotals({
        untaxedPrice,
        tax,
        totalPrice,
      })

    }
  }, [cartList])

  const getPrice = (item) => {
    return (!item.discount) ?
      <div className='cart-price h5'>
        ${item.unitPrice}
      </div> :
    <>
      <span className='cart-price original text-muted'>${item.price}</span>
      <span className='cart-discount text-danger'> - {item.discount}%</span>
      <div className='cart-price h5'>${item.unitPrice}</div>
    </>
  }



  if(!cartList?.length){
    return (
      <>
        <div className="app-content d-flex flex-column">
          <h3 className='mb-4'>Resumen de Compra</h3>
          <div className='container mt-3'>
            <div className="alert alert-secondary text-center" role="alert">
              No hay elementos añadidos a la lista de compra!
            </div>
            <div className='d-flex mt-4'>
              <Link to={'/'} className='ms-auto'>
                <button className="btn btn-primary">Ver Productos</button>
              </Link>

            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="app-content">
      <h3>Resumen de Compra</h3>
      <div className="container mt-5">
        <>{ items.map(item => 
            <div className='row mt-3' key={item.id}>
              <div className='col-4 my-auto'>
                <h5 className="d-flex">{item.name}</h5>
              </div>
              <div className='col mt-auto'>
                <p className='text-end mb-2'>
                  <b>Cantidad: </b>
                  <br/>{item.count} elementos
                </p>
              </div>
              <dir className="col-auto mt-auto mb-2">
                <div>x</div>
              </dir>
              <div className='col mt-auto'>
                <div className='text-center'>
                  <b>
                    Precio {item.steps > 1 ? 'x'+ item.steps : 'unidad'}: 
                  </b>
                  <br/>
                  {getPrice(item)} 
                </div>
              </div>
              <dir className="col-auto mt-auto mb-2">
                <div> = </div>
              </dir>
              <div className='col mt-auto'>
                <p className='text-start h4'>
                  ${item.totalPrice} 
                </p>
              </div>
              <div className='col-1 d-flex'>
                <span className="m-auto" onClick={()=> removeItem(item.id)}>
                  <i className="bi bi-trash text-danger"></i>
                </span>
              </div>

            </div>
        )}</>  
        <div className='row mt-3 border-top'>
          <div className='ms-auto col-4'>
            <div className='row mt-3'>
              <b className="col">Subtotal:</b>
              <div className='col'> ${totals.untaxedPrice}</div>
            </div>
            <div className='row mt-3'>
              <b className="col">impuesto (10%):</b>
              <div className='col'> ${totals.tax}</div>
            </div>
            <div className='row mt-3 border-top pt-3'>
              <b className="col my-auto">TOTAL:</b>
              <div className='col h3'> ${totals.totalPrice}</div>
              <div className='col-12 mt-3'>
                <div className="row">
                  <div className="col">
                    <button className='btn btn-dark btn-lg w-100' onClick={()=> clearCart()}>Vaciar Lista</button>
                  </div>
                  <div className="col" onClick={()=> payCart(totals)}>
                    <button className='btn btn-primary btn-lg w-100'>Pagar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-1'></div>
        </div>

      </div>
    </div>
  );
}
