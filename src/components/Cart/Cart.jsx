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
      <div className='cart-price h5 mt-4'>
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
          <div className='container'>
            <h3 className='mb-4'>Resumen de Compra</h3>
          </div>
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
      <div className='container app-title'>
        <h3>Resumen de Compra</h3>
      </div>
      <div className="container mt-3">
        <>{ items.map((item, index) => 
            <>
              <div className='row mt-3' key={item.id}>
                <div className='col-12 my-auto'>
                  <h5 className="d-flex text-primary">{item.name}</h5>
                </div>
                <div className='col-4 col-sm-3 col-md-5'>
                  <div className='mb-auto text-end'>
                    <b>Cantidad:</b> 
                  </div>
                  <p className='text-end mb-2'>
                    <br/>{item.count} elementos
                  </p>
                </div>
                <dir className="col-1 d-none d-sm-block mt-auto mb-2">
                  <div className='text-center fw-bold text-primary'>x</div>
                </dir>

                <div className='col-4 col-sm-3 col-md-2  d-flex flex-column'>
                  <div className='mb-auto text-center'>
                    <b>Precio {item.steps > 1 ? 'x'+ item.steps : 'unidad'}: </b>
                  </div>
                  <div className='text-center'>
                    {getPrice(item)} 
                  </div>
                </div>
                
                <dir className="col-1 d-none d-sm-block mt-auto mb-2">
                  <div  className='text-center fw-bold text-primary'> = </div>
                </dir>
                <div className='col-3 col-sm-3 col-md-2 d-flex flex-column'>
                  {!index && 
                    <div className='text-end text-sm-start h5'>
                      <b>Total:</b> 
                    </div>
                  }
                  <p className='text-end text-sm-start mt-auto h4'>
                    ${item.totalPrice} 
                  </p>
                </div>
                <div className='col-1 d-flex'>
                  <span className="m-auto" onClick={()=> removeItem(item.id)}>
                    <i className="bi bi-trash text-danger"></i>
                  </span>
                </div>
              </div>
            </>
        )}</>

        <div className='row mt-3 border-top'>
          <div className='ms-auto col-11 col-sm-6 col-lg-4'>
            <div className='row mt-3'>
              <b className="text-end text-sm-start col-6 col-md-8 col-lg-6">Subtotal:</b>
              <div className='text-end text-sm-start col'> ${totals.untaxedPrice}</div>
            </div>
            <div className='row mt-3'>
              <b className="text-end text-sm-start col-6 col-md-8 col-lg-6">impuesto (10%):</b>
              <div className='text-end text-sm-start col'> ${totals.tax}</div>
            </div>
            <div className='row mt-3 border-top pt-3'>
              <b className="text-end text-sm-start col-6 col-md-8 col-lg-6 my-auto">TOTAL:</b>
              <div className='text-end text-sm-start col h3'> ${totals.totalPrice}</div>  
            </div>
            <div className='text-end text-sm-start col-12 mt-3'>
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
          <div className='col-1'></div>
        </div>

      </div>
    </div>
  );
}
