import { useState, useEffect } from 'react';
import Modal from './Modal';
import { useMembresias } from '../context/MembresiasContext';

const FormularioMembresia = ({ isOpen, onClose, membresia }) => {
  const { agregarMembresia, actualizarMembresia } = useMembresias();
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'Mensual',
    duracion: '',
    precio: '',
    descripcion: ''
  });

  useEffect(() => {
    if (membresia) {
      setFormData({
        nombre: membresia.nombre,
        tipo: membresia.tipo,
        duracion: membresia.duracion,
        precio: membresia.precio,
        descripcion: membresia.descripcion
      });
    } else {
      setFormData({
        nombre: '',
        tipo: 'Mensual',
        duracion: '',
        precio: '',
        descripcion: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (membresia) {
      actualizarMembresia(membresia.id, formData);
    } else {
      agregarMembresia(formData);
    }
    
    onClose();
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Ej: 350000"
            />
          </div>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
            placeholder="Acceso completo a todas las áreas y clases grupales..."
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormularioMembresia;
