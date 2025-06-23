import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, UserCircle, X, LogOut, User, Mail, Shield, Menu } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://silaibazar.onrender.com/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsProfileModalOpen(false);
    navigate("/login");
  };

  const closeModal = () => {
    setIsProfileModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 px-6 py-4 sticky top-0 z-50 relative">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/50 to-purple-50/50 -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative p-3 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Scissors className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent tracking-tight">
                SilaiBazar
              </span>
              <span className="text-xs text-gray-500 -mt-1 font-medium">Tailoring Made Easy</span>
            </div>
          </Link>

          {/* Center: Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {['About', 'Contact', 'FAQ'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase()}`} 
                className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium text-lg transition-all duration-300 rounded-xl hover:bg-blue-50/50 group"
              >
                {item}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
              </Link>
            ))}
          </div>

          {/* Right: Auth or Profile */}
          <div className="flex items-center space-x-4">
            {!token ? (
              <>
                <Link 
                  to="/login" 
                  className="hidden sm:block text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="relative group overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Sign Up</span>
                </Link>
              </>
            ) : (
              <button 
                onClick={() => setIsProfileModalOpen(true)}
                className="relative group p-2 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50 transition-all duration-300 hover:shadow-lg"
              >
                <UserCircle className="w-8 h-8 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
            <div className="px-6 py-4 space-y-3">
              {['About', 'Contact', 'FAQ'].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase()}`} 
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              {!token && (
                <>
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl text-center hover:shadow-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          ></div>
          
          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-t-3xl p-6 text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-t-3xl"></div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                  <UserCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-1">Profile</h2>
                <p className="text-blue-100">Account Information</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* User Info Cards */}
              <div className="space-y-3">
                <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200/50">
                  <div className="p-2 bg-blue-100 rounded-xl mr-4">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium">Full Name</p>
                    <p className="text-gray-800 font-semibold">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl border border-gray-200/50">
                  <div className="p-2 bg-green-100 rounded-xl mr-4">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium">Email Address</p>
                    <p className="text-gray-800 font-semibold">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl border border-gray-200/50">
                  <div className="p-2 bg-purple-100 rounded-xl mr-4">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium">Account Role</p>
                    <p className="text-gray-800 font-semibold capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;