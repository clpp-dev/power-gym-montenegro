// Mock de usuario administrador
export const adminUser = {
  username: 'admin',
  password: 'admin123',
  nombre: 'Admin',
  email:"admin@powergym.com",
  rol: 'admin'
};

// Mock de membresías
export const initialMembresias = [
  {
    id: '1',
    nombre: 'Plan Full Access',
    tipo: 'Mensual',
    duracion: 30,
    precio: 350000,
    descripcion: 'Acceso completo a todas las instalaciones.'
  },
  {
    id: '2',
    nombre: 'Plan Mañanas',
    tipo: 'Mensual',
    duracion: 30,
    precio: 195000,
    descripcion: 'Acceso solo en horario de mañana (6am - 3p).'
  },
  {
    id: '3',
    nombre: 'Plan Trimestral',
    tipo: 'Trimestral',
    duracion: 90,
    precio: 935000,
    descripcion: 'Acceso completo con descuento por 3 meses.'
  },
  {
    id: '4',
    nombre: 'Plan Anual VIP',
    tipo: 'Anual',
    duracion: 365,
    precio: 3600000,
    descripcion: 'Todos los beneficios, incluye entrenador personal.'
  }
];

// Mock de clientes
export const initialClientes = [
  {
    id: '1',
    nombre: 'Juan Martínez',
    cedula: '123456789',
    email: 'juan.martinez@email.com',
    telefono: '321-123-3343',
    correoElectronico: 'juan.martinez@email.com',
    fechaIngreso: '2024-01-15',
    estado: 'Activo',
    membresia: {
      id: '1',
      nombre: 'Plan Full Access',
      tipo: 'Mensual',
      fechaInicio: '2024-01-15',
      fechaFin: '2024-12-15'
    }
  },
  {
    id: '2',
    nombre: 'Carlos Rodriguez',
    cedula: '987654321',
    email: 'carlos.r@email.com',
    telefono: '311-567-5424',
    correoElectronico: 'carlos.r@email.com',
    fechaIngreso: '2023-06-20',
    estado: 'Inactivo',
    membresia: null
  },
  {
    id: '3',
    nombre: 'Laura Hernández',
    cedula: '456655333',
    email: 'laura.h@email.com',
    telefono: '315-345-3415',
    correoElectronico: 'laura.h@email.com',
    fechaIngreso: '2024-03-10',
    estado: 'Próximo a Vencer',
    membresia: {
      id: '2',
      nombre: 'Plan Mañanas',
      tipo: 'Mensual',
      fechaInicio: '2024-03-10',
      fechaFin: '2024-12-10'
    }
  }
];
