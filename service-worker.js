const CACHE_NAME = 'pwa-note-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './function.wasm'
];

// Событие install: предварительно кэшируем статику
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Событие activate: удаляем устаревшие кэши
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    ))
  );
});

// Событие fetch: стратегия cache-first
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      // Если в кэше нет точного совпадения — пробуем index.html для навигации
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
      return fetch(event.request);
    })
  );
});