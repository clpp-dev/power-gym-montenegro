import Modal from './Modal';
import { Trash2 } from 'lucide-react';
import { useClientes } from '../context/ClientesContext';
import { toast } from 'sonner';

const EliminarCliente = ({ isOpen, onClose, cliente }) => {
  const { eliminarCliente } = useClientes();

  const handleEliminar = () => {
    if (cliente) {
      try {
        eliminarCliente(cliente.id);
        toast.success(`Cliente ${cliente.nombre} eliminado exitosamente`);
        onClose();
      } catch (error) {
        toast.error('Error al eliminar el cliente');
      }
    }
  };

  if (!cliente) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-[#f2f2f2] p-5 rounded-full shadow-[inset_8px_8px_16px_#a3b1c6,inset_-8px_-8px_16px_#ffffff]">
            <Trash2 className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
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
            className="flex-1 px-4 py-2 bg-[#f2f2f2] text-gray-700 rounded-xl shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleEliminar}
            className="flex-1 px-4 py-2 bg-[#f2f2f2] text-red-600 font-semibold rounded-xl shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-all"
          >
            Confirmar Eliminación
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EliminarCliente;
