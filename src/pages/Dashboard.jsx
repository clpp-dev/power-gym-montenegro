import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Gestionar Clientes',
      description: 'Añadir, buscar y editar perfiles de clientes.',
      icon: Users,
      color: 'blue',
      path: '/clientes'
    },
    {
      title: 'Gestionar Membresías',
      description: 'Crear, renovar y administrar los planes de membresía.',
      icon: CreditCard,
      color: 'purple',
      path: '/membresias'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Bienvenida */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Bienvenido, {user?.nombre || 'Admin'}
        </h2>
        <p className="text-gray-600">
          Selecciona una opción para comenzar.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {cards.map((card) => {
          const Icon = card.icon;
          const bgColor = card.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100';
          const iconColor = card.color === 'blue' ? 'text-blue-600' : 'text-purple-600';
          const hoverBg = card.color === 'blue' ? 'hover:bg-blue-50' : 'hover:bg-purple-50';

          return (
            <div
              key={card.title}
              onClick={() => navigate(card.path)}
              className={`bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all ${hoverBg} hover:shadow-xl`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`${bgColor} p-6 rounded-full`}>
                  <Icon className={`h-12 w-12 ${iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
