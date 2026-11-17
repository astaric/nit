import Phaser from 'phaser';
import { W } from '../core/dims';
import { currentJourney } from '../core/stages';
import { journeyStars } from '../core/save';
import { sfx } from '../core/sfx';
import { button, confetti, txt } from '../core/ui';

/** A whole world finished. */
export class Finale extends Phaser.Scene {
  constructor() { super('Finale'); }

  create(): void {
    const j = currentJourney();
    this.cameras.main.setBackgroundColor(0x1b1f4b);
    this.cameras.main.fadeIn(300, 27, 31, 75);
    for (let i = 0; i < 70; i++) {
      const s = this.add.circle(Phaser.Math.Between(0, W), Phaser.Math.Between(0, 1536), Phaser.Math.Between(2, 6), 0xffffff, 0.7);
      this.tweens.add({ targets: s, alpha: 0.1, duration: Phaser.Math.Between(700, 2200), yoyo: true, repeat: -1 });
    }
    sfx.yay();
    confetti(this, 60);
    this.time.addEvent({ delay: 2500, loop: true, callback: () => confetti(this, 25) });
    txt(this, W / 2, 200, 'Svet končan!', 160, { color: '#ffffff', stroke: '#5a3a22', sw: 18 });
    txt(this, W / 2, 380, `${j.icon} ${j.title}`, 90, { color: '#ffd23f', stroke: '#5a3a22', sw: 12 });
    const trophy = this.add.text(W / 2, 760, '🏆', { fontSize: '380px' }).setOrigin(0.5);
    this.tweens.add({ targets: trophy, scale: 1.1, angle: { from: -6, to: 6 }, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    this.add.image(W / 2 - 520, 800, 'kozmo-happy').setScale(1.6);
    this.add.image(W / 2 + 520, 800, 'kozmo-happy').setScale(1.6).setFlipX(true);
    const total = journeyStars(j.id, j.stages.length);
    txt(this, W / 2, 1100, `⭐ ${total} / ${j.stages.length * 3}`, 100, { color: '#ffffff', stroke: '#5a3a22', sw: 12 });
    txt(this, W / 2, 1210, total === j.stages.length * 3 ? 'Vse zvezdice! Si mojster/mojstrica!' : 'Znova igraj nivoje, da zbereš vse zvezdice!', 50, { color: '#ffd23f', stroke: '#5a3a22', sw: 8 });
    button(this, W / 2 - 330, 1390, '🗺 Zemljevid', () => this.scene.start('StageMap'), { w: 560, h: 140, size: 56, fill: 0x8f7bff, pulse: false });
    button(this, W / 2 + 330, 1390, 'Drugi svetovi ▶', () => this.scene.start('GameSelect'), { w: 600, h: 140, size: 52 });
  }
}
