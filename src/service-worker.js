/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

self.addEventListener('push', function(event){
  console.log('Got Push notification - ', event);
})

var sw = self;
self.addEventListener('sync', function(event){
  if(event.tag === 'sync-feedback'){
    console.log("[Service-Worker] : Post - http://localhost:3000/api/feedback");
    var message = {
      body : "Your feedback posted successfully to server",
      icon : "./asset/imgs/logo.png",
      badge: "./asset/imgs/logo.png"
    }
    sw.registration.showNotification("PWA", message);
  }
})