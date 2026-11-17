import Phaser from 'phaser';
import { W } from '../core/dims';
import { currentJourney, startStage } from '../core/stages';
import { getStars, journeyStars } from '../core/save';
import { sfx } from '../core/sfx';
import { ambient, button, theme, txt } from '../core/ui';

/** All stages of a world are open: pick any of them to practise. */
export class StageMap extends Phaser.Scene {
  constructor() { super('StageMap'); }

  create(): void {
    const j = currentJourney();
    const th = theme();
    this.cameras.main.setBackgroundColor(th.bg);
    this.cameras.main.fadeIn(300, (th.bg >> 16) & 255, (th.bg >> 8) & 255, th.bg & 255);
    ambient(this);
    txt(this, W / 2, 150, `${j.icon}  ${j.title}`, 120);
    const total = journeyStars(j.id, j.stages.length);
    txt(this, W / 2, 265, `⭐ ${total} / ${j.stages.length * 3}   ·   Tapni nivo za igro`, 44, { bold: false });

    const n = j.stages.length;
    const rows = n > 5 ? 2 : 1;
    const perRow = Math.ceil(n / rows);
    const ys = rows === 2 ? [640, 1100] : [800];
    const pos = j.stages.map((_, i) => {
      const r = Math.floor(i / perRow);
      const inRow = i - r * perRow;
      const count = r === rows - 1 ? n - perRow * r : perRow;
      const gap = Math.min(380, (W - 200) / count);
      const slot = r % 2 === 0 ? inRow : count - 1 - inRow; // snake
      return { x: W / 2 + (slot - (count - 1) / 2) * gap, y: ys[r] };
    });

    // Path behind the nodes
    const path = this.add.graphics();
    path.lineStyle(16, th.dark ? 0xffffff : 0x5a3a22, 0.2);
    path.beginPath();
    pos.forEach((p, i) => (i === 0 ? path.moveTo(p.x, p.y) : path.lineTo(p.x, p.y)));
    path.strokePath();

    j.stages.forEach((s, i) => {
      const { x, y } = pos[i];
      const boss = s.scene === 'Boss';
      const stars = getStars(j.id, i);
      const ring = this.add.circle(0, 0, boss ? 120 : 105, stars > 0 ? 0xfff6e0 : 0xffffff).setStrokeStyle(10, boss ? 0xff5d5d : 0x5a3a22);
      const icon = this.add.text(0, 0, s.icon, { fontSize: boss ? '120px' : '100px' }).setOrigin(0.5);
      const label = txt(this, 0, 175, s.label, 38, { wrap: 330 });
      const starImgs = [0, 1, 2].map((k) => this.add.image((k - 1) * 62, 120 - (k === 1 ? 10 : 0) + 120, stars > k ? 'star' : 'star-empty').setScale(0.46));
      const c = this.add.container(x, y, [ring, icon, label, ...starImgs]);
      c.setSize(300, 360).setInteractive();
      if (stars === 0) this.tweens.add({ targets: c, scale: 1.06, duration: 800 + i * 70, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      c.once('pointerdown', () => {
        sfx.whoosh();
        this.tweens.killTweensOf(c);
        this.tweens.add({ targets: c, scale: 0.9, duration: 90, yoyo: true, onComplete: () => startStage(this, i) });
      });
    });

    button(this, 260, 1420, '◀ Svetovi', () => this.scene.start('GameSelect'), { w: 400, h: 120, size: 52, fill: 0x8f7bff, pulse: false });
  }
}
