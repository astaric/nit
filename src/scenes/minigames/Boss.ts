import Phaser from 'phaser';
import { W } from '../../core/dims';
import { StudyScene } from '../../core/StudyScene';
import { sfx } from '../../core/sfx';
import { burst, confetti, makeCard, shuffle, txt, type Card } from '../../core/ui';
import type { QA } from '../../core/types';

export interface BossData {
  title: string;
  boss: { emoji: string; name: string };
  questions: QA[];
  /** How many questions to draw from the pool (= the boss's HP). */
  count?: number;
  seconds?: number;
}

/** Answer quickly: right answers hit the boss, wrong ones or running out of time cost a heart. */
export class Boss extends StudyScene {
  private timeLeft = 0;
  private timerOn = false;
  private timerBar!: Phaser.GameObjects.Graphics;
  private total = 15;
  private timeoutFn: (() => void) | null = null;

  constructor() { super('Boss'); }

  create(): void {
    const d = this.cfg as BossData;
    this.setup(d.title, 3);
    this.total = d.seconds ?? 16;
    const queue = shuffle(d.questions).slice(0, d.count ?? 8);
    const hpMax = queue.length;
    let hp = hpMax;
    let busy = true;

    // Boss + HP bar
    const boss = this.add.text(W / 2, 450, d.boss.emoji, { fontSize: '300px' }).setOrigin(0.5);
    this.tweens.add({ targets: boss, y: 425, scale: 1.05, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    txt(this, W / 2, 250, d.boss.name, 52, { stroke: '#000000', sw: 6, color: '#ffffff' });
    const hpBar = this.add.graphics();
    const drawHp = () => {
      hpBar.clear();
      hpBar.fillStyle(0x000000, 0.4).fillRoundedRect(W / 2 - 400, 600, 800, 34, 17);
      if (hp > 0) hpBar.fillStyle(0xff5d5d, 1).fillRoundedRect(W / 2 - 400, 600, 800 * (hp / hpMax), 34, 17);
      hpBar.lineStyle(5, 0xffffff, 0.9).strokeRoundedRect(W / 2 - 400, 600, 800, 34, 17);
    };
    drawHp();

    // Question + timer
    const qCard = makeCard(this, W / 2, 790, 1860, 200, '', { size: 52 });
    this.timerBar = this.add.graphics();

    // Answer buttons 2x2
    const slots = [[560, 1060], [1488, 1060], [560, 1280], [1488, 1280]];
    let answerCards: Card[] = [];
    let currentQ: QA;
    let order: number[] = [];

    const ask = () => {
      if (this.over) return;
      if (queue.length === 0) { return; }
      currentQ = queue.shift()!;
      order = shuffle(currentQ.answers.map((_, i) => i));
      qCard.text.setText(currentQ.q);
      qCard.text.setFontSize(currentQ.q.length > 80 ? 42 : 52);
      answerCards.forEach((c) => c.c.destroy());
      answerCards = order.map((ai, i) => {
        const [x, y] = order.length === 3 && i === 2 ? [W / 2, slots[2][1]] : slots[i];
        const a = currentQ.answers[ai];
        const card = makeCard(this, x, y, 900, 200, a, { size: a.length > 40 ? 38 : a.length > 24 ? 44 : 52, fill: [0xd9f2ff, 0xffe9b8, 0xf3d9ff, 0xd9ffe3][i] });
        card.c.setInteractive();
        card.c.on('pointerdown', () => answer(i));
        this.tweens.add({ targets: card.c, scale: { from: 0.7, to: 1 }, alpha: { from: 0, to: 1 }, duration: 250, delay: i * 60, ease: 'Back.out' });
        return card;
      });
      this.timeLeft = this.total;
      this.timerOn = true;
      busy = false;
    };

    const attack = () => {
      // Boss lunges at the player.
      this.tweens.add({ targets: boss, scale: 1.5, duration: 160, yoyo: true, ease: 'Cubic.in' });
      const flash = this.add.rectangle(W / 2, 768, W, 1536, 0xff0000, 0.25).setDepth(40);
      this.tweens.add({ targets: flash, alpha: 0, duration: 450, onComplete: () => flash.destroy() });
    };

    const answer = (slot: number) => {
      if (busy || this.over) return;
      busy = true;
      this.timerOn = false;
      const ai = order[slot];
      const ok = ai === currentQ.correct;
      const rightSlot = order.indexOf(currentQ.correct);
      answerCards[rightSlot].setFill(0xb9f3d3);
      if (ok) {
        sfx.laser();
        const shot = this.add.circle(260, 1500, 26, 0xfff27a).setDepth(30).setStrokeStyle(8, 0xff9f1c);
        this.tweens.add({
          targets: shot, x: W / 2, y: boss.y, scale: 1.6, duration: 320, ease: 'Cubic.in',
          onComplete: () => {
            shot.destroy();
            sfx.boom();
            burst(this, W / 2, boss.y, 14);
            hp--;
            drawHp();
            this.tweens.add({ targets: boss, angle: { from: -14, to: 14 }, duration: 60, yoyo: true, repeat: 4, onComplete: () => boss.setAngle(0) });
            this.cameras.main.shake(180, 0.008);
            this.good('Zadetek!');
            if (hp <= 0) {
              this.tweens.add({ targets: boss, scale: 0, angle: 720, alpha: 0, duration: 900, ease: 'Cubic.in' });
              confetti(this, 40);
              this.win(600);
            } else this.time.delayedCall(700, ask);
          },
        });
      } else {
        answerCards[slot].setFill(0xff9b9b);
        attack();
        this.bad(`Pravilno je: ${currentQ.answers[currentQ.correct]}`);
        queue.push(currentQ);
        if (!this.over) this.time.delayedCall(2300, ask);
      }
    };

    this.timeoutFn = () => {
      if (busy || this.over) return;
      busy = true;
      this.timerOn = false;
      answerCards[order.indexOf(currentQ.correct)].setFill(0xb9f3d3);
      attack();
      this.bad(`Čas je potekel! Pravilno je: ${currentQ.answers[currentQ.correct]}`);
      queue.push(currentQ);
      if (!this.over) this.time.delayedCall(2300, ask);
    };

    this.time.delayedCall(500, ask);
  }

  update(_t: number, dt: number): void {
    if (!this.timerOn || this.over) return;
    this.timeLeft -= dt / 1000;
    const f = Phaser.Math.Clamp(this.timeLeft / this.total, 0, 1);
    const g = this.timerBar;
    g.clear();
    g.fillStyle(0x000000, 0.35).fillRoundedRect(W / 2 - 930, 905, 1860, 22, 11);
    g.fillStyle(f > 0.35 ? 0x5dd39e : 0xff6b6b, 1).fillRoundedRect(W / 2 - 930, 905, 1860 * f, 22, 11);
    if (this.timeLeft <= 0) { this.timerOn = false; this.timeoutFn?.(); }
  }
}
