import { useState, useMemo } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import InventoryTopbar from "../../components/inventory/InventoryTopbar";
import InventoryStats from "../../components/inventory/InventoryStats";
import InventoryToolbar from "../../components/inventory/InventoryToolbar";
import ProductGrid from "../../components/inventory/ProductGrid";
import ProductModal from "../../components/inventory/ProductModal";
import Toast from "../../components/inventory/Toast";
import "./Inventory.css";

// Datos de ejemplo — reemplaza con tu llamada a la API
const INITIAL_PRODUCTS = [
  { id_productos:1, nombre:"Leche entera",     categoria:"Perecederos",   precio_unitario:22.5, precio_caja:240, cantidad:45, id_psuministra:"Lala",    fecha_ingreso:"2026-04-01", fecha_caducidad:"2026-04-25" },
  { id_productos:2, nombre:"Arroz Morena 1kg", categoria:"Comestibles",   precio_unitario:28,   precio_caja:310, cantidad:120,id_psuministra:"Diconsa", fecha_ingreso:"2026-03-15", fecha_caducidad:"2027-03-15" },
  { id_productos:3, nombre:"Coca-Cola 600ml",  categoria:"Bebidas",       precio_unitario:18,   precio_caja:200, cantidad:6,  id_psuministra:"FEMSA",   fecha_ingreso:"2026-04-10", fecha_caducidad:"2026-07-10" },
  { id_productos:4, nombre:"Detergente Ariel", categoria:"Limpieza",      precio_unitario:55,   precio_caja:600, cantidad:30, id_psuministra:"P&G",     fecha_ingreso:"2026-03-20", fecha_caducidad:"2027-01-01" },
  { id_productos:5, nombre:"Shampoo Pantene",  categoria:"Higiene personal",precio_unitario:68, precio_caja:720, cantidad:3,  id_psuministra:"P&G",     fecha_ingreso:"2026-03-01", fecha_caducidad:"2027-06-01" },
  { id_productos:6, nombre:"Doritos Nacho",    categoria:"Botanas",       precio_unitario:24,   precio_caja:260, cantidad:50, id_psuministra:"Sabritas", fecha_ingreso:"2026-04-05", fecha_caducidad:"2026-05-05" },
  { id_productos:7, nombre:"Alimento Pedigree",categoria:"Mascotas",      precio_unitario:85,   precio_caja:900, cantidad:18, id_psuministra:"Mars",    fecha_ingreso:"2026-02-01", fecha_caducidad:"2026-12-01" },
];

export default function Inventory() {
  const [products, setProducts]       = useState(INITIAL_PRODUCTS);
  const [search, setSearch]           = useState("");
  const [activeCategory, setCategory] = useState("Todas");
  const [modalOpen, setModalOpen]     = useState(false);
  const [editing, setEditing]         = useState(null);
  const [toast, setToast]             = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filtrado reactivo
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      const matchCat = activeCategory === "Todas" || p.categoria === activeCategory;
      const matchQ   = p.nombre.toLowerCase().includes(q) ||
                       String(p.id_psuministra).toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [products, search, activeCategory]);

  const handleAdd = () => { setEditing(null); setModalOpen(true); };

  const handleEdit = (product) => { setEditing(product); setModalOpen(true); };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id_productos !== id));
    setToast("Producto eliminado");
  };

  const handleSave = (data) => {
    if (data.id_productos) {
      setProducts((prev) =>
        prev.map((p) => p.id_productos === data.id_productos ? data : p)
      );
      setToast("Producto actualizado correctamente");
    } else {
      const newId = Math.max(...products.map(p => p.id_productos)) + 1;
      setProducts((prev) => [...prev, { ...data, id_productos: newId }]);
      setToast("Producto agregado correctamente");
    }
    setModalOpen(false);
  };

  return (
    <div className="dash">
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="inv-main">
        <InventoryTopbar onAdd={handleAdd} />
        <InventoryStats  products={products} />
        <InventoryToolbar
          search={search}           onSearch={setSearch}
          activeCategory={activeCategory} onCategory={setCategory}
        />
        <ProductGrid
          products={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <ProductModal
        open={modalOpen}
        product={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}