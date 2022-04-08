import logo from '../assets/logo_rorg_yellow.svg';
import CartWidget from './CartWidget';
import { Link } from "react-router-dom";
import { CATEGORIES } from '../constatns'

function Navbar() {

  const categories = Object.values(CATEGORIES);


  return (
    <>
    <header className="app-header bg-dark">
        <Link className='me-auto' to={'/'}>
          <img src={logo} className="app-logo" alt="logo" />
        </Link>
    
        <Link to={'/'}>
          <button className="btn btn-primary me-3">Productos</button>
        </Link>

        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="categoryMenu" data-bs-toggle="dropdown" aria-expanded="false">
            Categorias
          </button>
          <ul className="dropdown-menu" aria-labelledby="categoryMenu">

            { categories.map((category, i)=> 
              <li key={i}>
                <Link className="dropdown-item" to={'/category/'+category}>
                  {category}
                </Link>
              </li>
            ) }

          </ul>
        </div>
    </header>
    <CartWidget></CartWidget>
    </>
  );
}

export default Navbar;
