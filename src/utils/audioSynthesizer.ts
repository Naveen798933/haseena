/**
 * Romantic Piano & Ambient Soundscape Synthesizer
 * Generates an ethereal, delicate romantic piano nocturne in pure Web Audio API.
 * Features 3 selectable romantic moods:
 * 1. 'piano': Nocturne in Champagne (Pure acoustic piano solo)
 * 2. 'rain': Rain on Rose Petals & Piano (Soft rain ambient sound layered with piano)
 * 3. 'starlight': Midnight Reverie (Slow atmospheric ethereal chords)
 */

export type SoundMood = 'piano' | 'rain' | 'starlight';

class RomanticPianoPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private rainNode: AudioNode | null = null;
  private rainGain: GainNode | null = null;
  private volume = 0.65;
  private noteIndex = 0;
  private currentMood: SoundMood = 'piano';

  // Chords: Dbmaj9, Bbm9, Gbmaj7, Abadd9
  private chordProgression = [
    [138.59, 174.61, 207.65, 261.63, 311.13],
    [116.54, 138.59, 174.61, 207.65, 261.63],
    [92.50, 116.54, 138.59, 174.61, 207.65],
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

  private startRainNoise() {
    if (!this.ctx || !this.masterGain || this.rainNode) return;

    // Synthesize gentle pink/brown rain noise using buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 0.15;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.value = 0.08;

    whiteNoise.connect(filter);
    filter.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);

    whiteNoise.start();
    this.rainNode = whiteNoise;
  }

  private stopRainNoise() {
    if (this.rainNode) {
      try {
        (this.rainNode as AudioBufferSourceNode).stop();
        this.rainNode.disconnect();
      } catch {}
      this.rainNode = null;
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
    osc2.frequency.setValueAtTime(this.currentMood === 'starlight' ? freq * 1.5 : freq * 2, now);

    // Filter to simulate warm wooden soundboard
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    const cutoff = this.currentMood === 'starlight' ? 700 : 1200;
    filter.frequency.setValueAtTime(cutoff, now);
    filter.frequency.exponentialRampToValueAtTime(250, now + duration);

    // Note envelope
    const noteGain = this.ctx.createGain();
    const peakGain = velocity * (this.currentMood === 'starlight' ? 0.18 : 0.25);
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

  public setMood(mood: SoundMood) {
    this.currentMood = mood;
    if (this.isPlaying) {
      if (mood === 'rain') {
        this.startRainNoise();
      } else {
        this.stopRainNoise();
      }
    }
  }

  public getMood(): SoundMood {
    return this.currentMood;
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;

    if (this.currentMood === 'rain') {
      this.startRainNoise();
    }

    let step = 0;
    const tempo = this.currentMood === 'starlight' ? 900 : 700;

    const tick = () => {
      if (!this.isPlaying) return;

      const chordIdx = Math.floor(step / 8) % this.chordProgression.length;
      const currentChord = this.chordProgression[chordIdx];

      // Bass note on downbeat
      if (step % 8 === 0) {
        this.playPianoNote(currentChord[0], 4.2, 0.45);
      }

      // Arpeggiated soft accompaniment
      const chordTone = currentChord[(step % (currentChord.length - 1)) + 1];
      this.playPianoNote(chordTone, 2.5, 0.22);

      // Delicate high romantic melody note
      if (step % 2 === 0) {
        const melNote = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
        this.playPianoNote(melNote, 2.8, 0.32);
        this.noteIndex++;
      }

      step++;
      this.timer = window.setTimeout(tick, tempo);
    };

    tick();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.stopRainNoise();
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
