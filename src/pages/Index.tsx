
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Mission from '../components/Mission';
import Team from '../components/Team';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import WelcomePopup from '../components/WelcomePopup';
import Testimonials from '../components/Testimonials';
import Portfolio from '../components/Portfolio';
import RevyChatBot from '../components/RevyChatBot';

const Index = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Video - Original Video 1 */}
      <div className="fixed inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/placeholder-video-1.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white"></div>
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Testimonials />
        <Portfolio />
        <Services />
        <Mission />
        <Team />
        <WhyChooseUs />
        <Contact />
        <Footer />
        <WelcomePopup onContactClick={scrollToContact} />
        <RevyChatBot />
      </div>
    </div>
  );
};

export default Index;
