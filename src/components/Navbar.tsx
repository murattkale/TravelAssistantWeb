import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, User, Map } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              TravelPlanner
            </Link>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/plan-trip"
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
              >
                <Map size={20} />
                <span>Plan Trip</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;