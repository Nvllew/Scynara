import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-content">

        <h2 className="logo">SCYNARA</h2>

        <ul className="nav-links">
          <li>Inicio</li>
          <li>Inventario</li>
          <li>Ventas</li>
          <li>Proveedores</li>
        </ul>

        <button className="btn-login">Iniciar sesión</button>

      </div>
    </nav>
  );
}