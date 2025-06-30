
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-36">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Company Logo - Made Round and Animated */}
          <div className="mb-8 flex justify-center ml-16">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-2xl transform hover:scale-110 transition-all duration-500 animate-fade-in">
                <img 
                  src="/lovable-uploads/f7e698c3-40a5-4d57-8b40-0e22e9e4bf9a.png" 
                  alt="ReView AI Logo" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent animate-fade-in">
            View the future.
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent animate-fade-in delay-300">
            Re-View the possibilities.
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 animate-fade-in delay-500 leading-relaxed">
            Pioneering AI-powered solutions and cutting-edge technology services. 
            <br className="hidden md:block" />
            Founded by visionary minds, building tomorrow's digital landscape today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-700">
            <Link to="/services">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Explore Our Solutions
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-600 text-gray-800 hover:bg-gray-800 hover:text-white hover:border-gray-800 px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                Get Free Consultation
              </Button>
            </Link>
          </div>

          <div className="mt-16 animate-bounce">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowDown className="h-8 w-8 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
