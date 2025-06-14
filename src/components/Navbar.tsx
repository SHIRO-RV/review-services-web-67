
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-gradient-to-r from-white/95 via-gray-50/95 to-white/95 backdrop-blur-sm shadow-md border-b border-gray-200/30'
    } rounded-b-3xl`}>
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center space-x-4 group absolute left-6 z-10">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-gradient-to-r from-blue-400 to-purple-500 p-0.5 group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img 
                    src="/lovable-uploads/f7e698c3-40a5-4d57-8b40-0e22e9e4bf9a.png" 
                    alt="ReView AI Logo" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-blue-900 transition-all duration-300">
                RE-VIEW
              </h1>
              <span className="text-xs text-gray-500 font-medium tracking-wide">AI Solutions</span>
            </div>
          </Link>
          
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-8 py-3 shadow-lg border border-gray-200/50">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:shadow-md hover:scale-105'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-full text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-6 pt-4 pb-6 space-y-2 sm:px-8 bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-md border-t border-gray-200/50 shadow-inner rounded-b-3xl">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:shadow-md hover:scale-105'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
