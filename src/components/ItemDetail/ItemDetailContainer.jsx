import { useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { DefaultItems } from '../../constatns.js';
import ItemDetail from './ItemDetail.jsx';
import { ProductsContext } from '../../Context/Context.jsx';


export const defaultImages = [
    'https://picsum.photos/500/300?random=1',
    'https://picsum.photos/500/300?random=2',
    'https://picsum.photos/500/300?random=3',
    'https://picsum.photos/500/300?random=4',
  ]

  
export default function ItemDetailContainer() {

  const { items }  = useContext(ProductsContext);

  let [item, setItem] = useState(null);
  let [loader, setLoader] = useState(true);

  let { itemId } = useParams()
  
  const getItemData = new Promise((resolve, reject) => {
    
    let item
    if(items?.length) {
      item = items.find(item=> item.id === itemId)
      resolve({...item, images: defaultImages})
    } else {
      item = DefaultItems.find(item=> item.id === itemId)
      setTimeout(()=>{
        resolve({...item, images: defaultImages})
      },2000)
    }

  }, (err)=>{throw err})


  useEffect(()=> {
    setLoader(true)

    getItemData.then((resp)=>{
      setItem(resp)
    })
    .finally(()=>{
      setLoader(false)
    });
  }, [itemId])

  useEffect(()=> {
    if(items?.length && item) {
      const currentStock = items?.find(i=> i.id === item.id).stock
      setItem({...item , stock: currentStock})
    }
  }, [items])

  
  
  return (
    <>
      <div className="app-content">
        <h3>Detalle de producto
        </h3>

        { !loader ? 
          <ItemDetail item={ item } />
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

  