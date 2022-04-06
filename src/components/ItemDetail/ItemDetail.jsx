import { useEffect, useState } from 'react';


export default function ItemDetail({ item }) {

  let [discountPrice, setDiscountPrice] = useState([]);

  useEffect(()=> {
    if(item.discount) {
      setDiscountPrice(item.price * (1 - (item.discount/100)))
    }
    console.log(item.images)
  }, [item])

  return (
    <> { item ? 
      <div className="d-flex detail-container">
        <div className="image-container">
          
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
          
        </div>

        <div className="px-5">
          <h4>{item.name}</h4>
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