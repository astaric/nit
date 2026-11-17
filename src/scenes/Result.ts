import Phaser from 'phaser';
import { W } from '../core/dims';
import { currentJourney, progress, startStage } from '../core/stages';
import { getStars } from '../core/save';
import { sfx } from '../core/sfx';
import { INK, button, confetti, makeCard, txt } from '../core/ui';

/** Shown after every stage: stars and the "Zapomni si" recap from the notes. */
export class Result extends Phaser.Scene {
  constructor() { super('Result'); }

  create(): void {
    const j = currentJourney();
    const stage = j.stages[progress.index];
    const r = progress.result ?? { stars: 0, failed: true, mistakes: 0 };
    this.cameras.main.setBackgroundColor(0x1b1f4b);
    this.cameras.main.fadeIn(300, 27, 31, 75);
    for (let i = 0; i < 50; i++) {
      this.add.circle(Phaser.Math.Between(0, W), Phaser.Math.Between(0, 1536), Phaser.Math.Between(2, 5), 0xffffff, Phaser.Math.FloatBetween(0.2, 0.7));
    }

    const kozmo = this.add.image(340, 330, r.failed ? 'kozmo-sad' : 'kozmo-happy').setScale(1.3);
    this.tweens.add({ targets: kozmo, y: 310, angle: { from: -5, to: 5 }, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    txt(this, W / 2 + 180, 190, r.failed ? 'Ojoj, zmanjkalo je src!' : r.stars === 3 ? 'Popolno!' : 'Bravo!', 110, { color: '#ffffff', stroke: '#5a3a22', sw: 14 });

    if (r.failed) {
      txt(this, W / 2 + 180, 340, 'Preberi spodaj in poskusi znova!', 54, { color: '#ffd23f', stroke: '#5a3a22', sw: 8 });
    } else {
      for (let k = 0; k < 3; k++) {
        const s = this.add.image(W / 2 + 180 + (k - 1) * 190, 375, r.stars > k ? 'star' : 'star-empty').setScale(0).setAngle(-30);
        this.tweens.add({ targets: s, scale: 1.3, angle: 0, duration: 450, delay: 400 + k * 350, ease: 'Back.out', onStart: () => { if (r.stars > k) sfx.coin(); } });
      }
      if (r.stars === 3) this.time.delayedCall(500, () => confetti(this, 40));
    }

    // Recap card
    const card = makeCard(this, W / 2, 830, 1820, 640, '', { fill: 0xfff6e0 });
    card.text.destroy();
    const head = txt(this, -820, -270, '📌 Zapomni si:', 56, { color: '#c0392b' }).setOrigin(0, 0.5);
    const body = txt(this, -820, -210, stage.recap.map((l) => `•  ${l}`).join('\n\n'), 42, { color: INK, wrap: 1640, align: 'left' }).setOrigin(0, 0);
    card.c.add([head, body]);

    const last = progress.index >= j.stages.length - 1;
    const allDone = j.stages.every((_, i) => getStars(j.id, i) > 0);
    button(this, 400, 1380, r.failed ? '↻ Poskusi znova' : '↻ Še enkrat', () => startStage(this, progress.index), { w: 640, h: 140, size: 56, fill: 0xff9f6b, pulse: r.failed });
    button(this, 1090, 1380, '🗺 Zemljevid', () => this.scene.start('StageMap'), { w: 480, h: 140, size: 52, fill: 0x8f7bff, pulse: false });
    if (!r.failed) {
      button(this, 1620, 1380, last ? (allDone ? 'Konec! 🏆' : 'Naprej ▶') : 'Naprej ▶', () => {
        if (last) this.scene.start(allDone ? 'Finale' : 'StageMap');
        else startStage(this, progress.index + 1);
      }, { w: 480, h: 140, size: 56 });
    }
  }
}
