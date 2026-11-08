import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { PhotoItem } from '../types';

interface LightboxModalProps {
  photos: PhotoItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  selectedIndex,
  onClose,
  onNavigate,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, photos.length]);

  if (selectedIndex === null) return null;

  const currentPhoto = photos[selectedIndex];
  if (!currentPhoto) return null;

  const handlePrev = () => {
    setIsZoomed(false);
    onNavigate((selectedIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setIsZoomed(false);
    onNavigate((selectedIndex + 1) % photos.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-burgundy-950/95 backdrop-blur-2xl"
        />

        {/* Floating Controls Bar */}
        <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-3 rounded-full bg-burgundy-900/80 border border-champagne/30 text-champagne hover:bg-wine/60 hover:border-champagne transition-colors"
            title={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-burgundy-900/80 border border-champagne/30 text-champagne hover:bg-wine/60 hover:border-champagne transition-colors"
            title="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Counter Badge */}
        <div className="absolute top-6 left-6 z-50 px-4 py-2 rounded-full bg-burgundy-900/80 border border-champagne/30 text-champagne text-xs tracking-widest uppercase font-mono">
          {selectedIndex + 1} / {photos.length}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 z-50 p-3 rounded-full bg-burgundy-900/70 border border-champagne/30 text-champagne hover:bg-wine hover:border-champagne transition-all hover:scale-110 active:scale-95"
          title="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 z-50 p-3 rounded-full bg-burgundy-900/70 border border-champagne/30 text-champagne hover:bg-wine hover:border-champagne transition-all hover:scale-110 active:scale-95"
          title="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Content Modal */}
        <motion.div
          key={currentPhoto.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-40 max-w-5xl max-h-[85vh] flex flex-col items-center"
        >
          {/* Framed Image Container */}
          <div
            className={`relative overflow-hidden rounded-2xl border-2 border-champagne/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-transform duration-300 ${
              isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={currentPhoto.url}
              alt={currentPhoto.caption}
              className="max-h-[70vh] max-w-[85vw] w-auto object-contain select-none"
            />
            {/* Corner filigrees */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-champagne/80 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-champagne/80 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-champagne/80 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-champagne/80 pointer-events-none" />
          </div>

          {/* Caption Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center max-w-xl px-4"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-ivory tracking-wide font-light">
              {currentPhoto.caption}
            </h3>
            {currentPhoto.subtitle && (
              <p className="mt-2 text-sm md:text-base text-champagne/80 font-light italic">
                {currentPhoto.subtitle}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

