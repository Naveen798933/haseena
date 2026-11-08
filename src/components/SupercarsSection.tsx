import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Maximize2, X, ChevronRight, Gauge } from 'lucide-react';
import { SupercarItem } from '../types';

interface SupercarsSectionProps {
  supercars?: SupercarItem[];
}

interface SupercarCardProps {
  car: SupercarItem;
  index: number;
  onOpen: () => void;
}

const SupercarCard: React.FC<SupercarCardProps> = ({ car, index, onOpen }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rX = -(mouseY / (rect.height / 2)) * 8;
    const rY = (mouseX / (rect.width / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onOpen}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="cursor-pointer relative overflow-hidden rounded-2xl bg-burgundy-900/60 border border-champagne/30 p-3.5 shadow-xl group-hover:border-champagne group-hover:shadow-[0_0_35px_rgba(214,183,121,0.25)] transition-all duration-500"
      >
        {/* Aspect Ratio Container (16:10 for cars) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-burgundy-950">
          <img
            src={car.imageUrl}
            alt={car.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 via-burgundy-950/30 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Golden Corner Accents */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-champagne/70 group-hover:border-champagne transition-colors" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-champagne/70 group-hover:border-champagne transition-colors" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-champagne/70 group-hover:border-champagne transition-colors" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-champagne/70 group-hover:border-champagne transition-colors" />

          {/* Tagline Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-burgundy-950/85 backdrop-blur-md border border-champagne/40 text-champagne text-[10px] font-mono tracking-wider flex items-center gap-1.5">
            <Gauge className="w-3 h-3 text-champagne" />
            <span>0{index + 1}</span>
          </div>

          {/* Expand View Hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-burgundy-950/40 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-burgundy-900/90 border border-champagne text-champagne text-xs uppercase tracking-widest shadow-lg">
              <Maximize2 className="w-3.5 h-3.5" />
              View Supercar
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="pt-4 pb-2 px-2 text-left">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-xl text-ivory tracking-wide font-normal group-hover:text-champagne transition-colors duration-300">
              {car.name}
            </h3>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-burgundy-950 border border-champagne/30 text-champagne/90">
              Dream Ride
            </span>
          </div>

          <p className="text-xs text-champagne/80 font-mono mt-1 tracking-wide">
            {car.tagline}
          </p>

          <p className="text-xs text-ivory/70 font-light mt-2 line-clamp-2 leading-relaxed">
            {car.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const SupercarsSection: React.FC<SupercarsSectionProps> = ({ supercars = [] }) => {
  const [selectedCar, setSelectedCar] = useState<SupercarItem | null>(null);

  if (!supercars || supercars.length === 0) return null;

  return (
    <section id="supercars" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Background Lighting Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-wine/25 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-champagne/30 bg-burgundy-900/60 backdrop-blur-md mb-4"
        >
          <Compass className="w-3.5 h-3.5 text-champagne" />
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-champagne font-light">
            CHAPTER II • DREAMS & MIDNIGHT DRIVES
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory font-light tracking-wide mb-4"
        >
          The Journeys We&apos;ll Take
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-champagne/80 font-light text-sm sm:text-base leading-relaxed tracking-wide"
        >
          Fast lanes, open coastal highways, late-night playlists, and chasing dreams hand in hand.
        </motion.p>
      </div>

      {/* Grid of Supercars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {supercars.map((car, index) => (
          <SupercarCard
            key={car.id || index}
            car={car}
            index={index}
            onOpen={() => setSelectedCar(car)}
          />
        ))}
      </div>

      {/* Fullscreen Supercar Modal */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCar(null)}
              className="absolute inset-0 bg-burgundy-950/95 backdrop-blur-2xl"
            />

            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-burgundy-900/80 border border-champagne/30 text-champagne hover:bg-wine hover:border-champagne transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative z-40 max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-burgundy-900 border border-champagne/40 p-6 md:p-8 shadow-2xl flex flex-col"
            >
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-champagne/30">
                <img
                  src={selectedCar.imageUrl}
                  alt={selectedCar.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-serif text-3xl md:text-4xl text-ivory font-light">
                    {selectedCar.name}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-burgundy-950 border border-champagne/30 text-champagne text-xs font-mono uppercase tracking-wider self-start sm:self-auto">
                    {selectedCar.tagline}
                  </span>
                </div>

                <p className="font-serif italic text-base md:text-lg text-champagne/90 leading-relaxed pt-2">
                  &ldquo;{selectedCar.description}&rdquo;
                </p>

                <p className="text-xs text-ivory/60 font-light pt-2">
                  Dedicated to midnight drives and the beautiful adventures waiting ahead with Haseena.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

