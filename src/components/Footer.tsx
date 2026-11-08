import React from 'react';
import { Heart, Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  targetName?: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, targetName = "HASEENA" }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 py-16 px-4 sm:px-6 lg:px-8 border-t border-champagne/15 bg-burgundy-950/70 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        {/* Heart Icon */}
        <div className="w-10 h-10 rounded-full bg-burgundy-900 border border-champagne/40 flex items-center justify-center shadow-md">
          <Heart className="w-4 h-4 text-champagne fill-champagne/40" />
        </div>

        {/* Message */}
        <div>
          <p className="font-serif text-xl sm:text-2xl text-ivory/90 font-light tracking-wide">
            A Little World Called {targetName}
          </p>
          <p className="text-xs text-champagne/70 font-light mt-1 tracking-widest uppercase">
            Designed to bring a gentle smile to your day
          </p>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center gap-6 text-xs text-ivory/50 font-mono tracking-wider pt-4 border-t border-champagne/10 w-full justify-between">
          <span>&copy; {new Date().getFullYear()} • Dedicated to {targetName}</span>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="hover:text-champagne flex items-center gap-1 transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-full border border-champagne/20 hover:border-champagne hover:text-champagne transition-colors"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

