import { useState, useEffect } from 'react';
import Modal from './Modal';
import { useMembresias } from '../context/MembresiasContext';
import { toast } from 'sonner';

const FormularioMembresia = ({ isOpen, onClose, membresia }) => {
  const { agregarMembresia, actualizarMembresia, loading } = useMembresias();
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'Mensual',
    duracion: '',
    precio: '',
    descripcion: '',
    beneficios: []
  });
  const [beneficioActual, setBeneficioActual] = useState('');

  useEffect(() => {
    if (membresia) {
      setFormData({
        nombre: membresia.nombre || '',
        tipo: membresia.tipo || 'Mensual',
        duracion: membresia.duracion || '',
        precio: membresia.precio || '',
        descripcion: membresia.descripcion || '',
        beneficios: membresia.beneficios || []
      });
    } else {
      setFormData({
        nombre: '',
        tipo: 'Mensual',
        duracion: '',
        precio: '',
        descripcion: '',
        beneficios: []
      });
    }
  }, [membresia, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'duracion' || name === 'precio' ? (value ? Number(value) : '') : value
    });
  };

  const agregarBeneficio = () => {
    if (beneficioActual.trim()) {
      setFormData({
        ...formData,
        beneficios: [...formData.beneficios, beneficioActual.trim()]
      });
      setBeneficioActual('');
    }
  };

  const eliminarBeneficio = (index) => {
    setFormData({
      ...formData,
      beneficios: formData.beneficios.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const datosMembresia = {
        nombre: formData.nombre,
        tipo: formData.tipo,
        descripcion: formData.descripcion,
        precio: Number(formData.precio),
        duracion: Number(formData.duracion),
        beneficios: formData.beneficios
      };

      if (membresia) {
        const resultado = await actualizarMembresia(membresia.id || membresia._id, datosMembresia);
        if (resultado) {
          toast.success(`Membresía ${formData.nombre} actualizada exitosamente`);
          onClose();
        } else {
          toast.error('Error al actualizar la membresía');
        }
      } else {
        const resultado = await agregarMembresia(datosMembresia);
        if (resultado) {
          toast.success(`Membresía ${formData.nombre} creada exitosamente`);
          onClose();
        } else {
          toast.error('Error al crear la membresía');
        }
      }
    } catch (error) {
      toast.error(`Error al ${membresia ? 'actualizar' : 'crear'} la membresía`);
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={membresia ? 'Editar Membresía' : 'Crear Nueva Membresía'}
    >
      <p className="text-sm text-gray-600 mb-6">
        Completa los datos necesarios para {membresia ? 'actualizar' : 'añadir'} un nuevo tipo de membresía.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Membresía
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#f2f2f2] border-0 rounded-xl shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] outline-none text-gray-700"
            placeholder="Ej: Membresía Gold"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duración (en días)
            </label>
            <input
              type="number"
              name="duracion"
              value={formData.duracion}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#f2f2f2] border-0 rounded-xl shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] outline-none text-gray-700"
              placeholder="Ej: 30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#f2f2f2] border-0 rounded-xl shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] outline-none text-gray-700"
              placeholder="Ej: 350000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#f2f2f2] border-0 rounded-xl shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] outline-none text-gray-700"
          >
            <option value="Mensual">Mensual</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Semestral">Semestral</option>
            <option value="Anual">Anual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            required
            className="w-full px-3 py-2 bg-[#f2f2f2] border-0 rounded-xl shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] outline-none resize-none text-gray-700"
            placeholder="Acceso completo a todas las áreas y clases grupales..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beneficios
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={beneficioActual}
              onChange={(e) => setBeneficioActual(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarBeneficio())}
              className="flex-1 px-3 py-2 bg-[#f2f2f2] border-0 rounded-xl shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] outline-none text-gray-700"
              placeholder="Agregar beneficio"
            />
            <button
              type="button"
              onClick={agregarBeneficio}
              className="px-4 py-2 bg-[#f2f2f2] text-purple-600 font-semibold rounded-xl shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-all"
            >
              Agregar
            </button>
          </div>
          {formData.beneficios.length > 0 && (
            <ul className="space-y-1">
              {formData.beneficios.map((beneficio, index) => (
                <li key={index} className="flex items-center justify-between px-3 py-2 bg-[#f2f2f2] rounded-lg shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff]">
                  <span className="text-sm text-gray-700">{beneficio}</span>
                  <button
                    type="button"
                    onClick={() => eliminarBeneficio(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

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
            disabled={loading}
            className="flex-1 px-4 py-2 bg-[#f2f2f2] text-purple-600 font-semibold rounded-xl shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormularioMembresia;
