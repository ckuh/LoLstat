angular.module('App')
  .controller('SummonerController', function($location, $scope, $state, $localStorage, homeFactory, summonerFactory) {
    var vm = this;
    vm.socket = io();
    vm.realm = {};
    vm.summoner = {};
    vm.statSummary = {};
    vm.statRanked = {};
    vm.championList = {};
    vm.summonerIGN = {};
    vm.summoner.IGN = '';
    vm.statChoice = [
      'Summary',
      'Ranked'
    ];
    vm.seasonShort = {
      'S6': 'active',
      'S5': '',
      'S4': '',
      'S3': '',
    }
    vm.seasonDisp = [
      'S6', 'S5', 'S4', 'S3'
    ];
    vm.season = [
      'SEASON2016', 'SEASON2015', 'SEASON4', 'SEASON3'
    ];
    vm.gameStats = {
      summary: false,
      ranked: false
    }

    vm.status = {
      isopen: false
    };

    vm.init = function() {
      vm.summonerIGN.name = $localStorage.summonerIGN;
      vm.summonerIGN.region = $localStorage.summonerRegion.toLowerCase();
      vm.summonerIGN.season = vm.season[0];
      vm.getUserInfo();
      vm.getChampName();
    }

    vm.seasonPick = function(choice) {
      angular.forEach(vm.seasonShort, function(value, key) {
        if (key === choice) {
          vm.seasonShort[key] = 'active';
        } else {
          vm.seasonShort[key] = '';
        }
      });

      var result = findSeason(choice, vm.seasonDisp, vm.season)
      if (vm.summonerIGN.season === result) {
        return
      } else {
        vm.summonerIGN.season = result;
        vm.getUserStatsRanked();
      }
    }

    vm.statPick = function(choice) {
      if (choice === vm.statChoice[0]) {
        vm.gameStats.summary = true;
        vm.gameStats.ranked = false;
        vm.stat = vm.statChoice[0];
        vm.getUserStatsSummary();
      }

      if (choice === vm.statChoice[1]) {
        vm.gameStats.summary = false;
        vm.gameStats.ranked = true;
        vm.stat = vm.statChoice[1];
        vm.getUserStatsRanked();
      }
    }

    vm.getUserInfo = function() {
      vm.socket.emit('staticRealm', vm.summonerIGN.region);
      vm.socket.emit('summonerName', vm.summonerIGN.name);
      vm.socket.emit('summonerLeague', vm.summonerIGN.name);
    }

    vm.getChampName = function() {
      vm.socket.emit('champName')
    }

    vm.getUserStatsSummary = function() {
      vm.socket.emit('statsSummary', vm.summonerIGN.name);
    }

    vm.getUserStatsRanked = function() {
      vm.socket.emit('statsRanked', vm.summonerIGN);
    }

    vm.saveSummonerIGN = function() {
      homeFactory.saveSummonerIGN(vm.summoner.IGN);
      vm.summoner.IGN = "";
      $state.go($state.current, {}, {
        reload: true
      });
    }

    vm.socket.on('staticRealm', function(data) {
      $scope.$apply(function() {
        vm.realm = data;
      })
    })

    vm.socket.on('summonerName', function(data) {
      $scope.$apply(function() {
        if (data.name) {
          vm.summoner = data;
        } else {
          $state.go('home');
        }
      })
    })

    vm.socket.on('summonerLeague', function(data) {
      $scope.$apply(function() {
        vm.summoner.ranked = data;
      })
    })

    vm.socket.on('champName', function(data) {
      $scope.$apply(function() {
        for (var key in data) {
          vm.championList[data[key].id] = data[key];
        }
      })
    })

    vm.socket.on('statsSummary', function(data) {
      $scope.$apply(function() {
        vm.statSummary = sortStats(data.playerStatSummaries);
      })
    })

    vm.socket.on('statsRanked', function(data) {
      if(data.champions) {
        $scope.$apply(function() {
          angular.forEach(data.champions, function(champ, key, arr) {
            if (champ.id === 0) {
              vm.totalWin = key;
            }else{
              champ.key = vm.championList[champ.id].key;
              champ.name = vm.championList[champ.id].name;
              champ.stats.avgWin = (Math.round((champ.stats.totalSessionsWon / champ.stats.totalSessionsPlayed) * 100));
              champ.stats.avgKill = (Math.round((champ.stats.totalChampionKills / champ.stats.totalSessionsPlayed) * 100) / 100);
              champ.stats.avgDeath = (Math.round((champ.stats.totalDeathsPerSession / champ.stats.totalSessionsPlayed) * 100) / 100);
              champ.stats.avgAssist = (Math.round((champ.stats.totalAssists / champ.stats.totalSessionsPlayed) * 100) / 100);
              champ.stats.avgKDA = (Math.round(((champ.stats.totalChampionKills + champ.stats.totalAssists) / champ.stats.totalDeathsPerSession) * 100) / 100);
              champ.stats.avgCS = (Math.floor((champ.stats.totalMinionKills / champ.stats.totalSessionsPlayed)));
              champ.stats.avgGold = (Math.floor((champ.stats.totalGoldEarned / champ.stats.totalSessionsPlayed)));
            }
          });
          data.champions.splice(vm.totalWin, 1);
          vm.statRanked = data.champions.sort(compare);;
        })
      }
    })

    vm.init();

  });

