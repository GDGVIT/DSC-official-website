importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyDekMXWA6fD3xHPV9JSWySw_otmPwcpSUY",
    authDomain: "dsc-updates.firebaseapp.com",
    databaseURL: "https://dsc-updates.firebaseio.com",
    projectId: "dsc-updates",
    storageBucket: "dsc-updates.appspot.com",
    messagingSenderId: "303908668455",
    appId: "1:303908668455:web:0ae9791a1b7976330dfa02",
    measurementId: "G-Q1SGQCL6BJ"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload)=>{
    return self.ServiceWorkerRegistration.showNotification(title,options);
})