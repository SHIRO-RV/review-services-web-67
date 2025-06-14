import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Portfolio from '../components/Portfolio';
import RevyChatBot from '../components/RevyChatBot';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <About />
        <Testimonials />
        <Portfolio />
      </div>
      <Footer />
      <RevyChatBot />
    </div>
  );
};

export default AboutPage;
