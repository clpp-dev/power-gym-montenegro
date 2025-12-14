import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { ClientesProvider, useClientes } from '../../src/context/ClientesContext';

// Mock del hook useFetch
vi.mock('../../src/hooks/useFetch', () => ({
  useFetch: vi.fn(() => ({
    fetchData: vi.fn(),
    postData: vi.fn(),
    putData: vi.fn(),
    deleteData: vi.fn(),
  })),
}));

import { useFetch } from '../../src/hooks/useFetch';

describe('ClientesContext', () => {
  let mockFetchData;
  let mockPostData;
  let mockPutData;
  let mockDeleteData;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockFetchData = vi.fn();
    mockPostData = vi.fn();
    mockPutData = vi.fn();
    mockDeleteData = vi.fn();

    useFetch.mockReturnValue({
      fetchData: mockFetchData,
      postData: mockPostData,
      putData: mockPutData,
      deleteData: mockDeleteData,
    });
  });

  describe('cargarClientes', () => {
    it('debería cargar clientes exitosamente', async () => {
      const mockClientes = [
        { _id: '1', nombre: 'Juan', apellido: 'Pérez' },
        { _id: '2', nombre: 'María', apellido: 'García' },
      ];

      mockFetchData.mockResolvedValueOnce(mockClientes);

      const { result } = renderHook(() => useClientes(), {
        wrapper: ClientesProvider,
      });

      await waitFor(() => {
        expect(result.current.clientes).toHaveLength(2);
      });

      expect(result.current.clientes[0]).toHaveProperty('id', '1');
      expect(result.current.clientes[1]).toHaveProperty('id', '2');
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('debería manejar errores al cargar clientes', async () => {
      mockFetchData.mockRejectedValueOnce(new Error('Error de red'));

      const { result } = renderHook(() => useClientes(), {
        wrapper: ClientesProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe('Error de red');
      expect(result.current.clientes).toEqual([]);
    });

    it('debería mapear correctamente _id a id', async () => {
      const mockClientes = [
        { _id: 'abc123', nombre: 'Test', apellido: 'User' },
      ];

      mockFetchData.mockResolvedValueOnce(mockClientes);

      const { result } = renderHook(() => useClientes(), {
        wrapper: ClientesProvider,
      });

      await waitFor(() => {
        expect(result.current.clientes).toHaveLength(1);
      });

      expect(result.current.clientes[0].id).toBe('abc123');
      expect(result.current.clientes[0]._id).toBe('abc123');
    });
  });

  describe('agregarCliente', () => {
    it('debería agregar un cliente exitosamente', async () => {
      const nuevoCliente = {
        nombre: 'Pedro',
        apellido: 'Ramírez',
        cedula: '123456789',
      };

      const clienteCreado = { _id: '3', ...nuevoCliente };

      mockPostData.mockResolvedValueOnce({
        success: true,
        data: clienteCreado,
      });

      mockFetchData.mockResolvedValueOnce([clienteCreado]);

      const { result } = renderHook(() => useClientes(), {
        wrapper: ClientesProvider,
      });

      // Esperar a que termine la carga inicial
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoAgregar;
      await act(async () => {
        resultadoAgregar = await result.current.agregarCliente(nuevoCliente);
      });

      expect(mockPostData).toHaveBeenCalledWith(nuevoCliente);
      expect(resultadoAgregar).toEqual(clienteCreado);
      expect(mockFetchData).toHaveBeenCalledTimes(2); // Una vez al iniciar, otra al agregar
    });

    it('debería manejar errores al agregar cliente', async () => {
      const nuevoCliente = { nombre: 'Test' };
      const errorMessage = 'Error al crear cliente';

      mockPostData.mockResolvedValueOnce({
        success: false,
        error: errorMessage,
      });

      mockFetchData.mockResolvedValueOnce([]);

      const { result } = renderHook(() => useClientes(), {
        wrapper: ClientesProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoAgregar;
      await act(async () => {
        resultadoAgregar = await result.current.agregarCliente(nuevoCliente);
      });

      expect(resultadoAgregar).toBeNull();
      expect(result.current.error).toBe(errorMessage);
    });
  });

  describe('actualizarCliente', () => {
    it('debería actualizar un cliente exitosamente', async () => {
      const clienteActualizado = {
        nombre: 'Juan Actualizado',
        apellido: 'Pérez',
      };

      mockPutData.mockResolvedValueOnce({
        success: true,
        data: { _id: '1', ...clienteActualizado },
      });

      mockFetchData.mockResolvedValue([]);

      const { result } = renderHook(() => useClientes(), {
        wrapper: ClientesProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoActualizar;
      await act(async () => {
        resultadoActualizar = await result.current.actualizarCliente('1', clienteActualizado);
      });

      expect(mockPutData).toHaveBeenCalledWith('1', clienteActualizado);
      expect(resultadoActualizar).toHaveProperty('nombre', 'Juan Actualizado');
    });

    it('debería manejar errores al actualizar cliente', async () => {
      const errorMessage = 'Error al actualizar';

      mockPutData.mockResolvedValueOnce({
        success: false,
        error: errorMessage,
      });

      mockFetchData.mockResolvedValueOnce([]);

      const { result } = renderHook(() => useClientes(), {
        wrapper: ClientesProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoActualizar;
      await act(async () => {
        resultadoActualizar = await result.current.actualizarCliente('1', {});
      });

      expect(resultadoActualizar).toBeNull();
      expect(result.current.error).toBe(errorMessage);
    });
  });

  describe('eliminarCliente', () => {
    it('debería eliminar un cliente exitosamente', async () => {
      mockDeleteData.mockResolvedValueOnce({ success: true });
      mockFetchData.mockResolvedValue([]);

      const { result } = renderHook(() => useClientes(), {
        wrapper: ClientesProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoEliminar;
      await act(async () => {
        resultadoEliminar = await result.current.eliminarCliente('1');
      });

      expect(mockDeleteData).toHaveBeenCalledWith('1');
      expect(resultadoEliminar).toBe(true);
    });

    it('debería manejar errores al eliminar cliente', async () => {
      const errorMessage = 'Error al eliminar';

      mockDeleteData.mockResolvedValueOnce({
        success: false,
        error: errorMessage,
      });

      mockFetchData.mockResolvedValueOnce([]);

      const { result } = renderHook(() => useClientes(), {
        wrapper: ClientesProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoEliminar;
      await act(async () => {
        resultadoEliminar = await result.current.eliminarCliente('1');
      });

      expect(resultadoEliminar).toBe(false);
      expect(result.current.error).toBe(errorMessage);
    });
  });

  describe('useClientes hook', () => {
    it('debería lanzar error si se usa fuera del ClientesProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useClientes());
      }).toThrow('useClientes debe usarse dentro de ClientesProvider');

      consoleSpy.mockRestore();
    });
  });
});
