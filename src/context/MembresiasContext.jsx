import { createContext, useState, useContext, useEffect } from 'react';
import { initialMembresias } from '../data/mockData';

const MembresiasContext = createContext();

export const MembresiasProvider = ({ children }) => {
  const [membresias, setMembresias] = useState([]);

  useEffect(() => {
    // Cargar membresías desde localStorage o usar datos iniciales
    const storedMembresias = localStorage.getItem('membresias');
    if (storedMembresias) {
      setMembresias(JSON.parse(storedMembresias));
    } else {
      setMembresias(initialMembresias);
      localStorage.setItem('membresias', JSON.stringify(initialMembresias));
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem('membresias', JSON.stringify(data));
  };

  const agregarMembresia = (membresia) => {
    const nuevaMembresia = {
      ...membresia,
      id: Date.now().toString()
    };
    const nuevasMembresias = [...membresias, nuevaMembresia];
    setMembresias(nuevasMembresias);
    saveToLocalStorage(nuevasMembresias);
    return nuevaMembresia;
  };

  const actualizarMembresia = (id, membresiaActualizada) => {
    const nuevasMembresias = membresias.map(membresia =>
      membresia.id === id ? { ...membresia, ...membresiaActualizada } : membresia
    );
    setMembresias(nuevasMembresias);
    saveToLocalStorage(nuevasMembresias);
  };

  const eliminarMembresia = (id) => {
    const nuevasMembresias = membresias.filter(membresia => membresia.id !== id);
    setMembresias(nuevasMembresias);
    saveToLocalStorage(nuevasMembresias);
  };

  const buscarMembresias = (termino) => {
    if (!termino) return membresias;
    const terminoLower = termino.toLowerCase();
    return membresias.filter(membresia =>
      membresia.nombre.toLowerCase().includes(terminoLower) ||
      membresia.tipo.toLowerCase().includes(terminoLower)
    );
  };

  return (
    <MembresiasContext.Provider
      value={{
        membresias,
        agregarMembresia,
        actualizarMembresia,
        eliminarMembresia,
        buscarMembresias
      }}
    >
      {children}
    </MembresiasContext.Provider>
  );
};

export const useMembresias = () => {
  const context = useContext(MembresiasContext);
  if (!context) {
    throw new Error('useMembresias debe usarse dentro de MembresiasProvider');
  }
  return context;
};
