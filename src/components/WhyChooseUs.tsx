
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Young, Dynamic Perspectives",
      description: "Fresh thinking unconstrained by traditional approaches, bringing innovative solutions to complex challenges.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Hybrid Tech Solutions",
      description: "Seamlessly blending AI, software development, and design to create comprehensive digital ecosystems.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Scalable & Future-Ready",
      description: "Building with tomorrow in mind, ensuring your solutions grow and adapt with your business needs.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      title: "Rapid Innovation Cycles",
      description: "Agile development and quick iteration cycles that get your ideas to market faster than ever.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      title: "Client-Centric Approach",
      description: "Your success is our success. We work as an extension of your team, not just a vendor.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Cutting-Edge Technology",
      description: "Always at the forefront of technological advancement, ensuring you stay ahead of the competition.",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose ReView AI?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference that fresh thinking, technical excellence, and passionate commitment can make
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 mb-4 bg-gradient-to-br ${reason.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {reason.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-6">Ready to Experience the Difference?</h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join the businesses that are already transforming their operations with our innovative solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  Start Your Project
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300 transform hover:scale-105">
                  Schedule a Call
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
