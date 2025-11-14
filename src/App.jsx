import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ClientesProvider } from './context/ClientesContext';
import { MembresiasProvider } from './context/MembresiasContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GestionClientes from './pages/GestionClientes';
import GestionMembresias from './pages/GestionMembresias';

function App() {
  return (
    <AuthProvider>
      <ClientesProvider>
        <MembresiasProvider>
          <BrowserRouter>
            <Routes>
              {/* Ruta pública */}
              <Route path="/login" element={<Login />} />
              
              {/* Rutas protegidas con Layout */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="clientes" element={<GestionClientes />} />
                <Route path="membresias" element={<GestionMembresias />} />
              </Route>

              {/* Ruta por defecto */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </MembresiasProvider>
      </ClientesProvider>
    </AuthProvider>
  );
}

export default App;
