// worker/index.js

self.addEventListener('push', function(event) {
    if (event.data) {
      const data = event.data.json();
      
      const options = {
        body: data.body,
        icon: '/icon.png', 
        badge: '/badge.png', 
        vibrate: [200, 100, 200], // 👈 Made vibration slightly stronger
        requireInteraction: true, // 👈 NEW: Forces the banner to stay on screen
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2'
        }
      };
      
      event.waitUntil(
        self.registration.showNotification(data.title, options)
      );
    }
});
  
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('/') 
    );
});