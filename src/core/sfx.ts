// Tiny WebAudio synth: no audio files. Call unlockAudio() from a user tap (iOS rule).
let ctx: AudioContext | null = null;

export function unlockAudio(): void {
  try {
    const AC = window.AudioContext ?? (window as any).webkitAudioContext;
    ctx ??= new AC();
    if (ctx.state !== 'running') void ctx.resume();
  } catch {
    /* audio is optional */
  }
}

function tone(freq: number, end: number, dur: number, type: OscillatorType = 'square', vol = 0.15, delay = 0): void {
  if (!ctx || ctx.state !== 'running') return;
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(end, 20), t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t);
  o.stop(t + dur);
}

export const sfx = {
  pop: () => tone(500, 1100, 0.1, 'sine', 0.2),
  boing: () => tone(180, 520, 0.3, 'sine', 0.25),
  whoosh: () => tone(900, 200, 0.25, 'triangle', 0.12),
  tick: () => tone(1200, 1200, 0.04, 'square', 0.06),
  good: () => { tone(660, 660, 0.1, 'square', 0.12); tone(990, 990, 0.18, 'square', 0.12, 0.09); },
  bad: () => { tone(220, 110, 0.25, 'sawtooth', 0.18); tone(165, 80, 0.3, 'sawtooth', 0.18, 0.15); },
  combo: (n: number) => tone(600 + n * 90, 1200 + n * 90, 0.18, 'triangle', 0.16),
  laser: () => tone(1800, 200, 0.22, 'sawtooth', 0.12),
  boom: () => { tone(140, 30, 0.35, 'sawtooth', 0.3); tone(700, 50, 0.2, 'square', 0.12); },
  yay: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, f, 0.15, 'square', 0.12, i * 0.1)),
  lose: () => [392, 330, 262, 196].forEach((f, i) => tone(f, f * 0.95, 0.25, 'triangle', 0.16, i * 0.18)),
  coin: () => { tone(988, 988, 0.08, 'square', 0.12); tone(1319, 1319, 0.2, 'square', 0.12, 0.08); },
};
