var cacheName = 'GCPCrashCourse';
var filesToCache = [
  '/',
  '/index.html',
  'css/index.css',
  'js/index.js',
  'after-landing.svg',
  'images/Behance.svg',
  'images/dsc-logo-long.svg',
  'images/dsc-logo-square.svg',
  'images/Facebook.svg',
  'images/Github.svg',
  'images/Instagram.svg',
  'images/landing.svg',
  'images/Linkedin.svg',
  'images/Medium.svg',
  'images/menu-close.svg',
  'images/menu-image.svg',
  'images/Twitter.svg',
  'images/Youtube.svg',
  'icons/favicons/icon-512x512.png',
  'icons/favicons/favicon.ico'
];self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});