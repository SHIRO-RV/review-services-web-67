
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Team = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & AI Architect",
      expertise: "Machine Learning, Business Strategy",
      initials: "AC",
      color: "bg-gradient-to-br from-blue-600 to-cyan-600"
    },
    {
      name: "Maya Patel",
      role: "CTO & Full-Stack Developer",
      expertise: "Software Engineering, Cloud Architecture",
      initials: "MP",
      color: "bg-gradient-to-br from-purple-600 to-pink-600"
    },
    {
      name: "Jordan Kim",
      role: "Head of Design",
      expertise: "UI/UX Design, Product Strategy",
      initials: "JK",
      color: "bg-gradient-to-br from-indigo-600 to-blue-600"
    },
    {
      name: "Sam Rodriguez",
      role: "Lead Developer",
      expertise: "Frontend Development, Mobile Apps",
      initials: "SR",
      color: "bg-gradient-to-br from-teal-600 to-green-600"
    },
    {
      name: "Riley Thompson",
      role: "AI Specialist",
      expertise: "Deep Learning, Data Science",
      initials: "RT",
      color: "bg-gradient-to-br from-orange-600 to-red-600"
    },
    {
      name: "Casey Wu",
      role: "Project Manager",
      expertise: "Agile Methodologies, Client Relations",
      initials: "CW",
      color: "bg-gradient-to-br from-violet-600 to-purple-600"
    }
  ];

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A dynamic group of young innovators passionate about creating the future of technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white shadow-lg"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <AvatarFallback className={`${member.color} text-white text-xl font-bold`}>
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.expertise}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="border-0 bg-gradient-to-br from-gray-50 to-blue-50 shadow-lg">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Young Minds, Bold Ideas
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Our diverse team brings together fresh perspectives, cutting-edge skills, and an unwavering commitment to excellence. We're not just building technology – we're shaping the future.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-gray-600">Passion-Driven</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-gray-600">Innovation Mode</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">∞</div>
                  <div className="text-gray-600">Possibilities</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Team;
