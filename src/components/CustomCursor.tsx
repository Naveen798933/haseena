import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Smooth physics-based spring interpolation
  const cursorX = useSpring(0, { stiffness: 450, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 450, damping: 28 });

  const followerX = useSpring(0, { stiffness: 180, damping: 22 });
  const followerY = useSpring(0, { stiffness: 180, damping: 22 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.cursor === 'hover'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, followerX, followerY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50">
      {/* Outer Romantic Glowing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-champagne/60 pointer-events-none"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 48 : isClicked ? 24 : 32,
          height: isHovered ? 48 : isClicked ? 24 : 32,
          backgroundColor: isHovered ? 'rgba(214, 183, 121, 0.15)' : 'rgba(214, 183, 121, 0.05)',
          borderColor: isHovered ? '#D6B779' : 'rgba(214, 183, 121, 0.5)',
          boxShadow: isHovered
            ? '0 0 20px rgba(214, 183, 121, 0.5)'
            : '0 0 10px rgba(214, 183, 121, 0.2)',
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Inner Golden Sparkling Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-champagne pointer-events-none shadow-[0_0_8px_#D6B779]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 1.5 : isHovered ? 0.5 : 1,
        }}
      />
    </div>
  );
};

