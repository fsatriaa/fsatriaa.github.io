function cekDatabase(idb) {
    const db_promised = idb.open("premier-league", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains(store_nameMatch)) {
            const matchObjectStore = upgradeDb.createObjectStore(store_nameMatch, {
                keypath: "id"
            });

            matchObjectStore.createIndex("home_team", "match.homeTeam.name", {
                unique: false
            });

            matchObjectStore.createIndex("away_team", "match.awayTeam.name", {
                unique: false
            });
        }
    });

    return db_promised;
}

function addToFavorite(data, storeName) {
    var dataPrimaryKey;
    if (storeName === store_nameMatch) {
        dataPrimaryKey = data.match.id;
    }

    cekDatabase(idb)
        .then(function (db) {
            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);

            store.put(data, dataPrimaryKey);

            return tx.complete;
        })
        .then(function () {
            M.toast({
                html: "Telah masuk ke favorite!",
            });
        });
}

function removeFromFavorites(ID, storeName) {
    console.log(ID + " " + storeName);
    cekDatabase(idb)
        .then(function (db) {
            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);

            store.delete(ID);

            return tx.complete;
        })
        .then(function () {
            M.toast({
                html: "Telah terhapus dari favorite!",
            });
        });

    location.reload();
}

function get_allFavorites(storeName) {
    return new Promise(function (resolve, reject) {
        cekDatabase(idb)
            .then(function (db) {
                const tx = db.transaction(storeName, "readonly");
                const store = tx.objectStore(storeName);

                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function get_favoriteByID(ID, storeName) {
    return new Promise(function (resolve, reject) {
        cekDatabase(idb)
            .then(function (db) {
                const tx = db.transaction(storeName, "readonly");
                const store = tx.objectStore(storeName);

                return store.get(ID);
            })
            .then(function (data) {
                resolve(data);
            });
    });
}