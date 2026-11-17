import type { JourneyId } from './types';

// Best stars per stage, kept in localStorage so progress survives reloads.
const KEY = 'naravoslovje-v1';

function load(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function getStars(j: JourneyId, i: number): number {
  return load()[`${j}:${i}`] ?? 0;
}

export function saveStars(j: JourneyId, i: number, stars: number): void {
  const all = load();
  const k = `${j}:${i}`;
  all[k] = Math.max(all[k] ?? 0, stars);
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* storage is optional */
  }
}

export function journeyStars(j: JourneyId, count: number): number {
  let s = 0;
  for (let i = 0; i < count; i++) s += getStars(j, i);
  return s;
}
