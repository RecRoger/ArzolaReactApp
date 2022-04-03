
import Item from '../Item.jsx';

export default function ItemList({ items }) {

  return (
    <>
      <div className="row service-container mt-3">
        {items.map(item => 
            <div key={'item-'+item.id} className="col-3 d-flex">
                <Item item={item}></Item>
            </div>
        )}
      </div>
    </>
  );
}

  