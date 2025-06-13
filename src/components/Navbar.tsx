
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md border-b' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ReView AI
              </h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection('team')} className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Team
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <Button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get Started
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b">
            <button onClick={() => scrollToSection('home')} className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition-colors w-full text-left">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition-colors w-full text-left">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition-colors w-full text-left">
              Services
            </button>
            <button onClick={() => scrollToSection('team')} className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition-colors w-full text-left">
              Team
            </button>
            <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition-colors w-full text-left">
              Contact
            </button>
            <div className="px-3 py-2">
              <Button onClick={() => scrollToSection('contact')} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
