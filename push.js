var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BBY8bnmphlS04Lf5Q5sSkY_QE1XdTw0K7kETi3qTiWw9AmuvmXl8uWwbt4J7yLeQ6_dUZl-xw-UYzwvX73-Zwlo",
    "privateKey": "HHGpOisUU2Cl9Q9H7wOp031oQeIkwtXql3DPza1rRxA"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cx38iPdB7g8:APA91bEZrojTsXPWuE1hNjz08Ys0oeemRZwOcJbL-ImhlQ9ANF0MLOXWxGkvlosOvyJbHPHGuxVxrJIVlZOlOL8O4Oufr8X-KVCCu3r9H2HRSd6II5Ruku8zUJcH2izpISKJY5MaC-oO",
    "keys": {
        "p256dh": "BPMP8t8V5qf1ivrToRoSLRnjaOAcDGXOdP9o4Bbaf4m67hfhdtkIP7+J8iU/pE5Glqb0khJJXX5qq48y92gU/zw=",
        "auth": "Hm3vrjk5uSAPayTRExHlpQ=="
    }
};
var payload = 'Haloo ini adalah pesan dari push notification';

var options = {
    gcmAPIKey: '496174356221',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);