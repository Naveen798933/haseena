import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw, Send, Download } from 'lucide-react';
import { recordProposalResponse } from '../firebase/services';
import { generateKeepsakeCard } from '../utils/generateKeepsakeCard';
import { romanticSounds } from '../utils/romanticSounds';

interface ProposalSectionProps {
  prelude?: string;
  question?: string;
  yesButtonText?: string;
  noButtonText?: string;
  yesResponse?: string;
  noResponse?: string;
}

export const ProposalSection: React.FC<ProposalSectionProps> = ({
  prelude = "Haseena, there's something I've been meaning to tell you...",
  question = "Would you be open to making a few beautiful memories together?",
  yesButtonText = "I'd love to",
  noButtonText = "I'd like some time",
  yesResponse = "Maybe this is the beginning of something beautiful. ❤️",
  noResponse = "Of course. Take all the time you need. Your happiness matters."
}) => {
  const [response, setResponse] = useState<'yes' | 'need_time' | null>(null);
  const [userNote, setUserNote] = useState('');
  const [noteSent, setNoteSent] = useState(false);

  const fireRomanticConfetti = () => {
    // Elegant rose & gold champagne confetti cannon
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#D6B779', '#64152D', '#F4DCE2', '#FFF8F0', '#caa05d']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleSelectYes = () => {
    setResponse('yes');
    fireRomanticConfetti();
    romanticSounds.playProposalJoyChime();
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([40, 30, 50, 40, 80]);
      } catch {}
    }
    recordProposalResponse('yes');
  };

  const handleSelectNeedTime = () => {
    setResponse('need_time');
    recordProposalResponse('need_time');
  };

  const handleSendNote = () => {
    if (!userNote.trim() || !response) return;
    recordProposalResponse(response, userNote.trim());
    setNoteSent(true);
  };

  const handleReset = () => {
    setResponse(null);
    setUserNote('');
    setNoteSent(false);
  };

  return (
    <section id="proposal" className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Deep Burgundy & Champagne Lighting Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-wine/30 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-champagne/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        
        {/* Animated Golden Heart */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative inline-block mb-10"
        >
          {/* Subtle Heart Glow */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-wine/60 blur-2xl"
          />

          <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-wine via-wine-light to-champagne p-[2px] shadow-[0_0_50px_rgba(214,183,121,0.3)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-burgundy-950 flex items-center justify-center">
              <Heart className="w-12 h-12 text-champagne fill-champagne/30 drop-shadow-[0_0_15px_rgba(214,183,121,0.9)] animate-pulse" />
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!response ? (
            /* Proposal Question State */
            <motion.div
              key="question-box"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Prelude */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="font-serif text-2xl sm:text-3xl text-champagne/90 italic font-light tracking-wide"
              >
                &ldquo;{prelude}&rdquo;
              </motion.p>

              {/* Main Reveal Question */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory font-normal tracking-wide leading-tight px-4"
              >
                {question}
              </motion.h2>

              {/* Two Emotional Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8"
              >
                {/* Yes Button: ❤️ "I'd love to" */}
                <button
                  onClick={handleSelectYes}
                  className="w-full sm:w-auto min-w-[220px] group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-wine to-wine-light border border-champagne text-ivory font-serif text-lg tracking-wide shadow-[0_10px_35px_rgba(100,21,45,0.7)] hover:shadow-[0_0_40px_rgba(214,183,121,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Heart className="w-5 h-5 text-champagne fill-champagne group-hover:scale-125 transition-transform" />
                  <span className="group-hover:text-champagne transition-colors">
                    {yesButtonText}
                  </span>
                </button>

                {/* Need Time Button: 🤍 "I'd like some time" */}
                <button
                  onClick={handleSelectNeedTime}
                  className="w-full sm:w-auto min-w-[220px] group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-burgundy-900/60 backdrop-blur-md border border-champagne/40 text-ivory/80 font-serif text-lg tracking-wide hover:border-champagne hover:text-ivory hover:bg-wine/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Heart className="w-5 h-5 text-ivory/60 group-hover:text-champagne transition-colors" />
                  <span>{noButtonText}</span>
                </button>
              </motion.div>

              <p className="text-xs text-champagne/50 tracking-widest uppercase font-light pt-4">
                Whatever you feel in your heart is always honored.
              </p>
            </motion.div>
          ) : (
            /* Response Reveal State */
            <motion.div
              key="response-box"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="p-8 sm:p-12 md:p-16 rounded-3xl bg-burgundy-900/80 backdrop-blur-xl border border-champagne shadow-[0_20px_70px_rgba(0,0,0,0.8)] max-w-2xl mx-auto"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-wine/60 border border-champagne/60 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-champagne animate-pulse" />
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory font-light leading-relaxed mb-4">
                {response === 'yes' ? yesResponse : noResponse}
              </h3>

              <p className="font-serif italic text-base sm:text-lg text-champagne/80 font-light max-w-lg mx-auto leading-relaxed">
                {response === 'yes'
                  ? "Thank you for being you, Haseena. Every chapter from here is special."
                  : "There is never any rush or pressure. Your happiness and peace mean everything to me."}
              </p>

              {/* Optional note from Haseena */}
              <div className="mt-8 pt-6 border-t border-champagne/20 max-w-md mx-auto">
                {!noteSent ? (
                  <div className="space-y-3">
                    <label className="block text-xs font-serif text-champagne/90 italic">
                      Leave a little note for him (optional):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={userNote}
                        onChange={(e) => setUserNote(e.target.value)}
                        placeholder="Write whatever is on your mind..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-burgundy-950/80 border border-champagne/30 text-ivory placeholder-champagne/30 text-xs focus:border-champagne focus:outline-none"
                      />
                      <button
                        onClick={handleSendNote}
                        disabled={!userNote.trim()}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-wine to-champagne/80 text-ivory text-xs font-mono uppercase tracking-wider disabled:opacity-40 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-champagne font-mono flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-champagne text-champagne" />
                    <span>Your note has been warmly delivered to him.</span>
                  </motion.p>
                )}
              </div>

              {/* Keepsake Postcard for Acceptance */}
              {response === 'yes' && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => generateKeepsakeCard("HASEENA", "Naveen")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-wine to-champagne/80 hover:from-wine-light hover:to-champagne text-ivory text-xs uppercase tracking-widest font-mono shadow-lg hover:shadow-[0_0_25px_rgba(214,183,121,0.5)] hover:scale-105 active:scale-95 transition-all"
                  >
                    <Download className="w-4 h-4 text-champagne" />
                    <span>Download Keepsake Postcard 💌</span>
                  </button>
                </div>
              )}

              {/* Replay Option */}
              <div className="mt-10 pt-6 border-t border-champagne/30 flex justify-center">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-burgundy-950/60 hover:bg-wine/40 border border-champagne/30 text-champagne text-xs uppercase tracking-widest font-mono transition-all hover:border-champagne"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Replay Proposal Reveal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

