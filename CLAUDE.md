# CLAUDE.md

Naravoslovje: educational game built from handwritten science notes (Slovenian, 6th grade). Same stack and conventions as the sibling `../game` project.

## Commands

- `npm run dev` — Vite dev server on port 5174 (strict, LAN-exposed for iPad). Configured as `dev` in `.claude/launch.json`.
- `npm run build` — `tsc --noEmit && vite build`. No linter or tests.
- `npm run check:content` — quiz-question checker (`scripts/check-content.mjs`, loads the content through Vite SSR). Fails on duplicate answers or question text, fewer than 3 answers, or a correct answer much longer than every wrong one; warns on how often the correct answer is the longest and how much of each Boss pool is shared with its world's Catch pools. Not part of `build`; run it after editing questions.
- The latest commit's date/time and subject are injected at build/dev-start as `__BUILD_COMMIT__` (`define` in `vite.config.ts`, typed in `src/build-info.d.ts`) and shown faintly at the bottom of `Title`. In dev it only updates when the dev server restarts.
- Dev helpers: `window.__game` is the Phaser game; `?debug` shows FPS.

## Architecture

Phaser 4 + TypeScript + Vite, fixed 2048×1536 canvas (`W`, `H` from `src/core/dims.ts`, FIT scaling), iPad landscape, PWA manifest. `W`/`H` live in their own module (no circular import with `main.ts`).

- **Notes** live in `zapiski/*.md` (transcribed from the notebook photos). `[?]` marks uncertain readings. Game content in `src/content/*.ts` is derived from them.
- **Worlds** = `Journey` per file in `src/content/` (vesolje, zivljenje, ekosistem, snovi), registered in `src/core/stages.ts`. A `Stage` is `{scene, icon (emoji), label, data, recap[]}`; `recap` is shown on the `Result` screen ("Zapomni si"). To add a stage, add an entry to a content file. All stages are open; stars (best 1–3) persist in localStorage (`src/core/save.ts`).
- **Mini-games** (`src/scenes/minigames/`) all extend `StudyScene` (`src/core/StudyScene.ts`: HUD, hearts, Kozmo mascot, toast, `good()` / `bad(explain)` / `win()`). Stars = mistakes (0 → 3, ≤2 → 2, else 1); running out of hearts fails the stage. Reusable and data-driven: `Sorter` (drag into bins), `Sequence` (tap in order), `Match` (pair cards), `Catch` (timed quiz: question + 3 answers + countdown, wrong or too slow costs a heart), `Boss` (same idea with a boss HP bar, up to 4 answers in a 2×2 grid). One-offs: `Eclipse`, `StateLab`. Questions use `qa(question, right, ...wrong)` from `src/core/types.ts` (first answer is correct; scenes shuffle).
- **Writing questions**: Catch shows the right answer plus 2 random wrong ones, Boss shows all, so give each question 3 wrong answers where a plausible one exists. Wrong answers must be real misconceptions from the same topic (no jokes, no cross-topic words) and about as long and specific as the right one, so the right answer is not the longest. Don't ask a fact more than twice per world, and use only facts from `zapiski/`; never use anything marked `[?]` there. A Boss pool should mostly be questions its Catch stages don't ask (Boss-only pools like `trak`, `okolje`, `lastnosti`, `naslov`).
- **Art**: every SVG in `src/art/` is auto-loaded by `Boot` as a texture named after the file. Item icons elsewhere are emoji text.
- **Sound**: synthesised in `src/core/sfx.ts`; `unlockAudio()` must run from a tap.
- Text helpers in `src/core/ui.ts` (`txt`, `makeCard`, `button`, `panel`). Text on light cards must pass `color: INK`; `txt` defaults to the world's ink colour for use on the background.

**No offline mode**: the game used to precache everything with a service worker, but that kept serving stale builds after a new deploy, so it was removed. `public/sw.js` is only a kill switch for devices that still have the old worker (it clears caches and unregisters itself), and `src/main.ts` also unregisters leftovers. Do not register a service worker again.

**Deploy**: `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main` (repo Settings → Pages → Source must be "GitHub Actions"). Pages serves project sites from `/<repo>/`, so the build uses `base: './'` and every URL (index.html links, manifest) must stay relative; never add root-absolute (`/foo`) URLs.
