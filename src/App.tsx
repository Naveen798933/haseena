import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SiteContent, AdminUser } from './types';
import { DEFAULT_CONTENT } from './data/defaultContent';
import { getSiteContent, subscribeToAuthState } from './firebase/services';
import { IntroScreen } from './components/IntroScreen';
import { HeroSection } from './components/HeroSection';
import { GallerySection } from './components/GallerySection';
import { StorySection } from './components/StorySection';
import { SecretLetterSection } from './components/SecretLetterSection';
import { ProposalSection } from './components/ProposalSection';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { PetalCanvas } from './components/PetalCanvas';
import { CustomCursor } from './components/CustomCursor';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [audioStartTrigger, setAudioStartTrigger] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState<boolean>(false);

  // Load content from Firestore / LocalStorage
  useEffect(() => {
    getSiteContent().then((loaded) => {
      setContent(loaded);
    });

    // Check URL route for /admin
    const checkRoute = () => {
      const isPathAdmin = window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
      if (isPathAdmin) {
        if (currentUser) {
          setShowAdminDashboard(true);
        } else {
          setShowAdminLogin(true);
        }
      }
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, [currentUser]);

  // Subscribe to Auth State
  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setCurrentUser(user);
      if (user && (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin')) {
        setShowAdminDashboard(true);
        setShowAdminLogin(false);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Update browser document title dynamically
  useEffect(() => {
    if (content.general.websiteTitle) {
      document.title = `${content.general.websiteTitle} ❤️`;
    }
  }, [content.general.websiteTitle]);

  const handleEnterWorld = () => {
    setHasEntered(true);
    setAudioStartTrigger(true);
  };

  const handleOpenAdmin = () => {
    if (currentUser) {
      setShowAdminDashboard(true);
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
    setShowAdminLogin(false);
    setShowAdminDashboard(true);
  };

  return (
    <div className="relative min-h-screen bg-burgundy text-ivory selection:bg-champagne/30 selection:text-champagne">
      
      {/* Rose Petal & Golden Dust Particle Simulation */}
      <PetalCanvas density={content.theme?.petalCount || 28} />

      {/* Desktop Luxury Custom Cursor */}
      <CustomCursor />

      {/* Gateway Introduction Screen */}
      <AnimatePresence>
        {!hasEntered && (
          <IntroScreen
            onEnter={handleEnterWorld}
            quoteLine1={content.intro.quoteLine1}
            quoteLine2={content.intro.quoteLine2}
            buttonText={content.intro.buttonText}
          />
        )}
      </AnimatePresence>

      {/* Master Main Romantic Website */}
      <main className="relative z-20">
        <Navbar
          onOpenAdmin={handleOpenAdmin}
          title={content.general.websiteTitle}
        />

        {/* Hero Section */}
        <HeroSection
          name={content.general.targetName}
          subtitle={content.general.heroSubtitle}
        />

        {/* Six Personal Photographs Gallery */}
        <GallerySection
          photos={content.photos}
        />

        {/* Our Little Story Timeline */}
        <StorySection
          badge={content.story.badge}
          heading={content.story.heading}
          sentences={content.story.sentences}
        />

        {/* The Secret Letter Section */}
        <SecretLetterSection
          badge={content.letter.badge}
          heading={content.letter.heading}
          recipient={content.letter.recipient}
          paragraphs={content.letter.paragraphs}
          signoff={content.letter.signoff}
          sender={content.letter.sender}
        />

        {/* The Final Proposal Surprise Reveal */}
        <ProposalSection
          prelude={content.proposal.prelude}
          question={content.proposal.question}
          yesButtonText={content.proposal.yesButtonText}
          noButtonText={content.proposal.noButtonText}
          yesResponse={content.proposal.yesResponse}
          noResponse={content.proposal.noResponse}
        />

        {/* Footer */}
        <Footer
          onOpenAdmin={handleOpenAdmin}
          targetName={content.general.targetName}
        />

        {/* Floating Romantic Music Player */}
        {content.audio.enabled && (
          <AudioPlayer
            musicUrl={content.audio.musicUrl}
            title={content.audio.title}
            artist={content.audio.artist}
            autoStartTrigger={audioStartTrigger}
          />
        )}
      </main>

      {/* Admin Authentication Modal */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin Master Dashboard */}
      {showAdminDashboard && currentUser && (
        <AdminDashboard
          initialContent={content}
          currentUser={currentUser}
          onClose={() => setShowAdminDashboard(false)}
          onContentUpdated={(updated) => setContent(updated)}
        />
      )}

    </div>
  );
};
