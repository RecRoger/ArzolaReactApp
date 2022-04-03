import React, { useState } from "react";
import Swal from 'sweetalert2'


function ItemCount({ item, onAdd }) {
    const [count, setCount] = useState(item?.initial || item.item.steps || 1)

    function decrement() {
        if(count > 0)
        setCount((count - (item.steps || 1)))
    }
    function increment() {
        if(count + (item.steps || 1) <= item.stock ) {
            setCount(count + (item.steps || 1))
        } else {
            Swal.fire({
                position: 'bottom-end',
                icon: 'error',
                title: 'Personal insuficiente',
                text: `No hay personal disponible en estos momentos para tomar tantos trabajos de ${item.name}`, 
                showConfirmButton: false,
                timer: 5500,
                toast: true
            })
        }
    }


    return (
      <>
          <div className="item-counter">
            <div className="input-group mb-3 count-section">
                <button className="btn btn-outline-secondary" type="button" onClick={()=> decrement()}>-</button>
                <input type="tel" className="form-control item-quantity" aria-label={item.name + ' count'} disabled value={count}></input>
                <button className="btn btn-outline-secondary" type="button" onClick={()=> increment()}>+</button>
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="button" onClick={()=> onAdd(item, count)}>Añadir al carrito</button>
            </div>

          </div>

      </>
    );
  }
  
  export default ItemCount;