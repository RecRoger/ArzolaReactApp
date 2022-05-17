import { useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail.jsx';
import { ProductsContext } from '../../Context/Context.jsx';
import {doc, getDoc, getFirestore} from 'firebase/firestore'
import CartWidget from '../../components/Cart/CartWidget'
      

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
  
  const getItemData = async (itemId) => {
    const db = getFirestore();
    const itemDocument = doc(db, "products", itemId)
    try {
      const snapshot = await getDoc(itemDocument)
      if(snapshot?.data()) {
        const detailedItem = ({
          ...snapshot.data(), 
          id: snapshot.id,
          images: defaultImages
        })
        return detailedItem
      } else {
        return null
      }

    } catch(e) {
      throw e
    }

  }


  useEffect(()=> {
    setLoader(true)

    getItemData(itemId).then((resp)=>{
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
      <CartWidget />
      <div className="app-content">  
        <div className='container app-title'>
          <h3>Detalle de producto</h3>
        </div>
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

  