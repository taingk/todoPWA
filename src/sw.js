/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "css/materialize.min.css",
    "revision": "ec1df3ba49973dcb9ff212f052d39483"
  },
  {
    "url": "index.html",
    "revision": "4dd56b6d8409c38c4e193d84ed362bd9"
  },
  {
    "url": "js/app.js",
    "revision": "117444c1540cb289a32ebd3743ed93b5"
  },
  {
    "url": "js/components/delete.js",
    "revision": "ab710421cf220c7005ea35637cdc5053"
  },
  {
    "url": "js/components/p.js",
    "revision": "bae4452ca999e1db3d6ba8cdb7ddae6f"
  },
  {
    "url": "js/components/todo.js",
    "revision": "fff60b4fc754f014c36b355961cae295"
  },
  {
    "url": "js/connection.js",
    "revision": "63da20156cf7028b842b17c0bdb0b612"
  },
  {
    "url": "js/materialize.min.js",
    "revision": "5dcfc8944ed380b2215dc28b3f13835f"
  },
  {
    "url": "manifest.json",
    "revision": "fd223551bddb8cd06754594fb3919c81"
  },
  {
    "url": "yarn.lock",
    "revision": "6eda23c4c737e2f8e8c6580a075ee4bc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/, new workbox.strategies.CacheFirst({ "cacheName":"images", plugins: [] }), 'GET');
