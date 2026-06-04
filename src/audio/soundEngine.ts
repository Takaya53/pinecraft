export type BlockSoundGroup = "grass" | "dirt" | "sand" | "stone" | "wood" | "leaves" | "glass";

type SoundProfile = {
  baseFrequency: number;
  duration: number;
  gain: number;
};

const SOUND_PROFILES: Record<BlockSoundGroup, SoundProfile> = {
  grass: { baseFrequency: 160, duration: 0.08, gain: 0.22 },
  dirt: { baseFrequency: 120, duration: 0.08, gain: 0.2 },
  sand: { baseFrequency: 260, duration: 0.07, gain: 0.16 },
  stone: { baseFrequency: 80, duration: 0.06, gain: 0.18 },
  wood: { baseFrequency: 190, duration: 0.08, gain: 0.2 },
  leaves: { baseFrequency: 300, duration: 0.07, gain: 0.12 },
  glass: { baseFrequency: 520, duration: 0.09, gain: 0.14 }
};

export class SoundEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private unlocked = false;

  resumeFromGesture(): void {
    const context = this.ensureContext();
    if (context.state === "suspended") {
      void context.resume();
    }
    this.unlocked = true;
  }

  playStep(group: BlockSoundGroup): void {
    const profile = SOUND_PROFILES[group];
    this.playNoiseBurst(profile, 0.55, randomPitch(0.92, 1.08));
  }

  playMineHit(group: BlockSoundGroup): void {
    const profile = SOUND_PROFILES[group];
    this.playNoiseBurst({ ...profile, duration: profile.duration * 0.72, gain: profile.gain * 0.75 }, 0.9, randomPitch(0.82, 1.18));
  }

  playBlockBreak(group: BlockSoundGroup): void {
    const profile = SOUND_PROFILES[group];
    this.playNoiseBurst({ ...profile, duration: profile.duration * 1.55, gain: profile.gain * 1.25 }, 1.2, randomPitch(0.88, 1.08));
    this.playTone(profile.baseFrequency * 0.7, 0.08, "triangle", profile.gain * 0.25);
  }

  playPlace(group: BlockSoundGroup): void {
    const profile = SOUND_PROFILES[group];
    this.playNoiseBurst({ ...profile, duration: profile.duration * 0.75, gain: profile.gain * 0.8 }, 0.85, randomPitch(0.95, 1.1));
  }

  playBell(): void {
    const pitch = randomPitch(0.97, 1.03);
    this.playTone(740 * pitch, 0.78, "sine", 0.12, 0.72);
    this.playTone(1110 * pitch, 0.48, "triangle", 0.07, 0.86);
    this.playTone(1480 * pitch, 0.28, "sine", 0.04, 0.92);
  }

  playPickup(): void {
    this.playTone(740, 0.09, "sine", 0.08, 1.4);
    this.playTone(990, 0.08, "sine", 0.055, 1.9);
  }

  playSwing(): void {
    this.playNoiseBurst({ baseFrequency: 420, duration: 0.07, gain: 0.075 }, 0.35, randomPitch(0.85, 1.15));
  }

  playMobHit(): void {
    this.playNoiseBurst({ baseFrequency: 130, duration: 0.12, gain: 0.15 }, 0.8, randomPitch(0.88, 1.05));
    this.playTone(180, 0.08, "square", 0.045, 0.7);
  }

  playMobDeath(): void {
    this.playNoiseBurst({ baseFrequency: 95, duration: 0.22, gain: 0.18 }, 0.55, randomPitch(0.82, 0.95));
    this.playTone(150, 0.24, "triangle", 0.07, 0.42);
  }

  playEat(): void {
    this.playNoiseBurst({ baseFrequency: 360, duration: 0.13, gain: 0.16 }, 0.65, randomPitch(0.9, 1.05));
    this.playTone(210, 0.06, "triangle", 0.035);
  }

  playDamage(): void {
    this.playTone(94, 0.18, "sawtooth", 0.12, 0.55);
  }

  playDeath(): void {
    this.playTone(180, 0.32, "triangle", 0.14, 0.42);
    this.playTone(88, 0.42, "sine", 0.12, 0.34);
  }

  private playNoiseBurst(profile: SoundProfile, filterQ: number, pitch: number): void {
    const context = this.activeContext();
    if (!context || !this.master) {
      return;
    }
    const source = context.createBufferSource();
    source.buffer = createNoiseBuffer(context, profile.duration);

    const filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = profile.baseFrequency * pitch;
    filter.Q.value = filterQ;

    const gain = context.createGain();
    const now = context.currentTime;
    gain.gain.setValueAtTime(profile.gain, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + profile.duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    source.start(now);
    source.stop(now + profile.duration);
  }

  private playTone(
    frequency: number,
    duration: number,
    type: OscillatorType,
    volume: number,
    pitchEnd = 1
  ): void {
    const context = this.activeContext();
    if (!context || !this.master) {
      return;
    }
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(24, frequency * pitchEnd), now + duration);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  private activeContext(): AudioContext | null {
    if (!this.unlocked) {
      return null;
    }
    const context = this.ensureContext();
    if (context.state === "suspended") {
      return null;
    }
    return context;
  }

  private ensureContext(): AudioContext {
    if (!this.context) {
      const AudioContextConstructor = window.AudioContext ?? window.webkitAudioContext;
      this.context = new AudioContextConstructor();
      this.master = this.context.createGain();
      this.master.gain.value = 0.45;
      this.master.connect(this.context.destination);
    }
    return this.context;
  }
}

function createNoiseBuffer(context: AudioContext, duration: number): AudioBuffer {
  const sampleCount = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
  const data = buffer.getChannelData(0);
  let previous = 0;
  for (let index = 0; index < sampleCount; index += 1) {
    const white = Math.random() * 2 - 1;
    previous = previous * 0.62 + white * 0.38;
    data[index] = previous;
  }
  return buffer;
}

function randomPitch(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
