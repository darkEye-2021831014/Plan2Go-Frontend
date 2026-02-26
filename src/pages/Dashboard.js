import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Plan Your Trip',
      description: 'Get AI-powered travel recommendations',
      link: '/tour-planning',
      icon: '✈️',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Monitor Tours',
      description: 'Track your active tours and bookings',
      link: '/tour-monitor',
      icon: '📊',
      gradient: 'from-primary-400 to-primary-600'
    },
    {
      title: 'Find Tour Guides',
      description: 'Book verified local guides',
      link: '/tour-guides',
      icon: '👥',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Settings',
      description: 'Manage your account and preferences',
      link: '/maintenance',
      icon: '⚙️',
      gradient: 'from-gray-400 to-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/20 to-accent-50/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            {user?.userType === 'guide'
              ? 'Manage your guide services and help travelers explore'
              : 'Ready to plan your next amazing adventure?'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-3xl`}>
                {action.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                {action.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {action.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">✈️</span>
              </div>
              <span className="text-3xl font-bold text-primary-600">0</span>
            </div>
            <div className="text-sm font-semibold text-gray-700">Active Tours</div>
            <div className="text-xs text-gray-500 mt-1">Start planning your first trip!</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <span className="text-3xl font-bold text-purple-600">0</span>
            </div>
            <div className="text-sm font-semibold text-gray-700">Booked Guides</div>
            <div className="text-xs text-gray-500 mt-1">Find your perfect guide</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <span className="text-3xl font-bold text-accent-600">0</span>
            </div>
            <div className="text-sm font-semibold text-gray-700">Saved Plans</div>
            <div className="text-xs text-gray-500 mt-1">Save your favorite destinations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
