import logo from '../assets/logo_rorg_yellow.svg';
import CartWidget from './CartWidget';

function NavBar() {
  return (
    <>
    <header className="app-header bg-dark">
        <img src={logo} className="app-logo me-auto" alt="logo" />
        <button className="btn btn-secondary me-3">Servicios</button>
        <button className="btn btn-secondary me-3">Nosotros</button>
        <button className="btn btn-primary">Iniciar Sesión</button>
    </header>
    <CartWidget></CartWidget>
    </>
  );
}

export default NavBar;
