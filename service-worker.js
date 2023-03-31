// cache first then network strategy
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
'/',
'/index.html',
'/css/style.css',
'/js/main.js',
'/images/bg.jpg',
'/images/cover.jpg',
'/images/featured-1.jpg',
'/images/featured-2.jpg',
'/images/featured-3.jpg',
'/images/featured-4.jpg',
'/images/logo-red.png',
'/images/profile.jpg',
'/images/icons/icon-72x72.png',
'/images/icons/icon-96x96.png',
'/images/icons/icon-128x128.png',
'/images/icons/icon-144x144.png',
'/images/icons/icon-152x152.png'
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
