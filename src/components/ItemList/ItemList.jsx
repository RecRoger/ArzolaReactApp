
import Item from '../Item.jsx';

export default function ItemList({ items }) {

  return (
    <div className='container mt-5'>
      <div className="row">
        { items?.length ?
          items.map(item => 
              <div key={'item-'+item.id} className="col-xs-10 col-sm-6 col-md-4 col-lg-3 d-flex">
                  <Item item={item}></Item>
              </div>)
          : <p className="col-10 m-auto card p-3 text-center">No hay items productos disponibles</p>
        }
      </div>
    </div>
  );
}

  