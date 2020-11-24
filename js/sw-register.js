if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(function () {
                console.log("Pendaftaran Service Worker berhasil.");
            })
            .then(function () {
                requestPermission();
            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal.");
            });
    });
} else {
    console.log("Service Worker tidak didukung pada browser ini.");
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Notifikasi tidak diizinkan.");
                return;
            }
            else if (result === "default") {
                console.error("Kotak dialog permintaan izin ditutup.");
                return;
            }

            navigator.serviceWorker.ready.then(() => {
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(function (registration) {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BBY8bnmphlS04Lf5Q5sSkY_QE1XdTw0K7kETi3qTiWw9AmuvmXl8uWwbt4J7yLeQ6_dUZl-xw-UYzwvX73-Zwlo")
                        }).then(function (subscribe) {
                            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh')))));
                            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth')))));
                        }).catch(function (e) {
                            console.error('Tidak dapat melakukan subscribe ', e.message);
                        });
                    });
                }
            });
        });
    }
}