import Phaser from 'phaser';
import { Boot } from './scenes/Boot';
import { Title } from './scenes/Title';
import { GameSelect } from './scenes/GameSelect';
import { StageMap } from './scenes/StageMap';
import { Result } from './scenes/Result';
import { Finale } from './scenes/Finale';
import { Sorter } from './scenes/minigames/Sorter';
import { Sequence } from './scenes/minigames/Sequence';
import { Match } from './scenes/minigames/Match';
import { Catch } from './scenes/minigames/Catch';
import { Boss } from './scenes/minigames/Boss';
import { Eclipse } from './scenes/minigames/Eclipse';
import { StateLab } from './scenes/minigames/StateLab';
import { journeys, progress } from './core/stages';
import { W, H } from './core/dims';
import type { JourneyId } from './core/types';


const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: W,
  height: H,
  backgroundColor: '#1b1f4b',
  input: { activePointers: 3 },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [Boot, Title, GameSelect, StageMap, Result, Finale, Sorter, Sequence, Match, Catch, Boss, Eclipse, StateLab],
});

if (import.meta.env.DEV) {
  // Hot reload re-runs this module: drop the old game so there's only ever one canvas.
  import.meta.hot?.dispose(() => game.destroy(true));
  (window as any).__game = game;
  // Dev helper: __go('vesolje', 3) jumps straight into a stage.
  (window as any).__go = (j: JourneyId, i: number) => {
    progress.journey = j;
    progress.index = i;
    const st = journeys[j].stages[i];
    game.scene.getScenes(true).forEach((s) => s.scene.start(st.scene, st.data));
  };
}

// Offline: dist/sw.js is emitted by the offlineServiceWorker plugin in vite.config.ts and
// precaches the whole build. Needs HTTPS (or localhost); only registered in production builds.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
