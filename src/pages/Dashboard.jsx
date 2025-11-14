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
        <h2 className="text-3xl font-bold text-gray-700 mb-2">
          Bienvenido, {user?.nombre || 'Admin'}
        </h2>
        <p className="text-gray-600">
          Selecciona una opción para comenzar.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {cards.map((card) => {
          const Icon = card.icon;
          const iconColor = card.color === 'blue' ? 'text-blue-600' : 'text-purple-600';

          return (
            <div
              key={card.title}
              onClick={() => navigate(card.path)}
              className="bg-[#f2f2f2] rounded-3xl shadow-[12px_12px_24px_#a3b1c6,-12px_-12px_24px_#ffffff] p-8 cursor-pointer transition-all hover:shadow-[inset_12px_12px_24px_#a3b1c6,inset_-12px_-12px_24px_#ffffff] active:shadow-[inset_16px_16px_32px_#a3b1c6,inset_-16px_-16px_32px_#ffffff]"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-[#f2f2f2] p-6 rounded-full shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]">
                  <Icon className={`h-12 w-12 ${iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-700">
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
