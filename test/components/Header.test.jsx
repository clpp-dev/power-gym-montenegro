import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
const mockLogout = vi.fn();
const mockUser = {
  username: 'admin',
  nombre: 'Admin Test',
  rol: 'admin',
};

// Mock de useAuth
vi.mock('../../src/context/AuthContext', () => ({
  useAuth: () => ({ 
    user: mockUser, 
    logout: mockLogout,
    loading: false 
  }),
}));

// Mock de useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Importar después de los mocks
const Header = (await import('../../src/components/Header')).default;

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería renderizar el componente correctamente', () => {
    renderHeader();
    
    // Simplemente verificar que el componente se renderiza
    expect(screen.getByText('Power Gym Montenegro')).toBeInTheDocument();
  });

  it('debería mostrar el nombre del usuario', () => {
    renderHeader();
    
    expect(screen.getByText('Admin Test')).toBeInTheDocument();
  });

  it('debería renderizar los botones principales', () => {
    renderHeader();
    
    expect(screen.getByText('Salir')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
  });
});
