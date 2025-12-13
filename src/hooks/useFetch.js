import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Hook personalizado para hacer peticiones HTTP a la API
 * @param {string} endpoint - El endpoint de la API (ej: '/clientes', '/membresias')
 * @param {object} options - Opciones adicionales
 * @param {boolean} options.autoFetch - Si debe hacer fetch automáticamente al montar (default: true)
 * @param {Array} options.dependencies - Dependencias para re-ejecutar el fetch
 */
export const useFetch = (endpoint, options = {}) => {
  const { autoFetch = true, dependencies = [] } = options;
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Función para hacer peticiones GET
   */
  const fetchData = async () => {
    if (!endpoint) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error en la petición');
      }

      // La API retorna los datos en result.data
      setData(result.data || result);
      return result.data || result;
    } catch (err) {
      setError(err.message);
      console.error('Error en useFetch GET:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función para hacer peticiones POST
   */
  const postData = async (body) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al crear el recurso');
      }

      return { success: true, data: result.data };
    } catch (err) {
      setError(err.message);
      console.error('Error en useFetch POST:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función para hacer peticiones PUT
   */
  const putData = async (id, body) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar el recurso');
      }

      return { success: true, data: result.data };
    } catch (err) {
      setError(err.message);
      console.error('Error en useFetch PUT:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función para hacer peticiones DELETE
   */
  const deleteData = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar el recurso');
      }

      return { success: true, data: result.data };
    } catch (err) {
      setError(err.message);
      console.error('Error en useFetch DELETE:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch al montar el componente si autoFetch es true
  useEffect(() => {
    if (autoFetch && endpoint) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, autoFetch, ...dependencies]);

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    putData,
    deleteData,
    refetch: fetchData, // Alias para mayor claridad
  };
};

export default useFetch;
