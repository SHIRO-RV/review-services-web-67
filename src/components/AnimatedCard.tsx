
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AnimatedCardProps {
  title: string;
  description: string;
  detailedContent: string;
  icon?: React.ReactNode;
  gradient?: string;
  index?: number;
}

const AnimatedCard = ({ 
  title, 
  description, 
  detailedContent, 
  icon, 
  gradient = "from-blue-500 to-cyan-500",
  index = 0 
}: AnimatedCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 150); // Staggered animation
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`transform transition-all duration-700 ${
        isVisible 
          ? 'translate-y-0 opacity-100 rotate-0' 
          : 'translate-y-16 opacity-0 rotate-12'
      }`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        zIndex: isExpanded ? 50 : 10 - index
      }}
    >
      <Card 
        className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl border-0 bg-white/90 backdrop-blur-sm transform hover:-translate-y-3 hover:rotate-1 ${
          isExpanded ? 'scale-105 shadow-2xl' : 'hover:scale-105'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardHeader className="text-center pb-4">
          {icon && (
            <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              {icon}
            </div>
          )}
          <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 flex items-center justify-center gap-2">
            {title}
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 animate-bounce" />
            ) : (
              <ChevronDown className="h-4 w-4 group-hover:animate-bounce" />
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed text-center">
            {description}
          </p>
          
          <div className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="pt-4 border-t border-gray-200">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed text-sm">
                  {detailedContent}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-2">
            <span className="text-xs text-gray-400">
              {isExpanded ? 'Click to collapse' : 'Click to learn more'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnimatedCard;
