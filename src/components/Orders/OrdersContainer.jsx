import { useState } from 'react';
import CartWidget from '../Cart/CartWidget'
import Orders from './Orders'
import {doc, getDoc, collection, getDocs, getFirestore, query, where} from 'firebase/firestore'


export default function OrdersContainer() {
  
  let [orderInput, setOrderInput] = useState('');
  let [filterInput, setFilterInput] = useState('');
  
  let [orders, setOrders] = useState(null);
  let [loader, setLoader] = useState(false);
  
  const getOrders = async () => {
    if(!!orderInput || !!filterInput) {
      setLoader(true)
      const db = getFirestore();
      try {
        let serverOrders
        if(!!orderInput) {
          const db = getFirestore();
          const orderDocument = doc(db, "orders", orderInput)
          const snapshot = await getDoc(orderDocument)
          serverOrders = []
          if(snapshot?.data()) {
            serverOrders.push({
              ...snapshot.data(), 
              id: snapshot.id,
            })
          } 
        } 
        if(!orderInput || !serverOrders.length){
          const ordersCollection = query(collection(db, "orders"), where('buyer.email', '==', filterInput));
          const snapshot = await getDocs(ordersCollection)
          serverOrders = snapshot.docs.map(order=> ({...order.data(), id: order.id}))
        }
        setOrders(serverOrders)
      } catch(e) {
        setOrders([])
        throw e
      } finally {
        setLoader(false)
      }
    }
  }
 
  return (
    <>
      <CartWidget />
      <div className="app-content">
        <div className='container app-title'>
          <h3 >
            Revisar Ordenes
          </h3>
        </div>
        <div className='container order-form mt-3'>
          <div className="form-floating ms-2 my-2">
            <input type="string" className="form-control" id="orderInput" placeholder="Código de orden" 
              value={orderInput} onChange={(e)=> {setOrderInput(e.currentTarget.value)}}></input>
            <label htmlFor="orderInput">Código de orden</label>
          </div>
          <div className="form-floating ms-2 my-2">
            <input type="string" className="form-control" id="filterInput" placeholder="Email"
              value={filterInput} onChange={(e)=> {setFilterInput(e.currentTarget.value)}}></input>
            <label htmlFor="filterInput">Email</label>
          </div>
          <div className='ms-2'>
            <button className='btn btn-dark' onClick={()=>{getOrders()}}> Buscar </button>
          </div>
        </div>

        { !loader ? 
          orders && <>
            <Orders orders={orders}> </Orders>
          </>
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

  