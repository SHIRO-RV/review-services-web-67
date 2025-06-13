
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

const Index = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Mission />
      <Team />
      <WhyChooseUs />
      <Contact />
      <Footer />
      <WelcomePopup onContactClick={scrollToContact} />
    </div>
  );
};

export default Index;
