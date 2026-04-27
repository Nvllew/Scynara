import { useState, useMemo } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SuppliersTopbar from "../../components/suppliers/SuppliersTopbar";
import SuppliersStats from "../../components/suppliers/SuppliersStats";
import SuppliersToolbar from "../../components/suppliers/SuppliersToolbar";
import SuppliersGrid from "../../components/suppliers/SuppliersGrid";
import SupplierDetailPanel from "../../components/suppliers/SupplierDetailPanel";
import SupplierModal from "../../components/suppliers/SupplierModal";
import Toast from "../../components/inventory/Toast";
import "./Suppliers.css";

const INITIAL_SUPPLIERS = [
  {
    id_S: 1, nombre: "Distribuidora La Paloma", contacto: "Ernesto Vargas",
    correo: "ernesto@lapaloma.com", telefono: "55 2345 6789",
    RFC: "DLP890310ABC", ciudad: "CDMX", direccion: "Av. Central 100",
    categoria: "Abarrotes", estado: "activo", notas: "Entrega martes y viernes",
    productos: [
      { nombre: "Arroz 1kg", precio: 22, stock: 120 },
      { nombre: "Frijol 1kg", precio: 28, stock: 80 },
      { nombre: "Aceite 1L", precio: 35, stock: 60 },
    ],
  },
  {
    id_S: 2, nombre: "Bebidas del Norte", contacto: "Sofía Ríos",
    correo: "sofia@bebnorte.com", telefono: "81 3456 7890",
    RFC: "BDN920505XYZ", ciudad: "Monterrey", direccion: "Blvd. Industrial 45",
    categoria: "Bebidas", estado: "activo", notas: "Pedido mínimo 200 cajas",
    productos: [
      { nombre: "Coca-Cola 600ml", precio: 14, stock: 300 },
      { nombre: "Agua 1.5L", precio: 9, stock: 500 },
    ],
  },
  {
    id_S: 3, nombre: "Lácteos Jalisco", contacto: "Pedro Guzmán",
    correo: "pedro@lacteosjal.mx", telefono: "33 4567 8901",
    RFC: "LJA010120DEF", ciudad: "Guadalajara", direccion: "Calle Lechera 8",
    categoria: "Lácteos", estado: "activo", notas: "",
    productos: [
      { nombre: "Leche entera 1L", precio: 18, stock: 200 },
      { nombre: "Queso Oaxaca 400g", precio: 65, stock: 50 },
    ],
  },
  {
    id_S: 4, nombre: "Limpieza Total S.A.", contacto: "Gabriela Morales",
    correo: "gabriela@limpiezatotal.com", telefono: "442 567 1234",
    RFC: "LTS881230GHI", ciudad: "Querétaro", direccion: "Parque Ind. 22",
    categoria: "Limpieza", estado: "pausado", notas: "En renegociación de precios",
    productos: [
      { nombre: "Detergente Ariel 1kg", precio: 55, stock: 90 },
      { nombre: "Cloro 1L", precio: 18, stock: 150 },
      { nombre: "Jabón de trastes", precio: 22, stock: 110 },
    ],
  },
  {
    id_S: 5, nombre: "Mascotas Express", contacto: "Daniel Torres",
    correo: "daniel@mascotasexpress.mx", telefono: "222 678 9012",
    RFC: "", ciudad: "Puebla", direccion: "",
    categoria: "Mascotas", estado: "activo", notas: "",
    productos: [
      { nombre: "Pedigree adulto 4kg", precio: 210, stock: 30 },
      { nombre: "Whiskas 1kg", precio: 90, stock: 45 },
    ],
  },
];

let counter = 6;

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("nombre");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categorias = [...new Set(suppliers.map(s => s.categoria).filter(Boolean))].sort();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = suppliers.filter(s =>
      (!q || s.nombre.toLowerCase().includes(q) ||
             s.contacto?.toLowerCase().includes(q) ||
             (s.RFC || "").toLowerCase().includes(q)) &&
      (!filterCategoria || s.categoria === filterCategoria)
    );
    if (sort === "nombre")    list = [...list].sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (sort === "productos") list = [...list].sort((a, b) => (b.productos?.length || 0) - (a.productos?.length || 0));
    if (sort === "categoria") list = [...list].sort((a, b) => (a.categoria || "").localeCompare(b.categoria || ""));
    return list;
  }, [suppliers, search, sort, filterCategoria]);

  const selectedSupplier = suppliers.find(s => s.id_S === selectedId) || null;
  const selectedIndex    = selectedSupplier ? suppliers.indexOf(selectedSupplier) : 0;

  const handleEdit = (id) => {
    setEditing(suppliers.find(s => s.id_S === id));
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (data.id_S) {
      setSuppliers(prev => prev.map(s => s.id_S === data.id_S ? { ...s, ...data } : s));
      setToast("Proveedor actualizado");
    } else {
      const newSupplier = { ...data, id_S: counter++, productos: [] };
      setSuppliers(prev => [...prev, newSupplier]);
      setToast("Proveedor agregado correctamente");
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setSuppliers(prev => prev.filter(s => s.id_S !== id));
    if (selectedId === id) setSelectedId(null);
    setToast("Proveedor eliminado");
  };

  return (
    <div className="dash">
      {sidebarOpen && <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="suppliers-main">
        <div className="suppliers-body">
          <div className="suppliers-left">
            <SuppliersTopbar onAdd={() => { setEditing(null); setModalOpen(true); }} />
            <SuppliersStats suppliers={suppliers} />
            <SuppliersToolbar
              search={search} onSearch={setSearch}
              sort={sort} onSort={setSort}
              filterCategoria={filterCategoria} onFilterCategoria={setFilterCategoria}
              categorias={categorias}
              count={filtered.length}
            />
            <SuppliersGrid
              suppliers={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onEdit={handleEdit}
            />
          </div>

          <SupplierDetailPanel
            supplier={selectedSupplier}
            supplierIndex={selectedIndex}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <SupplierModal
        open={modalOpen}
        supplier={editing}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
      />

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}