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
 * See https://goo.gl/YYPcyY
 */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.6/workbox-sw.js"
);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/icon/favicon.ico",
    "revision": "d2f619d796fbe8bed6200da2691aa5b6"
  },
  {
    "url": "assets/icon/icon.png",
    "revision": "b96ad6e1e0b755c8cd45e6aec40bca25"
  },
  {
    "url": "build/app.js",
    "revision": "9b54574cb559f8320d7d5faad3d8b8d0"
  },
  {
    "url": "build/app/1xeagp9b.es5.js",
    "revision": "7541554cacd275c83c50a6e796656766"
  },
  {
    "url": "build/app/1xeagp9b.js",
    "revision": "81e9d9cfb0b9ba480936d8bf9d17fb8e"
  },
  {
    "url": "build/app/app.m1ld5aly.js",
    "revision": "727584a6062bfa59f5ae43ee650afe62"
  },
  {
    "url": "build/app/app.re2yorau.js",
    "revision": "a8aa1e5fe4c35d6d00ecd9ee35230859"
  },
  {
    "url": "build/app/loettoy3.es5.js",
    "revision": "341012f0e5919e03a63ef7878f559096"
  },
  {
    "url": "build/app/loettoy3.js",
    "revision": "b9c0b704c6a7571852e1884c41388781"
  },
  {
    "url": "index.html",
    "revision": "e5b91e68e01d3a96078d9bc3abffb1d1"
  },
  {
    "url": "manifest.json",
    "revision": "0c129721ede7cd25304ebdd238d774ad"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
