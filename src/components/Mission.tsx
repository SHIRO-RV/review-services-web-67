
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Mission = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-white/10 backdrop-blur-md shadow-2xl">
            <CardContent className="p-12 text-center">
              <blockquote className="text-2xl md:text-4xl font-bold text-white leading-relaxed mb-8">
                "To create impactful technology that simplifies lives, enhances experiences, and powers the future of innovation."
              </blockquote>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">S</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Simplify</h3>
                  <p className="text-gray-300">Making complex technology accessible and easy to use</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">E</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Enhance</h3>
                  <p className="text-gray-300">Improving user experiences through thoughtful design</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">P</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Power</h3>
                  <p className="text-gray-300">Driving innovation for tomorrow's digital landscape</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Mission;
