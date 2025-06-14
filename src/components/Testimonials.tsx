
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

// Placeholder logos - (you can replace src later)
const companyLogos = [
  {
    name: "TechNova",
    src: "/lovable-uploads/6a024266-f398-46f6-b314-d701a497b879.png",
  },
  {
    name: "Infinify",
    src: "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.png",
  },
  {
    name: "Startly",
    src: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.png",
  },
];

const testimonials = [
  {
    name: "Aditi Rao",
    title: "Founder, TechNova",
    photo: "/lovable-uploads/photo-1605810230434-7631ac76ec81.png",
    quote:
      "ReView AI delivered a seamless digital experience for us, handling everything from design to deployment. Their youthful energy and technical expertise are unmatched!",
  },
  {
    name: "Rahul Sharma",
    title: "CTO, Infinify",
    photo: "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.png",
    quote:
      "We saw a 40% uptick in customer engagement after implementing their AI-driven solutions. The team is proactive, creative, and dedicated to results.",
  },
  {
    name: "Priya Menon",
    title: "Project Lead, Startly",
    photo: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.png",
    quote:
      "Their consulting guidance was invaluable—helped bring our MVP to market faster and more robust. Highly recommended!",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-600">
          Businesses trust ReView AI to deliver real results.
        </p>
      </div>
      {/* Testimonials Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {testimonials.map((t, i) => (
          <Card
            key={i}
            className="border-0 shadow-lg bg-white/90 hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="p-8 flex flex-col items-center text-center">
              <img
                src={t.photo}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-blue-100 shadow"
                loading="lazy"
              />
              <p className="italic text-gray-700 mb-6 leading-relaxed">"{t.quote}"</p>
              <div>
                <div className="font-semibold text-blue-700">{t.name}</div>
                <div className="text-sm text-gray-400">{t.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Logo Strip */}
      <div className="mb-8">
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {companyLogos.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              className="h-12 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 bg-white rounded-lg shadow px-4 py-2"
              loading="lazy"
            />
          ))}
        </div>
        <div className="text-center mt-6 text-sm text-gray-500">
          ...and many other happy partners!
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;
