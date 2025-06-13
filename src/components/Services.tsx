
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Users, Image, Briefcase, Calendar } from 'lucide-react';
import DeckCard from './DeckCard';

const Services = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8 text-white" />,
      title: "Custom Software & App Development",
      description: "Bespoke software solutions and mobile applications tailored to your specific business needs, built with cutting-edge technologies and scalable architectures.",
      detailedContent: "Our development team specializes in creating robust, scalable applications using modern frameworks like React, Node.js, and cloud technologies. We follow agile methodologies to ensure rapid delivery while maintaining high code quality. From concept to deployment, we handle everything including database design, API development, security implementation, and performance optimization. Our solutions are built with future growth in mind, ensuring they can scale as your business expands.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "AI-Powered Solutions & Automation",
      description: "Intelligent automation systems, machine learning implementations, and AI-driven tools that streamline operations and enhance decision-making processes.",
      detailedContent: "Leverage the power of artificial intelligence to transform your business operations. We implement custom AI solutions including chatbots, predictive analytics, computer vision, natural language processing, and automated workflows. Our AI systems learn and adapt to your specific business needs, providing intelligent insights and automating repetitive tasks. From data preprocessing to model deployment, we ensure your AI solutions deliver measurable business value.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Image className="h-8 w-8 text-white" />,
      title: "UI/UX Design & Digital Branding",
      description: "Modern, user-centric design solutions that create engaging experiences and strong brand identities across all digital touchpoints.",
      detailedContent: "Create stunning visual experiences that captivate your audience. Our design team crafts intuitive user interfaces, compelling brand identities, and seamless user experiences. We conduct thorough user research, create detailed wireframes and prototypes, design responsive layouts, and ensure accessibility standards are met across all platforms. Our designs focus on conversion optimization and user engagement.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-white" />,
      title: "IT Consulting & Tech Support",
      description: "Strategic technology consulting and comprehensive support services to optimize your IT infrastructure and digital transformation journey.",
      detailedContent: "Navigate your digital transformation with expert guidance. We provide strategic IT consulting, system architecture planning, technology audits, security assessments, and ongoing technical support. Our consultants help you choose the right technologies, optimize existing systems, and plan for future growth. We ensure your technology investments align with your business objectives and deliver maximum ROI.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "Product Innovation & MVP Development",
      description: "Rapid prototyping and minimum viable product development to validate ideas quickly and bring innovative concepts to market efficiently.",
      detailedContent: "Turn your innovative ideas into market-ready products. We specialize in rapid MVP development, allowing you to test concepts quickly and gather user feedback. Our iterative approach includes comprehensive market research, prototype development, user testing, and continuous refinement to ensure your product meets market demands. We help you minimize risk and maximize learning throughout the development process.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative perspective-1000">
          {services.map((service, index) => (
            <DeckCard 
              key={index}
              title={service.title}
              description={service.description}
              detailedContent={service.detailedContent}
              icon={service.icon}
              gradient={service.gradient}
              index={index}
              totalCards={services.length}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="border-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
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
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg"
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
