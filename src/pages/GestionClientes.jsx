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
  console.log("🚀 ~ GestionClientes ~ clientesActuales:", clientesActuales)
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
        <h1 className="text-3xl font-bold text-gray-700">Gestión de Clientes</h1>

        <div className="flex space-x-4">
          <button
            onClick={() => setModalCrear(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#f2f2f2] text-blue-600 font-semibold rounded-xl shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-all"
          >
            <Plus className="h-5 w-5" />
            <span>Crear Cliente</span>
          </button>
          {/* <button
            onClick={() => setModalCrear(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#f2f2f2] text-blue-600 font-semibold rounded-xl shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-all"
          >
            <Plus className="h-5 w-5" />
            <span>Asignar membresía</span>
          </button> */}
        </div>
      </div>

      {/* Búsqueda */}
      <div className="bg-[#f2f2f2] rounded-2xl shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, cédula o email..."
            className="w-full pl-10 pr-4 py-2 bg-[#f2f2f2] border-0 rounded-xl shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-[#f2f2f2] rounded-2xl shadow-[12px_12px_24px_#a3b1c6,-12px_-12px_24px_#ffffff] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#e9e9e9]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Cédula
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Membresía
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Fecha Inicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Fecha Fin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#f2f2f2] divide-y divide-gray-300">
              {clientesActuales.map((cliente) => (
                <tr key={cliente.id || cliente._id} className="transition-all">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-700">
                      {cliente.nombre} {cliente.apellido || ''}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{cliente.cedula}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {cliente.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {cliente.telefono}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(cliente.estado)}`}>
                      {cliente.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {cliente.membresia?.nombre || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {cliente.fechaInicioMembresia
                      ? new Date(cliente.fechaInicioMembresia).toLocaleDateString('es-ES')
                      : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {cliente.fechaFinMembresia
                      ? new Date(cliente.fechaFinMembresia).toLocaleDateString('es-ES')
                      : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditar(cliente)}
                        className="
                          cursor-pointer
                          p-2 
                          text-blue-600 
                          bg-[#f2f2f2] 
                          rounded-lg 
                          shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] 
                          hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]
                          transition-all
                        "
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAsignarMembresia(cliente)}
                        className="
                          cursor-pointer
                          p-2 
                          text-green-600 
                          bg-[#f2f2f2] 
                          rounded-lg 
                          shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] 
                          hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] transition-all
                        "
                        title="Asignar Membresía"
                      >
                        <CreditCard className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEliminar(cliente)}
                        className="
                          cursor-pointer
                          p-2 
                          text-red-600 
                          bg-[#f2f2f2] 
                          rounded-lg 
                          shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] 
                          hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] 
                          transition-all
                        "
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
          <div className="bg-[#f2f2f2] px-6 py-4 flex items-center justify-between border-t border-gray-300">
            <button
              onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="px-4 py-2 bg-[#f2f2f2] rounded-xl text-sm font-medium text-gray-700 shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Anterior
            </button>
            <div className="flex space-x-2">
              {[...Array(totalPaginas)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setPaginaActual(index + 1)}
                  className={`px-3 py-1 rounded-xl text-sm font-medium transition-all ${
                    paginaActual === index + 1
                      ? 'shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] bg-[#f2f2f2] text-blue-600'
                      : 'shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] bg-[#f2f2f2] text-gray-700 hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
              className="px-4 py-2 bg-[#f2f2f2] rounded-xl text-sm font-medium text-gray-700 shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
