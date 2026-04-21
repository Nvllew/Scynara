import { useState, useEffect } from "react";

const CATEGORIES = [
  "Comestibles","Perecederos","Bebidas",
  "Limpieza","Higiene personal","Botanas","Mascotas",
];

const EMPTY = {
  nombre: "", categoria: "", precio_unitario: "",
  precio_caja: "", cantidad: "", id_psuministra: "",
  fecha_ingreso: "", fecha_caducidad: "",
};

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" width="15" height="15">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function ProductModal({ open, product, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(product ? {
      nombre:          product.nombre          || "",
      categoria:       product.categoria       || "",
      precio_unitario: product.precio_unitario || "",
      precio_caja:     product.precio_caja     || "",
      cantidad:        product.cantidad        || "",
      id_psuministra:  product.id_psuministra  || "",
      fecha_ingreso:   product.fecha_ingreso   || "",
      fecha_caducidad: product.fecha_caducidad || "",
    } : EMPTY);
  }, [product, open]);

  if (!open) return null;

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    if (!form.nombre || !form.categoria) return;
    onSave({
      ...product,
      ...form,
      precio_unitario: parseFloat(form.precio_unitario) || 0,
      precio_caja:     parseFloat(form.precio_caja)     || 0,
      cantidad:        parseInt(form.cantidad)           || 0,
    });
  };

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal">
        <div className="modal-header">
          <h2>{product ? "Editar producto" : "Agregar producto"}</h2>
          <button className="modal-close" onClick={onClose}><IconClose /></button>
        </div>

        <div className="m-row">
          <div className="m-field">
            <label>Nombre</label>
            <input className="m-input" type="text" placeholder="Ej: Leche entera"
              value={form.nombre} onChange={set("nombre")} />
          </div>
          <div className="m-field">
            <label>Categoría</label>
            <select className="m-input" value={form.categoria} onChange={set("categoria")}>
              <option value="">Selecciona...</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="m-row">
          <div className="m-field">
            <label>Precio unitario</label>
            <input className="m-input" type="number" placeholder="0.00" min="0" step="0.01"
              value={form.precio_unitario} onChange={set("precio_unitario")} />
          </div>
          <div className="m-field">
            <label>Precio por caja</label>
            <input className="m-input" type="number" placeholder="0.00" min="0" step="0.01"
              value={form.precio_caja} onChange={set("precio_caja")} />
          </div>
        </div>

        <div className="m-row">
          <div className="m-field">
            <label>Cantidad en stock</label>
            <input className="m-input" type="number" placeholder="0" min="0"
              value={form.cantidad} onChange={set("cantidad")} />
          </div>
          <div className="m-field">
            <label>Proveedor (ID)</label>
            <input className="m-input" type="text" placeholder="ID o nombre del proveedor"
              value={form.id_psuministra} onChange={set("id_psuministra")} />
          </div>
        </div>

        <div className="m-row">
          <div className="m-field">
            <label>Fecha de ingreso</label>
            <input className="m-input" type="date"
              value={form.fecha_ingreso} onChange={set("fecha_ingreso")} />
          </div>
          <div className="m-field">
            <label>Fecha de caducidad</label>
            <input className="m-input" type="date"
              value={form.fecha_caducidad} onChange={set("fecha_caducidad")} />
          </div>
        </div>

        <div className="modal-footer">
          <button className="m-btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="m-btn-save" onClick={handleSave}>Guardar producto</button>
        </div>
      </div>
    </div>
  );
}