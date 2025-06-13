
import React from 'react';
import Navbar from '../components/Navbar';
import Team from '../components/Team';
import Footer from '../components/Footer';

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <Team />
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage;
