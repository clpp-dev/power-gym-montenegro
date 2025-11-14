import { useState } from 'react';
import { useClientes } from '../context/ClientesContext';
import { Search, Plus, Edit, Trash2, CreditCard } from 'lucide-react';
import FormularioCliente from '../components/FormularioCliente';
import EliminarCliente from '../components/EliminarCliente';
import AsignarMembresia from '../components/AsignarMembresia';

const GestionClientes = () => {
  const { clientes, buscarClientes } = useClientes();
  const [busqueda, setBusqueda] = useState('');
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalMembresia, setModalMembresia] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const clientesPorPagina = 10;

  const clientesFiltrados = buscarClientes(busqueda);

  // Paginación
  const indexUltimo = paginaActual * clientesPorPagina;
  const indexPrimero = indexUltimo - clientesPorPagina;
  const clientesActuales = clientesFiltrados.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Inactivo':
        return 'bg-red-100 text-red-800';
      case 'Próximo a Vencer':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditar = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalEditar(true);
  };

  const handleEliminar = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalEliminar(true);
  };

  const handleAsignarMembresia = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalMembresia(true);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Clientes</h1>
        <button
          onClick={() => setModalCrear(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Plus className="h-5 w-5" />
          <span>Crear Cliente</span>
        </button>
      </div>

      {/* Búsqueda */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, cédula o email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre / Cédula
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membresía
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientesActuales.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{cliente.nombre}</div>
                    <div className="text-sm text-gray-500">{cliente.cedula}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {cliente.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {cliente.telefono}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(cliente.estado)}`}>
                      {cliente.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {cliente.membresia ? cliente.membresia.nombre : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditar(cliente)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAsignarMembresia(cliente)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Asignar Membresía"
                      >
                        <CreditCard className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEliminar(cliente)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
            <button
              onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <div className="flex space-x-2">
              {[...Array(totalPaginas)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setPaginaActual(index + 1)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    paginaActual === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* Modales */}
      <FormularioCliente
        isOpen={modalCrear}
        onClose={() => setModalCrear(false)}
        cliente={null}
      />
      <FormularioCliente
        isOpen={modalEditar}
        onClose={() => {
          setModalEditar(false);
          setClienteSeleccionado(null);
        }}
        cliente={clienteSeleccionado}
      />
      <EliminarCliente
        isOpen={modalEliminar}
        onClose={() => {
          setModalEliminar(false);
          setClienteSeleccionado(null);
        }}
        cliente={clienteSeleccionado}
      />
      <AsignarMembresia
        isOpen={modalMembresia}
        onClose={() => {
          setModalMembresia(false);
          setClienteSeleccionado(null);
        }}
        cliente={clienteSeleccionado}
      />
    </div>
  );
};

export default GestionClientes;
