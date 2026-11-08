import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface StorySectionProps {
  badge?: string;
  heading?: string;
  sentences: string[];
}

export const StorySection: React.FC<StorySectionProps> = ({
  badge = "CHAPTER I • OUR LITTLE STORY",
  heading = "A serendipitous chapter",
  sentences,
}) => {
  return (
    <section id="story" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto overflow-hidden">
      
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-wine/20 blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-champagne/30 bg-burgundy-900/60 backdrop-blur-md mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-champagne font-light">
            {badge}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory font-light tracking-wide"
        >
          {heading}
        </motion.h2>
      </div>

      {/* Story Timeline Spine & Sentences */}
      <div className="relative">
        
        {/* Central Vertical Golden Line */}
        <div className="absolute top-4 bottom-8 left-6 sm:left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-champagne/10 via-champagne/50 to-transparent pointer-events-none" />

        <div className="space-y-20 sm:space-y-28">
          {sentences.map((sentence, idx) => {
            const isEven = idx % 2 === 0;
            const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className={`relative flex items-center ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                } flex-row`}
              >
                {/* Center Golden Node Indicator */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                  <motion.div
                    whileInView={{ scale: [0.8, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-8 h-8 rounded-full bg-burgundy-950 border border-champagne flex items-center justify-center shadow-[0_0_15px_rgba(214,183,121,0.5)]"
                  >
                    <span className="text-[10px] font-serif text-champagne font-medium">
                      {romanNumerals[idx] || idx + 1}
                    </span>
                  </motion.div>
                </div>

                {/* Sentence Card */}
                <div
                  className={`w-full sm:w-[45%] pl-16 sm:pl-0 ${
                    isEven ? 'sm:pr-12 sm:text-right text-left' : 'sm:pl-12 text-left'
                  }`}
                >
                  <div className="group relative p-6 sm:p-8 rounded-2xl bg-burgundy-900/50 backdrop-blur-md border border-champagne/25 shadow-xl hover:border-champagne/60 hover:shadow-[0_0_30px_rgba(214,183,121,0.2)] transition-all duration-500">
                    
                    {/* Subtle quote icon */}
                    <div className="text-champagne/20 font-serif text-4xl leading-none mb-2 select-none">
                      &ldquo;
                    </div>

                    <p className="font-serif text-xl sm:text-2xl md:text-2xl text-ivory/95 font-light leading-relaxed tracking-wide">
                      {sentence}
                    </p>

                    <div className={`mt-4 flex items-center gap-2 ${isEven ? 'sm:justify-end' : 'justify-start'}`}>
                      <span className="w-6 h-[1px] bg-champagne/40" />
                      <Heart className="w-3 h-3 text-champagne/70 fill-champagne/20" />
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

