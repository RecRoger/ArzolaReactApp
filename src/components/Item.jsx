import ItemCount from "./ItemCount";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



export default function Item({ item}) {

    const onAdd = (item, count) => {
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: `${item.name}${count > 1 ? `(x${count})` : '' } añadido a la lista de compras`,
            showConfirmButton: false,
            timer: 4500,
        })
      }

    return (
        <>
            <div className="card px-3 py-4 w-100 mb-4">
                <h5 className="mb-2">
                    {item.name} { item.steps ? <span className="count-item.steps">x{item.steps}</span> : ''}
                </h5>
                <p className="mb-1">
                    {item.categories.map((category, i) =>  <span key={i}>{category} {i+1 !== item.categories.length ? ', ': ''}</span>  )}
                </p>
                <Link to={'/detail/' + item.id} className="mb-3">
                    <button className="btn btn-link">Ver mas</button>
                </Link>
                <div className="mt-auto">
                    <ItemCount item={item} onAdd={onAdd}></ItemCount>
                </div>
            </div>
        </>
    );
}

  