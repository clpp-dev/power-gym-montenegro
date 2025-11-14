import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Dumbbell, User, Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor ingresa usuario y contraseña');
      return;
    }

    const result = login(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f2f2f2] to-[#f0f4f8] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-[#f2f2f2] rounded-3xl shadow-[20px_20px_40px_#a3b1c6,-20px_-20px_40px_#ffffff] p-8">
          {/* Logo y título */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-[#f2f2f2] p-5 rounded-full shadow-[inset_8px_8px_16px_#a3b1c6,inset_-8px_-8px_16px_#ffffff] mb-4">
              <Dumbbell className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-700 mb-1">Gimnasio Gym Power</h1>
            <p className="text-gray-500 text-sm">Bienvenido de nuevo</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Usuario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-[#f2f2f2] border-0 rounded-xl shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] outline-none transition-all text-gray-700"
                  placeholder="Ingresa tu usuario"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-[#f2f2f2] border-0 rounded-xl shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] outline-none transition-all text-gray-700"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-[#f2f2f2] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Botón Ingresar */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-[#f2f2f2] text-blue-600 font-semibold py-3 rounded-xl shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] active:shadow-[inset_8px_8px_16px_#a3b1c6,inset_-8px_-8px_16px_#ffffff] transition-all"
            >
              Ingresar
            </button>

            {/* Enlace olvidaste contraseña */}
            {/* <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
