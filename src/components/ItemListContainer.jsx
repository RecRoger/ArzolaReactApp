import ItemCount from './ItemCount.jsx'
import Swal from 'sweetalert2'

export default function ItemListContainer() {


  const onAdd = (itemName, count) => {
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: `${itemName}${count > 1 ? `(x${count})` : '' } añadido al Carrito`,
        showConfirmButton: false,
        timer: 4500,
    })
  }

  return (
    <>
      <h3>Nuestros Servicios</h3>

      <div className="row service-container container mt-3">
        <div className="col-3">
          <ItemCount itemName="Diseño de Logo" initial={0} stock={10} onAdd={onAdd}></ItemCount>
        </div>
        <div className="col-3">
          <ItemCount itemName="Artes para redes" initial={0} stock={100} steps={20} onAdd={onAdd}></ItemCount>
        </div>
        <div className="col-3">
          <ItemCount itemName="Desarrollo de web" initial={0} stock={5} onAdd={onAdd}></ItemCount>
        </div>
      </div>
    </>
  );
}

  