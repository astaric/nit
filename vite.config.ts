import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

// Latest commit (local date/time + subject), shown small on the title screen so
// it is clear which version is running. Empty when git is unavailable.
function latestCommit(): string {
  try {
    const out = execSync('git log -1 --format=%ci%n%s', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    const [date, ...subject] = out.trim().split('\n');
    return `${date.slice(0, 16)} · ${subject.join(' ')}`;
  } catch {
    return '';
  }
}

export default defineConfig({
  base: './',
  define: { __BUILD_COMMIT__: JSON.stringify(latestCommit()) },
  server: { host: true, port: 5174, strictPort: true },
  build: { assetsInlineLimit: 0, chunkSizeWarningLimit: 2000 },
});
