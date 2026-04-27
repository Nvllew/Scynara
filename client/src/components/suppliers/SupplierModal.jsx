import { useState, useEffect } from "react";
import { X } from "lucide-react";

const EMPTY = {
  nombre: "", contacto: "", correo: "", telefono: "",
  RFC: "", ciudad: "", direccion: "", categoria: "",
  estado: "activo", notas: "",
};

const CATEGORIAS = [
  "Abarrotes", "Bebidas", "Lácteos", "Carnes", "Limpieza",
  "Higiene personal", "Mascotas", "Electrónica", "Otros",
];

export default function SupplierModal({ open, supplier, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(supplier ? { ...EMPTY, ...supplier } : EMPTY);
  }, [supplier, open]);

  if (!open) return null;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.nombre.trim()) return;
    onSave(form);
  };

  return (
    <div className="sup-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sup-modal">
        <div className="sup-modal-header">
          <h2>{supplier ? "Editar proveedor" : "Nuevo proveedor"}</h2>
          <button className="sup-modal-close" onClick={onClose}><X size={14} /></button>
        </div>

        <div className="sup-modal-body">
          <div className="sup-section-sep">Datos generales</div>

          <div className="sup-row2">
            <div className="sup-field">
              <label>Nombre empresa *</label>
              <input className="sup-input" placeholder="Distribuidora XYZ" value={form.nombre} onChange={e => set("nombre", e.target.value)} />
            </div>
            <div className="sup-field">
              <label>Nombre contacto</label>
              <input className="sup-input" placeholder="Juan Pérez" value={form.contacto} onChange={e => set("contacto", e.target.value)} />
            </div>
          </div>

          <div className="sup-row2">
            <div className="sup-field">
              <label>Correo <span className="sup-optional">(opcional)</span></label>
              <input className="sup-input" type="email" placeholder="contacto@empresa.com" value={form.correo} onChange={e => set("correo", e.target.value)} />
            </div>
            <div className="sup-field">
              <label>Teléfono <span className="sup-optional">(opcional)</span></label>
              <input className="sup-input" placeholder="55 1234 5678" value={form.telefono} onChange={e => set("telefono", e.target.value)} />
            </div>
          </div>

          <div className="sup-row3">
            <div className="sup-field">
              <label>RFC <span className="sup-optional">(opcional)</span></label>
              <input className="sup-input" placeholder="XAXX010101000" value={form.RFC} onChange={e => set("RFC", e.target.value)} />
            </div>
            <div className="sup-field">
              <label>Categoría</label>
              <select className="sup-select" value={form.categoria} onChange={e => set("categoria", e.target.value)}>
                <option value="">Seleccionar</option>
                {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="sup-field">
              <label>Estado</label>
              <select className="sup-select" value={form.estado} onChange={e => set("estado", e.target.value)}>
                <option value="activo">Activo</option>
                <option value="pausado">Pausado</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="sup-section-sep">Ubicación</div>

          <div className="sup-row2">
            <div className="sup-field">
              <label>Ciudad</label>
              <input className="sup-input" placeholder="Ciudad de México" value={form.ciudad} onChange={e => set("ciudad", e.target.value)} />
            </div>
            <div className="sup-field">
              <label>Dirección <span className="sup-optional">(opcional)</span></label>
              <input className="sup-input" placeholder="Calle, No., Col." value={form.direccion} onChange={e => set("direccion", e.target.value)} />
            </div>
          </div>

          <div className="sup-field">
            <label>Notas <span className="sup-optional">(opcional)</span></label>
            <textarea className="sup-textarea" placeholder="Condiciones de pago, días de entrega, etc." value={form.notas} onChange={e => set("notas", e.target.value)} />
            <span className="sup-hint">Información interna sobre este proveedor</span>
          </div>
        </div>

        <div className="sup-modal-footer">
          <button className="sup-btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="sup-btn-save" onClick={handleSave}>
            {supplier ? "Guardar cambios" : "Agregar proveedor"}
          </button>
        </div>
      </div>
    </div>
  );
}