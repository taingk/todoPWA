module.exports = {
  "globDirectory": "/Users/kevin/Esgi/4IW/todo/src",
  "importWorkboxFrom": "local",
  "skipWaiting": true,
  "globIgnores": [
    "images/**/*",
    "node_modules/**/*",
    "package*",
    "workbox-4.3.1",
    "workbox-config.js"
  ],
  "globPatterns": [
    "**/*.{json,jpg,html,js,css,lock}"
  ],
  "swDest": "/Users/kevin/Esgi/4IW/todo/src/sw.js",
  "runtimeCaching": [{
    "urlPattern": /\.(?:png|gif|jpg|jpeg|svg)$/,
    "handler": "CacheFirst",
    "options": {
      "cacheName": "images",
    }
  }]
};
