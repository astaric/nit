// Kill switch. The game used to ship an offline service worker at this URL;
// devices that installed it keep serving the old cached build. Browsers always
// re-fetch sw.js, so this replacement clears the caches, unregisters itself and
// reloads open pages. There is no fetch handler, so requests go to the network.
// Can be deleted once old installs are no longer a concern.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => clients.forEach((c) => c.navigate(c.url)))
  );
});
