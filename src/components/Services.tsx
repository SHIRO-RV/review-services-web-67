
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Users, Image, Briefcase, Calendar } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Custom Software & App Development",
      description: "Bespoke software solutions and mobile applications tailored to your specific business needs, built with cutting-edge technologies and scalable architectures."
    },
    {
      icon: Users,
      title: "AI-Powered Solutions & Automation",
      description: "Intelligent automation systems, machine learning implementations, and AI-driven tools that streamline operations and enhance decision-making processes."
    },
    {
      icon: Image,
      title: "UI/UX Design & Digital Branding",
      description: "Modern, user-centric design solutions that create engaging experiences and strong brand identities across all digital touchpoints."
    },
    {
      icon: Briefcase,
      title: "IT Consulting & Tech Support",
      description: "Strategic technology consulting and comprehensive support services to optimize your IT infrastructure and digital transformation journey."
    },
    {
      icon: Calendar,
      title: "Product Innovation & MVP Development",
      description: "Rapid prototyping and minimum viable product development to validate ideas quickly and bring innovative concepts to market efficiently."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What We Do
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to transform your business and accelerate growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-center">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h3>
              <p className="text-xl mb-8 opacity-90">
                Let's discuss how our innovative solutions can drive your success
              </p>
              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                Get Started Today
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
