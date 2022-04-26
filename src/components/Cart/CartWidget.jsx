import { useContext } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../../Context/Context';

function CartWidget() {

  const { cartList, removeItem, clearCart}  = useContext(CartContext);

  return (
    <>
        <div className="main-cart">
            <button className="btn btn-secondary dropdown-toggle position-relative" type="button" id="cartButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-cart"></i>
                { cartList?.length ? 
                  <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                    {cartList?.length}
                  </span> : ''
                }
            </button>
              <ul className="dropdown-menu" aria-labelledby="cartButton">
                { !cartList?.length ? 
                    <li> No hay productos seleccionado </li>
                    : 
                    <>
                      {cartList.map(cartItem => 
                        <li key={cartItem.item.id}>
                          <h6 className="d-flex">{cartItem.item.name}
                          <span className="ms-auto" onClick={()=> removeItem(cartItem.item.id)}>
                            <i className="bi bi-trash text-danger"></i>
                          </span>
                          </h6>
                          <p className='text-end'>x{cartItem.count}
                          
                          </p>
                        </li>
                      )}
                      <li className="d-flex w-100"> <button className="btn btn-link m-auto" onClick={()=> clearCart()}> Vaciar lista </button> </li>
                      <li className="d-flex w-100"> 
                        <Link className="m-auto" to={'/cart'}>
                          <button className="btn btn-primary">Proceder Pago</button>
                        </Link>
                      </li>
                    </>
                    
                  } 
              </ul> 
        </div>
    </>
  );
}

export default CartWidget;
