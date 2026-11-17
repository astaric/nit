import Phaser from 'phaser';
import { W } from '../../core/dims';
import { StudyScene } from '../../core/StudyScene';
import { sfx } from '../../core/sfx';
import { burst, button, confetti, makeCard, txt } from '../../core/ui';

interface Task { prompt: string; name: string; fact: string; occluder: 'moon' | 'earth'; start: { moon: [number, number]; earth: [number, number] } }

const TASKS: Task[] = [
  {
    prompt: 'Naredi SONČNI MRK: postavi Luno med Sonce in Zemljo!',
    name: 'SONČNI MRK 🌑',
    fact: 'Luna je med Soncem in Zemljo – njena senca pade na Zemljo.',
    occluder: 'moon',
    start: { moon: [1700, 1080], earth: [1150, 800] },
  },
  {
    prompt: 'Naredi LUNIN MRK: postavi Zemljo med Sonce in Luno!',
    name: 'LUNIN MRK 🌘',
    fact: 'Zemlja je med Soncem in Luno – Zemljina senca pade na Luno.',
    occluder: 'earth',
    start: { moon: [750, 1080], earth: [1150, 800] },
  },
];

const SUN = { x: 230, y: 800 };
const R = { moon: 70, earth: 95 }; // forgiving "shadow radii"

/** Drag the Moon and Earth around the Sun to make both kinds of eclipse. */
export class Eclipse extends StudyScene {
  private moon!: Phaser.GameObjects.Container;
  private earth!: Phaser.GameObjects.Container;
  private beams!: Phaser.GameObjects.Graphics;
  private task = 0;
  private solved = false;
  private ui: Phaser.GameObjects.GameObject[] = [];

  constructor() { super('Eclipse'); }

  create(): void {
    this.setup('Mrki', 3);
    this.task = 0;
    this.solved = false;
    this.ui = [];
    this.beams = this.add.graphics().setDepth(1);

    const glow = this.add.circle(SUN.x, SUN.y, 230, 0xffd23f, 0.25).setDepth(2);
    this.tweens.add({ targets: glow, scale: 1.12, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    this.add.image(SUN.x, SUN.y, 'sun').setScale(2.1).setDepth(3);
    txt(this, SUN.x, 1040, 'Sonce', 44);

    this.earth = this.makeBody('earth', 190, 'Zemlja');
    this.moon = this.makeBody('moon', 100, 'Luna');
    this.startTask();
  }

  private makeBody(key: string, size: number, label: string): Phaser.GameObjects.Container {
    const img = this.add.image(0, 0, key);
    img.setScale(size / Math.max(img.width, img.height));
    const name = txt(this, 0, size / 2 + 34, label, 38);
    const c = this.add.container(0, 0, [img, name]).setDepth(10);
    c.setSize(Math.max(size, 150) + 70, Math.max(size, 150) + 70).setInteractive({ draggable: true });
    this.input.setDraggable(c);
    c.on('drag', (_p: Phaser.Input.Pointer, x: number, y: number) => {
      if (this.solved) return;
      c.setPosition(Phaser.Math.Clamp(x, 480, W - 120), Phaser.Math.Clamp(y, 460, 1230));
    });
    c.on('dragstart', () => { sfx.tick(); c.setScale(1.1); });
    c.on('dragend', () => c.setScale(1));
    return c;
  }

  private startTask(): void {
    const t = TASKS[this.task];
    this.solved = false;
    this.ui.splice(0).forEach((o) => o.destroy());
    const card = makeCard(this, W / 2, 330, 1860, 150, `Naloga ${this.task + 1}/${TASKS.length}:  ${t.prompt}`, { size: 50 });
    this.ui.push(card.c);
    this.earth.setPosition(...t.start.earth);
    this.moon.setPosition(...t.start.moon);
    this.tweens.add({ targets: [this.earth, this.moon], scale: { from: 0.6, to: 1 }, duration: 350, ease: 'Back.out' });
  }

  /** Does `occ` cast a shadow (a cone pointing away from the Sun) over `target`? */
  private shadows(occ: Phaser.GameObjects.Container, rOcc: number, target: Phaser.GameObjects.Container): boolean {
    const dx = target.x - occ.x;
    if (dx < 60) return false;
    const taper = rOcc * (1 - 0.7 * (dx / (W - occ.x)));
    return Math.abs(target.y - occ.y) < taper + 25;
  }

  private cone(g: Phaser.GameObjects.Graphics, occ: Phaser.GameObjects.Container, r: number): void {
    g.fillStyle(0x000000, 0.5);
    g.beginPath();
    g.moveTo(occ.x, occ.y - r);
    g.lineTo(W, occ.y - r * 0.3);
    g.lineTo(W, occ.y + r * 0.3);
    g.lineTo(occ.x, occ.y + r);
    g.closePath();
    g.fillPath();
  }

  update(): void {
    const g = this.beams;
    g.clear();
    // Sunlight wedge
    g.fillStyle(0xffe066, 0.1);
    g.beginPath();
    g.moveTo(SUN.x, SUN.y - 150);
    g.lineTo(W, 330);
    g.lineTo(W, 1270);
    g.lineTo(SUN.x, SUN.y + 150);
    g.closePath();
    g.fillPath();
    // Shadows
    this.cone(g, this.moon, R.moon);
    this.cone(g, this.earth, R.earth);

    if (this.solved || this.over) return;
    const t = TASKS[this.task];
    const hit = t.occluder === 'moon' ? this.shadows(this.moon, R.moon, this.earth) : this.shadows(this.earth, R.earth, this.moon);
    // The occluder must also sit between the Sun and its target along x.
    if (hit) this.complete(t);
  }

  private complete(t: Task): void {
    this.solved = true;
    sfx.yay();
    this.good('Mrk!');
    confetti(this, 20);
    burst(this, W / 2, 800, 14);
    const banner = makeCard(this, W / 2, 1090, 1500, 290, '', { fill: 0xfff6e0 });
    const title = txt(this, 0, -70, t.name, 84, { color: '#5a3a22' });
    const fact = txt(this, 0, 50, t.fact, 44, { color: '#5a3a22', wrap: 1380 });
    banner.c.add([title, fact]).setDepth(40);
    this.ui.push(banner.c);
    this.tweens.add({ targets: banner.c, scale: { from: 0.5, to: 1 }, duration: 350, ease: 'Back.out' });
    const last = this.task === TASKS.length - 1;
    const b = button(this, W / 2, 1360, last ? 'Končano!' : 'Naprej ▶', () => {
      if (last) this.win(200);
      else { this.task++; this.startTask(); }
    }, { w: 480 });
    b.setDepth(40);
    this.ui.push(b);
  }
}
