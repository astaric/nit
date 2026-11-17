import Phaser from 'phaser';

// Every SVG in src/art becomes a texture keyed by its filename.
const svgs = import.meta.glob('../art/*.svg', { query: '?no-inline', import: 'default', eager: true }) as Record<string, string>;

export class Boot extends Phaser.Scene {
  constructor() { super('Boot'); }

  preload(): void {
    for (const [path, url] of Object.entries(svgs)) {
      const key = path.split('/').pop()!.replace('.svg', '');
      this.load.svg(key, url, { scale: 1.5 });
    }
  }

  create(): void {
    if (new URLSearchParams(location.search).has('debug')) {
      const el = document.createElement('div');
      el.style.cssText = 'position:fixed;top:4px;left:8px;font:bold 16px monospace;color:#fff;z-index:9';
      document.body.appendChild(el);
      this.game.events.on('step', () => { el.textContent = `${Math.round(this.game.loop.actualFps)} fps`; });
    }
    this.scene.start('Title');
  }
}
