import logo from '../assets/logo_rorg_yellow.svg';
import CartWidget from './CartWidget';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
    <header className="app-header bg-dark">
        <Link className='me-auto' to={'/'}>
          <img src={logo} className="app-logo" alt="logo" />
        </Link>
    
        <Link to={'/'}>
          <button className="btn btn-secondary me-3">Productos</button>
        </Link>
        <Link to={'/detail'+'/id'}>
          <button className="btn btn-secondary me-3">Detalle</button>
        </Link>
        <button className="btn btn-primary">Iniciar Sesión</button>
    </header>
    <CartWidget></CartWidget>
    </>
  );
}

export default Navbar;
