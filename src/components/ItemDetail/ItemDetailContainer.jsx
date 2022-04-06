import { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail.jsx';

export const DetailData = {
  name: 'Chocotorta',
  description: 'Deliciosa torta creada con crema de chocolate, dulce de leche y galletas de vainilla',
  images: [
    'https://www.recetasderechupete.com/wp-content/uploads/2021/03/Chocotorta.jpg',
    'https://www.rionegro.com.ar/wp-content/uploads/2021/06/choccc-1.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUy5D6brjLH8Xy_V8YzwYplAH8g1twsYl5g&usqp=CAU',
    'https://okdiario.com/img/2018/05/14/chocotorta-argentina-655x368.jpg',
  ],
  price: 1300,
  discount: 10,
  creationTime: 3,
  stock: 22,
  step: 1,
  initial: 1
}

export default function ItemDetailContainer() {
  
  let [item, setItem] = useState(null);
  let [loader, setLoader] = useState(true);
  
  const getItemData = new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(DetailData)
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
  }, [])
  
  return (
    <>
      <h3 className='mt-3'>Detalle de producto</h3>

      { !loader ? 
        <ItemDetail item={ item }/>
        : <div className="text-center mt-5">
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
      }
    </>
  );
}

  