import ItemCount from "./ItemCount";
import Swal from "sweetalert2";

export default function Item({ item}) {

    const onAdd = (item, count) => {
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: `${item.name}${count > 1 ? `(x${count})` : '' } añadido a la lista de compras`,
            showConfirmButton: false,
            timer: 4500,
        })
      }

    return (
        <>
            <div className="card px-3 py-4 w-100">
                <h5 className="mb-4">
                    {item.name} { item.steps ? <span className="count-item.steps">x{item.steps}</span> : ''}
                </h5>
                <div className="mt-auto">
                    <ItemCount item={item} onAdd={onAdd}></ItemCount>
                </div>
            </div>
        </>
    );
}

  