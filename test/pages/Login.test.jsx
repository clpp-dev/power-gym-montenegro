import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

// Mock de useAuth
vi.mock('../../src/context/AuthContext', () => ({
  useAuth: () => ({ 
    login: mockLogin, 
    user: null, 
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

// Mock de sonner toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

import { toast } from 'sonner';

// Importar después de los mocks
const Login = (await import('../../src/pages/Login')).default;

describe('Login Page', () => {
  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería renderizar el formulario de login', () => {
    renderLogin();
    
    expect(screen.getByText('Power Gym montenegro')).toBeInTheDocument();
    expect(screen.getByText('Bienvenido de nuevo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa tu usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa tu contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
  });

  it('debería actualizar los campos de entrada', () => {
    renderLogin();
    
    const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
  });

  it('debería tener los campos de tipo correcto', () => {
    renderLogin();
    
    const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    
    expect(usernameInput).toHaveAttribute('type', 'text');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
