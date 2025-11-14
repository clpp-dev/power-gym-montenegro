import Modal from './Modal';
import { Trash2 } from 'lucide-react';
import { useClientes } from '../context/ClientesContext';

const EliminarCliente = ({ isOpen, onClose, cliente }) => {
  const { eliminarCliente } = useClientes();

  const handleEliminar = () => {
    if (cliente) {
      eliminarCliente(cliente.id);
      onClose();
    }
  };

  if (!cliente) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-red-100 p-4 rounded-full">
            <Trash2 className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            ¿Estás seguro?
          </h3>
          <p className="text-gray-600">
            Estás a punto de eliminar permanentemente al cliente{' '}
            <span className="font-semibold">{cliente.nombre}</span>. Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleEliminar}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Confirmar Eliminación
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EliminarCliente;
