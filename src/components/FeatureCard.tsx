
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  detailedContent?: string;
  gradient: string;
  index: number;
  totalCards: number;
}

const FeatureCard = ({ 
  title, 
  description, 
  detailedContent = "This feature provides comprehensive solutions that adapt to your business needs, ensuring scalability and efficiency in all operations.",
  gradient,
  index,
  totalCards
}: FeatureCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [2, 0, 0, -2]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
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
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { duration: 0.5, delay: index * 0.08 }
      } : {}}
    >
      <motion.div
        whileHover={{ 
          scale: 1.02,
          rotateY: 3,
          z: 20
        }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Card className={`group border-0 bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 overflow-hidden ${
          isExpanded ? 'ring-2 ring-purple-400' : ''
        }`}>
          <CardHeader className="pb-4">
            <motion.div 
              className={`w-12 h-12 mb-4 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center`}
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            </motion.div>
            <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed mb-4">
              {description}
            </p>
            
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t pt-4"
              >
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {detailedContent}
                  </p>
                </div>
              </motion.div>
            )}
            
            <div className="text-xs text-gray-400 mt-2">
              {isExpanded ? 'Click to collapse' : 'Click to expand'}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;
