importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/detailMatch.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/favicon.ico', revision: '1' },

    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/matches.html', revision: '1' },
    { url: '/pages/favorites.html', revision: '1' },

    { url: '/images/icons/icon-72x72.png', revision: '1' },
    { url: '/images/icons/icon-96x96.png', revision: '1' },
    { url: '/images/icons/icon-128x128.png', revision: '1' },
    { url: '/images/icons/icon-144x144.png', revision: '1' },
    { url: '/images/icons/icon-152x152.png', revision: '1' },
    { url: '/images/icons/icon-192x192.png', revision: '1' },
    { url: '/images/icons/icon-384x384.png', revision: '1' },
    { url: '/images/icons/icon-512x512.png', revision: '1' },

    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },

    { url: '/js/api.js', revision: '1' },
    { url: '/js/helpers.js', revision: '1' },
    { url: '/js/detail.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/standings.js', revision: '1' },
    { url: '/js/matches.js', revision: '1' },
    { url: '/js/sw-register.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },

    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api'
    })
);

// const CACHE_NAME = "ais-v3";
// const urlsToCache = [
//     "/",
//     "/nav.html",
//     "/index.html",
//     "/detailMatch.html",
//     "/manifest.json",
//     "/favicon.ico",

//     "/pages/home.html",
//     "/pages/matches.html",
//     "/pages/favorites.html",

//     "/css/materialize.min.css",
//     "/css/style.css",

//     "/images/icons/icon-72x72.png",
//     "/images/icons/icon-96x96.png",
//     "/images/icons/icon-128x128.png",
//     "/images/icons/icon-144x144.png",
//     "/images/icons/icon-152x152.png",
//     "/images/icons/icon-192x192.png",
//     "/images/icons/icon-384x384.png",
//     "/images/icons/icon-512x512.png",

//     "/js/api.js",
//     "/js/helpers.js",
//     "/js/detail.js",
//     "/js/materialize.min.js",
//     "/js/nav.js",
//     "/js/standings.js",
//     "/js/matches.js",
//     "/js/sw-register.js",
//     "/js/idb.js",
//     "js/db.js",

//     "https://fonts.googleapis.com/icon?family=Material+Icons",
//     "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
// ];

// self.addEventListener("install", event => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener("fetch", event => {
//     var base_url = "https://api.football-data.org/v2";
//     if (event.request.url.indexOf(base_url) > -1) {
//         event.respondWith(
//             caches.open(CACHE_NAME).then(function (cache) {
//                 return fetch(event.request).then(function (response) {
//                     cache.put(event.request.url, response.clone());
//                     return response;
//                 })
//             })
//         );
//     } else {
//         event.respondWith(
//             caches.match(event.request, { ignoreSearch: true }).then(function (response) {
//                 return response || fetch(event.request);
//             })
//         )
//     }
// });

// self.addEventListener("activate", event => {
//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function (cacheName) {
//                     if (cacheName != CACHE_NAME) {
//                         console.log("Service Worker: cache " + cacheName + "dihapus");
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });

self.addEventListener("push", function (event) {
    var body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    var options = {
        body: body,
        icon: "images/icons/icon-512x512.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});