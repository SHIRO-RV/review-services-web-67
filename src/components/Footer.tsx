
import React from 'react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-50 text-gray-800 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/f7e698c3-40a5-4d57-8b40-0e22e9e4bf9a.png" 
                alt="ReView AI Logo" 
                className="w-10 h-10 object-contain"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                RE-VIEW
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Pioneering AI-powered solutions and cutting-edge technology services. Founded by visionary minds, building tomorrow's digital landscape today.
            </p>
            <div className="text-sm text-gray-500">
              © 2025 ReView AI Tech and Solutions
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-primary transition-colors">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-primary transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('team')} className="text-gray-600 hover:text-primary transition-colors">
                  Team
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Services</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Custom Software Development</li>
              <li>AI Solutions & Automation</li>
              <li>UI/UX Design</li>
              <li>IT Consulting</li>
              <li>MVP Development</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>📧 reviewrv25@gmail.com</li>
              <li>📞 +91 8341105135</li>
              <li>🕘 9 AM – 5 PM IST</li>
              <li>📍 India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 md:mb-0">
              Built with passion by the ReView AI team
            </div>
            <div className="text-gray-600 text-sm">
              www.reviewrv25.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
