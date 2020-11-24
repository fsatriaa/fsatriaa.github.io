document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var matchID = Number(urlParams.get("id"));
    var isFromSaved = urlParams.get("saved");

    var btnFav = document.getElementById("FAB_favorite");

    if (isFromSaved) {
        btnFav.style.display = "none";
        favoriteByID(matchID);
    } else {
        var item = get_matchDetail(matchID);
    }

    btnFav.onclick = function () {
        item.then(function (match) {
            addToFavorite(match, "favorite_match");
        })
    }
});