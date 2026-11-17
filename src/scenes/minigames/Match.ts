import Phaser from 'phaser';
import { W } from '../../core/dims';
import { StudyScene } from '../../core/StudyScene';
import { sfx } from '../../core/sfx';
import { burst, makeCard, shuffle, txt, type Card } from '../../core/ui';

export interface MatchData {
  title: string;
  pairs: { a: string; b: string; ea?: string }[];
  perRound?: number;
}

const LEFT = 0xd9f2ff;
const RIGHT = 0xfff6e0;
const PICK = 0xffe27a;
const OK = 0xb9f3d3;

/** Tap a card on the left, then its partner on the right. */
export class Match extends StudyScene {
  constructor() { super('Match'); }

  create(): void {
    const d = this.cfg as MatchData;
    this.setup(d.title, 5);
    const per = d.perRound ?? 4;
    const rounds: MatchData['pairs'][] = [];
    const all = shuffle(d.pairs);
    for (let i = 0; i < all.length; i += per) rounds.push(all.slice(i, i + per));
    let roundNo = 0;
    const roundTxt = txt(this, W / 2, 250, '', 44, { bold: false });
    const layer: Phaser.GameObjects.GameObject[] = [];

    const startRound = () => {
      layer.splice(0).forEach((o) => o.destroy());
      const pairs = rounds[roundNo];
      roundTxt.setText(`Poveži pare${rounds.length > 1 ? `  (krog ${roundNo + 1}/${rounds.length})` : ''}`);
      const n = pairs.length;
      const top = 340;
      const bottom = 1400;
      const step = (bottom - top) / n;
      const h = Math.min(230, step - 26);
      const lefts = shuffle(pairs.map((_, i) => i));
      const rights = shuffle(pairs.map((_, i) => i));
      const L = new Map<number, Card>();
      const R = new Map<number, Card>();
      let picked: number | null = null;
      let remaining = n;
      let busy = false;

      const sizeFor = (s: string) => (s.length > 60 ? 36 : s.length > 36 ? 42 : 50);

      lefts.forEach((pi, row) => {
        const y = top + step * (row + 0.5);
        const card = makeCard(this, 520, y, 860, h, pairs[pi].a, { fill: LEFT, size: sizeFor(pairs[pi].a) + 6, emoji: pairs[pi].ea });
        card.c.setInteractive();
        L.set(pi, card);
        layer.push(card.c);
        card.c.on('pointerdown', () => {
          if (busy || this.over) return;
          sfx.tick();
          if (picked !== null) L.get(picked)!.setFill(LEFT);
          picked = pi;
          card.setFill(PICK);
          this.tweens.add({ targets: card.c, scale: { from: 1.06, to: 1 }, duration: 160 });
        });
      });
      rights.forEach((pi, row) => {
        const y = top + step * (row + 0.5);
        const card = makeCard(this, 1500, y, 980, h, pairs[pi].b, { fill: RIGHT, size: sizeFor(pairs[pi].b) });
        card.c.setInteractive();
        R.set(pi, card);
        layer.push(card.c);
        card.c.on('pointerdown', () => {
          if (busy || this.over) return;
          if (picked === null) {
            sfx.tick();
            this.toast('Najprej tapni kartico na levi!', false, 1400);
            return;
          }
          const lp = picked;
          const lc = L.get(lp)!;
          if (lp === pi) {
            busy = true;
            this.good();
            lc.setFill(OK);
            card.setFill(OK);
            burst(this, 1000, card.c.y, 8);
            picked = null;
            remaining--;
            this.tweens.add({ targets: [lc.c, card.c], alpha: 0.35, scale: 0.96, duration: 350, delay: 250 });
            lc.c.disableInteractive();
            card.c.disableInteractive();
            this.time.delayedCall(400, () => {
              busy = false;
              if (remaining === 0) {
                roundNo++;
                if (roundNo >= rounds.length) this.win(); else this.time.delayedCall(300, startRound);
              }
            });
          } else {
            this.bad(`Ni prav! „${pairs[lp].a}“ → ${pairs[lp].b}`);
            lc.setFill(LEFT);
            picked = null;
            const shake = (t: Phaser.GameObjects.Container) =>
              this.tweens.add({ targets: t, angle: { from: -3, to: 3 }, duration: 70, yoyo: true, repeat: 3, onComplete: () => t.setAngle(0) });
            shake(lc.c);
            shake(card.c);
            const good = R.get(lp)!;
            this.tweens.add({ targets: good.c, scale: 1.06, duration: 220, yoyo: true, repeat: 2, delay: 300 });
          }
        });
      });
    };
    startRound();
  }
}
