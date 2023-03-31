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

self.addEventListener('install', function(event) {
// Perform install steps
event.waitUntil(
caches.open(CACHE_NAME)
.then(function(cache) {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});

self.addEventListener('fetch', function(event) {
event.respondWith(
caches.match(event.request)
.then(function(response) {
// Cache hit - return response
if (response) {
console.log('cache hit');
return response;
}
console.log('cache miss');
// Fetch from network
return fetch(event.request)
    .then(function(response) {
        // Check if we received a valid response
        if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Add the response to the cache
        caches.open(CACHE_NAME)
            .then(function(cache) {
                cache.put(event.request, responseToCache);
            });

        return response;
    })
})
);
});