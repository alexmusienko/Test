if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration on progress');
    navigator.serviceWorker.register('/sw.js').then(function(reg) {
        console.log('CLIENT: service worker has been registered for scope: ', reg);
    })
}