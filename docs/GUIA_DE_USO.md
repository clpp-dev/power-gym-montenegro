# Guía de Uso - Power Gym Montenegro

## 📚 Manual de Usuario

### Inicio de Sesión

1. Abre la aplicación en tu navegador: `http://localhost:5173`
2. Ingresa las credenciales:
   - **Usuario**: `admin`
   - **Contraseña**: `admin123`
3. Haz clic en el botón "Ingresar"

### Dashboard Principal

Después de iniciar sesión, verás dos opciones principales:

- **Gestionar Clientes**: Administra la información de los miembros del gimnasio
- **Gestionar Membresías**: Administra los planes de membresía disponibles

---

## 👥 Gestión de Clientes

### Ver Clientes

- La tabla muestra todos los clientes registrados
- Columnas: Nombre/Cédula, Email, Teléfono, Estado, Membresía, Acciones
- Usa la barra de búsqueda para filtrar clientes por nombre, cédula o email
- La tabla está paginada (10 clientes por página)

### Crear un Cliente Nuevo

1. Haz clic en el botón "Crear Cliente" (esquina superior derecha)
2. Completa el formulario:
   - Nombre Completo
   - Cédula / ID
   - Teléfono
   - Correo Electrónico
   - Fecha de Ingreso
3. Haz clic en "Guardar Cambios"
4. El nuevo cliente aparecerá en la lista con estado "Inactivo"

### Editar un Cliente

1. Haz clic en el icono de lápiz (✏️) en la fila del cliente
2. Modifica los campos que necesites
3. Haz clic en "Guardar Cambios"

### Asignar Membresía a un Cliente

1. Haz clic en el icono de tarjeta (💳) en la fila del cliente
2. Selecciona el tipo de membresía (se mostrará el precio y duración)
3. Selecciona la fecha de inicio
4. La fecha de fin se calculará automáticamente según la duración del plan
5. Haz clic en "Asignar Membresía"
6. El cliente cambiará a estado "Activo"

### Eliminar un Cliente

1. Haz clic en el icono de basura (🗑️) en la fila del cliente
2. Confirma la acción en el modal de confirmación
3. El cliente será eliminado permanentemente

---

## 💳 Gestión de Membresías

### Ver Membresías

- La tabla muestra todos los planes de membresía disponibles
- Columnas: Nombre, Tipo, Duración, Precio, Descripción, Acciones
- Usa la barra de búsqueda para filtrar membresías por nombre o tipo

### Crear una Membresía Nueva

1. Haz clic en el botón "Crear Membresía" (esquina superior derecha)
2. Completa el formulario:
   - Tipo de Membresía (ej: "Plan Premium")
   - Duración en días (ej: 30, 90, 365)
   - Precio (ej: 350000)
   - Descripción (opcional)
3. Haz clic en "Guardar Cambios"

### Editar una Membresía

1. Haz clic en el icono de lápiz (✏️) en la fila de la membresía
2. Modifica los campos necesarios
3. Haz clic en "Guardar Cambios"

### Eliminar una Membresía

1. Haz clic en el icono de basura (🗑️) en la fila de la membresía
2. Confirma la acción en el modal de confirmación
3. La membresía será eliminada permanentemente

---

## 🔍 Funciones de Búsqueda

### Buscar Clientes
Puedes buscar clientes usando cualquiera de estos criterios:
- Nombre completo o parte del nombre
- Número de cédula
- Correo electrónico

### Buscar Membresías
Puedes buscar membresías usando:
- Nombre de la membresía
- Tipo de membresía

---

## 📊 Estados de Clientes

Los clientes pueden tener tres estados diferentes:

- **Activo** (Verde): Cliente con membresía vigente
- **Inactivo** (Rojo): Cliente sin membresía asignada
- **Próximo a Vencer** (Amarillo): Membresía próxima a vencerse

---

## 💾 Persistencia de Datos

### LocalStorage
Todos los datos se guardan automáticamente en el navegador usando LocalStorage:
- Los datos persisten incluso después de cerrar el navegador
- Los datos son específicos del navegador y dispositivo
- No se comparten entre diferentes navegadores

### Resetear Datos
Para volver a los datos iniciales:
1. Abre las Herramientas de Desarrollador (F12)
2. Ve a la pestaña "Application" o "Almacenamiento"
3. Busca "Local Storage"
4. Elimina las claves: `clientes`, `membresias`, `currentUser`
5. Recarga la página

---

## 🚪 Cerrar Sesión

Para cerrar sesión:
1. Haz clic en el botón "Salir" en la esquina superior derecha
2. Serás redirigido a la pantalla de login

---

## ⚠️ Consideraciones Importantes

1. **Backup de datos**: Como los datos están en LocalStorage, asegúrate de hacer respaldo antes de limpiar el caché del navegador
2. **Navegador**: Usa navegadores modernos (Chrome, Firefox, Edge) para mejor compatibilidad
3. **Eliminaciones**: Las eliminaciones son permanentes y no se pueden deshacer
4. **Membresías asignadas**: Al eliminar una membresía que está asignada a clientes, los clientes mantendrán la información de esa membresía

---

## 🐛 Solución de Problemas

### No puedo iniciar sesión
- Verifica que uses: usuario `admin` y contraseña `admin123`
- Asegúrate de que las credenciales estén en minúsculas

### Los datos no se guardan
- Verifica que LocalStorage esté habilitado en tu navegador
- Revisa que no estés en modo incógnito/privado

### La aplicación no carga
- Verifica que el servidor de desarrollo esté corriendo (`npm run dev`)
- Revisa que el puerto 5173 no esté siendo usado por otra aplicación
- Limpia el caché del navegador y recarga

---

## 📞 Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.
