import Phaser from 'phaser';
import { W } from './dims';
import { progress, currentJourney } from './stages';
import { saveStars } from './save';
import { sfx } from './sfx';
import { ambient, confetti, drawPanel, INK, panel, theme, txt } from './ui';

const PRAISE = ['Bravo!', 'Odlično!', 'Super!', 'Tako je!', 'Genialno!', 'Pravilno!', 'Čestitke!', 'Znanje na vrhuncu!'];

/**
 * Base for every stage scene. Provides the HUD (home button, title, hearts, Kozmo, toast)
 * and the shared rules: mistakes cost a heart, no hearts = try again, finishing awards stars.
 */
export abstract class StudyScene extends Phaser.Scene {
  protected lives = 5;
  protected maxLives = 5;
  protected mistakes = 0;
  protected streak = 0;
  protected over = false;
  private heartImgs: Phaser.GameObjects.Image[] = [];
  private kozmo!: Phaser.GameObjects.Image;
  private toastBox!: Phaser.GameObjects.Container;
  private toastBg!: Phaser.GameObjects.Graphics;
  private toastText!: Phaser.GameObjects.Text;
  private toastTimer?: Phaser.Time.TimerEvent;

  protected setup(title: string, lives = 5): void {
    this.lives = this.maxLives = lives;
    this.mistakes = 0;
    this.streak = 0;
    this.over = false;
    this.heartImgs = [];
    const th = theme();
    this.cameras.main.setBackgroundColor(th.bg);
    this.cameras.main.fadeIn(300, (th.bg >> 16) & 255, (th.bg >> 8) & 255, th.bg & 255);
    ambient(this);

    // Home button
    const homeBg = panel(this, 130, 130, 0xfff6e0, { r: 40 });
    const home = this.add.container(110, 110, [homeBg, this.add.text(0, 0, '🏠', { fontSize: '72px' }).setOrigin(0.5)]);
    home.setSize(150, 150).setInteractive().setDepth(30);
    home.on('pointerdown', () => { sfx.pop(); this.scene.start('StageMap'); });

    txt(this, W / 2 - 40, 110, title, 56, { wrap: 1000 }).setDepth(30);

    // Hearts
    for (let i = 0; i < lives; i++) {
      this.heartImgs.push(this.add.image(1790 - i * 78, 110, 'heart').setScale(0.62).setDepth(30));
    }
    this.kozmo = this.add.image(1940, 120, 'kozmo').setScale(0.55).setDepth(30);
    this.tweens.add({ targets: this.kozmo, y: 130, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

    // Toast (feedback banner at the bottom)
    this.toastBg = this.add.graphics();
    this.toastText = txt(this, 0, 0, '', 46, { color: INK, wrap: 1600 });
    this.toastBox = this.add.container(W / 2, 1450, [this.toastBg, this.toastText]).setDepth(60).setAlpha(0);
  }

  protected toast(msg: string, good: boolean, ms = 2400): void {
    this.toastText.setText(msg);
    const w = Math.min(1800, this.toastText.width + 120);
    const h = this.toastText.height + 60;
    drawPanel(this.toastBg, w, h, good ? 0xb9f3d3 : 0xffb3b3, { r: 36 });
    this.toastBox.y = 1450 - Math.max(0, h - 120) / 2;
    this.tweens.killTweensOf(this.toastBox);
    this.toastBox.setAlpha(1).setScale(0.9);
    this.tweens.add({ targets: this.toastBox, scale: 1, duration: 140, ease: 'Back.out' });
    this.toastTimer?.remove();
    this.toastTimer = this.time.delayedCall(ms, () => this.tweens.add({ targets: this.toastBox, alpha: 0, duration: 300 }));
  }

  private kozmoReact(sad: boolean): void {
    this.kozmo.setTexture(sad ? 'kozmo-sad' : 'kozmo-happy');
    this.tweens.add({ targets: this.kozmo, angle: sad ? { from: -12, to: 12 } : { from: -18, to: 18 }, duration: 110, yoyo: true, repeat: 2 });
    this.time.delayedCall(1100, () => { if (this.kozmo.active) this.kozmo.setTexture('kozmo'); });
  }

  /** Call on a correct answer. */
  protected good(msg?: string): void {
    this.streak++;
    sfx.good();
    if (this.streak >= 3) sfx.combo(Math.min(this.streak, 8));
    this.kozmoReact(false);
    const base = msg ?? Phaser.Utils.Array.GetRandom(PRAISE);
    this.toast(this.streak >= 3 ? `${base}  🔥 ${this.streak} zapored!` : base, true, 1200);
  }

  /** Call on a mistake. `explain` is shown so the right answer is learned. */
  protected bad(explain: string): void {
    this.streak = 0;
    this.mistakes++;
    this.lives = Math.max(0, this.lives - 1);
    sfx.bad();
    this.kozmoReact(true);
    this.cameras.main.shake(220, 0.006);
    this.heartImgs.forEach((h, i) => h.setTexture(i < this.lives ? 'heart' : 'heart-empty'));
    const lost = this.heartImgs[this.lives];
    if (lost) this.tweens.add({ targets: lost, scale: { from: 0.9, to: 0.62 }, duration: 300, ease: 'Back.out' });
    this.toast(explain, false, 3200);
    if (this.lives <= 0) this.lose();
  }

  protected get cfg(): any {
    return currentJourney().stages[progress.index].data ?? {};
  }

  private lose(): void {
    if (this.over) return;
    this.over = true;
    this.time.delayedCall(2200, () => {
      sfx.lose();
      progress.result = { stars: 0, failed: true, mistakes: this.mistakes };
      this.scene.start('Result');
    });
  }

  /** Stage completed: stars depend on mistakes. */
  protected win(delay = 900): void {
    if (this.over) return;
    this.over = true;
    const stars = this.mistakes === 0 ? 3 : this.mistakes <= 2 ? 2 : 1;
    saveStars(progress.journey, progress.index, stars);
    progress.result = { stars, failed: false, mistakes: this.mistakes };
    sfx.yay();
    confetti(this, 30);
    this.time.delayedCall(delay + 700, () => this.scene.start('Result'));
  }
}
