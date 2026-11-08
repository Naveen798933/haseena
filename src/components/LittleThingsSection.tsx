import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Smile, Sun, Moon, Feather, Star } from 'lucide-react';

interface LittleThing {
  id: number;
  icon: React.FC<{ className?: string }>;
  title: string;
  frontSnippet: string;
  revealedThought: string;
  tag: string;
}

export const LittleThingsSection: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const reasons: LittleThing[] = [
    {
      id: 1,
      icon: Smile,
      title: "Your Radiance",
      frontSnippet: "The way your smile effortlessly brightens any room.",
      revealedThought: "It has a quiet power to turn an ordinary, mundane day into something worth celebrating.",
      tag: "Pure Light"
    },
    {
      id: 2,
      icon: Feather,
      title: "Your Gentleness",
      frontSnippet: "The tenderness and grace in how you treat the world.",
      revealedThought: "In a world that can be loud and rushed, your calmness is an absolute sanctuary.",
      tag: "Soft Grace"
    },
    {
      id: 3,
      icon: Star,
      title: "Your Presence",
      frontSnippet: "How simple moments suddenly become memorable.",
      revealedThought: "Just knowing you are there makes everything feel lighter, sweeter, and infinitely more special.",
      tag: "Magic"
    },
    {
      id: 4,
      icon: Moon,
      title: "Your Voice",
      frontSnippet: "Warm, reassuring, and comforting.",
      revealedThought: "The kind of voice that lingers gently in my thoughts long after the conversation ends.",
      tag: "Comfort"
    },
    {
      id: 5,
      icon: Sun,
      title: "Your Authenticity",
      frontSnippet: "Genuine, poised, and true to yourself.",
      revealedThought: "You never pretend to be anyone else — your sincerity is what makes you truly rare.",
      tag: "One of a Kind"
    },
    {
      id: 6,
      icon: Heart,
      title: "Simply Being You",
      frontSnippet: "Every little quirk, laugh, and gesture.",
      revealedThought: "Out of eight billion people on this planet, there is only one Haseena. And that is everything.",
      tag: "Endless"
    }
  ];

  const toggleCard = (id: number) => {
    setActiveCardId(activeCardId === id ? null : id);
  };

  return (
    <section id="little-things" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-wine/20 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-champagne/30 bg-burgundy-900/60 backdrop-blur-md mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-champagne font-light">
            CHAPTER III • LITTLE THINGS I ADORE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory font-light tracking-wide mb-4"
        >
          Why You Are Unforgettable
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-champagne/80 font-light text-sm sm:text-base leading-relaxed tracking-wide"
        >
          Click any card to reveal a quiet thought from my heart.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {reasons.map((item, index) => {
          const Icon = item.icon;
          const isFlipped = activeCardId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => toggleCard(item.id)}
              className="cursor-pointer group relative perspective-1000 min-h-[240px]"
            >
              <div
                className={`relative w-full h-full rounded-2xl p-6 transition-all duration-500 flex flex-col justify-between border shadow-xl ${
                  isFlipped
                    ? 'bg-gradient-to-br from-wine to-burgundy-950 border-champagne shadow-[0_0_35px_rgba(214,183,121,0.35)]'
                    : 'bg-burgundy-900/60 border-champagne/30 group-hover:border-champagne group-hover:bg-wine/30'
                }`}
              >
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-burgundy-950 border border-champagne/40 flex items-center justify-center text-champagne group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-champagne" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-full bg-burgundy-950/80 border border-champagne/30 text-champagne">
                    {item.tag}
                  </span>
                </div>

                {/* Body Content */}
                <div className="my-auto">
                  <h3 className="font-serif text-2xl text-ivory mb-2 group-hover:text-champagne transition-colors">
                    {item.title}
                  </h3>

                  <AnimatePresence mode="wait">
                    {!isFlipped ? (
                      <motion.p
                        key="front"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed"
                      >
                        {item.frontSnippet}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="back"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-serif italic text-sm sm:text-base text-champagne/95 leading-relaxed bg-burgundy-950/40 p-3 rounded-xl border border-champagne/20"
                      >
                        &ldquo;{item.revealedThought}&rdquo;
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom hint */}
                <div className="mt-4 pt-3 border-t border-champagne/15 flex items-center justify-between text-[11px] font-mono text-champagne/70">
                  <span>{isFlipped ? 'Tap to close' : 'Tap to reveal secret thought'}</span>
                  <Sparkles className="w-3 h-3 text-champagne/60 group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
