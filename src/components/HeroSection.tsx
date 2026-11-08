import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  name?: string;
  subtitle?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name = "HASEENA",
  subtitle = "Six moments. One beautiful soul."
}) => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 220]);
  const opacityParallax = useTransform(scrollY, [0, 500], [1, 0.2]);

  // Split name for staggered letter animation
  const letters = Array.from(name);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-16">
      
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-wine/30 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-champagne/10 blur-[100px] pointer-events-none" />

      <motion.div
        style={{ y: yParallax, opacity: opacityParallax }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Dedication Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-champagne/30 bg-burgundy-900/60 backdrop-blur-md mb-6 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-champagne/90 font-light">
            A Little World Made For You
          </span>
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
        </motion.div>

        {/* Master Name: HASEENA with staggered letter reveals */}
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.18em] text-ivory mb-6 select-none flex flex-wrap justify-center drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
          {letters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 1.1,
                delay: 0.4 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block gold-text-gradient hover:scale-105 transition-transform duration-300"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Ornate Gold Filigree Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="flex items-center gap-4 w-64 md:w-80 my-4"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-champagne/60" />
          <div className="w-2 h-2 rotate-45 border border-champagne bg-wine" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-champagne/60" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl italic text-champagne/90 font-light tracking-wide max-w-xl mx-auto leading-relaxed mt-2"
        >
          &ldquo;{subtitle}&rdquo;
        </motion.p>

      </motion.div>

      {/* Luxury Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-champagne/70 font-light">
          Scroll to explore
        </span>
        <div className="w-5 h-9 rounded-full border border-champagne/40 flex items-start justify-center p-1">
          <motion.div
            animate={{
              y: [0, 14, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 rounded-full bg-champagne"
          />
        </div>
      </motion.div>

    </section>
  );
};

