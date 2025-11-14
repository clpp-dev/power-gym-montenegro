import { useState, useEffect } from 'react';
import Modal from './Modal';
import { useClientes } from '../context/ClientesContext';
import { useMembresias } from '../context/MembresiasContext';

const AsignarMembresia = ({ isOpen, onClose, cliente }) => {
  const { asignarMembresia } = useClientes();
  const { membresias } = useMembresias();
  const [formData, setFormData] = useState({
    membresiaId: '',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: ''
  });
  const [membresiaSeleccionada, setMembresiaSeleccionada] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        membresiaId: '',
        fechaInicio: new Date().toISOString().split('T')[0],
        fechaFin: ''
      });
      setMembresiaSeleccionada(null);
    }
  }, [isOpen]);

  const handleMembresiaChange = (e) => {
    const membresiaId = e.target.value;
    const membresia = membresias.find(m => m.id === membresiaId);
    
    setFormData({ ...formData, membresiaId });
    setMembresiaSeleccionada(membresia);

    // Calcular fecha fin automáticamente
    if (membresia && formData.fechaInicio) {
      const fechaInicio = new Date(formData.fechaInicio);
      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaFin.getDate() + membresia.duracion);
      setFormData(prev => ({
        ...prev,
        membresiaId,
        fechaFin: fechaFin.toISOString().split('T')[0]
      }));
    }
  };

  const handleFechaInicioChange = (e) => {
    const fechaInicio = e.target.value;
    setFormData({ ...formData, fechaInicio });

    if (membresiaSeleccionada) {
      const fecha = new Date(fechaInicio);
      const fechaFin = new Date(fecha);
      fechaFin.setDate(fechaFin.getDate() + membresiaSeleccionada.duracion);
      setFormData(prev => ({
        ...prev,
        fechaInicio,
        fechaFin: fechaFin.toISOString().split('T')[0]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cliente && membresiaSeleccionada) {
      asignarMembresia(
        cliente.id,
        membresiaSeleccionada,
        formData.fechaInicio,
        formData.fechaFin
      );
      onClose();
    }
  };

  if (!cliente) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Asignar Membresía a Cliente">
      <div className="mb-6 p-4 bg-[#f2f2f2] rounded-xl shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]">
        <p className="text-sm text-gray-600">Seleccionar Cliente:</p>
        <p className="font-semibold text-gray-700">{cliente.nombre}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Membresía
          </label>
          <div className="grid grid-cols-1 gap-3">
            {membresias.map((membresia) => (
              <label
                key={membresia.id}
                className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${
                  formData.membresiaId === membresia.id
                    ? 'shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] bg-[#f2f2f2]'
                    : 'shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] bg-[#f2f2f2] hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]'
                }`}
              >
                <input
                  type="radio"
                  name="membresia"
                  value={membresia.id}
                  checked={formData.membresiaId === membresia.id}
                  onChange={handleMembresiaChange}
                  className="mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-700">{membresia.nombre}</div>
                  <div className="text-sm text-gray-600">{membresia.tipo}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">${membresia.precio.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{membresia.duracion} días</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {membresiaSeleccionada && (
          <>
            <div className="p-4 bg-[#f2f2f2] rounded-xl shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]">
              <p className="text-sm font-medium text-gray-700 mb-1">Período de Validez</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Fecha de Inicio</label>
                  <input
                    type="date"
                    value={formData.fechaInicio}
                    onChange={handleFechaInicioChange}
                    required
                    className="w-full px-3 py-2 bg-[#f2f2f2] border-0 rounded-xl text-sm shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] outline-none text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Fecha de Fin</label>
                  <input
                    type="date"
                    value={formData.fechaFin}
                    readOnly
                    className="w-full px-3 py-2 bg-[#f2f2f2] border-0 rounded-xl text-sm shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] cursor-not-allowed text-gray-700"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-[#f2f2f2] text-gray-700 rounded-xl shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!formData.membresiaId}
            className="flex-1 px-4 py-2 bg-[#f2f2f2] text-blue-600 font-semibold rounded-xl shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Asignar Membresía
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AsignarMembresia;
