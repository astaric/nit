import Phaser from 'phaser';
import { W } from '../core/dims';
import { sfx } from '../core/sfx';
import { journeyOrder, journeys, progress } from '../core/stages';
import { journeyStars } from '../core/save';
import { INK, button, panel, txt } from '../core/ui';

const CARD_COLORS = [0xd9d6ff, 0xffe3b8, 0xd4f5c9, 0xcdeeff];

/** Pick a world (chapter of the notes). */
export class GameSelect extends Phaser.Scene {
  constructor() { super('GameSelect'); }

  create(): void {
    this.cameras.main.setBackgroundColor(0x1b1f4b);
    this.cameras.main.fadeIn(300, 27, 31, 75);
    for (let i = 0; i < 60; i++) {
      const s = this.add.circle(Phaser.Math.Between(0, W), Phaser.Math.Between(0, 1536), Phaser.Math.Between(2, 5), 0xffffff, Phaser.Math.FloatBetween(0.2, 0.8));
      this.tweens.add({ targets: s, alpha: 0.1, duration: Phaser.Math.Between(800, 2400), yoyo: true, repeat: -1 });
    }
    txt(this, W / 2, 170, 'Izberi svet!', 130, { color: '#ffffff', stroke: '#5a3a22', sw: 16 });

    const cw = 440;
    const gap = 40;
    journeyOrder.forEach((id, i) => {
      const j = journeys[id];
      const x = W / 2 + (i - 1.5) * (cw + gap);
      const stars = journeyStars(id, j.stages.length);
      const max = j.stages.length * 3;
      const bg = panel(this, cw, 900, CARD_COLORS[i], { r: 56, sw: 10 });
      const icon = this.add.text(0, -200, j.icon, { fontSize: '210px' }).setOrigin(0.5);
      const name = txt(this, 0, -20, j.title, 58, { color: INK, wrap: cw - 50 });
      const blurb = txt(this, 0, 195, j.blurb, 32, { color: '#7a5a3a', wrap: cw - 70, bold: false });
      const star = this.add.image(-70, 340, 'star').setScale(0.6);
      const cnt = txt(this, 40, 340, `${stars}/${max}`, 56, { color: INK });
      const bar = this.add.graphics();
      bar.fillStyle(0x000000, 0.15).fillRoundedRect(-170, 395, 340, 26, 13);
      if (stars > 0) bar.fillStyle(0x5dd39e, 1).fillRoundedRect(-170, 395, 340 * (stars / max), 26, 13);
      const card = this.add.container(x, 800, [bg, icon, name, blurb, star, cnt, bar]);
      card.setSize(cw, 900).setInteractive();
      this.tweens.add({ targets: icon, y: -235, duration: 700 + i * 150, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      card.once('pointerdown', () => {
        sfx.pop();
        this.tweens.add({
          targets: card, scale: 0.94, duration: 90, yoyo: true,
          onComplete: () => { progress.journey = id; this.scene.start('StageMap'); },
        });
      });
    });

    button(this, 260, 1420, '◀ Nazaj', () => this.scene.start('Title'), { w: 380, h: 120, size: 52, fill: 0x8f7bff, pulse: false });
  }
}
