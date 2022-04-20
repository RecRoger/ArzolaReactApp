import { useEffect, useState, useContext} from 'react';
import ItemCount from '../ItemCount';
import { Link } from "react-router-dom";
import { CartContext } from '../../Context/Context';

export default function ItemDetail({ item }) {

  const { isInCart }  = useContext(CartContext);
  let [discountPrice, setDiscountPrice] = useState([]);

  useEffect(()=> {
    if(item.discount) {
      setDiscountPrice(item.price * (1 - (item.discount/100)))
    }
  }, [item])

  return (
    <> { item ? 
      <div className="detail-container">
        <div className="image-container">
          ------------------------------ IMAGENES DE PRUEBA!! -----------------------------------
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {item.images.map((image, index )=> 
                <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : ''} aria-label={"Slide "+ (index +1 )}></button>
              )}
            </div>
            <div className="carousel-inner">
              {item.images.map((image, index )=>
                <div key={index} className={'carousel-item ' + (index === 0 ? 'active' : '')}>
                  <img src={image} className=" d-block w-100" alt={'image-'+index}></img>
                </div>
              )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          ------------------------------ IMAGENES DE PRUEBA!! -----------------------------------
        </div>

        <div className="px-5 detail-info">
          <h4>{item.name} 
          {
            item.steps>1 ?
            <span className='detail-steps'> (x{item.steps} unidades)</span> : ''
          }
          { isInCart(item.id) ?
            <span className="ms-2 badge rounded-pill bg-info">
                <i className="bi bi-cart"></i> x{ isInCart(item.id) }
            </span> : ''
          }
          </h4> 
          <p className="mb-3">
              {item.categories.map((category, i) => 
                <Link key={i} className="me-2" to={'/category/'+category}>
                  <span className="badge rounded-pill bg-primary">{category}</span>
                </Link>
              )}
          </p>

          <p className="item-price">
            <span className={item.discount ? 'discounted total-price' : 'total-price'}>${item.price}</span>
            {item.discount ? 
              <>
                <span className="discount-rate ms-2">{item.discount}% off</span> 
                <br />
                <span className="new-price">${discountPrice}</span>
              </>
              : ''
            }
          </p>
          <p>{item.description}</p>
          <p><b>Tiempo de fabricacion:</b> {item.creationTime} dias.</p>
          <p><b>Disponibles en stock:</b> {item.stock} elementos</p>
          {item.steps > 1 ? 
            <p><b>Cantidad de compra:</b> {item.steps}</p> : ''
          }

          <div className="mt-auto d-flex ms-auto">
              <ItemCount item={item}></ItemCount>
          </div>
        </div>
      </div>
      : ''
    }
    </>
  );
}


// images: [],
// creationTime: 3,
// stock: 22,
// step: 1,
// initial: 1