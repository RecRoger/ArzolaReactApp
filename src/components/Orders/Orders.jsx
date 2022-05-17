
export default function Orders({ orders }) {

  return (
    <div className='container mt-5'>
        { orders?.length ?
          orders.map(order => 
            <div key={'item-'+order.id}>
              <div className="h5">
                Orden {order.id}:
              </div>
              <div  className="row ms-2">
                  <div className="col-12 col-md-6 col-lg-4">
                    <b> Comprador: </b> 
                    <p className="ps-3">
                      <i className="bi bi-person-fill"></i> {order.buyer.name} <br />
                      <i className="bi bi-envelope"></i> {order.buyer.email} <br />
                      <i className="bi bi-phone"></i> {order.buyer.phone}
                    </p>
                  </div>

                  <div className="col-12 col-md-6 col-lg-4">
                    <b> Productos: </b> 
                    <ul>
                      {order.items.map(item=> 
                        <li key={item.id}>
                          {item.name} x{item.count}  
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="col-12 col-md-6 col-lg-4">
                    <b> Detalles: </b> 
                    <p className="ps-3">
                      Orden realizada el dia {order.date.toDate().toLocaleDateString()} 
                      <br />
                      <b>TOTAL:</b> {order.totals.totalPrice}$
                    </p>
                  </div>
                  
              </div>
            </div>
          )
          : <p className="col-10 m-auto card p-3 text-center">No hay resultados</p>
        }
    </div>
  );
}

  