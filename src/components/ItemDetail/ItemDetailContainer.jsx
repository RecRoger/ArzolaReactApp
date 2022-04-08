import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DefaultItems } from '../../constatns.js';
import ItemDetail from './ItemDetail.jsx';

export const defaultImages = [
    'https://picsum.photos/500/300?random=1',
    'https://picsum.photos/500/300?random=2',
    'https://picsum.photos/500/300?random=3',
    'https://picsum.photos/500/300?random=4',
  ]

export default function ItemDetailContainer() {
  
  let [item, setItem] = useState(null);
  let [loader, setLoader] = useState(true);

  let { itemId } = useParams()
  
  const getItemData = new Promise((resolve, reject) => {
    const item = DefaultItems.find(item=> item.id === itemId)
    setTimeout(()=>{
      resolve({...item, images: defaultImages})
    },2000)
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
  
  return (
    <>
      <div className="app-content">
        <h3>Detalle de producto</h3>

        { !loader ? 
          <ItemDetail item={ item }/>
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

  