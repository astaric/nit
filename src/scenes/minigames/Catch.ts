import Phaser from 'phaser';
import { W } from '../../core/dims';
import { StudyScene } from '../../core/StudyScene';
import { sfx } from '../../core/sfx';
import { burst, makeCard, shuffle, txt, type Card } from '../../core/ui';
import type { QA } from '../../core/types';

export interface CatchData { title: string; questions: QA[]; count?: number; seconds?: number }

const COLORS = [0xd9f2ff, 0xffe9b8, 0xf3d9ff];

/**
 * Timed quiz: each question shows three answers and a countdown. Tap the right one before time
 * runs out. A wrong answer, or no answer at all, costs a heart and the question comes back later.
 */
export class Catch extends StudyScene {
  private timeLeft = 0;
  private total = 12;
  private timerOn = false;
  private timerBar!: Phaser.GameObjects.Graphics;
  private timerText!: Phaser.GameObjects.Text;
  private timeoutFn: (() => void) | null = null;

  constructor() { super('Catch'); }

  create(): void {
    const d = this.cfg as CatchData;
    this.setup(d.title, 5);
    this.total = d.seconds ?? 24;
    this.timerOn = false;
    const queue = shuffle(d.questions).slice(0, d.count ?? d.questions.length);
    const totalQ = queue.length;
    let done = 0;
    let busy = true;

    const counter = txt(this, W / 2, 235, '', 40, { bold: false });
    const showCount = () => counter.setText(`${done} / ${totalQ}`);
    showCount();

    const qCard = makeCard(this, W / 2, 470, 1860, 300, '', { size: 56 });
    this.timerBar = this.add.graphics();
    this.timerText = txt(this, W / 2, 745, '', 44, { bold: true });

    let answerCards: Card[] = [];
    let currentQ!: QA;
    let order: number[] = [];

    const ask = () => {
      if (this.over) return;
      if (queue.length === 0) { this.win(); return; }
      currentQ = queue.shift()!;
      // Always three options: the right one plus two random wrong ones.
      const wrong = shuffle(currentQ.answers.map((_, i) => i).filter((i) => i !== currentQ.correct)).slice(0, 2);
      order = shuffle([currentQ.correct, ...wrong]);
      qCard.text.setText(currentQ.q);
      qCard.text.setFontSize(currentQ.q.length > 80 ? 46 : 56);
      this.tweens.add({ targets: qCard.c, scale: { from: 0.85, to: 1 }, alpha: { from: 0, to: 1 }, duration: 300, ease: 'Back.out' });

      answerCards.forEach((c) => c.c.destroy());
      const n = order.length;
      const gap = 40;
      const cw = Math.min(600, (W - 120 - gap * (n - 1)) / n);
      answerCards = order.map((ai, i) => {
        const a = currentQ.answers[ai];
        const x = W / 2 + (i - (n - 1) / 2) * (cw + gap);
        const card = makeCard(this, x, 1100, cw, 420, a, {
          fill: COLORS[i % COLORS.length], size: a.length > 40 ? 40 : a.length > 22 ? 46 : 56,
        });
        card.c.setInteractive();
        card.c.on('pointerdown', () => answer(i));
        this.tweens.add({ targets: card.c, scale: { from: 0.7, to: 1 }, alpha: { from: 0, to: 1 }, duration: 250, delay: i * 80, ease: 'Back.out' });
        return card;
      });
      this.timeLeft = this.total;
      this.timerOn = true;
      busy = false;
    };

    const answer = (slot: number) => {
      if (busy || this.over) return;
      busy = true;
      this.timerOn = false;
      sfx.pop();
      const ok = order[slot] === currentQ.correct;
      const rightSlot = order.indexOf(currentQ.correct);
      answerCards[rightSlot].setFill(0xb9f3d3);
      if (ok) {
        const c = answerCards[slot].c;
        burst(this, c.x, c.y, 12);
        this.good();
        done++;
        showCount();
        this.time.delayedCall(900, ask);
      } else {
        answerCards[slot].setFill(0xff9b9b);
        this.bad(`Pravilno je: ${currentQ.answers[currentQ.correct]}`);
        queue.push(currentQ); // asked again later
        if (!this.over) this.time.delayedCall(2300, ask);
      }
    };

    // No answer before the timer runs out counts as a wrong answer.
    this.timeoutFn = () => {
      if (busy || this.over) return;
      busy = true;
      this.timerOn = false;
      answerCards[order.indexOf(currentQ.correct)].setFill(0xb9f3d3);
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
    g.fillStyle(0x000000, 0.35).fillRoundedRect(W / 2 - 930, 660, 1860, 28, 14);
    g.fillStyle(f > 0.35 ? 0x5dd39e : 0xff6b6b, 1).fillRoundedRect(W / 2 - 930, 660, 1860 * f, 28, 14);
    this.timerText.setText(`⏱ ${Math.max(0, Math.ceil(this.timeLeft))}`);
    if (this.timeLeft <= 0) { this.timerOn = false; this.timeoutFn?.(); }
  }
}
