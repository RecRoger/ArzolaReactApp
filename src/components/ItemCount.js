import React, { useState } from "react";
import Swal from 'sweetalert2'


function ItemCount({ itemName, stock, initial, steps, onAdd }) {
    const [count, setCount] = useState(initial || steps || 1)

    function decrement() {
        if(count > 0)
        setCount((count - (steps || 1)))
    }
    function increment() {
        if(count + (steps || 1) <= stock ) {
            setCount(count + (steps || 1))
        } else {
            Swal.fire({
                position: 'bottom-end',
                icon: 'error',
                title: 'Personal insuficiente',
                text: `No hay personal disponible en estos momentos para tomar tantos trabajos de ${itemName}`, 
                showConfirmButton: false,
                timer: 5500,
                toast: true
            })
        }
    }


    return (
      <>
          <div className="item-counter">
            <h5>
                {itemName} { steps ? <span className="count-steps">x{steps}</span> : ''}
            </h5>
            <div className="input-group mb-3 count-section">
                <button className="btn btn-outline-secondary" type="button" onClick={()=> decrement()}>-</button>
                <input type="tel" className="form-control item-quantity" aria-label={itemName + ' count'} disabled value={count}></input>
                <button className="btn btn-outline-secondary" type="button" onClick={()=> increment()}>+</button>
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="button" onClick={()=> onAdd(itemName, count)}>Añadir al carrito</button>
            </div>

          </div>

      </>
    );
  }
  
  export default ItemCount;