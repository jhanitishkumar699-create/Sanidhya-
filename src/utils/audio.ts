/**
 * Gentle Procedural Ambient Piano & Celesta Audio Synthesizer
 * Uses Web Audio API for 100% reliable, zero-latency, CORS-free playback.
 */

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.4;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private listeners: Array<() => void> = [];

  // Heartfelt, slow romantic melodic sequence in F Major / D Minor
  // F3, A3, C4, E4, F4, G4, A4, D4...
  private melodyNotes = [
    { freq: 174.61, dur: 2.5, vel: 0.5 }, // F3
    { freq: 261.63, dur: 2.0, vel: 0.4 }, // C4
    { freq: 329.63, dur: 2.5, vel: 0.45 }, // E4
    { freq: 349.23, dur: 3.0, vel: 0.5 }, // F4
    { freq: 220.00, dur: 2.5, vel: 0.4 }, // A3
    { freq: 261.63, dur: 2.0, vel: 0.35 }, // C4
    { freq: 392.00, dur: 2.8, vel: 0.4 }, // G4
    { freq: 349.23, dur: 3.2, vel: 0.5 }, // F4
    { freq: 146.83, dur: 3.0, vel: 0.5 }, // D3
    { freq: 220.00, dur: 2.5, vel: 0.4 }, // A3
    { freq: 293.66, dur: 2.5, vel: 0.4 }, // D4
    { freq: 349.23, dur: 3.5, vel: 0.45 }, // F4
    { freq: 233.08, dur: 3.0, vel: 0.45 }, // Bb3
    { freq: 261.63, dur: 2.5, vel: 0.4 }, // C4
    { freq: 349.23, dur: 2.5, vel: 0.4 }, // F4
    { freq: 329.63, dur: 4.0, vel: 0.5 }, // E4
  ];

  constructor() {
    // Initialized lazily on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public play() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.scheduleNextNote();
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0 : this.volume,
        this.ctx.currentTime,
        0.05
      );
    }
    this.notify();
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (!this.isMuted && this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  private scheduleNextNote() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const note = this.melodyNotes[this.currentStep];
    this.playTone(note.freq, note.dur, note.vel);

    this.currentStep = (this.currentStep + 1) % this.melodyNotes.length;

    // Tempo: each step takes roughly 1.8 - 2.2 seconds for a peaceful ambient pace
    const nextInterval = 1900 + Math.random() * 300;
    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, nextInterval);
  }

  private playTone(freq: number, duration: number, velocity: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Dual oscillator: Warm triangle wave + Sine overtone for warm acoustic celesta/piano sound
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now); // Gentle octave overtone

    // Low pass filter for soft mellow warmth
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + duration);

    // Warm envelope
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(velocity * 0.18, now + 0.08); // gentle attack
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
    };
  }

  public subscribe(fn: () => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }
}

export const romanticAudio = new RomanticAudioManager();
