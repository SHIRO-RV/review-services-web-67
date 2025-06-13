
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TeamCard from './TeamCard';

const Team = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & AI Architect",
      expertise: "Machine Learning, Business Strategy",
      initials: "AC",
      color: "bg-gradient-to-br from-blue-600 to-cyan-600",
      bio: "Visionary leader with 8+ years in AI/ML and business strategy. Alex founded ReView AI with the mission to democratize artificial intelligence for businesses of all sizes.",
      achievements: ["Founded 3 successful startups", "AI/ML PhD from Stanford", "50+ published research papers", "Fortune 500 AI consultant"]
    },
    {
      name: "Maya Patel",
      role: "CTO & Full-Stack Developer",
      expertise: "Software Engineering, Cloud Architecture",
      initials: "MP",
      color: "bg-gradient-to-br from-purple-600 to-pink-600",
      bio: "Full-stack expert specializing in scalable cloud architectures. Maya leads our technical vision and ensures our solutions are built for the future.",
      achievements: ["10+ years in enterprise software", "AWS Solutions Architect", "Built systems for 1M+ users", "Open source contributor"]
    },
    {
      name: "Jordan Kim",
      role: "Head of Design",
      expertise: "UI/UX Design, Product Strategy",
      initials: "JK",
      color: "bg-gradient-to-br from-indigo-600 to-blue-600",
      bio: "Creative strategist with a passion for user-centered design. Jordan ensures every product we create delivers exceptional user experiences.",
      achievements: ["Design Systems expert", "Award-winning UI designer", "100+ apps designed", "UX research specialist"]
    },
    {
      name: "Sam Rodriguez",
      role: "Lead Developer",
      expertise: "Frontend Development, Mobile Apps",
      initials: "SR",
      color: "bg-gradient-to-br from-teal-600 to-green-600",
      bio: "Frontend specialist with expertise in modern frameworks and mobile development. Sam brings ideas to life with clean, efficient code.",
      achievements: ["React/React Native expert", "Performance optimization guru", "Mobile app store features", "Tech conference speaker"]
    },
    {
      name: "Riley Thompson",
      role: "AI Specialist",
      expertise: "Deep Learning, Data Science",
      initials: "RT",
      color: "bg-gradient-to-br from-orange-600 to-red-600",
      bio: "Data science expert with deep learning expertise. Riley develops the AI models that power our intelligent solutions.",
      achievements: ["Machine Learning PhD", "Kaggle competitions winner", "Computer vision expert", "NLP research specialist"]
    },
    {
      name: "Casey Wu",
      role: "Project Manager",
      expertise: "Agile Methodologies, Client Relations",
      initials: "CW",
      color: "bg-gradient-to-br from-violet-600 to-purple-600",
      bio: "Project management expert who ensures seamless delivery and client satisfaction. Casey coordinates our teams to deliver exceptional results.",
      achievements: ["PMP certified", "Agile coach", "200+ projects delivered", "Client satisfaction expert"]
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {teamMembers.map((member, index) => (
            <TeamCard 
              key={index}
              name={member.name}
              role={member.role}
              expertise={member.expertise}
              initials={member.initials}
              color={member.color}
              bio={member.bio}
              achievements={member.achievements}
              index={index}
              totalCards={teamMembers.length}
            />
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
