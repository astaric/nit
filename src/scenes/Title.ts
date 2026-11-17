import Phaser from 'phaser';
import { W, H } from '../core/dims';
import { sfx, unlockAudio } from '../core/sfx';
import { button, txt } from '../core/ui';

const PLANETS = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'moon'];

export class Title extends Phaser.Scene {
  constructor() { super('Title'); }

  create(): void {
    this.cameras.main.setBackgroundColor(0x1b1f4b);
    for (let i = 0; i < 90; i++) {
      const s = this.add.circle(Phaser.Math.Between(0, W), Phaser.Math.Between(0, H), Phaser.Math.Between(2, 6), 0xffffff, Phaser.Math.FloatBetween(0.3, 0.9));
      this.tweens.add({ targets: s, alpha: 0.1, duration: Phaser.Math.Between(700, 2200), yoyo: true, repeat: -1, delay: Phaser.Math.Between(0, 1500) });
    }
    // Planets drifting around
    PLANETS.forEach((k, i) => {
      const img = this.add.image(Phaser.Math.Between(150, W - 150), Phaser.Math.Between(300, H - 300), k)
        .setScale(Phaser.Math.FloatBetween(0.7, 1.4)).setAlpha(0.9).setDepth(-1);
      this.tweens.add({ targets: img, y: img.y + Phaser.Math.Between(-60, 60), x: img.x + Phaser.Math.Between(-80, 80), angle: Phaser.Math.Between(-20, 20), duration: 3000 + i * 400, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    });
    txt(this, W / 2, 230, 'Naravoslovje', 190, { color: '#ffffff', stroke: '#5a3a22', sw: 22 });
    txt(this, W / 2, 400, 'Vesoljska odprava znanja', 72, { color: '#ffd23f', stroke: '#5a3a22', sw: 12 });

    const kozmo = this.add.image(W / 2, 830, 'kozmo-happy').setScale(2.2);
    this.tweens.add({ targets: kozmo, y: 800,angle: { from: -4, to: 4 }, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

    // First tap unlocks iOS audio.
    button(this, W / 2, 1300, 'Igraj!', () => {
      unlockAudio();
      sfx.pop();
      this.scene.start('GameSelect');
    }, { w: 620, h: 170, size: 84 });
  }
}
