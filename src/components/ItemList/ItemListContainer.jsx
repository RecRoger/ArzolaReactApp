import { useEffect, useState } from 'react';
import ItemList from './ItemList.jsx';

export const DefaultItems = [
  { id: 1, name: "Diseño de logo", detail: "Diseña un logo unico para tu negocio", initial: 1, stock: 10, steps: 1 },
  { id: 2, name: "Artes para redes", detail: "Manten actulizada tus redes sociales con los mejores estilos", initial: 10, stock: 100, steps: 10 },
  { id: 3, name: "Desarrollo de web", detail: "Lleva tu negocio al siguiente nivel digital", initial: 1, stock: 5, steps: 1 },
]

export default function ItemListContainer() {
  
  let [items, setItems] = useState([]);
  
  const getItems = new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(DefaultItems)
    },2000)
  }, (err)=>{throw err})


  useEffect(()=> {
    getItems.then((resp)=>{
      setItems(resp)
    });
  }, [])
  
  return (
    <>
      <h3>Nuestros Servicios</h3>

      { items?.length ? 
        <ItemList items={ items }/>
        : <div className="text-center mt-5">
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
      }
    </>
  );
}

  