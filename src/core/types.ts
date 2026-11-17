export type JourneyId = 'vesolje' | 'zivljenje' | 'ekosistem' | 'snovi';

export interface Theme {
  bg: number;
  /** Text colour used directly on the background. */
  ink: string;
  dark: boolean;
  accent: number;
}

export interface Stage {
  scene: string;
  /** Emoji shown on the stage map. */
  icon: string;
  label: string;
  data?: any;
  /** "Zapomni si" lines shown after the stage. */
  recap: string[];
}

export interface Journey {
  id: JourneyId;
  title: string;
  icon: string;
  blurb: string;
  theme: Theme;
  stages: Stage[];
}

/** Multiple choice question. The first answer passed to qa() is the correct one. */
export interface QA {
  q: string;
  answers: string[];
  correct: number;
}

/** qa('Vprašanje?', 'pravilen', 'napačen', 'napačen') */
export function qa(q: string, right: string, ...wrong: string[]): QA {
  return { q, answers: [right, ...wrong], correct: 0 };
}
