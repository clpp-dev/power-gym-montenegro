# 🔐 Credenciales y Acceso Rápido

## Acceso al Sistema

### URL de Desarrollo
```
http://localhost:5173
```

### Credenciales de Administrador
```
Usuario: admin
Contraseña: admin123
```

---

## 🎯 Puntos de Acceso Rápido

### Rutas de la Aplicación

| Ruta | Descripción | Requiere Auth |
|------|-------------|---------------|
| `/login` | Página de inicio de sesión | No |
| `/dashboard` | Dashboard principal | Sí |
| `/clientes` | Gestión de clientes | Sí |
| `/membresias` | Gestión de membresías | Sí |

---

## 📊 Datos de Prueba

### Clientes Precargados

1. **Juan Martínez**
   - Cédula: 123456789
   - Email: juan.martinez@email.com
   - Teléfono: 321-123-3343
   - Estado: Activo
   - Membresía: Plan Full Access

2. **Carlos Rodriguez**
   - Cédula: 987654321
   - Email: carlos.r@email.com
   - Teléfono: 311-567-5424
   - Estado: Inactivo
   - Membresía: Ninguna

3. **Laura Hernández**
   - Cédula: 456655333
   - Email: laura.h@email.com
   - Teléfono: 315-345-3415
   - Estado: Próximo a Vencer
   - Membresía: Plan Mañanas

### Membresías Precargadas

1. **Plan Full Access**
   - Tipo: Mensual
   - Duración: 30 días
   - Precio: $350,000
   - Descripción: Acceso completo a todas las instalaciones

2. **Plan Mañanas**
   - Tipo: Mensual
   - Duración: 30 días
   - Precio: $195,000
   - Descripción: Acceso solo en horario de mañana (6am - 3p)

3. **Plan Trimestral**
   - Tipo: Trimestral
   - Duración: 90 días
   - Precio: $935,000
   - Descripción: Acceso completo con descuento por 3 meses

4. **Plan Anual VIP**
   - Tipo: Anual
   - Duración: 365 días
   - Precio: $3,600,000
   - Descripción: Todos los beneficios, incluye entrenador personal

---

## 🔧 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa del build
npm run preview
```

---

## 💾 LocalStorage Keys

El sistema utiliza las siguientes claves en LocalStorage:

```javascript
// Usuario autenticado
localStorage.getItem('currentUser')

// Lista de clientes
localStorage.getItem('clientes')

// Lista de membresías
localStorage.getItem('membresias')
```

---

## 🧪 Pruebas Rápidas

### Test 1: Login
1. Ir a http://localhost:5173/login
2. Ingresar: admin / admin123
3. Verificar redirección a dashboard

### Test 2: Crear Cliente
1. Dashboard → Gestionar Clientes
2. Clic en "Crear Cliente"
3. Llenar formulario y guardar
4. Verificar que aparece en la tabla

### Test 3: Asignar Membresía
1. En tabla de clientes, clic en icono de tarjeta
2. Seleccionar una membresía
3. Confirmar
4. Verificar que cliente cambia a "Activo"

### Test 4: Crear Membresía
1. Dashboard → Gestionar Membresías
2. Clic en "Crear Membresía"
3. Llenar formulario y guardar
4. Verificar que aparece en la tabla

### Test 5: Búsqueda
1. En clientes, escribir en barra de búsqueda
2. Verificar filtrado en tiempo real
3. Repetir en membresías

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot GET /"
- Solución: Asegúrate de que el servidor esté corriendo con `npm run dev`

### Error: No aparecen los datos
- Solución: Limpia LocalStorage y recarga la página

### Error: No puedo iniciar sesión
- Solución: Verifica que uses exactamente `admin` y `admin123`

### Error: Puerto 5173 en uso
- Solución: Cierra otras aplicaciones que usen ese puerto o cambia el puerto en vite.config.js

---

## 📱 Compatibilidad de Navegadores

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+
- ⚠️ Internet Explorer: No soportado

---

## 🔄 Actualizar Datos Iniciales

Para modificar los datos mock iniciales, edita:
```
src/data/mockData.js
```

Luego limpia LocalStorage y recarga la aplicación.

---

## 📞 Información de Contacto

Para soporte técnico o consultas sobre el proyecto, contacta al equipo de desarrollo.

---

**Última actualización**: Noviembre 2025
