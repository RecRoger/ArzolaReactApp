import ItemCount from "./ItemCount";
import Swal from "sweetalert2";

export default function Item({ item}) {

    const onAdd = (item, count) => {
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: `${item.name}${count > 1 ? `(x${count})` : '' } añadido al Carrito`,
            showConfirmButton: false,
            timer: 4500,
        })
      }

    return (
        <>
            <div className="card px-3 py-4 d-flex">
                <h5>
                    {item.name} { item.steps ? <span className="count-item.steps">x{item.steps}</span> : ''}
                </h5>
                <p className="mb-4">{item.detail}</p>
                <div className="mt-auto">
                    <ItemCount item={item} onAdd={onAdd}></ItemCount>
                </div>
            </div>
        </>
    );
}

  