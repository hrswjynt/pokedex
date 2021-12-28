const timestamp = 1640691244092;
const build = [
  "/_app/start-048bbe1b.js",
  "/_app/assets/start-d5b4de3e.css",
  "/_app/pages/__layout.svelte-2b045bb1.js",
  "/_app/assets/pages/__layout.svelte-92f21421.css",
  "/_app/error.svelte-4871c992.js",
  "/_app/pages/index.svelte-987b9ebb.js",
  "/_app/pages/pokemon/_id_.svelte-b7590149.js",
  "/_app/pages/about.svelte-4eff5338.js",
  "/_app/chunks/vendor-20f4fcab.js"
];
const files = [
  "/favicon.png",
  "/icons/apple-icon-180.png",
  "/icons/apple-splash-1125-2436.jpg",
  "/icons/apple-splash-1136-640.jpg",
  "/icons/apple-splash-1170-2532.jpg",
  "/icons/apple-splash-1242-2208.jpg",
  "/icons/apple-splash-1242-2688.jpg",
  "/icons/apple-splash-1284-2778.jpg",
  "/icons/apple-splash-1334-750.jpg",
  "/icons/apple-splash-1536-2048.jpg",
  "/icons/apple-splash-1620-2160.jpg",
  "/icons/apple-splash-1668-2224.jpg",
  "/icons/apple-splash-1668-2388.jpg",
  "/icons/apple-splash-1792-828.jpg",
  "/icons/apple-splash-2048-1536.jpg",
  "/icons/apple-splash-2048-2732.jpg",
  "/icons/apple-splash-2160-1620.jpg",
  "/icons/apple-splash-2208-1242.jpg",
  "/icons/apple-splash-2224-1668.jpg",
  "/icons/apple-splash-2388-1668.jpg",
  "/icons/apple-splash-2436-1125.jpg",
  "/icons/apple-splash-2532-1170.jpg",
  "/icons/apple-splash-2688-1242.jpg",
  "/icons/apple-splash-2732-2048.jpg",
  "/icons/apple-splash-2778-1284.jpg",
  "/icons/apple-splash-640-1136.jpg",
  "/icons/apple-splash-750-1334.jpg",
  "/icons/apple-splash-828-1792.jpg",
  "/icons/manifest-icon-192.maskable.png",
  "/icons/manifest-icon-512.maskable.png",
  "/logo.svg",
  "/manifest.json"
];
const worker = self;
const CACHE_NAME = `static-cache-${timestamp}`;
const to_cache = build.concat(files);
worker.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    console.log("[ServiceWorker] Pre-caching offline page");
    return cache.addAll(to_cache).then(() => {
      worker.skipWaiting();
    });
  }));
});
worker.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(caches.keys().then(async (keys) => Promise.all(keys.map((key) => {
    if (key !== CACHE_NAME) {
      console.log("[ServiceWorker] Removing old cache", key);
      return caches.delete(key);
    }
  }))));
  worker.clients.claim();
});
self.addEventListener("fetch", (event) => {
  console.log("[ServiceWorker] Fetch", event.request.url);
  if (event.request.mode !== "navigate") {
    return;
  }
  event.respondWith(fetch(event.request).catch(() => {
    return caches.open(CACHE_NAME).then((cache) => {
      return cache.match("offline.html");
    });
  }));
});
