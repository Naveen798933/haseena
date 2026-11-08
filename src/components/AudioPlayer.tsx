import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles, CloudRain, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { romanticPiano, SoundMood } from '../utils/audioSynthesizer';

interface AudioPlayerProps {
  musicUrl?: string;
  title?: string;
  artist?: string;
  autoStartTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  musicUrl,
  title = "Nocturne in Champagne & Rose",
  artist = "Romantic Piano Solo",
  autoStartTrigger = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentMood, setCurrentMood] = useState<SoundMood>('piano');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const moodNames: Record<SoundMood, { name: string; icon: React.FC<{ className?: string }> }> = {
    piano: { name: 'Piano Nocturne', icon: Sparkles },
    rain: { name: 'Rain & Piano', icon: CloudRain },
    starlight: { name: 'Midnight Starlight', icon: Moon }
  };

  const handleSelectMood = (mood: SoundMood) => {
    setCurrentMood(mood);
    romanticPiano.setMood(mood);
  };

  // Synchronize audio volume
  useEffect(() => {
    const currentVol = isMuted ? 0 : volume;
    if (audioRef.current) {
      audioRef.current.volume = currentVol;
    }
    romanticPiano.setVolume(currentVol);
  }, [volume, isMuted]);

  // Handle external auto-start (e.g. when entering website)
  useEffect(() => {
    if (autoStartTrigger && !isPlaying) {
      handleTogglePlay();
    }
  }, [autoStartTrigger]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      // Pause
      if (musicUrl && audioRef.current) {
        audioRef.current.pause();
      } else {
        romanticPiano.stop();
      }
      setIsPlaying(false);
    } else {
      // Play
      if (musicUrl && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn("Audio element play error, falling back to synthesizer:", err);
          romanticPiano.start();
          setIsPlaying(true);
        });
      } else {
        romanticPiano.start();
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (isMuted && newVol > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {musicUrl && (
        <audio
          ref={audioRef}
          src={musicUrl}
          loop
          preload="auto"
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Floating Romantic Audio Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <div className="relative group">
          {/* Glass Card Container */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-burgundy-900/80 backdrop-blur-xl border border-champagne/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-ivory transition-all duration-300 hover:border-champagne/60 hover:shadow-[0_0_20px_rgba(214,183,121,0.25)]">
            
            {/* Play/Pause Button */}
            <button
              onClick={handleTogglePlay}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-wine to-champagne/80 flex items-center justify-center text-ivory hover:scale-105 active:scale-95 transition-transform shadow-md"
              title={isPlaying ? "Pause music" : "Play romantic piano music"}
              aria-label={isPlaying ? "Pause music" : "Play romantic piano music"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-ivory text-ivory" />
              ) : (
                <Play className="w-4 h-4 fill-ivory text-ivory ml-0.5" />
              )}
            </button>

            {/* Track Info & Visualizer */}
            <div className="hidden sm:flex flex-col text-left max-w-[150px] overflow-hidden">
              <span className="text-[11px] font-medium tracking-wider text-champagne uppercase truncate">
                {title}
              </span>
              <span className="text-[10px] text-ivory/60 truncate font-light">
                {artist}
              </span>
            </div>

            {/* Equalizer Waveform Bars when playing */}
            <div className="flex items-center gap-0.5 h-4 px-1">
              {[0.4, 0.8, 0.6, 1, 0.5].map((delay, idx) => (
                <motion.span
                  key={idx}
                  className="w-0.5 bg-champagne rounded-full"
                  animate={{
                    height: isPlaying ? ['4px', '16px', '6px', '14px', '4px'] : '4px',
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: delay * 0.3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Volume Toggle */}
            <div className="relative flex items-center">
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-1.5 rounded-full hover:bg-wine/40 text-champagne/80 hover:text-champagne transition-colors"
                title="Adjust volume & soundscape moods"
                aria-label="Adjust volume & soundscape moods"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              {/* Volume Slider & Soundscape Moods Flyout */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute bottom-12 right-0 p-4 rounded-2xl bg-burgundy-900/95 backdrop-blur-xl border border-champagne/30 shadow-2xl flex flex-col gap-3 min-w-[210px]"
                  >
                    <div>
                      <div className="flex justify-between w-full text-[10px] text-champagne/80 font-mono mb-1">
                        <span className="uppercase">Volume</span>
                        <span>{Math.round((isMuted ? 0 : volume) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1 bg-burgundy-800 rounded-lg appearance-none cursor-pointer accent-champagne"
                      />
                    </div>

                    {!musicUrl && (
                      <div className="pt-2 border-t border-champagne/20">
                        <span className="block text-[9px] uppercase tracking-wider text-champagne/70 font-mono mb-2">
                          Soundscape Mood
                        </span>
                        <div className="flex flex-col gap-1.5">
                          {(['piano', 'rain', 'starlight'] as SoundMood[]).map((m) => {
                            const MoodIcon = moodNames[m].icon;
                            const isSelected = currentMood === m;
                            return (
                              <button
                                key={m}
                                onClick={() => handleSelectMood(m)}
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors text-left ${
                                  isSelected
                                    ? 'bg-wine text-champagne border border-champagne/50'
                                    : 'text-ivory/70 hover:bg-burgundy-950 hover:text-champagne'
                                }`}
                              >
                                <MoodIcon className="w-3.5 h-3.5 shrink-0" />
                                <span>{moodNames[m].name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </motion.div>
    </>
  );
};

