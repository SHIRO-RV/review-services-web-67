
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface WelcomePopupProps {
  onContactClick: () => void;
}

const WelcomePopup = ({ onContactClick }: WelcomePopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000); // Show popup after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleBuildWebsite = () => {
    setIsOpen(false);
    onContactClick();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl">
        <DialogHeader>
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogTitle className="text-center text-2xl font-bold mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
            Welcome to ReView AI!
            <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-3 border-white/30 shadow-lg">
              <img 
                src="/lovable-uploads/6a024266-f398-46f6-b314-d701a497b879.png" 
                alt="ReView AI Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Ready to Build Your Dream Website?</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Transform your vision into reality with our cutting-edge AI-powered solutions. 
              Get a custom quote and start your project today!
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleBuildWebsite}
              className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Build Your Website with ReView
            </Button>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full text-white/80 hover:text-white text-sm py-2 transition-colors"
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
