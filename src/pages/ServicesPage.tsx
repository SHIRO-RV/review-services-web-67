
import React from 'react';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Footer from '../components/Footer';
+import RevyChatBot from '../components/RevyChatBot';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <Services />
      </div>
      <Footer />
+     <RevyChatBot />
    </div>
  );
};

export default ServicesPage;
