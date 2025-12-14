# Tests Unitarios - Power Gym Montenegro

Este proyecto incluye tests unitarios completos utilizando **Vitest** y **React Testing Library**.

## 📁 Estructura de Tests

```
test/
├── setup.js                          # Configuración global de tests
├── hooks/
│   └── useFetch.test.js             # Tests del hook useFetch
├── context/
│   ├── AuthContext.test.jsx          # Tests del contexto de autenticación
│   ├── ClientesContext.test.jsx      # Tests del contexto de clientes
│   └── MembresiasContext.test.jsx    # Tests del contexto de membresías
├── components/
│   ├── Modal.test.jsx                # Tests del componente Modal
│   └── Header.test.jsx               # Tests del componente Header
├── pages/
│   └── Login.test.jsx                # Tests de la página de Login
└── utils/
    └── validaciones.test.js          # Tests de utilidades y validaciones
```

## 🚀 Comandos Disponibles

### Ejecutar tests en modo watch
```bash
npm test
```

### Ejecutar tests una sola vez
```bash
npm run test:run
```

### Ejecutar tests con interfaz visual
```bash
npm run test:ui
```

### Generar reporte de cobertura
```bash
npm run test:coverage
```

## 📊 Cobertura de Tests

### Hooks
- ✅ **useFetch**: Tests completos de GET, POST, PUT, DELETE
  - Peticiones exitosas
  - Manejo de errores
  - Estados de loading
  - Auto-fetch condicional

### Contextos
- ✅ **AuthContext**: 
  - Login exitoso/fallido
  - Logout
  - Persistencia en localStorage
  - Validación de credenciales
  
- ✅ **ClientesContext**: 
  - CRUD completo de clientes
  - Búsqueda por cédula
  - Manejo de errores
  - Mapeo de datos de API
  
- ✅ **MembresiasContext**: 
  - CRUD completo de membresías
  - Búsqueda por nombre y tipo
  - Manejo de errores
  - Mapeo de datos de API

### Componentes
- ✅ **Modal**: 
  - Renderizado condicional
  - Eventos de cierre
  - Props correctas
  
- ✅ **Header**: 
  - Navegación
  - Logout
  - Mostrar usuario
  - Interacciones

### Páginas
- ✅ **Login**: 
  - Validación de formularios
  - Login exitoso/fallido
  - Mensajes de error
  - Navegación después del login

### Utilidades
- ✅ **Validaciones**: 
  - Validación de cédula, email, teléfono
  - Formato de fechas y precios
  - Manipulación de strings

## 🛠️ Tecnologías Utilizadas

- **Vitest**: Framework de testing rápido y moderno
- **@testing-library/react**: Utilidades para testing de componentes React
- **@testing-library/jest-dom**: Matchers adicionales para aserciones
- **@testing-library/user-event**: Simulación de eventos de usuario
- **jsdom**: Entorno DOM para Node.js
- **happy-dom**: Alternativa ligera a jsdom

## 📝 Convenciones de Tests

### Estructura de un test
```javascript
describe('NombreDelComponente/Hook/Context', () => {
  beforeEach(() => {
    // Limpiar mocks y preparar estado
  });

  describe('funcionalidad específica', () => {
    it('debería comportarse de cierta manera', () => {
      // Arrange (preparar)
      // Act (ejecutar)
      // Assert (verificar)
    });
  });
});
```

### Nombres descriptivos
- Usar "debería" en la descripción de cada test
- Ser específico sobre lo que se está probando
- Incluir el resultado esperado

### Ejemplos:
✅ `it('debería actualizar el estado cuando se hace login exitoso')`
✅ `it('debería mostrar error si falta el usuario')`
❌ `it('test login')`

## 🔍 Mocks

Los tests utilizan mocks para:
- `localStorage`: Simulación de almacenamiento local
- `fetch`: Simulación de peticiones HTTP
- `react-router-dom`: Simulación de navegación
- `sonner`: Simulación de notificaciones toast

## 📈 Mejores Prácticas

1. **Aislar tests**: Cada test debe ser independiente
2. **Limpiar después**: Usar `beforeEach` y `afterEach` apropiadamente
3. **Esperar async**: Usar `waitFor` para operaciones asíncronas
4. **Probar comportamiento**: No probar implementación interna
5. **Cobertura significativa**: Priorizar casos de uso reales

## 🐛 Debugging

Para debuggear un test específico:
```bash
# Ejecutar solo un archivo
npm test -- useFetch.test.js

# Ejecutar solo un describe/it específico
npm test -- -t "nombre del test"
```

## 📚 Recursos

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## ✨ Siguientes Pasos

- [ ] Agregar tests de integración
- [ ] Agregar tests E2E con Playwright
- [ ] Aumentar cobertura a 90%+
- [ ] Configurar CI/CD para ejecutar tests automáticamente
- [ ] Agregar tests de performance
- [ ] Implementar tests de accesibilidad

---

**Nota**: Mantener los tests actualizados es tan importante como mantener el código de producción.
