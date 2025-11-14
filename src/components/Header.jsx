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
    <header className="bg-[#f2f2f2] shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleHome}
          >
            <div className="bg-[#f2f2f2] p-3 rounded-full shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]">
              <Dumbbell className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="hidden md:flex text-xl font-bold text-gray-700">
              Power Gym Montenegro
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleHome}
              className="flex items-center space-x-2 px-4 py-2 bg-[#f2f2f2] rounded-xl shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] transition-all cursor-pointer"
              title="Ir al inicio"
            >
              <Home className="h-5 w-5 text-blue-600" />
              <span className="hidden sm:inline text-blue-700 font-medium">Inicio</span>
            </button>
           
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-[#f2f2f2] rounded-xl shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] transition-all"
            >
              <LogOut className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">Salir</span>
            </button>
            <div className="flex items-center space-x-2 px-4 py-2 bg-[#f2f2f2] rounded-xl">
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
