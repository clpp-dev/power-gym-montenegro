import { createContext, useState, useContext, useEffect } from 'react';
import { initialClientes } from '../data/mockData';

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Cargar clientes desde localStorage o usar datos iniciales
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
    } else {
      setClientes(initialClientes);
      localStorage.setItem('clientes', JSON.stringify(initialClientes));
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem('clientes', JSON.stringify(data));
  };

  const agregarCliente = (cliente) => {
    const nuevoCliente = {
      ...cliente,
      id: Date.now().toString(),
      estado: cliente.membresia ? 'Activo' : 'Inactivo'
    };
    const nuevosClientes = [...clientes, nuevoCliente];
    setClientes(nuevosClientes);
    saveToLocalStorage(nuevosClientes);
    return nuevoCliente;
  };

  const actualizarCliente = (id, clienteActualizado) => {
    const nuevosClientes = clientes.map(cliente =>
      cliente.id === id ? { ...cliente, ...clienteActualizado } : cliente
    );
    setClientes(nuevosClientes);
    saveToLocalStorage(nuevosClientes);
  };

  const eliminarCliente = (id) => {
    const nuevosClientes = clientes.filter(cliente => cliente.id !== id);
    setClientes(nuevosClientes);
    saveToLocalStorage(nuevosClientes);
  };

  const asignarMembresia = (clienteId, membresia, fechaInicio, fechaFin) => {
    const nuevosClientes = clientes.map(cliente =>
      cliente.id === clienteId
        ? {
            ...cliente,
            membresia: {
              ...membresia,
              fechaInicio,
              fechaFin
            },
            estado: 'Activo'
          }
        : cliente
    );
    setClientes(nuevosClientes);
    saveToLocalStorage(nuevosClientes);
  };

  const buscarClientes = (termino) => {
    if (!termino) return clientes;
    const terminoLower = termino.toLowerCase();
    return clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(terminoLower) ||
      cliente.cedula.includes(termino) ||
      cliente.email.toLowerCase().includes(terminoLower)
    );
  };

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        agregarCliente,
        actualizarCliente,
        eliminarCliente,
        asignarMembresia,
        buscarClientes
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
