import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Employees() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}