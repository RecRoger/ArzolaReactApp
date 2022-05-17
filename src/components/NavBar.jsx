import logo from '../assets/logo_rorg_yellow.svg';
import { Link } from "react-router-dom";
import { CATEGORIES } from '../constatns'

function Navbar() {

  const categories = Object.values(CATEGORIES);

  return (
    <>
    <header className="app-header bg-dark">
        <nav className="navbar navbar-expand-lg navbar-dark w-100">
          <div className="container-fluid d-flex">
            <Link className='navbar-brand me-auto' to={'/'}>
              <img src={logo} className="app-logo" alt="logo" />
            </Link>
            
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav text-end ms-auto">
                <li className="nav-item py-2 px-md-2">
                  <Link to={'/'}>
                    <button className="btn btn-light">Productos</button>
                  </Link>
                </li>
                <li className="nav-item py-2 px-md-2">
                  <div className="dropdown">
                    <button className="btn btn-outline-light dropdown-toggle" type="button" id="categoryMenu" data-bs-toggle="dropdown" aria-expanded="false">
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
                </li>
                <li className="nav-item py-2 px-md-2">
                  <Link to={'/orders'}>
                    <button className="btn btn-secondary">Consultar orden</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

    </header>

    </>
  );
}

export default Navbar;
