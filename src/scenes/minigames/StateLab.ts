import Phaser from 'phaser';
import { W } from '../../core/dims';
import { StudyScene } from '../../core/StudyScene';
import { sfx } from '../../core/sfx';
import { burst, makeCard, panel, shuffle, txt } from '../../core/ui';
import { qa, type QA } from '../../core/types';

type St = 'solid' | 'melt' | 'liquid' | 'boil' | 'gas';
type Ev = 'melted' | 'frozen' | 'boiled' | 'condensed';

interface Task { ev: Ev; prompt: string; q: QA; name: string }

const TASKS: Task[] = [
  { ev: 'melted', prompt: '🔥 Segrevaj led, dokler se ne stopi!', name: 'TALJENJE', q: qa('Kako se imenuje prehod iz trdnega v tekoče stanje?', 'Taljenje', 'Zamrzovanje', 'Kondenzacija') },
  { ev: 'boiled', prompt: '🔥 Segrevaj naprej, dokler voda ne zavre!', name: 'IZPAREVANJE (VRENJE)', q: qa('Kako se imenuje prehod iz tekočega v plinasto stanje?', 'Izparevanje (vrenje)', 'Kondenzacija', 'Sublimacija') },
  { ev: 'condensed', prompt: '❄️ Ohlajaj vodno paro!', name: 'KONDENZACIJA', q: qa('Kako se imenuje prehod iz plinastega v tekoče stanje?', 'Kondenzacija', 'Izparevanje', 'Taljenje') },
  { ev: 'frozen', prompt: '❄️ Ohlajaj naprej, da voda zmrzne!', name: 'ZAMRZOVANJE (STRJEVANJE)', q: qa('Kako se imenuje prehod iz tekočega v trdno stanje?', 'Zamrzovanje (strjevanje)', 'Taljenje', 'Resublimacija') },
];

const ARROW: Record<Ev, string> = {
  melted: 'trdno → tekoče',
  frozen: 'tekoče → trdno',
  boiled: 'tekoče → plinasto',
  condensed: 'plinasto → tekoče',
};

const BX0 = 120, BX1 = 960, BY0 = 480, BY1 = 1320; // beaker interior
const N = 40;
const LIQ_TOP = BY1 - 420;

interface P { s: Phaser.GameObjects.Arc; x: number; y: number; vx: number; vy: number; hx: number; hy: number }

/** Heat and cool a beaker of water and watch the particles change state. */
export class StateLab extends StudyScene {
  private T = -20;
  private st: St = 'solid';
  private lat = 0;
  private from: 'low' | 'high' = 'low';
  private dir = 0;
  private paused = false;
  private ps: P[] = [];
  private task = 0;
  private water!: Phaser.GameObjects.Graphics;
  private therm!: Phaser.GameObjects.Graphics;
  private tempTxt!: Phaser.GameObjects.Text;
  private stateTxt!: Phaser.GameObjects.Text;
  private flashTxt!: Phaser.GameObjects.Text;
  private taskCard!: ReturnType<typeof makeCard>;
  private quiz: Phaser.GameObjects.GameObject[] = [];
  private fire!: Phaser.GameObjects.Text;

  constructor() { super('StateLab'); }

  create(): void {
    this.setup('Laboratorij: agregatna stanja', 3);
    this.T = -20; this.st = 'solid'; this.lat = 0; this.from = 'low'; this.dir = 0; this.paused = false; this.task = 0; this.quiz = []; this.ps = [];

    this.taskCard = makeCard(this, W / 2, 300, 1860, 140, '', { size: 50 });

    // Beaker
    const bw = BX1 - BX0 + 60;
    const bh = BY1 - BY0 + 60;
    const beaker = panel(this, bw, bh, 0xffffff, { r: 30, alpha: 0.14, stroke: 0xffffff, sw: 10 });
    beaker.setPosition((BX0 + BX1) / 2, (BY0 + BY1) / 2);
    this.water = this.add.graphics();
    this.fire = this.add.text((BX0 + BX1) / 2, BY1 + 90, '', { fontSize: '90px' }).setOrigin(0.5);

    // Particles on a grid (solid ice crystal)
    for (let i = 0; i < N; i++) {
      const col = i % 8;
      const row = Math.floor(i / 8);
      const hx = BX0 + 70 + col * 100;
      const hy = BY1 - 50 - row * 78;
      const s = this.add.circle(hx, hy, 26, 0xbfefff).setStrokeStyle(5, 0x3a7ea8).setDepth(5);
      this.ps.push({ s, x: hx, y: hy, vx: 0, vy: 0, hx, hy });
    }

    // Thermometer + readouts (right side)
    this.therm = this.add.graphics();
    this.tempTxt = txt(this, 1480, 560, '', 120, { color: '#ffffff', stroke: '#000000', sw: 8 });
    this.stateTxt = txt(this, 1480, 700, '', 60, { wrap: 800 });
    this.flashTxt = txt(this, 1480, 810, '', 50, { color: '#ffd23f', stroke: '#000000', sw: 6, wrap: 800 });

    this.heatButton(1480, 1000, '🔥 Segrevaj', 0xff9f6b, 1);
    this.heatButton(1480, 1230, '❄️ Ohlajaj', 0x7fc8ff, -1);
    this.input.on('pointerup', () => { this.dir = 0; });

    this.showTask();
  }

