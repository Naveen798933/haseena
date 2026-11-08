/**
 * Romantic Piano Synthesizer
 * Generates an ethereal, delicate romantic piano nocturne in pure Web Audio API.
 * Uses soft harmonics, lowpass filtering, and gentle arpeggiated piano chords.
 */

class RomanticPianoPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private volume = 0.6;
  private noteIndex = 0;

  // Gentle romantic progression (notes in Hz)
  // Chords: Dbmaj9, Bbm9, Gbmaj7, Abadd9
  private chordProgression = [
    // Dbmaj9: Db3, F3, Ab3, C4, Eb4
    [138.59, 174.61, 207.65, 261.63, 311.13],
    // Bbm9: Bb2, Db3, F3, Ab3, C4
    [116.54, 138.59, 174.61, 207.65, 261.63],
    // Gbmaj7: Gb2, Bb2, Db3, F3, Ab3
    [92.50, 116.54, 138.59, 174.61, 207.65],
    // Abadd9: Ab2, C3, Eb3, Ab3, Bb3
    [103.83, 130.81, 155.56, 207.65, 233.08],
  ];

  private melodyNotes = [
    311.13, 261.63, 207.65, 261.63,
    311.13, 349.23, 415.30, 349.23,
    311.13, 261.63, 207.65, 174.61,
    207.65, 233.08, 261.63, 207.65
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playPianoNote(freq: number, duration: number, velocity = 0.5) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Fundamental oscillator (sine)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Warm overtone oscillator (triangle)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Filter to simulate warm wooden soundboard
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    // Note envelope
    const noteGain = this.ctx.createGain();
    const peakGain = velocity * 0.25;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(peakGain, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;

    let step = 0;
    const tick = () => {
      if (!this.isPlaying) return;

      const chordIdx = Math.floor(step / 8) % this.chordProgression.length;
      const currentChord = this.chordProgression[chordIdx];

      // Bass note on downbeat
      if (step % 8 === 0) {
        this.playPianoNote(currentChord[0], 3.8, 0.45);
      }

      // Arpeggiated soft accompaniment
      const chordTone = currentChord[(step % (currentChord.length - 1)) + 1];
      this.playPianoNote(chordTone, 2.2, 0.25);

      // Delicate high romantic melody note
      if (step % 2 === 0) {
        const melNote = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
        this.playPianoNote(melNote, 2.6, 0.35);
        this.noteIndex++;
      }

      step++;
      this.timer = window.setTimeout(tick, 700);
    };

    tick();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const romanticPiano = new RomanticPianoPlayer();
