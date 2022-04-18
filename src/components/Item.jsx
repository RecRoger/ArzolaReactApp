// import ItemCount from "./ItemCount";
// import Swal from "sweetalert2";
import { Link } from "react-router-dom";



export default function Item({ item }) {

    // const onAdd = (item, count) => {
    //     Swal.fire({
    //         position: 'bottom-end',
    //         icon: 'success',
    //         title: `${item.name}${count > 1 ? `(x${count})` : ''} añadido a la lista de compras`,
    //         showConfirmButton: false,
    //         timer: 4500,
    //     })
    // }

    return (
        <>
            <div className="card px-3 py-4 w-100 mb-4">
                <h5 className="mb-2">
                    {item.name} {item.steps > 1 ? <span className="count-steps">x{item.steps}</span> : ''}
                </h5>
                <p className="mb-3">
                    {item.categories.map((category, i) => 
                        <Link className="me-2" to={'/category/'+category}>
                        <span key={i} className="badge rounded-pill bg-primary">{category}</span>
                        </Link>
                    )}
                </p>
                <Link to={'/detail/' + item.id} className="mt-auto text-end">
                    <button className="btn btn-link">Ver detalle</button>
                </Link>
                {/* <div className="mt-auto">
                    <ItemCount item={item} onAdd={onAdd}></ItemCount>
                </div> */}
            </div>
        </>
    );
}

