/**
 * Load the latest deployed build: drop leftover service workers and caches, re-fetch
 * index.html bypassing the HTTP cache, then reload on a cache-busting URL.
 * Progress (stars) lives in localStorage and is kept.
 */
export async function reloadLatest(): Promise<void> {
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
    await fetch(location.pathname, { cache: 'reload' });
  } catch {
    // Offline or blocked: the reload below will just fail the same way a normal one does.
  }
  const url = new URL(location.href);
  url.searchParams.set('r', String(Date.now()));
  location.replace(url.toString());
}
