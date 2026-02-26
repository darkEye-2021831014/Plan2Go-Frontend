import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const trackDummy = async (action, description) => {
    const body = {
      user_id: user?.id || 133,
      action: `${action}`,
      description: `${description}`
    };

    try {
      const response = await fetch('http://localhost:8080/users/activity/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to track activity');
      }

    } catch (error) {
      console.error('Error tracking activity:', error);
    }
  };
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Plan2Go</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/tour-planning"
                  onClick={() => trackDummy("planning button", "visiting planning page")}
                  className="text-gray-600 hover:text-primary-600 px-4 py-2 rounded-xl text-sm font-medium transition hover:bg-primary-50"
                >
                  Planning
                </Link>
                <Link
                  to="/tour-monitor"
                  onClick={() => trackDummy("monitor button", "visiting monitor page")}
                  className="text-gray-600 hover:text-primary-600 px-4 py-2 rounded-xl text-sm font-medium transition hover:bg-primary-50"
                >
                  Monitor
                </Link>
                <Link
                  to="/tour-guides"
                  onClick={() => trackDummy("guides button", "visiting guides page")}
                  className="text-gray-600 hover:text-primary-600 px-4 py-2 rounded-xl text-sm font-medium transition hover:bg-primary-50"
                >
                  Guides
                </Link>
                <Link
                  to="/maintenance"
                  onClick={() => trackDummy("settings button", "visiting settings page")}
                  className="text-gray-600 hover:text-primary-600 px-4 py-2 rounded-xl text-sm font-medium transition hover:bg-primary-50"
                >
                  Settings
                </Link>
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                  <span className="text-sm text-gray-700 font-medium">
                    👋 {user ? `${user.first_name} ${user.last_name}` : 'Guest'}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => trackDummy("signin button", "he want to login")}
                  className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-xl text-sm font-medium transition hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => trackDummy("getstarted button", "try to create account")}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;