const CACHE_NAME = "qimen-jiugong-v5-0-decision-10";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css?v=5.0-decision-10",
  "./engine.js?v=5.0-decision-10",
  "./qimen_soul_copy_bank.js?v=5.0-decision-10",
  "./app.js?v=5.0-decision-10",
  "./manifest.webmanifest?v=5.0-decision-10",
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
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
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
