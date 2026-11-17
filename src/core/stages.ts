import type { Journey, JourneyId } from './types';
import { vesolje } from '../content/vesolje';
import { zivljenje } from '../content/zivljenje';
import { ekosistem } from '../content/ekosistem';
import { snovi } from '../content/snovi';

export type { Journey, JourneyId, Stage } from './types';

/** Data-driven journeys (see src/content). Add a stage = add an entry to a content file. */
export const journeys: Record<JourneyId, Journey> = { vesolje, zivljenje, ekosistem, snovi };
export const journeyOrder: JourneyId[] = ['vesolje', 'zivljenje', 'ekosistem', 'snovi'];

export interface StageResult { stars: number; failed: boolean; mistakes: number }

export const progress: { journey: JourneyId; index: number; result: StageResult | null } = {
  journey: 'vesolje',
  index: 0,
  result: null,
};

export function currentJourney(): Journey {
  return journeys[progress.journey];
}

export function startStage(scene: Phaser.Scene, index: number): void {
  const st = currentJourney().stages[index];
  progress.index = index;
  scene.scene.start(st.scene, st.data);
}
