const CACHE_NAME = "qimen-jiugong-v5-5-shijia-3";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css?v=5.5-shijia-3",
  "./engine.js?v=5.5-shijia-3",
  "./timeqimen-engine.js?v=5.5-shijia-3",
  "./app.js?v=5.5-shijia-3",
  "./manifest.webmanifest?v=5.5-shijia-3",
  "./assets/paper-texture.webp",
  "./rules/rules.json",
  "./rules/lock-palace.json",
  "./rules/scoring.json",
  "./rules/qtype-rules.json",
  "./rules/fengshui-rules.json"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key.startsWith("qimen-jiugong-") && key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("./index.html")));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
