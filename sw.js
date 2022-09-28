// var cacheName = 'dscvit';
var self = this;

var filesToCache = [
    '/',
    '/team.html',
    '/blogs.html',
    '/link.html',
    '/morelinks.html',
    './css/index.css',
    './css/svg.css',
    './css/blogs.css',
    './css/feed.css',
    './css/team.css',
    './css/youtube.css',
    './js/team.js',
    './js/index.js',
    './js/blogs.js',
    './js/morelinks.js',
    './js/notifications.js',
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
    './images/board20/chanakya_vivek_kapoor.jpg',
    './images/board20/ishi_yadav.jpg',
    './images/board20/mayank_kumar.jpg',
    './images/board20/nirmit_jatana.jpg',
    './images/board20/rithik_jain.jpg',
    './images/board20/sai_teja_reddy_t.jpg',
    './images/board20/shresth_tiwary.jpg',
    './images/board20/swayam_shashwat_sharma.jpg',

    './images/techteam/abhijeet_bharadwaj.jpg',
    './images/techteam/abhiram_vinoy_joshi.jpg',
    './images/techteam/aman_sharma.jpg',
    './images/techteam/ameya_swapneel_kore.jpg',
    './images/techteam/anand_rajaram.jpg',
    './images/techteam/anirudh_mishra.jpg',
    './images/techteam/anish_raghavendra.jpg',
    './images/techteam/anuj_parihar.jpg',
    './images/techteam/chirantan_jain.jpg',
    './images/techteam/jeevan_yohan_varghese.jpg',
    './images/techteam/kartik_gupta.jpg',
    './images/techteam/krish_chatterjie.jpg',
    './images/techteam/krishap_s_sreenivasan.jpg',
    './images/techteam/mayhul_jindal.jpeg',
    './images/techteam/md_hishaam_akhtar.jpg',
    './images/techteam/ojas_tyagi.jpg',
    './images/techteam/pranjal_timsina.jpg',
    './images/techteam/prashanna_rajbhandari.jpg',
    './images/techteam/priyanka_kumari.jpg',
    './images/techteam/rehaan_mazid.jpeg',
    './images/techteam/rudrank_basant.jpg',
    './images/techteam/sankhayan_bhattacharjee.jpg',
    './images/techteam/sayar_bhattacharyya.jpg',
    './images/techteam/sharanya_mukherjee.jpg',
    './images/techteam/siddharth_nikhil.jpg',
    './images/techteam/sricharan_ramesh.jpg',
    './images/techteam/vignesh_natarajan.jpg',
    './images/techteam/vishesh_bansal.jpg',
    './images/techteam/vishruth_devan.jpg',
    './images/techteam/yajat_malhotra.jpg',

    './images/managers/aastha_gupta.jpg',
    './images/managers/aditya_mitra.jpg',
    './images/managers/akanksha_menon.jpg',
    './images/managers/ananya_elizabeth_george.jpg',
    './images/managers/ananya_gupta.jpg',
    './images/managers/anoushka_balamurugan.jpg',
    './images/managers/arnav_jaggi.jpg',
    './images/managers/arushi_tewari.jpg',
    './images/managers/astha_jha.jpg',
    './images/managers/dhruv_rajeshkumar_shah.jpg',
    './images/managers/fahad_dalwai.jpg',
    './images/managers/gauri_gupta.jpg',
    './images/managers/gurnehmat_kaur_dhindsa.jpg',
    './images/managers/kush_umesh_ojha.jpg',
    './images/managers/lokesh_rai.jpg',
    './images/managers/mrinal_agarwal.jpg',
    './images/managers/namya_arora.jpg',
    './images/managers/pranav_piedy.jpg',
    './images/managers/pranit_malhotra.jpg',
    './images/managers/raggav_subramani.jpg',
    './images/managers/raghav_trivedi.jpg',
    './images/managers/sanskriti_modi.jpg',
    './images/managers/sanvi_chavan.jpg',
    './images/managers/sparsh_singh.jpg',
    './images/managers/suhani_kansal.jpg',

    './images/designers/aaron_k_mathew.jpg',
    './images/designers/anoushka_shresth.jpg',
    './images/designers/avantika_suryawanshi.jpg',
    './images/designers/deepam_purkayastha.jpg',
    './images/designers/jatin_jakhar.jpg',
    './images/designers/kumar_aryan.jpg',
    './images/designers/pranav_ram_k.jpg',
    './images/designers/tanushree_madaan.jpg',
    './images/designers/utkarsh_prasad_sinha.jpg',

    './icons/icon-512x512.png',
    './icons/favicons/favicon.ico',
    './images/notification_icons/recruitments_blog.png',
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open('dscvit').then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function (cacheName) {
                        // Return true if you want to remove this cache,
                        // but remember that caches are shared across
                        // the whole origin
                    })
                    .map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
            );
        })
    );
});
// self.addEventListener('activate', function (event) {
// event.waitUntil(
//    caches.keys().then(function (cacheName) {
//       return caches.delete(cacheName);
//     }).then(function (_) {
//      return caches.open('dscvit');
//     }).then(function (cache) {
//       console.log("Add RESOURCES...");
//       return cache.addAll(Object.keys());
//      })
//   ); });
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request, {ignoreSearch:true}).then(response => {
//       return response || fetch(event.request);
//     })
//   );
// });
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('mysite-dynamic').then(function(cache) {
//       return cache.match(event.request).then(function (response) {
//         return response || fetch(event.request).then(function(response) {
//           cache.put(event.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });
