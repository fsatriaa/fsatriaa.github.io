const base_url = "https://api.football-data.org/v2";
const tokenApi = "66f655c8c9b0498a828201a725e21a21";

const id_liga = 2021;

const EP_standings = `${base_url}/competitions/${id_liga}/standings?standingType=TOTAL`;
const EP_matches = `${base_url}/competitions/${id_liga}/matches?status=SCHEDULED`;
const EP_detailMatch = `${base_url}/matches/`;

const store_nameMatch = "favorite_match";

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);

        return Promise.reject(new Error(response.statusText));
    } else {

        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {

    console.log("Error : " + error);
}

function fetchAPI(endpoint) {
    return fetch(endpoint, {
        headers: {
            "X-Auth-Token": tokenApi
        }
    })
}

function get_standings() {
    return new Promise(function (resolve, reject) {
        if ("caches" in window) {
            caches.match(EP_standings).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        getResultStandingsJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(EP_standings)
            .then(status)
            .then(json)
            .then(function (data) {
                getResultStandingsJSON(data);
                resolve(data);
            })

            .catch(error);
    });
}

function get_matches() {
    return new Promise(function (resolve, reject) {
        if ("caches" in window) {
            caches.match(EP_matches).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        getResultMatchesJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(EP_matches)
            .then(status)
            .then(json)
            .then(function (data) {
                getResultMatchesJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

function get_matchDetail(matchID) {
    return new Promise(function (resolve, reject) {
        if ("caches" in window) {
            caches.match(EP_detailMatch + matchID).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        get_resultsMatchDetail(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(EP_detailMatch + matchID)
            .then(status)
            .then(json)
            .then(function (data) {
                get_resultsMatchDetail(data);
                resolve(data);
            })
            .catch(error);
    });
}

function favorites() {
    get_allFavorites(store_nameMatch).then(function (data) {
        get_resultsMatchFavorites(data);
    });
}

function favoriteByID(ID) {
    get_favoriteByID(ID, store_nameMatch).then(function (data) {
        get_resultsMatchDetail(data);
    })
}