function CartWidget() {
  return (
    <>
        <div className="main-cart">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="cartButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-cart"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="cartButton">
                <li> No hay productos seleccionado</li>
            </ul>
        </div>
    </>
  );
}

export default CartWidget;
