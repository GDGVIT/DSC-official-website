// var CACHE_NAME = 'my-site-cache-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/team.html',
  '/blogs.html',
  '/link.html',
  '/morelinks.html',
  './css/index.css',
  './css/team.css',
  './css/svg.css',
  './css/blogs.css',
  './css/feed.css',
  './css/team.css',
  './css/youtube.css',
  './js/team.js',
  './js/index.js',
  './js/blog.js',
  './js/morelinks.js',
  './js/notification.js',
  './js/youtube.js',
  './images/after-landing.svg',
  './images/after-landing-dark.svg',
  './images/Behance.svg',
  './images/dsc-logo-square.svg',
  './images/Facebook.svg',
  './images/Github.svg',
  './images/Instagram.svg',
  './images/landing.svg',
  './images/Linkedin.svg',
  './images/Medium.svg',
  './images/Twitter.svg',
  './images/Youtube.svg',
  './images/team.svg',
  './images/board19/samarth.jpg',
  './images/board19/ayush.jpg',
  './images/board19/samyak.jpg',
  './images/board19/aritro.jpg',
  './images/board19/dhiraj.jpg',
  './images/board19/jayakrishna.jpg',
  './images/board19/abhishek.jpg',
  './images/board19/raina.jpg',
  './images/board19/apurva.jpg',
  './images/board19/preethi.jpg',
  './images/board19/amrut.jpg',
  './images/techteam/abhishek.jpg',
  './images/techteam/amogh.jpg',
  './images/techteam/ananya.jpg',
  './images/techteam/angad.jpg',
  './images/techteam/deepak.jpg',
  './images/techteam/nikhil.jpg',
  './images/techteam/paritosh.jpg',
  './images/techteam/prateek.jpg',
  './images/techteam/riddhi.jpg',
  './images/techteam/satkriti.jpg',
  './images/techteam/ubaid.jpg',
  './images/techteam/vikrame.jpg',
  './images/techteam/vishaal.jpg',
  './images/techteam/yaswant.jpg',
  './images/techteam/purushottam.jpg',
  './images/techteam/nirmit.jpg',
  './images/techteam/ashutosh.jpg',
  './images/techteam/chanakya.jpg',
  './images/techteam/fenil.jpg',
  './images/techteam/GovindKrishna.jpg',
  './images/techteam/hishaam.jpg',
  './images/techteam/kush.jpg',
  './images/techteam/mayank.jpg',
  './images/techteam/PragatiBhattad.jpg',
  './images/techteam/prakhar.jpg',
  './images/techteam/raman.jpg',
  './images/techteam/ritik.jpg',
  './images/techteam/ShantanuVerma.jpg',
  './images/techteam/siddhartha.jpg',
  './images/techteam/SaiSandeepRayanuthala.jpg',
  './images/techteam/ritik.jpg',
  './images/managers/akshat.jpg',
  './images/managers/arjun.jpg',
  './images/managers/cyril.jpg',
  './images/managers/deepak.jpg',
  './images/managers/dhruv.jpg',
  './images/managers/hardik.jpg',
  './images/managers/kritika.jpg',
  './images/managers/manorama.jpg',
  './images/managers/meherdeep.jpg',
  './images/managers/muskan.jpg',
  './images/managers/naynika.jpg',
  './images/managers/saloni.jpg',
  './images/managers/sanchi.jpg',
  './images/managers/shreya.jpg',
  './images/managers/shubham.jpg',
  './images/managers/vivek.jpg',
  './images/designers/ekaansh.jpg',
  './images/designers/aditya.jpg',
  './images/designers/riya.jpg',
  './images/designers/ruchica.jpg',
  './images/designers/shravani.jpg',
  './images/designers/ronish.jpg',
  './icons/icon-512x512.png',
  './icons/favicons/favicon.ico',
	'./images/notification_icons/recruitments_blog.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open('dscvit').then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })                                                                                                                                                                                                                    
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
