self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("v1").then(cache => {
      return cache.addAll([
        "/UpwellCheck/",
        "/UpwellCheck/index.html",
        "/UpwellCheck/main.css",
        "/UpwellCheck/main.js",
        "/UpwellCheck/peta.jpg",
        "/UpwellCheck/ocean.png",
        "/UpwellCheck/UpwellCheck.png",
        "/UpwellCheck/manifest.json",
        "/UpwellCheck/icon-192x192.png",
        "/UpwellCheck/icon-512x512.png",
        "/UpwellCheck/sw.js"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