  private heatButton(x: number, y: number, label: string, fill: number, dir: number): void {
    const bg = panel(this, 640, 180, fill, { r: 90 });
    const t = txt(this, 0, 0, label, 72, { color: '#ffffff', stroke: '#5a3a22', sw: 10 });
    const c = this.add.container(x, y, [bg, t]).setSize(660, 200).setInteractive();
    c.on('pointerdown', () => { if (!this.paused && !this.over) { this.dir = dir; c.setScale(0.95); } });
    const release = () => { if (this.dir === dir) this.dir = 0; c.setScale(1); };
    c.on('pointerup', release);
    c.on('pointerout', release);
    c.on('pointerupoutside', release);
  }

  private showTask(): void {
    const t = TASKS[this.task];
    this.taskCard.text.setText(`Naloga ${this.task + 1}/${TASKS.length}:  ${t.prompt}`);
    this.tweens.add({ targets: this.taskCard.c, scale: { from: 0.9, to: 1 }, duration: 250, ease: 'Back.out' });
  }

  private event(ev: Ev): void {
    sfx.pop();
    const t = TASKS[this.task];
    if (t.ev !== ev) {
      this.flashTxt.setText(ARROW[ev]);
      this.time.delayedCall(1600, () => { if (this.flashTxt.text === ARROW[ev]) this.flashTxt.setText(''); });
      return;
    }
    this.paused = true;
    this.dir = 0;
    this.flashTxt.setText(ARROW[ev]);
    this.askQuiz(t);
  }

  private askQuiz(t: Task): void {
    const overlay = this.add.rectangle(W / 2, 768, W, 1536, 0x000000, 0.55).setDepth(50).setInteractive();
    const qCard = makeCard(this, W / 2, 520, 1700, 220, t.q.q, { size: 54 });
    qCard.c.setDepth(51);
    this.quiz.push(overlay, qCard.c);
    const order = shuffle(t.q.answers.map((_, i) => i));
    let locked = false;
    order.forEach((ai, i) => {
      const a = t.q.answers[ai];
      const c = makeCard(this, W / 2, 790 + i * 210, 1100, 170, a, { size: 56, fill: [0xd9f2ff, 0xffe9b8, 0xd9ffe3][i] });
      c.c.setDepth(51).setInteractive();
      this.quiz.push(c.c);
      c.c.on('pointerdown', () => {
        if (locked) return;
        if (ai === t.q.correct) {
          locked = true;
          c.setFill(0xb9f3d3);
          this.good(`${t.name}!`);
          burst(this, W / 2, c.c.y, 12);
          this.time.delayedCall(1100, () => {
            this.quiz.splice(0).forEach((o) => o.destroy());
            this.flashTxt.setText(t.name);
            this.task++;
            if (this.task >= TASKS.length) this.win(500);
            else { this.paused = false; this.showTask(); }
          });
        } else {
          c.setFill(0xff9b9b);
          this.bad('Ni prav. Poglej puščico pod temperaturo in poskusi znova!');
        }
      });
    });
  }

  private entering(type: 'melt' | 'boil', from: 'low' | 'high'): void {
    this.st = type;
    this.from = from;
    this.lat = from === 'low' ? 0 : 1;
    this.T = type === 'melt' ? 0 : 100;
  }

  private step(dt: number): void {
    const dir = this.dir;
    if (dir === 0) return;
    const rate = 38;
    switch (this.st) {
      case 'solid':
        this.T = Math.max(-40, this.T + dir * rate * dt);
        if (this.T >= 0 && dir > 0) this.entering('melt', 'low');
        break;
      case 'liquid':
        this.T += dir * 30 * dt;
        if (this.T >= 100 && dir > 0) this.entering('boil', 'low');
        else if (this.T <= 0 && dir < 0) this.entering('melt', 'high');
        break;
      case 'gas':
        this.T = Math.min(140, this.T + dir * rate * dt);
        if (this.T <= 100 && dir < 0) this.entering('boil', 'high');
        break;
      case 'melt':
      case 'boil': {
        const melt = this.st === 'melt';
        this.lat += (dir * dt) / 1.7;
        const base = melt ? 0 : 100;
        if (this.lat >= 1) {
          this.lat = 1;
          this.st = melt ? 'liquid' : 'gas';
          this.T = base + 0.5;
          if (this.from === 'low') this.event(melt ? 'melted' : 'boiled');
        } else if (this.lat <= 0) {
          this.lat = 0;
          this.st = melt ? 'solid' : 'liquid';
          this.T = base - 0.5;
          if (this.from === 'high') this.event(melt ? 'frozen' : 'condensed');
        }
        break;
      }
    }
  }

