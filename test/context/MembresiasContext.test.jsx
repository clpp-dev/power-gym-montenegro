import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { MembresiasProvider, useMembresias } from '../../src/context/MembresiasContext';

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

describe('MembresiasContext', () => {
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

  describe('cargarMembresias', () => {
    it('debería cargar membresías exitosamente', async () => {
      const mockMembresias = [
        { _id: '1', nombre: 'Plan Mensual', tipo: 'Mensual', precio: 100 },
        { _id: '2', nombre: 'Plan Anual', tipo: 'Anual', precio: 1000 },
      ];

      mockFetchData.mockResolvedValueOnce(mockMembresias);

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.membresias).toHaveLength(2);
      });

      expect(result.current.membresias[0]).toHaveProperty('id', '1');
      expect(result.current.membresias[1]).toHaveProperty('id', '2');
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('debería manejar errores al cargar membresías', async () => {
      mockFetchData.mockRejectedValueOnce(new Error('Error de red'));

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe('Error de red');
      expect(result.current.membresias).toEqual([]);
    });
  });

  describe('agregarMembresia', () => {
    it('debería agregar una membresía exitosamente', async () => {
      const nuevaMembresia = {
        nombre: 'Plan Premium',
        tipo: 'Mensual',
        precio: 150,
      };

      const membresiaCreada = { _id: '3', ...nuevaMembresia };

      mockPostData.mockResolvedValueOnce({
        success: true,
        data: membresiaCreada,
      });

      mockFetchData.mockResolvedValueOnce([membresiaCreada]);

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoAgregar;
      await act(async () => {
        resultadoAgregar = await result.current.agregarMembresia(nuevaMembresia);
      });

      expect(mockPostData).toHaveBeenCalledWith(nuevaMembresia);
      expect(resultadoAgregar).toEqual(membresiaCreada);
    });

    it('debería manejar errores al agregar membresía', async () => {
      const nuevaMembresia = { nombre: 'Test' };
      const errorMessage = 'Error al crear membresía';

      mockPostData.mockResolvedValueOnce({
        success: false,
        error: errorMessage,
      });

      mockFetchData.mockResolvedValueOnce([]);

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoAgregar;
      await act(async () => {
        resultadoAgregar = await result.current.agregarMembresia(nuevaMembresia);
      });

      expect(resultadoAgregar).toBeNull();
      expect(result.current.error).toBe(errorMessage);
    });
  });

  describe('actualizarMembresia', () => {
    it('debería actualizar una membresía exitosamente', async () => {
      const membresiaActualizada = {
        nombre: 'Plan Premium Plus',
        tipo: 'Mensual',
        precio: 200,
      };

      mockPutData.mockResolvedValueOnce({
        success: true,
        data: { _id: '1', ...membresiaActualizada },
      });

      mockFetchData.mockResolvedValue([]);

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoActualizar;
      await act(async () => {
        resultadoActualizar = await result.current.actualizarMembresia('1', membresiaActualizada);
      });

      expect(mockPutData).toHaveBeenCalledWith('1', membresiaActualizada);
      expect(resultadoActualizar).toHaveProperty('nombre', 'Plan Premium Plus');
    });

    it('debería manejar errores al actualizar membresía', async () => {
      const errorMessage = 'Error al actualizar';

      mockPutData.mockResolvedValueOnce({
        success: false,
        error: errorMessage,
      });

      mockFetchData.mockResolvedValueOnce([]);

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoActualizar;
      await act(async () => {
        resultadoActualizar = await result.current.actualizarMembresia('1', {});
      });

      expect(resultadoActualizar).toBeNull();
      expect(result.current.error).toBe(errorMessage);
    });
  });

  describe('eliminarMembresia', () => {
    it('debería eliminar una membresía exitosamente', async () => {
      mockDeleteData.mockResolvedValueOnce({ success: true });
      mockFetchData.mockResolvedValue([]);

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoEliminar;
      await act(async () => {
        resultadoEliminar = await result.current.eliminarMembresia('1');
      });

      expect(mockDeleteData).toHaveBeenCalledWith('1');
      expect(resultadoEliminar).toBe(true);
    });

    it('debería manejar errores al eliminar membresía', async () => {
      const errorMessage = 'Error al eliminar';

      mockDeleteData.mockResolvedValueOnce({
        success: false,
        error: errorMessage,
      });

      mockFetchData.mockResolvedValueOnce([]);

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let resultadoEliminar;
      await act(async () => {
        resultadoEliminar = await result.current.eliminarMembresia('1');
      });

      expect(resultadoEliminar).toBe(false);
      expect(result.current.error).toBe(errorMessage);
    });
  });

  describe('buscarMembresias', () => {
    it('debería buscar membresías por nombre', async () => {
      const mockMembresias = [
        { _id: '1', nombre: 'Plan Mensual', tipo: 'Mensual', precio: 100 },
        { _id: '2', nombre: 'Plan Anual', tipo: 'Anual', precio: 1000 },
        { _id: '3', nombre: 'Plan Premium', tipo: 'Mensual', precio: 150 },
      ];

      mockFetchData.mockResolvedValueOnce(mockMembresias);

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.membresias).toHaveLength(3);
      });

      const resultados = result.current.buscarMembresias('mensual');

      expect(resultados).toHaveLength(2);
      expect(resultados.some(m => m.nombre === 'Plan Mensual')).toBe(true);
      expect(resultados.some(m => m.nombre === 'Plan Premium')).toBe(true);
    });

    it('debería buscar membresías por tipo', async () => {
      const mockMembresias = [
        { _id: '1', nombre: 'Plan Mensual', tipo: 'Mensual', precio: 100 },
        { _id: '2', nombre: 'Plan Anual', tipo: 'Anual', precio: 1000 },
      ];

      mockFetchData.mockResolvedValueOnce(mockMembresias);

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.membresias).toHaveLength(2);
      });

      const resultados = result.current.buscarMembresias('anual');

      expect(resultados).toHaveLength(1);
      expect(resultados[0].nombre).toBe('Plan Anual');
    });

    it('debería retornar todas las membresías si no hay término de búsqueda', async () => {
      const mockMembresias = [
        { _id: '1', nombre: 'Plan Mensual', tipo: 'Mensual', precio: 100 },
        { _id: '2', nombre: 'Plan Anual', tipo: 'Anual', precio: 1000 },
      ];

      mockFetchData.mockResolvedValueOnce(mockMembresias);

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.membresias).toHaveLength(2);
      });

      const resultados = result.current.buscarMembresias('');

      expect(resultados).toHaveLength(2);
    });

    it('debería retornar array vacío si no hay coincidencias', async () => {
      const mockMembresias = [
        { _id: '1', nombre: 'Plan Mensual', tipo: 'Mensual', precio: 100 },
      ];

      mockFetchData.mockResolvedValueOnce(mockMembresias);

      const { result } = renderHook(() => useMembresias(), {
        wrapper: MembresiasProvider,
      });

      await waitFor(() => {
        expect(result.current.membresias).toHaveLength(1);
      });

      const resultados = result.current.buscarMembresias('inexistente');

      expect(resultados).toHaveLength(0);
    });
  });

  describe('useMembresias hook', () => {
    it('debería lanzar error si se usa fuera del MembresiasProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useMembresias());
      }).toThrow('useMembresias debe usarse dentro de MembresiasProvider');

      consoleSpy.mockRestore();
    });
  });
});
