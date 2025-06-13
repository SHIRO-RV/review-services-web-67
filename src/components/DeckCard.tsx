
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DeckCardProps {
  title: string;
  description: string;
  detailedContent: string;
  icon?: React.ReactNode;
  gradient?: string;
  index: number;
  totalCards: number;
}

const DeckCard = ({ 
  title, 
  description, 
  detailedContent, 
  icon, 
  gradient = "from-blue-500 to-cyan-500",
  index,
  totalCards
}: DeckCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Calculate transform values for deck effect
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [5, 0, 0, -5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 200);
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
      style={{
        y,
        scale,
        rotate,
        opacity,
        zIndex: totalCards - index
      }}
      initial={{ opacity: 0, y: 100, rotateX: 25 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { 
          duration: 0.8, 
          delay: index * 0.15,
          ease: [0.4, 0.0, 0.2, 1]
        }
      } : {}}
      className="relative"
    >
      <motion.div
        whileHover={{ 
          scale: 1.02,
          rotateY: 2,
          rotateX: 2,
          z: 20,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="cursor-pointer transform-gpu"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Card className={`group border-0 bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden ${
          isExpanded ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
        }`}>
          <CardHeader className="text-center pb-4 relative">
            {icon && (
              <motion.div 
                className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {icon}
              </motion.div>
            )}
            <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 flex items-center justify-center gap-2">
              {title}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </motion.div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-gray-600 leading-relaxed text-center">
              {description}
            </p>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    height: "auto", 
                    scale: 1,
                    transition: { 
                      duration: 0.4,
                      ease: [0.4, 0.0, 0.2, 1]
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0, 
                    scale: 0.95,
                    transition: { duration: 0.3 }
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-200">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {detailedContent}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="text-center pt-2">
              <span className="text-xs text-gray-400">
                {isExpanded ? 'Click to collapse' : 'Click to learn more'}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DeckCard;
