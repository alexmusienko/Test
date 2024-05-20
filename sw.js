const cachesStaticName = 'caches-static-v1';
const cachesDynamicName = 'caches-dynamic';

const ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
    '/css/materialize.min.css',
    '/css/style.css',
    '/js/main.js',
    '/js/app.js',
    '/js/materialize.min.js',
    '/manifest.json'
];


// Install Service Worker
self.addEventListener('install', async (event) => {
    console.log('Service Worker: Installed.');
    const cache = await caches.open(cachesStaticName);
    await cache.addAll(ASSETS);
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
})

self.addEventListener('fetch', event => {
    //console.log(event.request.url);
    event.respondWith(StaticFirst(event.request));
})

async function StaticFirst(request) {
    const resp = await caches.match(request);
    return resp ?? await NetworkFirst(request);
}

async function NetworkFirst(request) {
    console.log('Запрашиваем ', request.url);
    try {
        const newResp = await fetch(request);
        const cache = await caches.open(cachesDynamicName);
        await cache.put(request, newResp.clone());
        return newResp;
    } catch (ex) {
        console.log('Запрос ', request.url, ' упал, попробуем из динамического кеша');
        const cachedResp = await caches.match(request);
        return cachedResp ?? await caches.match('/offline.html');
    }
}