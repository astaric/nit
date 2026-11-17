import Phaser from 'phaser';
import { W, H } from './dims';
import { currentJourney } from './stages';
import type { Theme } from './types';

/** Dark brown used for outlines and text on light cards. */
export const BROWN = 0x5a3a22;
export const INK = '#5a3a22';
export const FONT = 'system-ui, sans-serif';

export function theme(): Theme {
  return currentJourney().theme;
}

export function shuffle<T>(a: readonly T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export interface TxtOpts { color?: string; wrap?: number; stroke?: string; sw?: number; bold?: boolean; align?: string }

/** Centered text. Defaults to the journey's ink colour (readable on the background). */
export function txt(scene: Phaser.Scene, x: number, y: number, s: string, size = 56, o: TxtOpts = {}): Phaser.GameObjects.Text {
  const style: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: FONT,
    fontSize: `${size}px`,
    fontStyle: o.bold === false ? 'normal' : 'bold',
    color: o.color ?? theme().ink,
    align: o.align ?? 'center',
  };
  if (o.wrap) style.wordWrap = { width: o.wrap };
  if (o.stroke) { style.stroke = o.stroke; style.strokeThickness = o.sw ?? 8; }
  return scene.add.text(x, y, s, style).setOrigin(0.5);
}

export function panel(
  scene: Phaser.Scene, w: number, h: number, fill: number,
  o: { r?: number; sw?: number; stroke?: number; alpha?: number } = {},
): Phaser.GameObjects.Graphics {
  const g = scene.add.graphics();
  drawPanel(g, w, h, fill, o);
  return g;
}

export function drawPanel(
  g: Phaser.GameObjects.Graphics, w: number, h: number, fill: number,
  o: { r?: number; sw?: number; stroke?: number; alpha?: number } = {},
): void {
  const r = o.r ?? 28;
  const sw = o.sw ?? 8;
  g.clear();
  g.fillStyle(fill, o.alpha ?? 1);
  g.fillRoundedRect(-w / 2, -h / 2, w, h, r);
  if (sw > 0) {
    g.lineStyle(sw, o.stroke ?? BROWN, 1);
    g.strokeRoundedRect(-w / 2, -h / 2, w, h, r);
  }
}

export interface Card {
  c: Phaser.GameObjects.Container;
  text: Phaser.GameObjects.Text;
  setFill(fill: number): void;
  w: number;
  h: number;
}

/** A rounded card with centered text (and optional emoji or image on the left). */
export function makeCard(
  scene: Phaser.Scene, x: number, y: number, w: number, h: number, label: string,
  o: { fill?: number; size?: number; emoji?: string; img?: string; imgSize?: number } = {},
): Card {
  const fill = o.fill ?? 0xfff6e0;
  const bg = panel(scene, w, h, fill);
  const parts: Phaser.GameObjects.GameObject[] = [bg];
  let textX = 0;
  let wrap = w - 50;
  if (o.emoji || o.img) {
    const iconW = (o.imgSize ?? 90) + 30;
    textX = iconW / 2;
    wrap = w - iconW - 50;
    if (o.emoji) parts.push(scene.add.text(-w / 2 + iconW / 2 + 14, 0, o.emoji, { fontSize: `${Math.min(h * 0.55, 90)}px` }).setOrigin(0.5));
    else {
      const im = scene.add.image(-w / 2 + iconW / 2 + 14, 0, o.img!);
      im.setScale((o.imgSize ?? 90) / Math.max(im.width, im.height));
      parts.push(im);
    }
  }
  const text = txt(scene, textX, 0, label, o.size ?? 48, { color: INK, wrap });
  parts.push(text);
  const c = scene.add.container(x, y, parts);
  c.setSize(w, h);
  return {
    c, text, w, h,
    setFill: (f: number) => drawPanel(bg, w, h, f),
  };
}

export function button(
  scene: Phaser.Scene, x: number, y: number, label: string, onTap: () => void,
  o: { w?: number; h?: number; fill?: number; size?: number; pulse?: boolean } = {},
): Phaser.GameObjects.Container {
  const w = o.w ?? 560;
  const h = o.h ?? 150;
  const bg = panel(scene, w, h, o.fill ?? 0x5dd39e, { r: h / 2 });
  const t = txt(scene, 0, 0, label, o.size ?? 64, { color: '#ffffff', stroke: '#2c6b4f', sw: 10 });
  const c = scene.add.container(x, y, [bg, t]);
  c.setSize(w + 30, h + 30).setInteractive();
  let fired = false;
  c.on('pointerdown', () => {
    if (fired) return;
    fired = true;
    scene.tweens.add({ targets: c, scale: 0.92, duration: 80, yoyo: true, onComplete: () => { fired = false; onTap(); } });
  });
  if (o.pulse !== false) scene.tweens.add({ targets: c, scale: 1.04, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
  return c;
}

/** Twinkling stars for dark themes, a few soft blobs for light ones. */
export function ambient(scene: Phaser.Scene): void {
  const t = theme();
  const n = t.dark ? 70 : 14;
  for (let i = 0; i < n; i++) {
    const x = Phaser.Math.Between(0, W);
    const y = Phaser.Math.Between(0, H);
    if (t.dark) {
      const s = scene.add.circle(x, y, Phaser.Math.Between(2, 6), 0xffffff, Phaser.Math.FloatBetween(0.3, 0.9)).setDepth(-10);
      scene.tweens.add({ targets: s, alpha: 0.1, duration: Phaser.Math.Between(700, 2200), yoyo: true, repeat: -1, delay: Phaser.Math.Between(0, 1500) });
    } else {
      scene.add.circle(x, y, Phaser.Math.Between(40, 120), 0xffffff, 0.18).setDepth(-10);
    }
  }
}

export function confetti(scene: Phaser.Scene, n = 40): void {
  const colors = [0xff5d5d, 0xffd23f, 0x5dd39e, 0x8f7bff, 0x5db7ff];
  for (let i = 0; i < n; i++) {
    const c = scene.add.rectangle(Phaser.Math.Between(0, W), -50, 24, 40, Phaser.Utils.Array.GetRandom(colors)).setDepth(50);
    scene.tweens.add({
      targets: c, y: H + 80, angle: 720, delay: Phaser.Math.Between(0, 1200),
      duration: Phaser.Math.Between(1800, 3200), onComplete: () => c.destroy(),
    });
  }
}

/** Little burst of stars at a point (correct answers). */
export function burst(scene: Phaser.Scene, x: number, y: number, n = 10): void {
  for (let i = 0; i < n; i++) {
    const s = scene.add.image(x, y, 'star').setScale(0.35).setDepth(40);
    const a = (i / n) * Math.PI * 2;
    const d = Phaser.Math.Between(120, 260);
    scene.tweens.add({
      targets: s, x: x + Math.cos(a) * d, y: y + Math.sin(a) * d, alpha: 0, angle: 360, scale: 0.1,
      duration: 600, ease: 'Cubic.out', onComplete: () => s.destroy(),
    });
  }
}
