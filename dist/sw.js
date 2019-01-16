const cacheName = 'hypocalc-cache-v2'
const cacheFiles = [
  '/',
  'index.html',
  'css/hypocalc.min.css',
  'js/hypocalc.bundle.js',
  'img/icons-192.png',
  'img/icons-512.png',
  'favicon.ico'
]
const self = this
const caches = self.caches

self.addEventListener('install', e => {
  // console.log('Attempting to install service worker and cache static assets')
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(cacheFiles)
      })
  )
})

self.addEventListener('fetch', e => {
  // console.log('Fetch event for ', e.request.url)
  e.respondWith(
    caches.match(e.request)
      .then(response => {
        if (response) {
          // console.log('Found ', e.request.url, ' in cache')
          return response
        }
        // console.log('Network request for ', e.request.url)
        return fetch(e.request)
          .then(response => {
            return caches.open(cacheName).then(cache => {
              cache.put(e.request.url, response.clone())
              return response
            })
          })
      }).catch(error => {
        console.log('An error ocurred: ', error)
      })
  )
})
