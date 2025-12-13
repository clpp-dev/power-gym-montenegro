import Modal from './Modal';
import { X } from 'lucide-react';
import { useMembresias } from '../context/MembresiasContext';
import { toast } from 'sonner';

const EliminarMembresia = ({ isOpen, onClose, membresia }) => {
  const { eliminarMembresia, loading } = useMembresias();

  const handleEliminar = async () => {
    if (membresia) {
      try {
        const resultado = await eliminarMembresia(membresia.id || membresia._id);
        if (resultado) {
          toast.success(`Membresía ${membresia.nombre} eliminada exitosamente`);
          onClose();
        } else {
          toast.error('Error al eliminar la membresía');
        }
      } catch (error) {
        toast.error('Error al eliminar la membresía');
        console.error('Error:', error);
      }
    }
  };

  if (!membresia) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-[#f2f2f2] p-5 rounded-full shadow-[inset_8px_8px_16px_#a3b1c6,inset_-8px_-8px_16px_#ffffff]">
            <X className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            ¿Estás seguro?
          </h3>
          <p className="text-gray-600">
            Estás a punto de eliminar permanentemente la membresía{' '}
            <span className="font-semibold">{membresia.nombre}</span>. Esta acción no se puede deshacer.
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
            disabled={loading}
            className="flex-1 px-4 py-2 bg-[#f2f2f2] text-red-600 font-semibold rounded-xl shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Eliminando...' : 'Confirmar Eliminación'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EliminarMembresia;
