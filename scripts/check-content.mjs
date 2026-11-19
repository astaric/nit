// Content quality checker for the quiz questions (Catch and Boss stages).
// Usage: npm run check:content   (exit 1 on failures; warnings never fail)
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
});

const failures = [];
const warnings = [];
const fail = (msg) => failures.push(msg);

try {
  const { journeys, journeyOrder } = await server.ssrLoadModule('/src/core/stages.ts');

  // Unique question objects (a Boss reuses the Catch pools, so dedupe by identity).
  const seen = new Map(); // QA object -> first location
  const byText = new Map(); // question text -> [location, ...] (distinct objects only)
  const catchTexts = new Map(); // journey id -> Set of question texts in its Catch pools
  let total = 0;
  let longest = 0;

  for (const id of journeyOrder) {
    const journey = journeys[id];
    catchTexts.set(id, new Set());

    journey.stages.forEach((stage, i) => {
      const qs = stage.data?.questions;
      if (!Array.isArray(qs) || (stage.scene !== 'Catch' && stage.scene !== 'Boss')) return;
      const where = `${id}[${i}] ${stage.scene} "${stage.label}"`;

      if (stage.scene === 'Catch') for (const q of qs) catchTexts.get(id).add(q.q);

      for (const q of qs) {
        if (seen.has(q)) continue;
        seen.set(q, where);
        total++;

        const loc = `${where}: "${q.q}"`;
        if (!byText.has(q.q)) byText.set(q.q, []);
        byText.get(q.q).push(where);

        const right = q.answers[q.correct];
        const wrong = q.answers.filter((_, k) => k !== q.correct);

        if (q.answers.length < 3) fail(`${loc} has only ${q.answers.length} answers`);

        const dups = q.answers.filter((a, k) => q.answers.indexOf(a) !== k);
        if (dups.length) fail(`${loc} has duplicate answers: ${[...new Set(dups)].map((d) => `"${d}"`).join(', ')}`);

        if (wrong.length) {
          const maxWrong = Math.max(...wrong.map((a) => a.length));
          if (right.length > maxWrong + 8 && right.length > maxWrong * 1.3) {
            fail(`${loc} correct answer "${right}" (${right.length}) is much longer than any wrong answer (max ${maxWrong})`);
          }
          if (right.length > maxWrong) longest++;
        }
      }
    });
  }

  for (const [text, locs] of byText) {
    if (locs.length > 1) fail(`duplicate question text "${text}" in: ${locs.join(' | ')}`);
  }

  warnings.push(`correct answer is strictly the longest in ${longest} of ${total} questions`);

  for (const id of journeyOrder) {
    journeys[id].stages.forEach((stage, i) => {
      if (stage.scene !== 'Boss') return;
      const qs = stage.data?.questions ?? [];
      if (!qs.length) return;
      const shared = qs.filter((q) => catchTexts.get(id).has(q.q)).length;
      const pct = Math.round((shared / qs.length) * 100);
      warnings.push(`${id}[${i}] Boss "${stage.label}": ${shared}/${qs.length} (${pct}%) of its pool also appears in the world's Catch pools`);
    });
  }

  console.log(`Checked ${total} unique questions in ${journeyOrder.length} worlds.\n`);
  if (warnings.length) {
    console.log(`WARNINGS (${warnings.length})`);
    for (const w of warnings) console.log(`  ! ${w}`);
    console.log();
  }
  if (failures.length) {
    console.log(`FAILURES (${failures.length})`);
    for (const f of failures) console.log(`  ✗ ${f}`);
  } else {
    console.log('No failures.');
  }
} finally {
  await server.close();
}

process.exit(failures.length ? 1 : 0);
