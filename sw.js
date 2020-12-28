const cacheName='v1';

const cacheAssets=[
    'index.html',
    'about.html',
    'products.html',
    'contact.html',
    '/assets/css/fontawesome.css',
    '/assets/css/templatemo-sixteen.css',
    '/assets/css/owl.css'
]//kesira fajl po fajl

self.addEventListener('install', function (event) {
    console.log('Service Worker: Installed');

    event.waitUntil(
        caches.open(cacheName)
        .then(cache=>{
            console.log('Service Worker: Caching files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
            
    );
});

self.addEventListener('activate', function (event) {
        console.log('Service Worker: Activated');
        //remove unwanted cache
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName){
                            console.log('Service Worker: Clearing Old Cache');
                            return caches.delete(cache);
                        }
                    })
                )
            })
        );
    }
);

self.addEventListener('fetch', function (event)  {
    console.log('Service Worker: Fetching');
    event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
});