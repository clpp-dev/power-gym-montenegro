import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../../src/hooks/useFetch';

const API_BASE_URL = 'https://backend-power-gym-montenegro-production.up.railway.app/api';

describe('useFetch Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchData (GET)', () => {
    it('debería hacer fetch de datos exitosamente', async () => {
      const mockData = [{ id: 1, nombre: 'Test' }];
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockData }),
      });

      const { result } = renderHook(() => useFetch('/clientes', { autoFetch: false }));

      const data = await result.current.fetchData();

      expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/clientes`);
      expect(data).toEqual(mockData);
      expect(result.current.error).toBeNull();
    });

    it('debería manejar errores en el fetch', async () => {
      const errorMessage = 'Error en la petición';
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: errorMessage }),
      });

      const { result } = renderHook(() => useFetch('/clientes', { autoFetch: false }));

      const data = await result.current.fetchData();

      expect(data).toBeNull();
      // Verificar que el error se estableció después de que finalice la operación
      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
      });
    });

    it('debería hacer autoFetch si está habilitado', async () => {
      const mockData = [{ id: 1, nombre: 'Test' }];
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockData }),
      });

      const { result } = renderHook(() => useFetch('/clientes', { autoFetch: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/clientes`);
      expect(result.current.data).toEqual(mockData);
    });

    it('no debería hacer autoFetch si está deshabilitado', () => {
      global.fetch = vi.fn();

      renderHook(() => useFetch('/clientes', { autoFetch: false }));

      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe('postData (POST)', () => {
    it('debería crear un recurso exitosamente', async () => {
      const newItem = { nombre: 'Nuevo Cliente' };
      const mockResponse = { data: { id: 1, ...newItem } };
      
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const { result } = renderHook(() => useFetch('/clientes', { autoFetch: false }));

      const response = await result.current.postData(newItem);

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_BASE_URL}/clientes`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        }
      );
      expect(response.success).toBe(true);
      expect(response.data).toEqual(mockResponse.data);
    });

    it('debería manejar errores al crear un recurso', async () => {
      const errorMessage = 'Error al crear';
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: errorMessage }),
      });

      const { result } = renderHook(() => useFetch('/clientes', { autoFetch: false }));

      const response = await result.current.postData({});

      expect(response.success).toBe(false);
      expect(response.error).toBe(errorMessage);
    });
  });

  describe('putData (PUT)', () => {
    it('debería actualizar un recurso exitosamente', async () => {
      const updatedItem = { nombre: 'Cliente Actualizado' };
      const mockResponse = { data: { id: 1, ...updatedItem } };
      
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const { result } = renderHook(() => useFetch('/clientes', { autoFetch: false }));

      const response = await result.current.putData(1, updatedItem);

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_BASE_URL}/clientes/1`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        }
      );
      expect(response.success).toBe(true);
      expect(response.data).toEqual(mockResponse.data);
    });

    it('debería manejar errores al actualizar', async () => {
      const errorMessage = 'Error al actualizar';
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: errorMessage }),
      });

      const { result } = renderHook(() => useFetch('/clientes', { autoFetch: false }));

      const response = await result.current.putData(1, {});

      expect(response.success).toBe(false);
      expect(response.error).toBe(errorMessage);
    });
  });

  describe('deleteData (DELETE)', () => {
    it('debería eliminar un recurso exitosamente', async () => {
      const mockResponse = { data: { message: 'Eliminado' } };
      
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const { result } = renderHook(() => useFetch('/clientes', { autoFetch: false }));

      const response = await result.current.deleteData(1);

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_BASE_URL}/clientes/1`,
        { method: 'DELETE' }
      );
      expect(response.success).toBe(true);
      expect(response.data).toEqual(mockResponse.data);
    });

    it('debería manejar errores al eliminar', async () => {
      const errorMessage = 'Error al eliminar';
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: errorMessage }),
      });

      const { result } = renderHook(() => useFetch('/clientes', { autoFetch: false }));

      const response = await result.current.deleteData(1);

      expect(response.success).toBe(false);
      expect(response.error).toBe(errorMessage);
    });
  });

  describe('Estados de loading y error', () => {
    it('debería actualizar loading durante la petición', async () => {
      global.fetch = vi.fn().mockImplementationOnce(() => 
        new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ data: [] })
        }), 100))
      );

      const { result } = renderHook(() => useFetch('/clientes', { autoFetch: false }));

      expect(result.current.loading).toBe(false);

      const promise = result.current.fetchData();
      
      await waitFor(() => {
        expect(result.current.loading).toBe(true);
      });

      await promise;

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });
});
