
import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Portfolio from '../components/Portfolio';
import RevyChatBot from '../components/RevyChatBot';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Videos */}
      <div className="fixed inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/placeholder-video-1.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white"></div>
        </video>
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-multiply"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/placeholder-video-2.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-white to-gray-100"></div>
        </video>
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/placeholder-video-3.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="pt-16">
          <About />
          <Testimonials />
          <Portfolio />
        </div>
        <Footer />
        <RevyChatBot />
      </div>
    </div>
  );
};

export default AboutPage;
