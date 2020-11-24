function getResultStandingsJSON(data) {
    var tableStandingsHtml = "";

    data.standings.forEach(function (standing) {
        var tableDataStanding = "";

        standing.table.forEach(function (team) {
            team = JSON.parse(JSON.stringify(team).replace(/^http:\/\//i, 'https://'));

            tableDataStanding += `
                <tr>
                    <td class="center-align">${team.position}</td>
                    <td>
                        <p style="display: flex; align-items: center;">
                            <img alt="../favicon.ico" style="float:left; margin-right:10px" width="20" height="20" src="${team.team.crestUrl}"> ${team.team.name}
                        </p>
                    </td>
                    <td class="center-align">${team.playedGames}</td>
                    <td class="center-align">${team.won}</td>
                    <td class="center-align">${team.draw}</td>
                    <td class="center-align">${team.lost}</td>
                    <td class="center-align">${team.points}</td>
                </tr>
            `;
        })

        tableStandingsHtml += `
            <div class="card">
                <div class="card-content">
                    <table class="responsive-table centered">
                        <thead>
                            <tr>
                                <th class="center-align">Pos</th>
                                <th class="center-align">Team</th>
                                <th class="center-align">P</th>
                                <th class="center-align">W</th>
                                <th class="center-align">D</th>
                                <th class="center-align">L</th>
                                <th class="center-align">Pts</th>
                            </tr>
                        </thead>

                        <tbody>
                            ` + tableDataStanding + `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });

    document.getElementById("standings").innerHTML = tableStandingsHtml;
}
