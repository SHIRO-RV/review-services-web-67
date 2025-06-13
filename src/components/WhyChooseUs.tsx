import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FeatureCard from './FeatureCard';

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Young, Dynamic Perspectives",
      description: "Fresh thinking unconstrained by traditional approaches, bringing innovative solutions to complex challenges.",
      detailedContent: "Our young team brings fresh perspectives unbound by traditional constraints. We approach every challenge with curiosity and creativity, leveraging the latest technologies and methodologies. Our diverse backgrounds and modern education ensure we stay ahead of industry trends and deliver cutting-edge solutions that traditional agencies might overlook.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Hybrid Tech Solutions",
      description: "Seamlessly blending AI, software development, and design to create comprehensive digital ecosystems.",
      detailedContent: "We don't just build software or design interfaces - we create complete digital ecosystems. Our integrated approach combines artificial intelligence, robust software development, and stunning design to deliver solutions that work seamlessly together. This holistic methodology ensures consistency, efficiency, and maximum impact across all aspects of your digital presence.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Scalable & Future-Ready",
      description: "Building with tomorrow in mind, ensuring your solutions grow and adapt with your business needs.",
      detailedContent: "Every solution we build is designed for growth. We use modular architectures, cloud-native technologies, and scalable frameworks that can adapt as your business evolves. Our forward-thinking approach means your investment today will continue to deliver value as your needs change and expand over time.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      title: "Rapid Innovation Cycles",
      description: "Agile development and quick iteration cycles that get your ideas to market faster than ever.",
      detailedContent: "Speed is crucial in today's market. Our agile methodologies and rapid prototyping capabilities allow us to move from concept to deployment in record time. We use iterative development cycles, continuous integration, and automated testing to ensure quality while maintaining velocity. Your time-to-market is significantly reduced without compromising on quality.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      title: "Client-Centric Approach",
      description: "Your success is our success. We work as an extension of your team, not just a vendor.",
      detailedContent: "We believe in true partnerships. Our team integrates seamlessly with yours, understanding your business goals, challenges, and culture. We provide transparent communication, regular updates, and collaborative decision-making throughout the project lifecycle. Your success metrics become our success metrics.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Cutting-Edge Technology",
      description: "Always at the forefront of technological advancement, ensuring you stay ahead of the competition.",
      detailedContent: "We stay at the cutting edge of technology through continuous learning, experimentation, and industry engagement. Our team regularly attends conferences, contributes to open source, and experiments with emerging technologies. This ensures your solutions leverage the latest innovations and maintain competitive advantages in your market.",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {reasons.map((reason, index) => (
            <FeatureCard 
              key={index}
              title={reason.title}
              description={reason.description}
              detailedContent={reason.detailedContent}
              gradient={reason.gradient}
              index={index}
              totalCards={reasons.length}
            />
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
