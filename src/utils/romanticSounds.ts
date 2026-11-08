/**
 * Romantic Micro-Sound Effects using the Web Audio API
 * Zero external audio files required — synthesizes delicate, ethereal romantic chimes.
 */

class RomanticSoundEffects {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Sound of breaking the golden wax seal:
   * A delicate, soft wooden pop followed by a shimmering fairy chime.
   */
  public playWaxSealSound() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Soft wax "unseal" snap (low-pass filtered pop)
      const oscSnap = this.ctx.createOscillator();
      const gainSnap = this.ctx.createGain();
      oscSnap.type = 'sine';
      oscSnap.frequency.setValueAtTime(160, now);
      oscSnap.frequency.exponentialRampToValueAtTime(40, now + 0.08);

      gainSnap.gain.setValueAtTime(0.25, now);
      gainSnap.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      oscSnap.connect(gainSnap);
      gainSnap.connect(this.ctx.destination);
      oscSnap.start(now);
      oscSnap.stop(now + 0.09);

      // 2. Shimmering high fairy chimes (E6, G#6, B6, E7)
      const chimeFreqs = [1318.51, 1661.22, 1975.53, 2637.02];
      chimeFreqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + 0.05 + idx * 0.04);

        const startTime = now + 0.05 + idx * 0.04;
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.5);
      });
    } catch (e) {
      console.warn("Audio chime could not play:", e);
    }
  }

  /**
   * Sound of accepting the proposal ❤️:
   * A lush, joyful romantic harp glissando arpeggio.
   */
  public playProposalJoyChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Harp chord progression: C4, E4, G4, B4, D5, G5, C6
      const harpNotes = [261.63, 329.63, 392.00, 493.88, 587.33, 783.99, 1046.50];

      harpNotes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        const noteStart = now + i * 0.06;
        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(0.2, noteStart + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 1.25);
      });
    } catch (e) {
      console.warn("Proposal chime error:", e);
    }
  }
}

export const romanticSounds = new RomanticSoundEffects();
