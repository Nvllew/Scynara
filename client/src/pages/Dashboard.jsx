import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar    from "../components/dashboard/Sidebar/Sidebar";
import StatCards  from "../components/dashboard/StatCards/StatCards";
import ModuleCards from "../components/dashboard/ModuleCards/ModuleCards";
import RecentSales from "../components/dashboard/RecentSales/RecentSales";
import AlertsPanel from "../components/dashboard/AlertsPanel/AlertsPanel";
import "../components/dashboard/Dashboard.css";

const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" width="18" height="18">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

function formatDate() {
  return new Date().toLocaleDateString("es-MX", {
    weekday: "long", year: "numeric",
    month: "long",   day: "numeric",
  });
}

export default function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dash">
      {/* Overlay móvil */}
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="dash-main">

        {/* Topbar */}
        <div className="dash-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              className="sb-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú"
            >
              <IconMenu />
            </button>
            <div className="dash-greeting">
              <h1>{getGreeting()}, <span>{user?.nombre}</span> 👋</h1>
              <p style={{ textTransform: "capitalize" }}>
                {formatDate()} · {user?.rol}
              </p>
            </div>
          </div>
          <div className="dash-topbar-right">
            <div className="dash-notif">
              <IconBell />
              <span className="notif-dot" />
            </div>
          </div>
        </div>

        <StatCards />
        <ModuleCards />

        <div className="dash-bottom">
          <RecentSales />
          <AlertsPanel />
        </div>

      </main>
    </div>
  );
}