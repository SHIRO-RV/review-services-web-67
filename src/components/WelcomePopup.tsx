import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react'; // Removed X as it's no longer used for a custom button
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
      <DialogContent className="sm:max-w-lg border border-slate-200 bg-white shadow-2xl overflow-hidden rounded-2xl p-0"> {/* Adjusted padding to p-0 to let DialogHeader/Footer handle it if DialogPrimitive.Close is styled for right-4 top-4 */}
        {/* The custom close button that was here has been removed. 
            The DialogContent component provides its own close button by default, 
            which is typically positioned at the top right (e.g., absolute right-4 top-4).
        */}
        
        <DialogHeader className="text-center space-y-6 pt-8 pb-4 px-6"> {/* Added px-6 for header padding */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center" // Removed ml-16 as it might conflict with centering
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-primary/20 shadow-xl">
                <img 
                  src="/lovable-uploads/f7e698c3-40a5-4d57-8b40-0e22e9e4bf9a.png" 
                  alt="ReView AI Logo" 
                  className="w-full h-full object-cover object-center"
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
          
          <DialogTitle className="text-3xl font-bold text-slate-900">
            Welcome to ReView AI
          </DialogTitle>
          
          <DialogDescription className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto">
            Transform your vision into reality with our cutting-edge AI-powered solutions. 
            Ready to build something amazing?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8 px-8 pb-8"> {/* Ensured padding for content area */}
          <div className="space-y-4">
            <AnimatePresence>
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-base font-medium text-slate-700">{feature}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleBuildWebsite}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Start Your Project Today
            </Button>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full text-slate-500 hover:text-slate-700 text-base py-3 transition-colors font-medium"
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