  private modeOf(i: number): 'solid' | 'liquid' | 'gas' {
    const f = i / N;
    switch (this.st) {
      case 'solid': return 'solid';
      case 'melt': return f < this.lat ? 'liquid' : 'solid';
      case 'liquid': return 'liquid';
      case 'boil': return f < this.lat ? 'gas' : 'liquid';
      default: return 'gas';
    }
  }

  update(_t: number, dtMs: number): void {
    if (this.over) return;
    const dt = Math.min(dtMs, 50) / 1000;
    if (!this.paused) this.step(dt);

    // Particles
    let liquidCount = 0;
    this.ps.forEach((p, i) => {
      const mode = this.modeOf(i);
      if (mode === 'solid') {
        p.x += (p.hx - p.x) * Math.min(1, dt * 7) + Phaser.Math.FloatBetween(-1.6, 1.6);
        p.y += (p.hy - p.y) * Math.min(1, dt * 7) + Phaser.Math.FloatBetween(-1.6, 1.6);
        p.vx = Phaser.Math.FloatBetween(-60, 60);
        p.vy = Phaser.Math.FloatBetween(-60, 60);
        p.s.setFillStyle(0xbfefff).setStrokeStyle(5, 0x3a7ea8);
      } else {
        const cap = mode === 'liquid' ? 150 : 430;
        const floor = mode === 'liquid' ? 110 : 330;
        p.vx += Phaser.Math.FloatBetween(-1, 1) * 700 * dt;
        p.vy += Phaser.Math.FloatBetween(-1, 1) * 700 * dt + (mode === 'liquid' ? 260 * dt : 0);
        const sp = Math.hypot(p.vx, p.vy) || 1;
        const target = Phaser.Math.Clamp(sp, floor, cap);
        p.vx = (p.vx / sp) * target;
        p.vy = (p.vy / sp) * target;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const top = mode === 'liquid' ? LIQ_TOP : BY0 + 26;
        if (p.x < BX0 + 26) { p.x = BX0 + 26; p.vx = Math.abs(p.vx); }
        if (p.x > BX1 - 26) { p.x = BX1 - 26; p.vx = -Math.abs(p.vx); }
        if (p.y < top) { p.y = top; p.vy = Math.abs(p.vy); }
        if (p.y > BY1 - 26) { p.y = BY1 - 26; p.vy = -Math.abs(p.vy); }
        if (mode === 'liquid') { liquidCount++; p.s.setFillStyle(0x4aa3ff).setStrokeStyle(5, 0x1f5fa8); }
        else p.s.setFillStyle(0xe0e6ff, 0.9).setStrokeStyle(4, 0x8f9bd8);
      }
      p.s.setPosition(p.x, p.y);
    });

    // Water body
    const w = this.water;
    w.clear();
    const frac = liquidCount / N;
    if (frac > 0) {
      w.fillStyle(0x4aa3ff, 0.28 * Math.min(1, frac * 1.5));
      w.fillRoundedRect(BX0 - 10, LIQ_TOP - 20, BX1 - BX0 + 20, BY1 - LIQ_TOP + 30, 16);
    }

    // Thermometer
    const th = this.therm;
    th.clear();
    const tx = 1180, ty0 = 430, th0 = 460;
    th.fillStyle(0xffffff, 0.9).fillRoundedRect(tx - 28, ty0, 56, th0, 28);
    const f = Phaser.Math.Clamp((this.T + 40) / 180, 0, 1);
    const col = this.T < 0 ? 0x4aa3ff : this.T < 100 ? 0x5dd39e : 0xff5d5d;
    th.fillStyle(col, 1).fillRoundedRect(tx - 18, ty0 + th0 - 14 - f * (th0 - 28), 36, f * (th0 - 28) + 14, 18);
    th.lineStyle(6, 0x5a3a22, 1).strokeRoundedRect(tx - 28, ty0, 56, th0, 28);
    // marks at 0 and 100
    [0, 100].forEach((m) => {
      const y = ty0 + th0 - 14 - ((m + 40) / 180) * (th0 - 28);
      th.lineStyle(4, 0x5a3a22, 1).lineBetween(tx + 34, y, tx + 66, y);
    });
    this.tempTxt.setText(`${Math.round(this.T)} °C`);
    const label = {
      solid: 'TRDNO  H₂O(s)', liquid: 'TEKOČE  H₂O(l)', gas: 'PLINASTO  H₂O(g)',
      melt: this.from === 'low' ? 'led se tali …' : 'voda zmrzuje …',
      boil: this.from === 'low' ? 'voda izhlapeva …' : 'para se zgošča …',
    }[this.st];
    this.stateTxt.setText(label);
    this.fire.setText(this.dir > 0 ? '🔥🔥🔥' : this.dir < 0 ? '❄️❄️❄️' : '');
  }
}
