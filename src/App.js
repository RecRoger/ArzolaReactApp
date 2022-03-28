import './App.css';
import NavBar from './components/NavBar.js';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <div className="app-content">
        <p>
          Bienvenido a mi projecto ReactJs, poco a poco irá creciendo.
        </p>
        <p>
          Mi nombre es Rogelio Arzola y estaré acompañandolos en este desarrollo :)
        </p>
      </div>
    </div>
  );
}

export default App;
