import { Link } from "react-router-dom";
import {useContext} from 'react'
import { CartContext } from '../Context/Context';


export default function Item({ item }) {
const { isInCart }  = useContext(CartContext);
    return (
        <>
            <div className="card px-3 py-4 w-100 mb-4 position-relative">
                { isInCart(item.id) ? 
                    <h4 className="item-cart-count">
                        <span className="badge rounded-pill bg-info">
                            <i className="bi bi-cart"></i> { isInCart(item.id) }
                        </span> 
                    </h4>: ''
                }
                <h5 className="mb-2">
                    {item.name} {item.steps > 1 ? <span className="count-steps">x{item.steps}</span> : ''}
                </h5>
                {
                    item.stock === 0 ? 
                    <div className="no-stock">
                        <div className="no-stock--label bg-danger">
                            Agotado!
                        </div>
                    </div>
                    : ''
                }
                <p className="mb-3">
                    {item.categories.map((category, i) => 
                        <Link key={i} className="me-2" to={'/category/'+category}>
                            <span className="badge rounded-pill bg-primary">{category}</span>
                        </Link>
                    )}
                </p>
                <Link to={'/detail/' + item.id} className="mt-auto text-end">
                    <button className="btn btn-link">Ver detalle</button>
                </Link>
            </div>
        </>
    );
}

