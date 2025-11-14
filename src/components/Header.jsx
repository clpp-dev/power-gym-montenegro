import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Dumbbell, User, LogOut, Home } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleHome}
          >
            <div className="bg-blue-100 p-2 rounded-full">
              <Dumbbell className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="hidden md:flex text-xl font-bold text-gray-800">
              Power Gym Montenegro
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleHome}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors cursor-pointer"
              title="Ir al inicio"
            >
              <Home className="h-5 w-5 text-blue-600" />
              <span className="hidden sm:inline text-blue-700 font-medium">Inicio</span>
            </button>
           
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">Salir</span>
            </button>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">{user?.nombre || 'Admin'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
