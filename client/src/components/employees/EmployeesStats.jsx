export default function EmployeesStats({ employees }) {
  const total    = employees.length;
  const activos  = employees.filter(e => e.estado === "Activo").length;
  const j5       = employees.filter(e => e.tipo_jornada === "5").length;
  const inactivos = employees.filter(e => e.estado !== "Activo").length;

  const stats = [
    { num: total,    label: "Total empleados", iconBg: "rgba(139,92,246,0.12)", icon: <IconTeam  color="#a78bfa" /> },
    { num: activos,  label: "Activos",          iconBg: "rgba(52,211,153,0.12)", icon: <IconCheck color="#34d399" /> },
    { num: j5,       label: "Jornada 5 días",   iconBg: "rgba(251,191,36,0.12)", icon: <IconClock color="#fbbf24" /> },
    { num: inactivos,label: "Inactivos / Baja", iconBg: "rgba(239,68,68,0.10)", icon: <IconX     color="#f87171" /> },
  ];

  return (
    <div className="emp-stats">
      {stats.map((s, i) => (
        <div key={i} className="e-stat">
          <div className="e-stat-icon" style={{ background: s.iconBg }}>{s.icon}</div>
          <div>
            <div className="e-stat-num">{s.num}</div>
            <div className="e-stat-label">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const IconTeam  = ({ color }) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" width="18" height="18"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconCheck = ({ color }) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>;
const IconClock = ({ color }) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconX     = ({ color }) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;