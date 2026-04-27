import { useState, useMemo } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import RoleBanner from "../../components/employees/RoleBanner";
import EmployeesTopbar from "../../components/employees/EmployeesTopbar";
import EmployeesStats from "../../components/employees/EmployeesStats";
import EmployeesToolbar from "../../components/employees/EmployeesToolbar";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeModal from "../../components/employees/EmployeeModal";
import SalesPagination from "../../components/sales/SalesPagination";
import Toast from "../../components/inventory/Toast";
import { useAuth } from "../../context/AuthContext";
import "./Employees.css";

const INITIAL_EMPLOYEES = [
  {
    id_usuario: 1,
    numero: "E-001",
    nombre: "Niv",
    apellidos: "García López",
    correo: "niv@scynara.com",
    telefono: "55 1234 5678",
    direccion: "Calle Roble 12, CDMX",
    horario_entrada: "09:00",
    horario_salida: "17:00",
    tipo_jornada: "5",
    estado: "Activo",
    fecha_registro: "2025-01-15",
  },
  {
    id_usuario: 2,
    numero: "E-002",
    nombre: "Laura",
    apellidos: "Vázquez Ríos",
    correo: "laura@scynara.com",
    telefono: "477 234 5678",
    direccion: "Col. La Paloma, León",
    horario_entrada: "08:00",
    horario_salida: "14:00",
    tipo_jornada: "3",
    estado: "Activo",
    fecha_registro: "2025-03-01",
  },
  {
    id_usuario: 3,
    numero: "E-003",
    nombre: "Carlos",
    apellidos: "Flores Herrera",
    correo: "carlos@scynara.com",
    telefono: "442 567 8901",
    direccion: "Fracc. El Roble, Querétaro",
    horario_entrada: "14:00",
    horario_salida: "22:00",
    tipo_jornada: "5",
    estado: "Inactivo",
    fecha_registro: "2025-02-10",
  },
  {
    id_usuario: 4,
    numero: "E-004",
    nombre: "Ana",
    apellidos: "Gutiérrez Pérez",
    correo: "ana@scynara.com",
    telefono: "33 9876 5432",
    direccion: "Calle Pino 88, Guadalajara",
    horario_entrada: "09:00",
    horario_salida: "15:00",
    tipo_jornada: "3",
    estado: "Activo",
    fecha_registro: "2025-04-05",
  },
  {
    id_usuario: 5,
    numero: "E-005",
    nombre: "Roberto",
    apellidos: "Mendoza Soto",
    correo: "roberto@scynara.com",
    telefono: "222 345 6789",
    direccion: "Blvd. Hermanos 34, Puebla",
    horario_entrada: "11:00",
    horario_salida: "19:00",
    tipo_jornada: "5",
    estado: "Baja",
    fecha_registro: "2024-11-20",
  },
  {
    id_usuario: 6,
    numero: "E-006",
    nombre: "Sofía",
    apellidos: "Torres Ramírez",
    correo: "sofia@scynara.com",
    telefono: "55 8765 4321",
    direccion: "Av. Central 45, CDMX",
    horario_entrada: "07:00",
    horario_salida: "15:00",
    tipo_jornada: "5",
    estado: "Activo",
    fecha_registro: "2025-05-01",
  },
];

let counter = 7;
const PER_PAGE = 5;

export default function Employees() {
  const { user } = useAuth();
  const isAdmin = user?.rol === "administrador";

  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("all");
  const [jornada, setJornada] = useState("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filtrado
  const filtered = useMemo(() => {
    if (!isAdmin) return employees.filter((e) => e.id_usuario === user?.id);
    const q = search.toLowerCase();
    return employees.filter((e) => {
      const mQ =
        !q ||
        `${e.nombre} ${e.apellidos}`.toLowerCase().includes(q) ||
        e.correo.toLowerCase().includes(q) ||
        e.numero.toLowerCase().includes(q);
      const mE = estado === "all" || e.estado === estado;
      const mJ = jornada === "all" || e.tipo_jornada === jornada;
      return mQ && mE && mJ;
    });
  }, [employees, search, estado, jornada, isAdmin, user]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const editingIndex = editing
    ? employees.findIndex((e) => e.id_usuario === editing.id_usuario)
    : 0;

  const isOwnProfile = editing?.id_usuario === user?.id;

  const handleEdit = (id) => {
    setEditing(employees.find((e) => e.id_usuario === id) || null);
    setModalOpen(true);
  };

  const handleToggle = (id) => {
    setEmployees((prev) =>
      prev.map((e) => {
        if (e.id_usuario !== id) return e;
        const next = { Activo: "Inactivo", Inactivo: "Activo", Baja: "Baja" };
        return { ...e, estado: next[e.estado] || "Activo" };
      }),
    );
    setToast("Estado actualizado");
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id_usuario !== id));
    setToast("Empleado eliminado");
  };

  const handleSave = (data) => {
    if (data.id_usuario) {
      setEmployees((prev) =>
        prev.map((e) =>
          e.id_usuario === data.id_usuario ? { ...e, ...data } : e,
        ),
      );
      setToast("Empleado actualizado");
    } else {
      const newEmp = {
        ...data,
        id_usuario: counter++,
        numero: `E-00${counter - 1}`,
        fecha_registro: new Date().toISOString().slice(0, 10),
      };
      setEmployees((prev) => [...prev, newEmp]);
      setToast("Empleado agregado");
    }
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <div className="dash">
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="emp-main">
        <EmployeesTopbar
          rol={user?.rol}
          onAdd={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        />

        <RoleBanner rol={user?.rol} />

        {isAdmin && (
          <>
            <EmployeesStats employees={employees} />
            <EmployeesToolbar
              search={search}
              onSearch={(v) => {
                setSearch(v);
                setPage(1);
              }}
              estado={estado}
              onEstado={(v) => {
                setEstado(v);
                setPage(1);
              }}
              jornada={jornada}
              onJornada={(v) => {
                setJornada(v);
                setPage(1);
              }}
            />
          </>
        )}

        <EmployeeTable
          employees={paginated}
          currentUserId={user?.id}
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />

        <SalesPagination
          total={filtered.length}
          page={page}
          perPage={PER_PAGE}
          onPage={setPage}
        />
      </main>

      <EmployeeModal
        open={modalOpen}
        employee={editing}
        employeeIndex={editingIndex}
        isAdmin={isAdmin}
        isOwnProfile={isOwnProfile}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}
