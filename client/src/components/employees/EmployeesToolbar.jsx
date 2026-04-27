const IconSearch  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconFilter  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
const IconCalendar= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;

export default function EmployeesToolbar({
  search, onSearch,
  estado, onEstado,
  jornada, onJornada,
}) {
  return (
    <div className="emp-toolbar">
      <div className="e-search">
        <span className="e-search-icon"><IconSearch /></span>
        <input
          type="text"
          placeholder="Buscar por nombre, email o número..."
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
      </div>

      <div className="e-filter">
        <IconFilter />
        <select value={estado} onChange={e => onEstado(e.target.value)}>
          <option value="all">Todos los estados</option>
          <option value="Activo">Activos</option>
          <option value="Inactivo">Inactivos</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      <div className="e-filter">
        <IconCalendar />
        <select value={jornada} onChange={e => onJornada(e.target.value)}>
          <option value="all">Toda jornada</option>
          <option value="5">5 días</option>
          <option value="3">3 días</option>
        </select>
      </div>
    </div>
  );
}