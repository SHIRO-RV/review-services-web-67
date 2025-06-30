
import React from 'react';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Footer from '../components/Footer';
import RevyChatBot from '../components/RevyChatBot';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Video - Original Video 3 */}
      <div className="fixed inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/placeholder-video-3.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white"></div>
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="pt-16">
          <Services />
        </div>
        <Footer />
        <RevyChatBot />
      </div>
    </div>
  );
};

export default ServicesPage;