function sortStats(playerStat) {
  var totalInfo = [];
  for (var i = 0; i < playerStat.length; i++) {
    var gameMode = playerStat[i].playerStatSummaryType;
    if (playerStat[i].playerStatSummaryType === 'OdinUnranked' || playerStat[i].playerStatSummaryType === 'RankedTeam3x3' || playerStat[i].playerStatSummaryType === 'KingPoro') {
      playerStat.splice(i, 1);
    } else {
      playerStat[i].aggregatedStats.wins = playerStat[i].wins;
      totalInfo.push(playerStat[i]);
    }
    if (gameMode === 'Unranked') {
      playerStat[i].playerStatSummaryType = 'Summoner\'s Rift unranked games'
    }
    if (gameMode === 'Unranked3x3') {
      playerStat[i].playerStatSummaryType = 'Twisted Treeline unranked games'
    }
    if (gameMode === 'AramUnranked5x5') {
      playerStat[i].playerStatSummaryType = 'Howling Abyss games'
    }
    if (gameMode === 'CoopVsAI') {
      playerStat[i].playerStatSummaryType = 'Summoner\'s Rift and Crystal Scar games played against AI'
    }
    if (gameMode === 'CoopVsAI3x3') {
      playerStat[i].playerStatSummaryType = 'Twisted Treeline games played against AI'
    }
    if (gameMode === 'RankedSolo5x5') {
      playerStat[i].playerStatSummaryType = 'Summoner\'s Rift ranked solo queue games'
    }
    if (gameMode === 'RankedTeam3x3') {
      playerStat[i].playerStatSummaryType = 'Twisted Treeline ranked team games'
    }
    if (gameMode === 'RankedTeam5x5') {
      playerStat[i].playerStatSummaryType = 'Summoner\'s Rift ranked team games'
    }
    if (gameMode === 'OneForAll5x5') {
      playerStat[i].playerStatSummaryType = 'One for All games'
    }
    if (gameMode === 'URF') {
      playerStat[i].playerStatSummaryType = 'Ultra Rapid Fire games'
    }
    if (gameMode === 'KingPoro') {
      playerStat[i].playerStatSummaryType = 'King Poro games'
    }
    if (gameMode === 'Bilgewater') {
      playerStat[i].playerStatSummaryType = 'Black Market Brawlers games'
    }
    if (gameMode === 'CAP5x5') {
      playerStat[i].playerStatSummaryType = 'Team Builder games'
    }
  }

  return playerStat;
}

function findSeason(choice, seasonDisp, season) {
  var result;
  if (choice === seasonDisp[0]) {
    result = season[0];
  }
  if (choice === seasonDisp[1]) {
    result = season[1];
  }
  if (choice === seasonDisp[2]) {
    result = season[2];
  }
  if (choice === seasonDisp[3]) {
    result = season[3];
  }
  return result;
}

function compare(a, b) {
  if (a.name < b.name)
    return -1;
  else if (a.name > b.name)
    return 1;
  else
    return 0;
}
