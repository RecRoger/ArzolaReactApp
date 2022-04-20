
import Item from '../Item.jsx';

export default function ItemList({ items }) {

  return (
    <>
      <div className="row container mt-5 mx-auto">
        { items?.length ?
          items.map(item => 
              <div key={'item-'+item.id} className="col-3 d-flex">
                  <Item item={item}></Item>
              </div>)
          : <p className="col-10 m-auto card p-3 text-center">No hay items productos disponibles</p>
        }
      </div>
    </>
  );
}

  