import Phaser from 'phaser';
import { W, H } from '../../core/dims';
import { StudyScene } from '../../core/StudyScene';
import { sfx } from '../../core/sfx';
import { burst, makeCard, shuffle, txt, type Card } from '../../core/ui';
import type { QA } from '../../core/types';

export interface CatchData { title: string; questions: QA[]; count?: number }

interface Bub { card: Card; ans: number }

const LANE_COLORS = [0xd9f2ff, 0xffe9b8, 0xf3d9ff, 0xd9ffe3];

/** Steer the rocket sideways and fly into the correct answer as the options fall down. */
export class Catch extends StudyScene {
  private rocket!: Phaser.GameObjects.Container;
  private wave: Bub[] = [];
  private current: QA | null = null;
  private live = false;
  private fallen = 0;
  private pickFn: ((b: Bub) => void) | null = null;

  constructor() { super('Catch'); }

  create(): void {
    const d = this.cfg as CatchData;
    this.setup(d.title, 5);
    this.wave = [];
    this.current = null;
    this.live = false;
    const queue = shuffle(d.questions).slice(0, d.count ?? d.questions.length);
    const total = queue.length;
    let done = 0;

    const counter = txt(this, W / 2, 235, '', 40, { bold: false });
    const qBox = this.add.container(W / 2, 400);
    const showCount = () => counter.setText(`${done} / ${total}  ·  Povleci raketo v pravi odgovor`);
    showCount();

    // Rocket follows the pointer horizontally
    const flame = this.add.text(0, 120, '🔥', { fontSize: '70px' }).setOrigin(0.5).setAngle(180);
    this.tweens.add({ targets: flame, scaleY: 1.4, duration: 120, yoyo: true, repeat: -1 });
    const ship = this.add.image(0, 0, 'rocket').setScale(0.9);
    this.rocket = this.add.container(W / 2, 1310, [flame, ship]).setDepth(10);
    const steer = (p: Phaser.Input.Pointer) => { this.rocket.x = Phaser.Math.Clamp(p.x, 150, W - 150); };
    this.input.on('pointermove', steer);
    this.input.on('pointerdown', steer);

    const ask = () => {
      if (this.over) return;
      if (queue.length === 0) { this.win(); return; }
      const q = queue.shift()!;
      qBox.removeAll(true);
      const card = makeCard(this, 0, 0, 1860, 230, q.q, { size: q.q.length > 70 ? 46 : 56 });
      qBox.add(card.c);
      this.tweens.add({ targets: qBox, scale: { from: 0.8, to: 1 }, alpha: { from: 0, to: 1 }, duration: 300, ease: 'Back.out' });
      this.time.delayedCall(900, () => spawn(q));
    };

    const spawn = (q: QA) => {
      if (this.over) return;
      this.current = q;
      const order = shuffle(q.answers.map((_, i) => i));
      const n = order.length;
      const laneW = (W - 120) / n;
      const bw = Math.min(laneW - 36, 600);
      this.wave = order.map((ai, lane) => {
        const len = q.answers[ai].length;
        const card = makeCard(this, 60 + laneW * (lane + 0.5), 600, bw, 200, q.answers[ai], {
          fill: LANE_COLORS[lane % 4], size: len > 40 ? 34 : len > 22 ? 40 : 48,
        });
        card.c.setDepth(5);
        return { card, ans: ai };
      });
      this.live = true;
      this.fallen = 0;
      const fall = Math.max(5400, 8200 - done * 150);
      this.wave.forEach((b) => {
        this.tweens.add({
          targets: b.card.c, y: H + 140, duration: fall, ease: 'Linear',
          onComplete: () => {
            if (!this.live) return;
            if (++this.fallen < this.wave.length) return;
            // Every option fell past without being picked: ask again, no penalty.
            this.live = false;
            this.clearWave(false);
            this.toast('Zamudil si! Poskusi še enkrat.', false, 1500);
            this.time.delayedCall(1200, () => spawn(q));
          },
        });
      });
    };

    const pick = (b: Bub) => {
      const q = this.current!;
      this.live = false;
      sfx.pop();
      const right = this.wave.find((o) => o.ans === q.correct)!;
      right.card.setFill(0xb9f3d3);
      if (b.ans === q.correct) {
        burst(this, b.card.c.x, b.card.c.y, 12);
        this.good();
        done++;
        showCount();
        this.clearWave(true, right);
        this.time.delayedCall(900, ask);
      } else {
        b.card.setFill(0xff9b9b);
        this.bad(`Pravilno je: ${q.answers[q.correct]}`);
        queue.push(q); // asked again later
        this.clearWave(true, right, b);
        this.time.delayedCall(2200, ask);
      }
    };
    this.pickFn = pick;
    this.time.delayedCall(400, ask);
  }

  /** Stop the falling options; keep the highlighted ones on screen briefly, then fade everything. */
  private clearWave(keepBriefly: boolean, ...keep: Bub[]): void {
    this.wave.forEach((o) => {
      this.tweens.killTweensOf(o.card.c);
      const stay = keepBriefly && keep.includes(o);
      this.tweens.add({ targets: o.card.c, alpha: 0, duration: 400, delay: stay ? 1000 : keepBriefly ? 150 : 0, onComplete: () => o.card.c.destroy() });
    });
    this.wave = [];
  }

  update(): void {
    if (!this.live || this.over) return;
    for (const b of this.wave) {
      const c = b.card.c;
      if (Math.abs(c.y - this.rocket.y) < b.card.h / 2 + 80 && Math.abs(c.x - this.rocket.x) < b.card.w / 2) {
        this.pickFn?.(b);
        return;
      }
    }
  }
}
