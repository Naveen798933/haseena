import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Heart, RefreshCw } from 'lucide-react';
import { romanticSounds } from '../utils/romanticSounds';

interface SecretLetterSectionProps {
  badge?: string;
  heading?: string;
  recipient?: string;
  paragraphs: string[];
  signoff?: string;
  sender?: string;
}

export const SecretLetterSection: React.FC<SecretLetterSectionProps> = ({
  badge = "CONFIDENTIAL & TENDER",
  heading = "A little something from my heart...",
  recipient = "Dearest Haseena,",
  paragraphs,
  signoff = "With quiet fondness & warmth,",
  sender = "Yours sincerely"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    romanticSounds.playWaxSealSound();
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([25, 30, 45]);
      } catch {}
    }
    setIsOpen(true);
  };

  return (
    <section id="letter" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-wine/25 blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
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

      {/* Interactive Envelope / Letter Container */}
      <div className="relative max-w-2xl mx-auto flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Envelope View */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5 }}
              onClick={handleOpenEnvelope}
              className="cursor-pointer group relative w-full aspect-[16/10] max-w-lg rounded-2xl bg-gradient-to-br from-wine-dark via-burgundy to-burgundy-950 border-2 border-champagne/40 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] hover:border-champagne hover:shadow-[0_0_40px_rgba(214,183,121,0.35)] transition-all duration-500 flex flex-col items-center justify-center text-center"
            >
              {/* Envelope Flap Accent Lines */}
              <div className="absolute inset-x-0 top-0 h-1/2 border-b border-champagne/20 bg-wine/20 pointer-events-none rounded-t-2xl" />

              {/* Gold Wax Seal with "H" & Pulsing Ripple Aura */}
              <div className="relative z-10 flex items-center justify-center">
                {/* Ambient Ripple Wave */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute w-28 h-28 rounded-full border border-champagne/50 pointer-events-none"
                />

                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  whileTap={{ scale: 0.92 }}
                  className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-wine via-wine-light to-champagne p-[2px] shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer group-hover:shadow-[0_0_30px_rgba(214,183,121,0.6)] transition-shadow"
                >
                  <div className="w-full h-full rounded-full bg-burgundy-900 flex flex-col items-center justify-center border border-champagne/60">
                    <span className="font-serif text-3xl font-bold text-champagne drop-shadow-[0_2px_8px_rgba(214,183,121,0.8)]">H</span>
                    <span className="text-[9px] tracking-widest uppercase text-champagne/90 font-mono mt-0.5">SEAL</span>
                  </div>
                </motion.div>
              </div>

              {/* Envelope Text */}
              <div className="relative z-10 mt-6">
                <p className="font-serif text-xl sm:text-2xl text-ivory tracking-wide font-light">
                  For Haseena
                </p>
                <p className="text-xs sm:text-sm text-champagne/80 font-light mt-1 flex items-center justify-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Click to break the seal and read</span>
                </p>
              </div>

              {/* Golden Corner Accents */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-champagne/60" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-champagne/60" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-champagne/60" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-champagne/60" />
            </motion.div>
          ) : (
            /* Unfolded Digital Love Letter */
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full parchment-bg rounded-2xl p-8 sm:p-12 md:p-16 text-burgundy-950 shadow-[0_30px_90px_rgba(0,0,0,0.9)] border-2 border-champagne"
            >
              {/* Ornate Gold Border Frame */}
              <div className="absolute inset-4 sm:inset-6 border border-champagne/70 rounded-xl pointer-events-none" />
              
              {/* Corner Filigrees */}
              <div className="absolute top-6 left-6 text-champagne text-2xl font-serif select-none pointer-events-none">❧</div>
              <div className="absolute top-6 right-6 text-champagne text-2xl font-serif select-none pointer-events-none scale-x-[-1]">❧</div>
              <div className="absolute bottom-6 left-6 text-champagne text-2xl font-serif select-none pointer-events-none scale-y-[-1]">❧</div>
              <div className="absolute bottom-6 right-6 text-champagne text-2xl font-serif select-none pointer-events-none scale-[-1]">❧</div>

              {/* Salutation */}
              <div className="relative z-10 mb-8">
                <h3 className="font-handwritten text-4xl sm:text-5xl md:text-6xl text-wine font-bold">
                  {recipient}
                </h3>
              </div>

              {/* Letter Paragraphs */}
              <div className="relative z-10 space-y-6 text-base sm:text-lg md:text-xl font-serif leading-relaxed text-burgundy-950/90 font-normal">
                {paragraphs.map((p, i) => (
                  <p key={i} className="first-letter:text-3xl first-letter:font-serif first-letter:text-wine first-letter:float-left first-letter:mr-1">
                    {p}
                  </p>
                ))}
              </div>

              {/* Signoff & Sender */}
              <div className="relative z-10 mt-12 text-right">
                <p className="font-serif italic text-sm sm:text-base text-burgundy-950/70">
                  {signoff}
                </p>
                <p className="font-handwritten text-3xl sm:text-4xl text-wine font-bold mt-1">
                  {sender}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 mt-8 pt-6 border-t border-champagne/40 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-champagne/20 hover:bg-champagne/30 text-wine text-xs uppercase tracking-widest font-mono transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Save As Keepsake</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-burgundy/10 hover:bg-burgundy/20 text-wine text-xs uppercase tracking-widest font-mono transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Fold Back</span>
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

