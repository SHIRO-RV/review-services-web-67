
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomePopupProps {
  onContactClick: () => void;
}

const WelcomePopup = ({ onContactClick }: WelcomePopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleBuildWebsite = () => {
    setIsOpen(false);
    onContactClick();
  };

  const features = [
    "AI-Powered Solutions",
    "Custom Development",
    "24/7 Support"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg border-0 bg-gradient-to-br from-background to-background/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-10 text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 hover:bg-accent"
        >
          <X className="h-4 w-4" />
        </button>
        
        <DialogHeader className="text-center space-y-4 pt-2">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-primary/20 shadow-lg">
                <img 
                  src="/lovable-uploads/6a024266-f398-46f6-b314-d701a497b879.png" 
                  alt="ReView AI Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
          
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to ReView AI
          </DialogTitle>
          
          <DialogDescription className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
            Transform your vision into reality with our cutting-edge AI-powered solutions. 
            Ready to build something amazing?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 px-2">
          <div className="space-y-3">
            <AnimatePresence>
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-accent/10 border border-accent/20"
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleBuildWebsite}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Start Your Project Today
            </Button>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full text-muted-foreground hover:text-foreground text-sm py-3 transition-colors font-medium"
            >
              Maybe later
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
