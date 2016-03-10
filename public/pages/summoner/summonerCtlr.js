angular.module('App')
  .controller('SummonerController', function($location, $scope, $state, $localStorage, homeFactory) {
    var vm = this;
    vm.socket = io();
    vm.summoner = {};
    vm.statSummary = {};
    vm.championList = {};
    vm.summoner.IGN = '';
    vm.statChoice = [
      'Stats Summary',
      'Stats Ranked'
    ];
    vm.gameStats = {
      summary: false,
      ranked: false
    }

    vm.status = {
      isopen: false
    };

    vm.init = function() {
      vm.summonerIGN = $localStorage.summonerIGN;
      vm.getUserInfo();
      vm.getChampName();
    }

    vm.toggleStatChoice = function($event) {
      debugger;
      $event.preventDefault();
      $event.stopPropagation();
      vm.status.isopen = !vm.status.isopen;
    };

    vm.statPick = function(choice) {
      if (choice === vm.statChoice[0]) {
        vm.gameStats.summary = true;
        vm.gameStats.ranked = false;
        vm.getUserStatsSummary();
      }

      if (choice === vm.statChoice[1]) {
        vm.gameStats.summary = false;
        vm.gameStats.ranked = true;
        vm.getUserStatsRanked();
      }
    }

    vm.getUserInfo = function() {
      vm.socket.emit('summonerName', vm.summonerIGN);
    }

    vm.getChampName = function() {
      vm.socket.emit('champName')
    }

    vm.getUserStatsSummary = function() {
      vm.socket.emit('statsSummary', vm.summonerIGN);
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

    vm.socket.on('summonerName', function(data) {
      $scope.$apply(function() {
        if (data.name) {
          vm.summoner = data;
          console.log(data);
        } else {
          $location.path('/');
        }
      })
    })

    vm.socket.on('champName', function(data) {
      console.log('champList: ', data);
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
      $scope.$apply(function() {
        // vm.statSummary = sortStats(data.playerStatSummaries);
        console.log(data)
      })
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
