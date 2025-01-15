import { Plus, Search, ShoppingCart, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const timerRef = useRef(null); // To store the timer
  const navi = useNavigate();

  const handleMouseEnter = () => {

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowProfileMenu(true);
    }, 300);
  };

  const handleMouseLeave = () => {

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowProfileMenu(false);
    }, 300); 
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <nav className="bg-white shadow-md z-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Any-Buy
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1  sm:text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Link to="/cart" className="p-2 text-gray-400 hover:text-gray-500">
              <ShoppingCart className="h-6 w-6" />
            </Link>

            {/* Profile dropdown */}
            <div
              className="ml-4 relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <User className="h-6 w-6" />
              </button>

              {showProfileMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 bg-white ring-1 ring-black ring-opacity-5">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 bg-white text-black"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 bg-white text-black"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* add product */}
            
            <div>
              {user && (user.userType === 'shopkeeper' || user.userType === 'renowned') ? (
                <Link to='/add' className="p-2 text-gray-400 hover:text-gray-500">
                  <Plus className="h-6 w-6 ml-6" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
