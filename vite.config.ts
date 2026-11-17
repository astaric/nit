import { defineConfig, type Plugin } from 'vite';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

// Emits dist/sw.js: a service worker that precaches every built file so the
// game runs offline once installed. The cache name is a hash of the contents,
// so each new build replaces the old cache.
function offlineServiceWorker(): Plugin {
  let outDir = 'dist';
  return {
    name: 'offline-service-worker',
    apply: 'build',
    configResolved(config) { outDir = config.build.outDir; },
    writeBundle(options) {
      const dir = options.dir ?? outDir;
      const files: string[] = [];
      const walk = (d: string) => {
        for (const name of readdirSync(d)) {
          const p = join(d, name);
          if (statSync(p).isDirectory()) walk(p);
          else files.push(relative(dir, p).split('\\').join('/'));
        }
      };
      walk(dir);
      const urls = files.filter((f) => f !== 'sw.js').sort();
      const hash = createHash('sha1');
      for (const f of urls) hash.update(f).update(readFileSync(join(dir, f)));
      const version = hash.digest('hex').slice(0, 10);
      // Relative URLs resolve against sw.js, so this works under any base path
      // (e.g. https://user.github.io/repo/).
      const precache = ['./', ...urls.map((f) => './' + f)];

      writeFileSync(join(dir, 'sw.js'), `const CACHE = 'naravoslovje-${version}';
const PRECACHE = ${JSON.stringify(precache)};

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true, ignoreVary: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).catch(() =>
        req.mode === 'navigate' ? caches.match('./index.html') : Response.error()
      );
    })
  );
});
`);
    },
  };
}

export default defineConfig({
  base: './',
  server: { host: true, port: 5174, strictPort: true },
  build: { assetsInlineLimit: 0, chunkSizeWarningLimit: 2000 },
  plugins: [offlineServiceWorker()],
});
