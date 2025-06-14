
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    title: "SmartClinic Web Portal",
    screenshot: "/lovable-uploads/photo-1498050108023-c5249f4df085.png",
    problem: "Clinic staff struggled with manual appointment management and paperwork.",
    solution: "Developed a web portal for scheduling, patient records, and automated reminders.",
    outcome: "Reduced staff workload by 60%. Appointments booked online increased by 120%.",
  },
  {
    title: "EduLearn Online Platform",
    screenshot: "/lovable-uploads/photo-1461749280684-dccba630e2f6.png",
    problem: "Students had limited access to quality resources for remote learning.",
    solution: "Built an e-learning site with interactive video lessons, quizzes, and progress tracking.",
    outcome: "Over 2,000 students enrolled in the first 3 months, with a 4.9/5 satisfaction rating.",
  },
  {
    title: "FitPro Trainer Dashboard",
    screenshot: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.png",
    problem: "Personal trainers needed a tool to track client workouts and progress remotely.",
    solution: "Created a web dashboard for trainers to assign routines, monitor progress, and chat with clients.",
    outcome: "Trainers reported a 30% improvement in client retention and engagement.",
  },
];

const Portfolio = () => (
  <section id="portfolio" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Portfolio & Case Studies
        </h2>
        <p className="text-lg text-gray-600">
          Real impact for real businesses. See how we solve web challenges.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <Card key={i} className="border-0 shadow-lg bg-white/90 hover:scale-105 transition-transform duration-300 flex flex-col">
            <img
              src={project.screenshot}
              alt={project.title}
              className="w-full h-48 object-cover rounded-t-lg"
              loading="lazy"
            />
            <CardContent className="flex-1 flex flex-col p-6">
              <h3 className="text-xl font-bold mb-3 text-blue-700">{project.title}</h3>
              <div className="text-gray-700 mb-2">
                <span className="font-semibold text-gray-800">Problem: </span>
                {project.problem}
              </div>
              <div className="text-gray-700 mb-2">
                <span className="font-semibold text-gray-800">Solution: </span>
                {project.solution}
              </div>
              <div className="text-green-700 font-semibold mt-auto">
                <span className="text-green-800">Outcome: </span>
                {project.outcome}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
