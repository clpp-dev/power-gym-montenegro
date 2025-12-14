import { describe, it, expect } from 'vitest';

/**
 * Tests para utilidades y validaciones generales
 */
describe('Utilidades', () => {
  describe('Formato de datos', () => {
    it('debería validar formato de cédula', () => {
      const validarCedula = (cedula) => {
        return /^[0-9]{6,10}$/.test(cedula);
      };

      expect(validarCedula('123456789')).toBe(true);
      expect(validarCedula('12345')).toBe(false);
      expect(validarCedula('abc123')).toBe(false);
      expect(validarCedula('')).toBe(false);
    });

    it('debería validar formato de email', () => {
      const validarEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      };

      expect(validarEmail('test@example.com')).toBe(true);
      expect(validarEmail('test@example')).toBe(false);
      expect(validarEmail('test.example.com')).toBe(false);
      expect(validarEmail('')).toBe(false);
    });

    it('debería validar formato de teléfono', () => {
      const validarTelefono = (telefono) => {
        return /^[0-9]{7,10}$/.test(telefono.replace(/[-\s]/g, ''));
      };

      expect(validarTelefono('3211234567')).toBe(true);
      expect(validarTelefono('321-123-4567')).toBe(true);
      expect(validarTelefono('321 123 4567')).toBe(true);
      expect(validarTelefono('123')).toBe(false);
      expect(validarTelefono('abc')).toBe(false);
    });
  });

  describe('Formato de fechas', () => {
    it('debería formatear fecha a string legible', () => {
      const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES');
      };

      const fecha = '2024-01-15';
      const resultado = formatearFecha(fecha);
      expect(resultado).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('debería calcular días entre fechas', () => {
      const calcularDias = (fechaInicio, fechaFin) => {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const diferencia = fin - inicio;
        return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
      };

      expect(calcularDias('2024-01-01', '2024-01-31')).toBe(30);
      expect(calcularDias('2024-01-15', '2024-01-15')).toBe(0);
    });
  });

  describe('Formato de precios', () => {
    it('debería formatear precio a moneda colombiana', () => {
      const formatearPrecio = (precio) => {
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
        }).format(precio);
      };

      expect(formatearPrecio(350000)).toContain('350.000');
      expect(formatearPrecio(1000000)).toContain('1.000.000');
    });
  });

  describe('Validaciones de campos', () => {
    it('debería validar campos requeridos', () => {
      const validarCampoRequerido = (valor) => {
        return !!(valor && valor.toString().trim().length > 0);
      };

      expect(validarCampoRequerido('texto')).toBe(true);
      expect(validarCampoRequerido('')).toBe(false);
      expect(validarCampoRequerido('   ')).toBe(false);
      expect(validarCampoRequerido(null)).toBe(false);
      expect(validarCampoRequerido(undefined)).toBe(false);
    });

    it('debería validar longitud mínima', () => {
      const validarLongitudMinima = (valor, min) => {
        return !!(valor && valor.length >= min);
      };

      expect(validarLongitudMinima('12345', 5)).toBe(true);
      expect(validarLongitudMinima('1234', 5)).toBe(false);
      expect(validarLongitudMinima('', 5)).toBe(false);
    });

    it('debería validar rango de números', () => {
      const validarRango = (valor, min, max) => {
        const numero = Number(valor);
        return !isNaN(numero) && numero >= min && numero <= max;
      };

      expect(validarRango(50, 0, 100)).toBe(true);
      expect(validarRango(0, 0, 100)).toBe(true);
      expect(validarRango(100, 0, 100)).toBe(true);
      expect(validarRango(-1, 0, 100)).toBe(false);
      expect(validarRango(101, 0, 100)).toBe(false);
    });
  });

  describe('Manipulación de strings', () => {
    it('debería capitalizar primera letra', () => {
      const capitalizarPrimeraLetra = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      };

      expect(capitalizarPrimeraLetra('hola')).toBe('Hola');
      expect(capitalizarPrimeraLetra('HOLA')).toBe('Hola');
      expect(capitalizarPrimeraLetra('hOlA')).toBe('Hola');
    });

    it('debería capitalizar cada palabra', () => {
      const capitalizarPalabras = (str) => {
        return str
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      };

      expect(capitalizarPalabras('juan pérez')).toBe('Juan Pérez');
      expect(capitalizarPalabras('JUAN PÉREZ')).toBe('Juan Pérez');
    });

    it('debería truncar texto largo', () => {
      const truncarTexto = (str, maxLength) => {
        if (str.length <= maxLength) return str;
        return str.substring(0, maxLength) + '...';
      };

      expect(truncarTexto('Texto corto', 20)).toBe('Texto corto');
      expect(truncarTexto('Este es un texto muy largo', 10)).toBe('Este es un...');
    });
  });
});
