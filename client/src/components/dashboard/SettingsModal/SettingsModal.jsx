import "./SettingsModal.css";
import { useTheme } from "../../../context/ThemeContext";

export default function SettingsModal({ open, onClose }) {
  const { theme, toggleTheme } = useTheme();

  if (!open) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-container">

        {/* Sidebar */}
        <div className="modal-sidebar">
          <button className="active">General</button>
          <button>Notificaciones</button>
          <button>Personalización</button>
          <button>Seguridad</button>
        </div>

        {/* Contenido */}
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header">
            <h2>General</h2>
            <button onClick={onClose}>✕</button>
          </div>

          {/* Sección */}
          <div className="modal-section">
            <h3>Apariencia</h3>

            <div className="row">
              <span>Modo</span>
              <button onClick={toggleTheme}>
                {theme === "dark" ? "Oscuro" : "Claro"}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}