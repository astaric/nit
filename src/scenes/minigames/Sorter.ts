import Phaser from 'phaser';
import { W } from '../../core/dims';
import { StudyScene } from '../../core/StudyScene';
import { sfx } from '../../core/sfx';
import { burst, drawPanel, INK, makeCard, panel, shuffle, txt } from '../../core/ui';

export interface SorterData {
  title: string;
  bins: { label: string; emoji: string; color: number }[];
  items: { text: string; emoji?: string; img?: string; bin: number; why?: string }[];
}

interface Bin { x: number; y: number; w: number; h: number; box: Phaser.GameObjects.Container; bg: Phaser.GameObjects.Graphics; count: Phaser.GameObjects.Text; n: number }

/** Drag each card into the right bin. Wrong drops cost a heart and the card comes back later. */
export class Sorter extends StudyScene {
  constructor() { super('Sorter'); }

  create(): void {
    const d = this.cfg as SorterData;
    this.setup(d.title, 5);
    const total = d.items.length;
    const queue = shuffle(d.items);
    let done = 0;
    let busy = false;

    txt(this, W / 2, 250, 'Povleci kartico v pravi predal!', 44, { bold: false });
    const bar = this.add.graphics();
    const progressTxt = txt(this, W / 2, 330, '', 40);
    const drawBar = () => {
      bar.clear();
      bar.fillStyle(0xffffff, 0.25).fillRoundedRect(W / 2 - 500, 295, 1000, 24, 12);
      if (done > 0) bar.fillStyle(0x5dd39e, 1).fillRoundedRect(W / 2 - 500, 295, 1000 * (done / total), 24, 12);
      progressTxt.setText(`${done} / ${total}`);
    };
    drawBar();

    // Bins along the bottom
    const n = d.bins.length;
    const margin = 60;
    const gap = 30;
    const bw = (W - margin * 2 - gap * (n - 1)) / n;
    const bh = 380;
    const by = 1000 + bh / 2;
    const bins: Bin[] = d.bins.map((b, i) => {
      const x = margin + bw / 2 + i * (bw + gap);
      const bg = panel(this, bw, bh, b.color, { r: 40, sw: 10 });
      const label = txt(this, 0, -bh / 2 + 70, b.label, n >= 4 ? 40 : 52, { color: INK, wrap: bw - 40 });
      const emoji = this.add.text(0, 20, b.emoji, { fontSize: n >= 4 ? '110px' : '140px' }).setOrigin(0.5);
      const count = txt(this, 0, bh / 2 - 50, '0', 48, { color: INK });
      const box = this.add.container(x, by, [bg, label, emoji, count]);
      return { x, y: by, w: bw, h: bh, box, bg, count, n: 0 };
    });

    const binAt = (px: number, py: number): number =>
      bins.findIndex((b) => Math.abs(px - b.x) < b.w / 2 && Math.abs(py - b.y) < b.h / 2);

    const home = { x: W / 2, y: 640 };

    const flashBin = (i: number, good: boolean) => {
      const b = bins[i];
      this.tweens.add({ targets: b.box, scale: { from: 1.08, to: 1 }, duration: 260, ease: 'Back.out' });
      const g = this.add.graphics();
      drawPanel(g, b.w, b.h, good ? 0x5dd39e : 0xff6b6b, { r: 40, alpha: 0.55, sw: 0 });
      b.box.add(g);
      this.tweens.add({ targets: g, alpha: 0, duration: 600, onComplete: () => g.destroy() });
    };

    const next = () => {
      busy = false;
      if (this.over) return;
      if (queue.length === 0) { this.win(); return; }
      const item = queue.shift()!;
      const card = makeCard(this, home.x, home.y - 120, 860, 280, item.text, { size: item.text.length > 28 ? 46 : 60, emoji: item.emoji, img: item.img, imgSize: 130 });
      card.c.setDepth(20).setScale(0.3).setAlpha(0);
      this.tweens.add({ targets: card.c, scale: 1, alpha: 1, y: home.y, duration: 300, ease: 'Back.out' });
      card.c.setInteractive({ draggable: true });
      this.input.setDraggable(card.c);
      let hover = -1;
      card.c.on('dragstart', () => card.c.setScale(1.08).setDepth(25));
      card.c.on('drag', (_p: Phaser.Input.Pointer, x: number, y: number) => {
        card.c.setPosition(x, y);
        const h = binAt(x, y);
        if (h !== hover) {
          if (hover >= 0) bins[hover].box.setScale(1);
          if (h >= 0) bins[h].box.setScale(1.05);
          hover = h;
        }
      });
      card.c.on('dragend', () => {
        if (busy || this.over) return;
        if (hover >= 0) bins[hover].box.setScale(1);
        card.c.setScale(1).setDepth(20);
        const target = binAt(card.c.x, card.c.y);
        hover = -1;
        if (target < 0) {
          sfx.boing();
          this.tweens.add({ targets: card.c, x: home.x, y: home.y, duration: 350, ease: 'Back.out' });
          return;
        }
        busy = true;
        if (target === item.bin) {
          const b = bins[target];
          this.good();
          flashBin(target, true);
          burst(this, b.x, b.y - 60, 8);
          this.tweens.add({ targets: card.c, x: b.x, y: b.y, scale: 0, alpha: 0, duration: 260, onComplete: () => card.c.destroy() });
          b.n++;
          b.count.setText(String(b.n));
          done++;
          drawBar();
          this.time.delayedCall(300, next);
        } else {
          this.bad(item.why ?? `„${item.text}“ spada k: ${d.bins[item.bin].label}`);
          flashBin(target, false);
          flashBin(item.bin, true);
          queue.push(item); // come back later
          this.tweens.add({ targets: card.c, x: home.x, y: home.y + 40, scale: 0.4, alpha: 0, duration: 400, delay: 500, onComplete: () => card.c.destroy() });
          this.time.delayedCall(950, next);
        }
      });
    };
    this.time.delayedCall(300, next);
  }
}
