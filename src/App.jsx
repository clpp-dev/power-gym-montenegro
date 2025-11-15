import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
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
            <Toaster 
              position="bottom-right" 
              expand={false}
              richColors
              closeButton
              toastOptions={{
                style: {
                  background: '#e0e5ec',
                  border: 'none',
                  boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff',
                  color: '#374151',
                  borderRadius: '12px',
                },
              }}
            />
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
