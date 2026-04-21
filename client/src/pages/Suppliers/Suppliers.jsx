import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Suppliers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}