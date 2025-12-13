import { createContext, useState, useContext, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

const MembresiasContext = createContext();

export const MembresiasProvider = ({ children }) => {
  const [membresias, setMembresias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { 
    fetchData, 
    postData, 
    putData, 
    deleteData 
  } = useFetch('/membresias', { autoFetch: false });

  // Cargar membresías al montar el componente
  useEffect(() => {
    cargarMembresias();
  }, []);

  const cargarMembresias = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData();
      if (data) {
        // La API retorna las membresías con _id, las mapeamos a id para compatibilidad
        const membresiasMapeadas = data.map(membresia => ({
          ...membresia,
          id: membresia._id || membresia.id
        }));
        setMembresias(membresiasMapeadas);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar membresías:', err);
    } finally {
      setLoading(false);
    }
  };

  const agregarMembresia = async (membresia) => {
    setLoading(true);
    setError(null);
    try {
      const resultado = await postData(membresia);
      if (resultado.success) {
        await cargarMembresias(); // Recargar la lista
        return resultado.data;
      } else {
        setError(resultado.error);
        return null;
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al agregar membresía:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const actualizarMembresia = async (id, membresiaActualizada) => {
    setLoading(true);
    setError(null);
    try {
      const resultado = await putData(id, membresiaActualizada);
      if (resultado.success) {
        await cargarMembresias(); // Recargar la lista
        return resultado.data;
      } else {
        setError(resultado.error);
        return null;
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al actualizar membresía:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const eliminarMembresia = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const resultado = await deleteData(id);
      if (resultado.success) {
        await cargarMembresias(); // Recargar la lista
        return true;
      } else {
        setError(resultado.error);
        return false;
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al eliminar membresía:', err);
      return false;
    } finally {
      setLoading(false);
    }
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
        loading,
        error,
        agregarMembresia,
        actualizarMembresia,
        eliminarMembresia,
        buscarMembresias,
        cargarMembresias
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
