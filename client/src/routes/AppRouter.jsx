import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Productos from "../pages/Productos";
import QRScanner from "../components/QRScanner/QRScanner";
import { AuthProvider } from "../context/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../routes/ProtectedRoute";
import Navbar from "../components/Navbar/Navbar";

function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/qrscanner" element={<ProtectedRoute><QRScanner /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRouter;