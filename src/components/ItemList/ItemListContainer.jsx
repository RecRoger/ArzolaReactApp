import { useEffect, useState } from 'react';
import ItemList from './ItemList.jsx';
import ItemDetailContainer from '../ItemDetail/ItemDetailContainer.jsx';

export const DefaultItems = [
  { id: 1, name: "Budin de vainilla", initial: 1, stock: 10, steps: 1 },
  { id: 2, name: "Galletas", initial: 10, stock: 100, steps: 10 },
  { id: 3, name: "Pie de limon", initial: 1, stock: 5, steps: 1 },
]

export default function ItemListContainer() {
  
  let [items, setItems] = useState([]);
  let [loader, setLoader] = useState(false);
  let [detailIndicator, setDetailIndicator] = useState(false);
  
  const getItems = new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(DefaultItems)
    },2000)
  }, (err)=>{throw err})
  
  
  useEffect(()=> {
    setLoader(true)
    getItems.then((resp)=>{
      setItems(resp)
    })
    .finally(()=> {
      setLoader(false)
    });
  }, [])


  function showDetail() {
    setDetailIndicator(!detailIndicator)
  }
  
  return (
    <>
      <h3>Nuestros Productos</h3>

      { !loader ? 
        <ItemList items={ items }/>
        : <div className="text-center mt-5">
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
      }


      <button className='btn btn-outline-secondary btn-lg my-4' onClick={()=> showDetail()}>Ver Detalle Producto</button>

      {detailIndicator ? 
        <ItemDetailContainer />
      : ''}
    </>
  );
}

  