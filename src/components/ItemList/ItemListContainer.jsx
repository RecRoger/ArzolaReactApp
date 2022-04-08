import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DefaultItems } from '../../constatns.js';
import ItemList from './ItemList.jsx';


export default function ItemListContainer() {
  
  let [items, setItems] = useState([]);
  let [loader, setLoader] = useState(false);

  let { category } = useParams()
  
  const getItems = new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(DefaultItems)
    },2000)
  }, (err)=>{throw err})
  

  useEffect(()=> {
    setLoader(true)
    getItems.then((resp)=>{
      if(category) {
        setItems(resp.filter(item=> item.categories.includes(category)))
      } else {
        setItems(resp)
      }
    })
    .finally(()=> {
      setLoader(false)
    });
  }, [category])
  
  return (
    <>
      <div className="app-content">
        <h3>
          {category ? '' : 'Todos '}
          Nuestros Productos
          {category ? `: ${category}` : ''}
        </h3>

        { !loader ? 
          <ItemList items={ items }/>
          : <div className="text-center mt-5">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
        }

      </div>
    </>
  );
}

  