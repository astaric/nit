import Phaser from 'phaser';
import { W } from '../../core/dims';
import { StudyScene } from '../../core/StudyScene';
import { sfx } from '../../core/sfx';
import { burst, drawPanel, INK, makeCard, panel, shuffle, txt } from '../../core/ui';

export interface SeqItem { text: string; emoji?: string; img?: string; note?: string }
export interface SequenceData {
  title: string;
  /** Items in the CORRECT order. */
  items: SeqItem[];
  startLabel?: string;
  endLabel?: string;
}

/** Tap the bubbles in the right order; each one flies into its numbered slot. */
export class Sequence extends StudyScene {
  constructor() { super('Sequence'); }

  create(): void {
    const d = this.cfg as SequenceData;
    this.setup(d.title, 5);
    const n = d.items.length;
    txt(this, W / 2, 235, d.startLabel ? 'Tapni po vrsti!' : 'Tapni v pravilnem vrstnem redu!', 44, { bold: false });

    // Slots (top)
    const rows = n > 8 ? 2 : 1;
    const perRow = Math.ceil(n / rows);
    const slotW = Math.min(310, (W - 120) / perRow - 14);
    const slotH = rows === 2 ? 180 : 250;
    const slotY0 = rows === 2 ? 390 : 440;
    const rowGap = slotH + 24;
    const slots = d.items.map((_, i) => {
      const r = Math.floor(i / perRow);
      const inRow = i - r * perRow;
      const count = r === rows - 1 ? n - perRow * r : perRow;
      const x = W / 2 + (inRow - (count - 1) / 2) * (slotW + 14);
      const y = slotY0 + r * rowGap;
      const bg = panel(this, slotW, slotH, 0xffffff, { r: 24, sw: 6, alpha: 0.22, stroke: 0xffffff });
      const num = txt(this, -slotW / 2 + 28, -slotH / 2 + 26, String(i + 1), 34, { color: '#ffffff', stroke: '#000000', sw: 4 });
      const c = this.add.container(x, y, [bg, num]);
      return { c, bg, x, y };
    });
    if (d.startLabel) txt(this, 140, slotY0 - slotH / 2 - 36, `← ${d.startLabel}`, 34, { align: 'left' }).setOrigin(0, 0.5);
    if (d.endLabel) txt(this, W - 140, slotY0 + (rows - 1) * rowGap + slotH / 2 + 34, `${d.endLabel} →`, 34).setOrigin(1, 0.5);

    let expected = 0;
    const marker = this.add.graphics().setDepth(5);
    const mark = () => {
      marker.clear();
      if (expected >= n) return;
      const s = slots[expected];
      marker.lineStyle(8, 0xffd23f, 1);
      marker.strokeRoundedRect(s.x - slotW / 2, s.y - slotH / 2, slotW, slotH, 24);
    };
    this.tweens.add({ targets: marker, alpha: 0.35, duration: 500, yoyo: true, repeat: -1 });
    mark();

    // Bubbles (bottom), shuffled
    const cols = 4;
    const bRows = Math.ceil(n / cols);
    const areaTop = rows === 2 ? 800 : 800;
    const cellH = Math.min(220, (1400 - areaTop) / bRows);
    const cellW = (W - 140) / cols;
    const order = shuffle(d.items.map((_, i) => i));
    const bubbles = new Map<number, ReturnType<typeof makeCard>>();
    let busy = false;
    order.forEach((idx, pos) => {
      const it = d.items[idx];
      const col = pos % cols;
      const row = Math.floor(pos / cols);
      const x = 70 + cellW * (col + 0.5);
      const y = areaTop + cellH * (row + 0.5);
      const card = makeCard(this, x, y, cellW - 24, cellH - 22, it.text, { size: it.text.length > 24 ? 36 : 42, emoji: it.emoji, img: it.img, imgSize: 96 });
      card.c.setInteractive();
      this.tweens.add({ targets: card.c, y: y - 8, duration: 1100 + pos * 60, yoyo: true, repeat: -1, ease: 'Sine.inOut', delay: pos * 50 });
      bubbles.set(idx, card);
      card.c.on('pointerdown', () => {
        if (busy || this.over) return;
        sfx.tick();
        if (idx === expected) {
          busy = true;
          this.good();
          const s = slots[expected];
          expected++;
          this.tweens.killTweensOf(card.c);
          this.tweens.add({
            targets: card.c, x: s.x, y: s.y, scale: 0.01, duration: 380, ease: 'Cubic.in',
            onComplete: () => {
              card.c.destroy();
              this.fillSlot(s, it, slotW, slotH);
              burst(this, s.x, s.y, 7);
              busy = false;
              if (expected >= n) this.win(); else mark();
            },
          });
        } else {
          this.bad(`Ni še na vrsti! Naslednji je: ${d.items[expected].text}`);
          this.tweens.add({ targets: card.c, angle: { from: -4, to: 4 }, duration: 70, yoyo: true, repeat: 3, onComplete: () => card.c.setAngle(0) });
          const right = bubbles.get(expected);
          if (right) this.tweens.add({ targets: right.c, scale: 1.12, duration: 220, yoyo: true, repeat: 2 });
        }
      });
    });
  }

  private fillSlot(s: { c: Phaser.GameObjects.Container; bg: Phaser.GameObjects.Graphics }, it: SeqItem, w: number, h: number): void {
    drawPanel(s.bg, w, h, 0xfff6e0, { r: 24, sw: 6 });
    const small = h < 200;
    const nameSize = w < 260 ? 28 : small ? 28 : 34;
    if (it.emoji) s.c.add(this.add.text(0, small ? -34 : -62, it.emoji, { fontSize: small ? '50px' : '80px' }).setOrigin(0.5));
    if (it.img) {
      const im = this.add.image(0, small ? -34 : -62, it.img);
      im.setScale((small ? 64 : 110) / Math.max(im.width, im.height));
      s.c.add(im);
    }
    s.c.add(txt(this, 0, small ? 16 : 22, it.text, nameSize, { color: INK, wrap: w - 24 }));
    if (it.note) s.c.add(txt(this, 0, small ? 58 : 80, it.note, small ? 22 : 26, { color: '#8a6a4a', wrap: w - 24, bold: false }));
    this.tweens.add({ targets: s.c, scale: { from: 1.15, to: 1 }, duration: 250, ease: 'Back.out' });
  }
}
