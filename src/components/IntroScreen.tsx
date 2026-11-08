import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight } from 'lucide-react';

interface IntroScreenProps {
  onEnter: () => void;
  quoteLine1?: string;
  quoteLine2?: string;
  buttonText?: string;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onEnter,
  quoteLine1 = "Some people enter our lives unexpectedly...",
  quoteLine2 = "Somehow, they make ordinary moments feel extraordinary.",
  buttonText = "ENTER MY LITTLE WORLD"
}) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-burgundy overflow-hidden px-6"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-wine/50 via-burgundy to-burgundy-950 pointer-events-none" />

      {/* Subtle Golden Ambient Light Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[500px] h-[500px] rounded-full bg-champagne/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        
        {/* Subtle Glowing Heart with Golden Ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative mb-8"
        >
          {/* Pulsing Aura */}
          <motion.div
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-wine-light/50 blur-xl"
          />

          <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-wine-light to-wine p-[1px] shadow-[0_0_40px_rgba(214,183,121,0.25)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-burgundy-900/90 flex items-center justify-center">
              <Heart className="w-9 h-9 text-champagne fill-champagne/20 drop-shadow-[0_0_12px_rgba(214,183,121,0.8)]" />
            </div>
          </div>
        </motion.div>

        {/* Cinematic Quote Reveals */}
        <div className="space-y-4 mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl italic text-ivory/90 font-light tracking-wide leading-relaxed"
          >
            &ldquo;{quoteLine1}&rdquo;
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.2 }}
            className="font-serif text-xl md:text-2xl lg:text-3xl text-champagne/90 font-light tracking-wide leading-relaxed"
          >
            &ldquo;{quoteLine2}&rdquo;
          </motion.p>
        </div>

        {/* Enter Button CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 1 }}
          className="flex flex-col items-center"
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-wine via-wine-light to-wine text-ivory border border-champagne/50 hover:border-champagne transition-all duration-500 shadow-[0_10px_30px_rgba(100,21,45,0.6)] hover:shadow-[0_0_35px_rgba(214,183,121,0.5)] hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-champagne group-hover:rotate-45 transition-transform duration-500" />
            <span className="font-sans font-medium tracking-[0.25em] text-xs md:text-sm uppercase text-ivory group-hover:text-champagne transition-colors">
              {buttonText}
            </span>
            <ChevronRight className="w-4 h-4 text-champagne group-hover:translate-x-1 transition-transform" />

            {/* Glowing border highlight */}
            <span className="absolute inset-0 rounded-full border border-champagne/40 animate-ping opacity-25 pointer-events-none" />
          </button>

          <p className="mt-4 text-[11px] tracking-widest text-ivory/40 uppercase font-light">
            Headphones recommended for music 🎧
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};

