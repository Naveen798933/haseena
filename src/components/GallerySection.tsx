import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Maximize2, Heart } from 'lucide-react';
import { PhotoItem } from '../types';
import { LightboxModal } from './LightboxModal';

interface GallerySectionProps {
  photos: PhotoItem[];
}

interface PhotoCardProps {
  photo: PhotoItem;
  index: number;
  onOpen: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, index, onOpen }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rX = -(mouseY / (rect.height / 2)) * 10;
    const rY = (mouseX / (rect.width / 2)) * 10;

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
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.12 }}
      className="group relative perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onOpen}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="cursor-pointer relative overflow-hidden rounded-2xl bg-burgundy-900/60 border border-champagne/30 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group-hover:border-champagne group-hover:shadow-[0_0_35px_rgba(214,183,121,0.3)] transition-colors duration-500"
      >
        {/* Aspect Ratio Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-burgundy-950">
          <img
            src={photo.url}
            alt={photo.caption}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 via-burgundy-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Golden Corner Accents */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-champagne/70 group-hover:border-champagne transition-colors" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-champagne/70 group-hover:border-champagne transition-colors" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-champagne/70 group-hover:border-champagne transition-colors" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-champagne/70 group-hover:border-champagne transition-colors" />

          {/* Expand Hint on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-burgundy-950/40 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-burgundy-900/80 border border-champagne text-champagne text-xs uppercase tracking-widest shadow-lg">
              <Maximize2 className="w-3.5 h-3.5" />
              View Photo
            </span>
          </div>

          {/* Number badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-burgundy-950/80 backdrop-blur-md border border-champagne/40 text-champagne text-[11px] font-mono tracking-wider">
            0{index + 1}
          </div>
        </div>

        {/* Caption beneath photo */}
        <div className="pt-4 pb-2 px-2 text-left">
          <h3 className="font-serif text-lg md:text-xl text-ivory tracking-wide font-normal group-hover:text-champagne transition-colors duration-300">
            {photo.caption}
          </h3>
          {photo.subtitle && (
            <p className="text-xs text-champagne/70 font-light mt-1 italic tracking-wide">
              {photo.subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Guarantee exactly 6 photos
  const displayPhotos = photos.slice(0, 6);

  return (
    <section id="gallery" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-champagne/30 bg-burgundy-900/50 backdrop-blur-md mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-champagne font-light">
            GALLERY OF SIX TREASURES
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory font-light tracking-wide mb-4"
        >
          Six Moments In Time
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-champagne/80 font-light text-sm sm:text-base leading-relaxed tracking-wide"
        >
          Each photograph holds a story, a feeling, and a quiet appreciation.
        </motion.p>
      </div>

      {/* 6-Photo Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {displayPhotos.map((photo, index) => (
          <PhotoCard
            key={photo.id || index}
            photo={photo}
            index={index}
            onOpen={() => setSelectedPhotoIndex(index)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        photos={displayPhotos}
        selectedIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(idx) => setSelectedPhotoIndex(idx)}
      />
    </section>
  );
};

