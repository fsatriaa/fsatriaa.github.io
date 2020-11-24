function getResultMatchesJSON(data) {
    var tableDataMatches = "";
    var tableMatchesHtml = "";

    var dataMatch = data.matches;
    var matchDay = [];
    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    for (let i = 0; i < dataMatch.length; i++) {
        matchDay.push(dataMatch[i].matchday);
    }

    let idx = 0;
    for (let i = 0; i < dataMatch.length; i++) {
        if (dataMatch[i].matchday === matchDay.filter(unique)[idx]) {
            tableDataMatches += `
                <tr>
                    <td> ${dataMatch[i].homeTeam.name} </td>
                    <td> (${new Date(dataMatch[i].utcDate).toLocaleTimeString()}) </td>
                    <td> ${dataMatch[i].awayTeam.name} </td>
                    <td> <a class="btn-small red" href="./detailMatch.html?id=${dataMatch[i].id}">Look!</a> </td>
                </tr>
            `;
        } else {
            tableMatchesHtml += `
                <div class="card">
                    <div class="card-content">
                        <hr>
                        <span class="card-title center-align">${convertDate(new Date(dataMatch[i - 1].utcDate).toLocaleDateString())}</span>
                        <hr>
                        <table class="responsive-table centered">
                            <thead>
                                <tr>
                                    <th>Home</th>
                                    <th>Kick Off</th>
                                    <th>Away</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ` + tableDataMatches + `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            // Kosongkan row
            tableDataMatches = "";

            // Tambah row
            tableDataMatches += `
                <tr>
                    <td> ${dataMatch[i].homeTeam.name} </td>
                    <td> (${new Date(dataMatch[i].utcDate).toLocaleTimeString()}) </td>
                    <td> ${dataMatch[i].awayTeam.name} </td>
                    <td> <a class="btn-small red" href="./detailMatch.html?id=${dataMatch[i].id}">Look!</a> </td>
                </tr>
            `;

            idx++;
        }
    }

    // Tambah tabel
    tableMatchesHtml += `
        <div class="card">
            <div class="card-content">
                <span class="card-title">${convertDate(new Date(dataMatch[dataMatch.length - 1].utcDate).toLocaleDateString())}</span>
                <table class="responsive-table striped centered">
                    <thead>
                        <tr>
                            <th>Home</th>
                            <th>Kick Off</th>
                            <th>Away</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ` + tableDataMatches + `
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById("matches").innerHTML = tableMatchesHtml;
}

function get_resultsMatchDetail(data) {
    var tableMatchDetailHtml = "";

    match = data.match;
    h2h = data.head2head;

    tableMatchDetailHtml += `
        <div class="center-align">
            ${convertDate(new Date(match.utcDate).toLocaleDateString())} 
            <br> 
            ${new Date(match.utcDate).toLocaleTimeString()}
        </div>

        <div class="row">
            <div class="col s5 m5 l5 center-align"> <h5> <p>${match.homeTeam.name}</p> </h5> </div>
            <div class="col s2 m2 l2 center-align"> <h5> vs </h5> </div>
            <div class="col s5 m5 l5 center-align"> <h5> <p>${match.awayTeam.name}</p> </h5> </div>            
        </div>

        <h6 class="center-align">${match.venue} Stadium</h6>
        <hr>

        <table class="striped centered" style="margin-top: 30px; margin-bottom: 30px;">
            <thead></thead>
            <tbody>
                <tr>
                    <td>${h2h.homeTeam.wins}</td>
                    <td style="font-weight: bold;">Wins</td>
                    <td>${h2h.awayTeam.wins}</td>
                </tr>
                <tr>
                    <td>${h2h.homeTeam.draws}</td>
                    <td style="font-weight: bold;">Draws</td>
                    <td>${h2h.awayTeam.draws}</td>
                </tr>
                <tr>
                    <td>${h2h.homeTeam.losses}</td>
                    <td style="font-weight: bold;">Loses</td>
                    <td>${h2h.awayTeam.losses}</td>
                </tr>
            </tbody>
        </table>
    `;

    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tableMatchDetail").innerHTML = tableMatchDetailHtml;
}

function get_resultsMatchFavorites(data) {
    var tableMatchFavoriteHtml = "";

    tableMatchFavoriteHtml += `
        <table class="striped centered">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Date</th>
                    <th>Team</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    let number = 1;
    data.forEach(function (match) {
        tableMatchFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td>${convertDate(new Date(match.match.utcDate).toLocaleDateString())}</td>
                <td>${match.match.homeTeam.name} vs ${match.match.awayTeam.name}</td>
                <td>
                    <a class="btn-small red" href="./detailMatch.html?id=${match.match.id}&saved=true">Look!</a>
                    <p></p>
                    <a class="btn-small red" onclick="removeFromFavorites(${match.match.id}, 'favorite_match')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tableMatchFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite-item").innerHTML = tableMatchFavoriteHtml;
}