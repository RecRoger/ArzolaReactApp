import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DefaultItems } from '../../constatns.js';
import { ProductsContext } from '../../Context/Context.jsx';
import ItemList from './ItemList.jsx';


export default function ItemListContainer() {
  
  const { items, setItems, reloadIndicator, setReloadIndicator }  = useContext(ProductsContext);
  
  let [shownItems, setShownItems] = useState(false);
  let [loader, setLoader] = useState(false);

  let { category } = useParams()
  
  const getItems = new Promise((resolve, reject) => {
    setTimeout(()=>{
      const responseItems = JSON.parse(JSON.stringify(DefaultItems))
      resolve(responseItems)
    },2000)
  }, (err)=>{throw err})
  

  useEffect(()=> {
    if(reloadIndicator || !items?.length) {
        setLoader(true)
        getItems.then((resp)=>{
          setItems(resp)
          if(category) {
            setShownItems(resp.filter(item=> item.categories.includes(category)))
          } else {
            setShownItems(resp)
          }
        })
        .finally(()=> {
          setReloadIndicator(false)
          setLoader(false)
        });
    } else {
      if(category) {
          setShownItems(items.filter(item=> item.categories.includes(category)))
        } else {
          setShownItems(items)
        }
    }
  }, [category, reloadIndicator])
  
  return (
    <>
      <div className="app-content">
        <h3>
          {category ? '' : 'Todos '}
          Nuestros Productos
          {category ? `: ${category}` : ''}
        </h3>

        { !loader ? 
          <ItemList items={ shownItems }/>
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

  