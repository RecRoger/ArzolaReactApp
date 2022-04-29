import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../Context/Context.jsx';
import ItemList from './ItemList.jsx';
import CartWidget from '../../components/Cart/CartWidget'

export default function ItemListContainer() {
  
  const { getItems, reloadIndicator, setReloadIndicator }  = useContext(ProductsContext);
  
  let [shownItems, setShownItems] = useState(false);
  let [loader, setLoader] = useState(false);

  let { category } = useParams()  

  useEffect(()=> {
    setLoader(true)

    getItems(category).then((resp)=>{
      setShownItems(resp)
    }, (reject)=> {
      setShownItems([])
    })
    .finally(()=> {
      setReloadIndicator(false)
      setLoader(false)
    });
  }, [category, reloadIndicator])
  
  return (
    <>
      <CartWidget />
      <div className="app-content">
        <div className='container app-title'>
          <h3 >
            {category ? '' : 'Todos '}
            Nuestros Productos
            {category ? `: ${category}` : ''}
          </h3>
        </div>

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

  