
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface TeamCardProps {
  name: string;
  role: string;
  expertise: string;
  initials: string;
  color: string;
  bio?: string;
  achievements?: string[];
  index: number;
  totalCards: number;
}

const TeamCard = ({ 
  name, 
  role, 
  expertise, 
  initials, 
  color,
  bio = "Passionate innovator dedicated to pushing the boundaries of technology and creating solutions that make a real difference.",
  achievements = ["5+ years experience", "Led 20+ successful projects", "AI/ML specialist"],
  index,
  totalCards
}: TeamCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [3, 0, 0, -3]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale, rotate, zIndex: totalCards - index }}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { duration: 0.6, delay: index * 0.1 }
      } : {}}
    >
      <motion.div
        whileHover={{ 
          scale: 1.03,
          rotateY: 5,
          z: 30
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Card className={`group border-0 bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          isExpanded ? 'ring-2 ring-blue-400' : ''
        }`}>
          <CardContent className="p-8 text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="mb-6"
            >
              <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white shadow-xl">
                <AvatarFallback className={`${color} text-white text-xl font-bold`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <motion.h3 
                className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {name}
              </motion.h3>
              <p className="text-blue-600 font-semibold mb-2">{role}</p>
              <p className="text-gray-600 text-sm">{expertise}</p>
            </motion.div>

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t pt-6 space-y-4"
              >
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{bio}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Key Achievements:</h4>
                    {achievements.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {achievement}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TeamCard;
