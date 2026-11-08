import React, { useState, useEffect } from 'react';
import { Heart, Lock, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenAdmin: () => void;
  title?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, title = "A Little World Called Haseena" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Six Moments', href: '#gallery' },
    { name: 'Midnight Drives', href: '#supercars' },
    { name: 'Our Story', href: '#story' },
    { name: 'Why Haseena', href: '#little-things' },
    { name: 'The Letter', href: '#letter' },
    { name: 'For Haseena', href: '#proposal' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-burgundy-950/85 backdrop-blur-md border-b border-champagne/20 py-3 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo / Title */}
        <a
          href="#"
          className="flex items-center gap-2 group text-left"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Heart className="w-4 h-4 text-champagne fill-champagne/40 group-hover:scale-125 transition-transform" />
          <span className="font-serif tracking-widest text-sm sm:text-base font-light text-ivory group-hover:text-champagne transition-colors">
            HASEENA
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs font-sans tracking-[0.2em] uppercase text-ivory/80 hover:text-champagne transition-colors font-light relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-champagne hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Icons: Admin trigger & Mobile menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-full text-champagne/60 hover:text-champagne hover:bg-wine/30 transition-all"
            title="Admin Dashboard (/admin)"
            aria-label="Open Admin Dashboard"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ivory hover:text-champagne transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-burgundy-950/95 backdrop-blur-xl border-b border-champagne/20 px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-sans tracking-[0.2em] uppercase text-ivory/90 hover:text-champagne py-2 border-b border-champagne/10 font-light"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-champagne/80 hover:text-champagne pt-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login (/admin)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

