
// A simple Web Audio API wrapper for cute, synthesized game sounds
class AudioService {
  private ctx: AudioContext | null = null;
  private volume: number = 0.3;

  private getContext(): AudioContext {
    if (!this.ctx) {
      // @ts-ignore - Handle webkit prefix for older Safari if needed
      const CtxClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new CtxClass();
    }
    return this.ctx;
  }

  // Ensure context is running (browsers block audio until user interaction)
  public async resume() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, startTime: number = 0) {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

    // Envelope for a softer sound (no clicking)
    gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
    gain.gain.linearRampToValueAtTime(this.volume, ctx.currentTime + startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration);
  }

  public playSuccess() {
    this.resume();
    // A cheerful Major Triad Arpeggio (C - E - G)
    this.playTone(523.25, 'sine', 0.2, 0);    // C5
    this.playTone(659.25, 'sine', 0.2, 0.15); // E5
    this.playTone(783.99, 'sine', 0.4, 0.3);  // G5
  }

  public playMistake() {
    this.resume();
    // A gentle "wobble" down
    this.playTone(300, 'triangle', 0.15, 0);
    this.playTone(250, 'triangle', 0.3, 0.1);
  }

  public playLevelUp() {
    this.resume();
    // A magical run up
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((note, i) => {
      this.playTone(note, 'sine', 0.3, i * 0.1);
    });
  }

  public playDefeat() {
    this.resume();
    // A sad slide down
    this.playTone(400, 'triangle', 0.4, 0);
    this.playTone(350, 'triangle', 0.4, 0.3);
    this.playTone(300, 'triangle', 0.8, 0.6);
  }

  public playClick() {
    this.resume();
    // A short pop
    this.playTone(800, 'sine', 0.05, 0);
  }
}

export const audioService = new AudioService();
