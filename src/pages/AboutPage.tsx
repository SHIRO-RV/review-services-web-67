
import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <About />
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;

