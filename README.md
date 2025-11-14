# Power Gym Montenegro - Sistema de Gestión

Sistema web para la administración del gimnasio Power Gym Montenegro. Permite gestionar clientes y membresías de forma eficiente.

## 🚀 Características

- **Autenticación**: Sistema de login para administradores
- **Gestión de Clientes**: CRUD completo (Crear, Leer, Actualizar, Eliminar)
- **Gestión de Membresías**: CRUD completo de planes de membresía
- **Asignación de Membresías**: Asignar membresías a clientes con cálculo automático de fechas
- **Búsqueda**: Buscar clientes y membresías en tiempo real
- **Paginación**: Tabla de clientes con paginación
- **Persistencia**: Datos almacenados en LocalStorage

## 🛠️ Tecnologías

- **React 19** - Librería de UI
- **Vite 7** - Build tool y dev server
- **React Router DOM 7** - Enrutamiento
- **Tailwind CSS 4** - Estilos
- **Lucide React** - Iconos
- **LocalStorage** - Persistencia de datos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## 🔑 Credenciales de Acceso

Para acceder al sistema, usa las siguientes credenciales:

- **Usuario**: `admin`
- **Contraseña**: `admin123`

## 📱 Interfaces

El sistema cuenta con 4 interfaces principales:

### 1. Login
Pantalla de autenticación para acceder al sistema.

### 2. Dashboard (Home)
Vista principal con acceso rápido a:
- Gestionar Clientes
- Gestionar Membresías

### 3. Gestión de Clientes
- Ver lista de clientes con paginación
- Crear nuevos clientes
- Editar información de clientes
- Eliminar clientes
- Asignar membresías a clientes
- Búsqueda de clientes

### 4. Gestión de Membresías
- Ver lista de membresías disponibles
- Crear nuevos planes de membresía
- Editar planes existentes
- Eliminar membresías
- Búsqueda de membresías

## 🗂️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── AsignarMembresia.jsx
│   ├── EliminarCliente.jsx
│   ├── EliminarMembresia.jsx
│   ├── FormularioCliente.jsx
│   ├── FormularioMembresia.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   ├── Modal.jsx
│   └── PrivateRoute.jsx
├── context/            # Contextos de React
│   ├── AuthContext.jsx
│   ├── ClientesContext.jsx
│   └── MembresiasContext.jsx
├── data/              # Datos mock
│   └── mockData.js
├── pages/             # Páginas principales
│   ├── Dashboard.jsx
│   ├── GestionClientes.jsx
│   ├── GestionMembresias.jsx
│   └── Login.jsx
├── App.jsx            # Configuración de rutas
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🎯 Funcionalidades Detalladas

### Gestión de Clientes
- **Crear**: Formulario para añadir nuevos clientes con datos básicos
- **Editar**: Modificar información existente de clientes
- **Eliminar**: Borrar clientes con confirmación
- **Asignar Membresía**: Vincular un plan de membresía a un cliente con cálculo automático de fechas de validez
- **Estados**: Los clientes pueden estar Activos, Inactivos o Próximos a Vencer

### Gestión de Membresías
- **Crear**: Añadir nuevos tipos de membresía
- **Editar**: Modificar planes existentes
- **Eliminar**: Borrar membresías con confirmación
- **Campos**: Nombre, tipo, duración (días), precio y descripción

### Persistencia de Datos
Todos los datos se almacenan en LocalStorage del navegador:
- `currentUser`: Usuario actualmente autenticado
- `clientes`: Lista de todos los clientes
- `membresias`: Lista de todos los planes de membresía

## 🔄 Datos Iniciales

El sistema viene precargado con:
- 3 clientes de ejemplo
- 4 planes de membresía (Full Access, Mañanas, Trimestral, Anual VIP)

## 🚦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview
```

## 📋 Próximas Mejoras

- [ ] Integración con base de datos (Firebase, MongoDB, etc.)
- [ ] Dashboard con estadísticas y gráficos
- [ ] Notificaciones de membresías próximas a vencer
- [ ] Exportar reportes en PDF/Excel
- [ ] Sistema de pagos
- [ ] Gestión de asistencias
- [ ] Roles de usuario (Admin, Recepcionista, etc.)

## 👨‍💻 Desarrollo

Este proyecto está configurado para usar:
- ESLint para linting
- Vite HMR para desarrollo rápido
- Tailwind CSS con configuración personalizada

## 📄 Licencia

Este proyecto es de uso educativo para el Gimnasio Power Gym Montenegro.

---

Desarrollado con ❤️ para Power Gym Montenegro


```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
