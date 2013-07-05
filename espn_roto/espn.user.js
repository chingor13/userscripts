$(function(){

  function calculatePoints(sortedValues) {
    var current = 0,
      ties = 0,
      numTeams = sortedValues.length,
      points = [];
    var currentValue, sharedPoints;
    while(current < numTeams) {
      currentValue = sortedValues[current];
      sharedPoints = numTeams - current;
      while(currentValue == sortedValues[current + ties + 1]) {
        ties++;
        sharedPoints += (numTeams - current - ties)
      }

      for(var i = 0; i < ties + 1; i++) {
        points.push(sharedPoints * 1.0 / (ties + 1))
      }

      current = current + ties + 1;
      ties = 0;
    }
    return points;
  }

  // parse the raw data from the html
  var rawData = [];
  $("#statsTable .sortableRow").each(function(i, row){
    // select all sortable columns
    var cells = $(row).find("td").filter(function() {
      return $(this).attr("class").match(/sortableStat/);
    });

    // get the text
    cells = $.map($.makeArray(cells), function(cell, j){
      if($(cell).hasClass("sortableStat47") || $(cell).hasClass("sortableStat41")){
        return -1 * parseFloat($(cell).text());
      } else {
        return parseFloat($(cell).text());
      }
    });
    rawData.push({
      team: $(row).find("td.sortableTeamName").text(),
      stats: cells,
      points: [],
      totalPoints: 0
    });
  });

  // sort by each state and calculate points
  var numStats = rawData[0].stats.length;
  var numTeams = rawData.length;
  for(var i = 0; i < numStats; i++) {
    // sort by the stat
    rawData.sort(function(a, b){
      return b.stats[i] - a.stats[i];
    });

    // calculate the points for the given stat
    var points = calculatePoints($.map(rawData, function(datum, index){
      return datum.stats[i];
    }));

    // assign points to teams
    $.each(rawData, function(j, team){
      team.points.push(points[j]);
    });
  }

  // total all points
  $.each(rawData, function(i, team){
    team.totalPoints = team.points.reduce(function(a,b) {
      return a + b;
    });
  });

  // sort by total roto points
  rawData.sort(function(a,b){
    return b.totalPoints - a.totalPoints;
  });

console.log(rawData);

  var statNames = $("#statsTable tr.tableSubHead:last a").map(function(i, el){
    return $(el).text();
  });

  // draw a new table
  var table = $('<table width="1094" style="margin-top:16px;"><tbody></tbody></table>'),
    body = table.find("tbody");
  body.append('<tr bgcolor="#13519f"><td width="100%" align="center" colspan="' + (numTeams + 3) + '" class="tableHead">ROTO STANDINGS</td></tr></tbody></table>');
  var header = $('<tr class="tableHead" bgcolor="#76a7ea"><td>Rank</td><td>Team</td><td>Total</td></tr>');
  $.each(statNames, function(i, name){
    header.append('<td>' + name + '</td>');
  });
  body.append(header);
  $.each(rawData, function(i, team) {
    var row = $('<tr class="tableBody" bgcolor="' + (i%2 == 0 ? "#f2f2e8" : "#f8f8f2") + '"><td>' + (i + 1) + '</td><td>' + team.team + '</td><td>' + team.totalPoints + '</td></tr>');
    $.each(team.points, function(j, point) {
      row.append('<td>' + point + '</td>');
    });
    row.appendTo(body);
  });

  table.insertAfter("#statsTable");
  
  // for each stat column
  //console.log(rawData);
});