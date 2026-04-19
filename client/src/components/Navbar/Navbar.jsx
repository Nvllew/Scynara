import { useState } from "react";
import "./Navbar.css";

const links = [
  { name: "Inicio", id: "inicio" },
  { name: "Características", id: "Características" },
  { name: "¿Cómo funciona?", id: "¿Cómo funciona?" },
  { name: "Testimonios", id: "Testimonios" },
];  

export default function Navbar() {
  const [active, setActive] = useState("Inicio");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id, name) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActive(name);
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-content">

        <h2 className="logo">SCYNARA</h2>

        {/* Links escritorio */}
        <ul className="nav-links">
          {links.map((link) => (
            <li
              key={link.name}
              className={active === link.name ? "active" : ""}
              onClick={() => handleScroll(link.id, link.name)}
            >
              {link.name}
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="btn-login">Iniciar sesión</button>
          <button className="btn-register">Registrarse</button>

          {/* Hamburguesa */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {links.map((link) => (
              <button
                key={link.name}
                className={`mobile-link ${active === link.name ? "active" : ""}`}
                onClick={() => handleScroll(link.id, link.name)}
              >
                {link.name}
              </button>
            ))}
            <div className="mobile-divider" />
            <button className="btn-login-mobile">Iniciar sesión</button>
            <button className="btn-register-mobile">Registrarse</button>
          </div>
        )}

      </div>
    </nav>
  );
}