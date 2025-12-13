import { createContext, useState, useContext, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { 
    fetchData, 
    postData, 
    putData, 
    deleteData 
  } = useFetch('/clientes', { autoFetch: false });

  // Cargar clientes al montar el componente
  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData();
      if (data) {
        // La API retorna los clientes con _id, los mapeamos a id para compatibilidad
        const clientesMapeados = data.map(cliente => ({
          ...cliente,
          id: cliente._id || cliente.id
        }));
        setClientes(clientesMapeados);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar clientes:', err);
    } finally {
      setLoading(false);
    }
  };

  const agregarCliente = async (cliente) => {
    setLoading(true);
    setError(null);
    try {
      const resultado = await postData(cliente);
      if (resultado.success) {
        await cargarClientes(); // Recargar la lista
        return resultado.data;
      } else {
        setError(resultado.error);
        return null;
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al agregar cliente:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const actualizarCliente = async (id, clienteActualizado) => {
    setLoading(true);
    setError(null);
    try {
      const resultado = await putData(id, clienteActualizado);
      if (resultado.success) {
        await cargarClientes(); // Recargar la lista
        return resultado.data;
      } else {
        setError(resultado.error);
        return null;
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al actualizar cliente:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const eliminarCliente = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const resultado = await deleteData(id);
      if (resultado.success) {
        await cargarClientes(); // Recargar la lista
        return true;
      } else {
        setError(resultado.error);
        return false;
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al eliminar cliente:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const asignarMembresia = async (clienteId, membresia, fechaInicio, fechaFin) => {
    setLoading(true);
    setError(null);
    try {
      // Actualizar el cliente con la membresía asignada
      const clienteActualizado = {
        membresia: membresia._id || membresia.id,
        fechaInicioMembresia: fechaInicio,
        fechaFinMembresia: fechaFin,
        estado: 'Activo'
      };
      const resultado = await putData(clienteId, clienteActualizado);
      if (resultado.success) {
        await cargarClientes(); // Recargar la lista
        return resultado.data;
      } else {
        setError(resultado.error);
        return null;
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al asignar membresía:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const buscarClientes = (termino) => {
    if (!termino) return clientes;
    const terminoLower = termino.toLowerCase();
    return clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(terminoLower) ||
      cliente.cedula?.includes(termino) ||
      cliente.email.toLowerCase().includes(terminoLower)
    );
  };

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        loading,
        error,
        agregarCliente,
        actualizarCliente,
        eliminarCliente,
        asignarMembresia,
        buscarClientes,
        cargarClientes
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export const useClientes = () => {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error('useClientes debe usarse dentro de ClientesProvider');
  }
  return context;
};
