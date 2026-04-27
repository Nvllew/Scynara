import { useState, useEffect } from "react";

const COLORS = [
  { bg: "rgba(139,92,246,0.15)", color: "#a78bfa" },
  { bg: "rgba(52,211,153,0.15)",  color: "#34d399" },
  { bg: "rgba(96,165,250,0.15)",  color: "#60a5fa" },
  { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24" },
];

const EMPTY = {
  nombre: "", apellidos: "", correo: "", telefono: "", direccion: "",
  horario_entrada: "09:00", horario_salida: "17:00",
  tipo_jornada: "5", estado: "Activo", contrasena: "",
};

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" width="13" height="13">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6"  y1="6" x2="18" y2="18"/>
  </svg>
);

export default function EmployeeModal({
  open, employee, employeeIndex,
  isAdmin, isOwnProfile,
  onClose, onSave,
}) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(employee ? {
      nombre:           employee.nombre           || "",
      apellidos:        employee.apellidos         || "",
      correo:           employee.correo            || "",
      telefono:         employee.telefono          || "",
      direccion:        employee.direccion         || "",
      horario_entrada:  employee.horario_entrada   || "09:00",
      horario_salida:   employee.horario_salida    || "17:00",
      tipo_jornada:     employee.tipo_jornada      || "5",
      estado:           employee.estado            || "Activo",
      contrasena:       "",
    } : EMPTY);
  }, [employee, open]);

  if (!open) return null;

  const set = field => e => setForm(p => ({ ...p, [field]: e.target.value }));

  const handleSave = () => {
    if (!form.nombre || !form.apellidos) return;
    onSave({ ...employee, ...form });
  };

  const handleOverlay = e => { if (e.target === e.currentTarget) onClose(); };

  const col      = COLORS[(employeeIndex || 0) % COLORS.length];
  const initials = employee
    ? (employee.nombre[0] + (employee.apellidos[0] || "")).toUpperCase()
    : "";

  // Empleado solo puede editar datos personales, no laborales
  const laboralDisabled = !isAdmin;

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal">
        <div className="modal-header">
          <h2>{isOwnProfile ? "Editar mi perfil" : employee ? "Editar empleado" : "Agregar empleado"}</h2>
          <button className="modal-close" onClick={onClose}><IconClose /></button>
        </div>

        {/* Avatar header si es edición */}
        {employee && (
          <div className="modal-avatar-row">
            <div className="modal-avatar" style={{ background: col.bg, color: col.color }}>
              {initials}
            </div>
            <div className="modal-av-info">
              <p>{employee.nombre} {employee.apellidos}</p>
              <span>{employee.numero} · {employee.correo}</span>
            </div>
          </div>
        )}

        <div className="modal-body">
          {/* Datos personales */}
          <div className="m-row2">
            <div className="m-field">
              <label>Nombre(s)</label>
              <input className="m-input" placeholder="Juan"
                value={form.nombre} onChange={set("nombre")} />
            </div>
            <div className="m-field">
              <label>Apellidos</label>
              <input className="m-input" placeholder="García López"
                value={form.apellidos} onChange={set("apellidos")} />
            </div>
          </div>

          <div className="m-field">
            <label>Correo electrónico</label>
            <input className="m-input" type="email" placeholder="juan@scynara.com"
              value={form.correo} onChange={set("correo")} />
          </div>

          <div className="m-row2">
            <div className="m-field">
              <label>Teléfono</label>
              <input className="m-input" type="tel" placeholder="55 1234 5678"
                value={form.telefono} onChange={set("telefono")} />
            </div>
            <div className="m-field">
              <label>Dirección</label>
              <input className="m-input" placeholder="Calle, colonia, ciudad"
                value={form.direccion} onChange={set("direccion")} />
            </div>
          </div>

          <div className="m-divider" />
          <div className="m-section">Datos laborales</div>

          <div className="m-row2">
            <div className="m-field">
              <label>Horario entrada</label>
              <input className="m-input" type="time"
                value={form.horario_entrada} onChange={set("horario_entrada")}
                disabled={laboralDisabled} />
            </div>
            <div className="m-field">
              <label>Horario salida</label>
              <input className="m-input" type="time"
                value={form.horario_salida} onChange={set("horario_salida")}
                disabled={laboralDisabled} />
            </div>
          </div>

          <div className="m-row2">
            <div className="m-field">
              <label>Tipo de jornada</label>
              <select className="m-input" value={form.tipo_jornada}
                onChange={set("tipo_jornada")} disabled={laboralDisabled}>
                <option value="5">5 días</option>
                <option value="3">3 días</option>
              </select>
              {laboralDisabled && (
                <span className="readonly-note">Solo el administrador puede modificar esto</span>
              )}
            </div>
            <div className="m-field">
              <label>Estado</label>
              <select className="m-input" value={form.estado}
                onChange={set("estado")} disabled={laboralDisabled}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
          </div>

          {/* Contraseña solo para perfil propio o creación */}
          {(isOwnProfile || !employee) && (
            <div className="m-field">
              <label>{employee ? "Nueva contraseña (opcional)" : "Contraseña"}</label>
              <input className="m-input" type="password"
                placeholder="Mínimo 8 caracteres"
                value={form.contrasena} onChange={set("contrasena")} />
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="m-btn-cancel" onClick={onClose}>Cancelar</button>
          <button
            className="m-btn-save"
            onClick={handleSave}
            disabled={!form.nombre || !form.apellidos}
            style={{ opacity: form.nombre && form.apellidos ? 1 : 0.5 }}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}