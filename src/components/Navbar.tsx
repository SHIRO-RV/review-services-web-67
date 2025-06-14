
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
// Button component is no longer used here as "Get Started" is removed.
// import { Button } from '@/components/ui/button'; 
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // This state is not currently used to change styles but kept for potential future use
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group"> {/* Removed ml-16 */}
            <div className="relative">
              {/* Increased logo size from w-12 h-12 to w-16 h-16 */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-105 shadow-md">
                <img 
                  src="/lovable-uploads/f7e698c3-40a5-4d57-8b40-0e22e9e4bf9a.png" 
                  alt="ReView AI Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> {/* Increased text size slightly */}
              RE-VIEW
            </h1>
          </Link>
          
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary text-white shadow-md' // Active link style
                      : 'text-gray-700 hover:text-primary hover:bg-gray-100' // Inactive link style for white bg
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* "Get Started" button removed from desktop view */}
          {/* 
          <div className="hidden md:block">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div> 
          */}

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 focus:outline-none transition-colors" // Adjusted colors for white bg
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 shadow-lg"> {/* Adjusted colors for white bg */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary text-white shadow-md' // Active link style
                    : 'text-gray-700 hover:text-primary hover:bg-gray-100' // Inactive link style
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* "Get Started" button removed from mobile view */}
            {/*
            <div className="px-3 py-2">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
            */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
