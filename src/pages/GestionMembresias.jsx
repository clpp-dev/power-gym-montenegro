import { useState } from 'react';
import { useMembresias } from '../context/MembresiasContext';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import FormularioMembresia from '../components/FormularioMembresia';
import EliminarMembresia from '../components/EliminarMembresia';

const GestionMembresias = () => {
  const { membresias, buscarMembresias } = useMembresias();
  const [busqueda, setBusqueda] = useState('');
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [membresiaSeleccionada, setMembresiaSeleccionada] = useState(null);

  const membresiasFiltradas = buscarMembresias(busqueda);

  const handleEditar = (membresia) => {
    setMembresiaSeleccionada(membresia);
    setModalEditar(true);
  };

  const handleEliminar = (membresia) => {
    setMembresiaSeleccionada(membresia);
    setModalEliminar(true);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Membresías</h1>
        <button
          onClick={() => setModalCrear(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors shadow-md"
        >
          <Plus className="h-5 w-5" />
          <span>Crear Membresía</span>
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
            placeholder="Buscar membresía por nombre o tipo..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
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
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duración
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {membresiasFiltradas.map((membresia) => (
                <tr key={membresia.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{membresia.nombre}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {membresia.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {membresia.duracion} días
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ${membresia.precio.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {membresia.descripcion}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditar(membresia)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEliminar(membresia)}
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

        {membresiasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron membresías</p>
          </div>
        )}
      </div>

      {/* Modales */}
      <FormularioMembresia
        isOpen={modalCrear}
        onClose={() => setModalCrear(false)}
        membresia={null}
      />
      <FormularioMembresia
        isOpen={modalEditar}
        onClose={() => {
          setModalEditar(false);
          setMembresiaSeleccionada(null);
        }}
        membresia={membresiaSeleccionada}
      />
      <EliminarMembresia
        isOpen={modalEliminar}
        onClose={() => {
          setModalEliminar(false);
          setMembresiaSeleccionada(null);
        }}
        membresia={membresiaSeleccionada}
      />
    </div>
  );
};

export default GestionMembresias;
